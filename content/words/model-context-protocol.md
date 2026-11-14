---
title: Model Context Protocol
aliases: [MCP]
description: AI アプリケーションを外部のデータソースやツールにつなぐためのオープンな標準プロトコル
tags: [word, ai]
date: 2025-03-17
---

## TL;DR

[[large-language-model|LLM]] を使う AI アプリケーションを、外部のデータソースやツールにつなぐためのオープンな標準。MCP と略す。公式ドキュメントは「AI アプリケーションのための USB-C ポート」にたとえている。

## なぜ必要か

MCP を使うと、AI アプリケーションにコンテキストを渡せる。ファイルやデータベースといったデータソース、検索エンジンのようなツール、定型のプロンプトなどにつなぐ方法が標準化されるので、一度作ったサーバを多くのクライアントで使える。

## 仕組み

MCP はクライアントとサーバの構成をとる。

- **MCP ホスト**: Claude Desktop や Claude Code のような AI アプリケーション。1 つ以上の MCP クライアントを管理する
- **MCP クライアント**: MCP サーバとの接続を保ち、ホストが使うコンテキストをサーバから受け取る。LLM 自身ではない
- **MCP サーバ**: クライアントにコンテキストを提供するプログラム

ホストは、接続する MCP サーバごとに MCP クライアントを 1 つ作る。クライアントとサーバの間は JSON-RPC 2.0 でやりとりする。通信路には、同じマシン上のプロセス間で使う stdio と、リモートのサーバと通信する Streamable HTTP がある。

サーバは主に、AI アプリケーションが呼び出して処理を行う Tools、文脈となるデータを渡す Resources、対話の型となる Prompts を公開する。

## 例

MCP クライアントには Claude Desktop、Cline、[[zed|Zed]]、[[visual-studio-code|Visual Studio Code]] などがある（[クライアントの一覧](https://modelcontextprotocol.io/clients)）。

## 自分の理解

LangChain の Agent で使える tools の共通プロトコル、というイメージで捉えている。Function calling との違いは、[こちらの記事](https://qiita.com/7shi/items/e27866ce51c6b9a0f605)が参考になる。

[[language-server-protocol|LSP]] に似ていると思う。LSP ではサーバに対して [[visual-studio-code|Visual Studio Code]] や Emacs がクライアントになるように、MCP ではサーバに対して Claude Desktop などがクライアントになる。

## 関連

- [[language-server-protocol|LSP]]
- [[mastra|Mastra]]
- [[large-language-model|LLM]]

## 出典

- [What is the Model Context Protocol (MCP)?](https://modelcontextprotocol.io/introduction)
- [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture)
- [For Server Developers](https://modelcontextprotocol.io/quickstart/server)
- [MCP（takumines）](https://scrapbox.io/takumines/MCP)
- [Model Context Protocol (MCP)（mrsekut-p）](<https://scrapbox.io/mrsekut-p/Model_Context_Protocol_(MCP)>)
- https://zenn.dev/yamada_quantum/articles/465c4993465053
- https://zenn.dev/tomo0108/articles/6b472b4c9cacfa
