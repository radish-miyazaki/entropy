---
title: Language Server Protocol
aliases: [LSP]
description: エディタなどの開発ツールと、言語ごとの言語サーバとの通信を標準化するプロトコル
tags: [word, エディタ, プロトコル]
date: 2026-11-14
---

## TL;DR

エディタや IDE などの開発ツールと、プログラミング言語ごとの言語サーバとの通信を標準化するプロトコル。LSP と略す。1 つの言語サーバを、多くのツールで使い回せる。

## なぜ必要か

自動補完、定義へのジャンプ、ホバーでのドキュメント表示などを言語ごとに実装するのは手間がかかる。共通のプロトコルがなければ、この作業をツールごとに繰り返さなければならない。LSP があれば、言語ごとに 1 つのサーバを用意し、ツールはプロトコルに対応するだけで済む。

## 仕組み

言語サーバは別のプロセスとして動き、ツールとは JSON-RPC でメッセージをやり取りする。ファイルを開くとツールは `textDocument/didOpen` を送り、編集のたびに `textDocument/didChange` を送る。サーバは変更を解析し、エラーや警告を `textDocument/publishDiagnostics` で返す。定義へのジャンプでは、ツールがドキュメントの URI とカーソル位置を `textDocument/definition` で送り、サーバが定義の URI と位置を返す。

メッセージは構文木やコンパイラのシンボルではなく、URI や位置のような言語に依存しない型を使うので、プロトコルが単純に保たれる。

## 注意点

すべてのサーバがすべての機能に対応するわけではない。ツールとサーバは、対応する機能を capability として互いに伝える。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[model-context-protocol|Model Context Protocol]]
- [[language-service|言語サービス]]
- [[visual-studio-code|Visual Studio Code]]
- [[lem|Lem]]
- [[serena|Serena]]

## 出典

- [Language Server Protocol Overview](https://microsoft.github.io/language-server-protocol/overviews/lsp/overview/)
