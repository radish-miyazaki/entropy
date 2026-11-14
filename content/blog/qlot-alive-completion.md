---
title: qlot 環境で Alive の Tab 補完が効かない
description: qlot で依存を固定した Common Lisp プロジェクトで、VS Code の Alive 拡張の Tab 補完を効かせるための原因と手順
tags: [blog, common-lisp, qlot, vscode]
date: 2026-06-30
draft: false
---

## TL;DR

- qlot は ASDF の source-registry を `:ignore-inherited-configuration` にするので、Alive が渡す `CL_SOURCE_REGISTRY` だけでは alive-lsp が見つからない。
- alive-lsp の依存を qlfile に足し、LSP の起動時に alive-lsp とプロジェクトの依存を明示的に読み込む init ファイルを使うと、Tab 補完が効くようになる。

## 背景

[[common-lisp|Common Lisp]] のプロジェクトで、qlot で依存を固定しつつ、[[visual-studio-code|Visual Studio Code]] の Alive 拡張（alive-lsp）で Tab 補完を使いたかった。

2026 年 6 月の時点で、qlot と Alive の組み合わせについて公式のドキュメントにまとまった説明はない。qlot の README は Emacs と SLIME 向けで、Alive と alive-lsp の README はグローバルの Quicklisp を前提にしている。[Common Lisp Cookbook の Using VSCode with Alive](https://lispcookbook.github.io/cl-cookbook/vscode-alive.html) にも qlot の記載はない。

`alive.lsp.startCommand` を `qlot exec ros run` にすると、次の症状が出た。

- Alive LSP の出力に `Component :ALIVE-LSP not found` が出る
- 起動できても、qlot で入れたライブラリ（croatoan など）が Tab 補完に出ない

## 環境

- Roswell（`ros`）
- qlot
- VS Code と Alive 拡張（alive-lsp は拡張がダウンロードし、`CL_SOURCE_REGISTRY` に渡す）

## 検証

### 原因

qlot は ASDF の source-registry を `:ignore-inherited-configuration` にするので、Alive が渡す `CL_SOURCE_REGISTRY` だけでは alive-lsp が見つからない。また、alive-lsp の依存（usocket など）は、qlot の環境に最初から入っていない。

`qlot install` は依存を `.qlot/` に置くだけで、Lisp のイメージには読み込まない。alive-lsp の補完は `list-all-packages` と `do-symbols` を使っているので、補完の対象になるのは quickload 済みのシンボルだけである。

### 1. qlfile に alive-lsp 用の依存を足す

アプリケーション本体の依存（croatoan など）とは別に、LSP を起動するための開発用の依存として追加する。

```sh
$ qlot add ql usocket
$ qlot add ql cl-json
$ qlot add ql flexi-streams
$ qlot add ql split-sequence
$ qlot install
```

アプリケーションと LSP の依存を合わせた qlfile は次のようになる。

```
ql croatoan
ql usocket
ql cl-json
ql flexi-streams
ql split-sequence
```

### 2. LSP を起動する init ファイルを置く

プロジェクト直下に `.vscode/alive-lsp-init.lisp` を置く。このファイルでは、`CL_SOURCE_REGISTRY` のパスを順に調べて `alive-lsp.asd` を `asdf:load-asd` で登録し、`(asdf:load-system :alive-lsp)` で読み込む。続けて、`(ql:quickload :<自分のパッケージ>)` でプロジェクトの依存を LSP のイメージに読み込み、`in-package` してから `(alive/server:start)` でサーバを起動する。

```lisp
(defun %alive/load-lsp-system ()
  (block find
    (let ((registry (uiop:getenv "CL_SOURCE_REGISTRY")))
      (when registry
        (loop with pos = 0
              while (< pos (length registry))
              for delim = (position #\: registry :start pos)
              for dir = (subseq registry pos (or delim (length registry)))
              do (when (plusp (length dir))
                   (let ((asd (merge-pathnames "alive-lsp.asd"
                                (uiop:parse-native-namestring
                                 (concatenate 'string dir "/")))))
                     (when (probe-file asd)
                       (asdf:load-asd asd)
                       (return-from find))))
                 (setf pos (if delim (1+ delim) (length registry))))))))

(%alive/load-lsp-system)
(asdf:load-system :alive-lsp)
(ql:quickload :<自分のパッケージ>)
(in-package :<自分のパッケージ>)
(alive/server:start)
```

`CL_SOURCE_REGISTRY` のパスは `:` で区切られている。ディレクトリの末尾に `/` を付けてから `merge-pathnames` しないと、階層がずれるので注意する。

### 3. .vscode/settings.json を書く

```json
{
  "alive.lsp.startCommand": [
    "qlot",
    "exec",
    "ros",
    "run",
    "--eval",
    "(require :asdf)",
    "--load",
    ".vscode/alive-lsp-init.lisp"
  ]
}
```

### 4. VS Code をリロードする

`Developer: Reload Window` を実行する。

## 結果

リロードすると、Output の Alive LSP に `Started on port ...` が出る。Lisp Image の Packages には、プロジェクトの依存のパッケージ名が並ぶ。

## 考察

REPL と LSP は別の SBCL のプロセスなので、REPL で quickload しても、エディタの補完には反映されない。

実行時（`qlot exec ros run ...`）には LSP 用の依存はいらないので、`tui-example.asd` の `:depends-on` は croatoan だけでよい。新しい依存を qlot で足したときは、`:depends-on` に入れておけば、次に LSP を起動したときの quickload で読み込まれる。

## キーワード

- [[common-lisp|Common Lisp]]
- qlot
- Alive
- [[visual-studio-code|Visual Studio Code]]
- Roswell
- Quicklisp
- [[language-server-protocol|Language Server Protocol]]

## 参考

- https://github.com/fukamachi/qlot
- https://github.com/nobody-famous/alive-lsp
- https://lispcookbook.github.io/cl-cookbook/vscode-alive.html
