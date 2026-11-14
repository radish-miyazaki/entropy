---
title: wac
aliases: [WebAssembly Compositions]
description: WebAssembly Component どうしを合成し、新しい Component を作るための CLI とクレート
tags: [word, rust, webassembly]
date: 2024-10-22
---

## TL;DR

WebAssembly Compositions の略。[[webassembly-component|WebAssembly Component]] どうしを合成し、新しい Component を作るための CLI ツールとクレート。

## 仕組み

[[cargo|Cargo]] でインストールする。

```sh
$ cargo install wac-cli
```

主なサブコマンドは次のとおり。

```sh
$ wac help
Tool for working with WebAssembly compositions

Usage: wac <COMMAND>

Commands:
  plug     Plugs the exports of any number of 'plug' components into the imports of a 'socket' component
  compose  Compose WebAssembly components using the provided WAC source file
  parse    Parses a WAC source file into a JSON AST representation
  resolve  Resolves a WAC source file into a DOT representation
  targets  Verifies that a given WebAssembly component targets a world
  help     Print this message or the help of the given subcommand(s)
```

`plug` は、いくつかの Component（plug）が export するものを、別の Component（socket）の import に差し込む。`compose` は、WAC のソースファイルに書いた構成に従って Component を合成する。

## 例

- [[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで 第5章 依存関係の解決と合成]]
- [[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで 第6章 コマンドラインインターフェースアプリケーションの作成]]

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[webassembly-component-model|WebAssembly Component Model]]
- [[wit|WIT]]
- [[cargo-component]]
- [[wasm-tools]]

## 出典

- [bytecodealliance/wac](https://github.com/bytecodealliance/wac)
