---
title: OCaml で Dream の雛形を作成するまで
description: opam のローカルスイッチと dune を使い、OCaml の Web フレームワーク Dream のプロジェクトの雛形を作る
tags: [blog, ocaml]
date: 2024-07-12
draft: false
---

## TL;DR

- opam でローカルスイッチを作り、dune でプロジェクトを作成して、Dream のプロジェクトの雛形を作った。
- 依存パッケージは dune-project に書き、`dune build` で opam ファイルを生成してから `opam install . --deps-only` で入れる。

## 背景

Dream は、[[ocaml|OCaml]] で一番メジャーな Web フレームワークのようである。OCaml の公式ドキュメントの Web フレームワークの一覧でも、一番上に載っている。Dream のサイトには、次のようなコードが載っている。

```ocaml
let hello who =
  <html>
  <body>
    <h1>Hello, <%s who %>!</h1>
  </body>
  </html>

let () =
  Dream.run
  @@ Dream.logger
  @@ Dream.router [
    Dream.get "/" (fun _ ->
      Dream.html (hello "world"));
  ]
```

`@@` は左向きのパイプ演算子である。

## 環境

- opam はグローバルにインストール済み

## 検証

1. `mkdir` で空のディレクトリを作る
2. `cd` で移動し、`opam switch create` でローカルスイッチを作る。[[python|Python]] の virtualenv をイメージすると分かりやすい
3. `eval $(opam env)` を実行する
4. `opam install dune` で dune をローカルに入れる
5. `dune init proj .` でプロジェクトを作る
6. dune-project の `depends` を書き換え、dream や utop など、開発に必要なパッケージを追加する
7. `dune build` を実行し、opam ファイルを生成する
8. `opam install . --deps-only` で依存パッケージをインストールする

6 で書き換えた dune-project は次のとおり。

```lisp
(package
 (name dream_tutorial)
 (synopsis "A short synopsis")
 (description "A longer description")
 (depends ocaml dune dream ocamlformat utop ocaml-lsp-server)
 (tags
  (topics "to describe" your project)))
```

## 考察

OCaml は始めたばかりなので、この手順が正しいかは自信がない。dune の立ち位置もまだよく分かっていない。

別のパッケージを追加するときも、6〜8 の手順が必要なのかは分かっていない。面倒なので直接 `opam install` したいが、それでは opam ファイルや dune-project に反映されないようなので、この手順を踏むしかなさそうである。

`@@` は、[[fsharp|F#]] のように `<|` だと良かった。

## キーワード

- [[ocaml|OCaml]]
- Dream
- opam
- dune
- virtualenv

## 参考

- [Is OCaml Web Yet? - Web Frameworks](https://ocaml.org/docs/is-ocaml-web-yet#web-frameworks)
- [Dream](https://aantron.github.io/dream/)
- https://zenn.dev/hoddy3190/articles/4b7347ecd7ba59
