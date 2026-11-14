---
title: difftastic
aliases: [difftastaic]
description: 行単位ではなく構文を解析してファイルを比較する、CLI の diff ツール
tags: [word, cli, git]
date: 2023-12-29
---

## TL;DR

行単位ではなく、構文を解析してファイルを比較する CLI の diff ツール。人間が読みやすい差分を出すことを目指している。

## 仕組み

difftastic は、パーサのフレームワークである tree-sitter でコードを構文解析する。そのため、周りの行が変わっても、中の式が変わっていないことを見分けられる。フォーマットだけの変更は無視し、両方のファイルの実際の行番号を表示する。

## 例

`git diff` でも使える。環境変数 `GIT_EXTERNAL_DIFF` に difftastic のコマンド `difft` を指定すると、Git が外部の diff ツールとして呼び出す。

```shell
export GIT_EXTERNAL_DIFF=/opt/homebrew/bin/difft
```

公式マニュアルでは、`diff.external` の設定を使う方法も紹介されている。一度だけ使うならコマンドラインで指定し、常に使うなら `~/.gitconfig` に書く。

```shell
git -c diff.external=difft diff
```

```ini
[diff]
    external = difft
```

この設定をすると `git diff` は difftastic を使う。`git show` と `git log -p` では `--ext-diff` を付ける必要がある。

## 注意点

公式マニュアルによると、Git v2.43.1 以前では、外部の diff ツールを使っていてファイルのパーミッションが変わっていると、Git がクラッシュすることがある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Difftastic](https://difftastic.wilfred.me.uk/)
- [Git - Difftastic Manual](https://difftastic.wilfred.me.uk/git.html)
- [difftastic - Homebrew Formulae](https://formulae.brew.sh/formula/difftastic)
- [key3 さんのポスト](https://x.com/key3/status/1740620321764622401)
