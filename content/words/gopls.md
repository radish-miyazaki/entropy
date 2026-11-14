---
title: gopls
aliases: []
description: Go チームが開発する Go の公式の言語サーバ
tags: [word, go, エディタ]
date: 2026-11-14
---

## TL;DR

Go チームが開発する、[[go|Go]] の公式の言語サーバ。「Go please」と読む。Language Server Protocol（LSP）に対応したエディタに、補完や定義ジャンプなどの IDE の機能を提供する。

## なぜ必要か

エディタごとに Go の補完や診断を実装しなくても、LSP に対応したエディタなら gopls を通して同じ機能を使える。対応しているエディタには、VS Code、Vim / Neovim、Emacs、Helix、Sublime Text、Zed などがある。

## 仕組み

エディタが gopls を起動して LSP でやり取りする。普段は gopls を直接操作する必要はなく、エディタが自動で連携する。ナビゲーション、補完、診断、解析、リファクタリングといった LSP の標準的な機能に加え、ほかの言語サーバにはない機能もある。

VS Code のように gopls のインストールと更新をエディタが行うものもある。自分で入れるときは `go install golang.org/x/tools/gopls@latest` を実行する。更新したあとは、動いている gopls のプロセスを再起動する必要がある。

## 例

- [[サプライチェーン攻撃に学ぶmoduleの仕組みとセキュリティ対策]] では、依存パッケージの名前は補完に任せ、gopls の matcher を `CaseSensitive` にすることが勧められている。
- 実験的なパッケージを補完させるには、gopls に環境変数 `GOEXPERIMENT` を渡す（[[go-experimental-package-completion|Go の Experimental パッケージの補完を有効にする]]）。

## 注意点

使える機能や設定はエディタによって異なる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[go|Go]]

## 出典

- [Gopls: The language server for Go](https://go.dev/gopls/)
