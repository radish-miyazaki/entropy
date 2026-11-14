---
title: 抽象構文木
aliases: [AST]
description: ソースコードなどのテキストの構文構造を、細部を省いて木で表したもの
tags: [word, コンパイラ]
date: 2026-11-14
---

## TL;DR

ソースコードなど、形式言語で書かれたテキストの構文構造を木で表したもの。Abstract Syntax Tree を略して AST とも呼ぶ。木の各ノードがテキスト中の構文要素を表す。

## なぜ必要か

コンパイラは AST を中間表現として複数の段階で使う。意味解析では AST を頻繁にたどり、コード生成でも AST を土台にする。プログラム解析やプログラム変換のツールも、AST を使ってコードの構造を扱う。文字列のままではなく構造として扱えるので、コードを安全に調べたり書き換えたりできる。

## 仕組み

「抽象」と呼ぶのは、元の構文の細部をすべては表さないという意味である。たとえば、グループ化のための括弧は木の形で表せるので、ノードにならない。if-then の構文は 3 つの枝を持つ 1 つのノードで表せる。細部まで残す具象構文木（パース木）とは、この点が異なる。

AST は多くの場合コンパイラの構文解析の段階で作られる。その後の文脈解析などで、AST に情報が書き足されていく。[[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側 第1章 ブラウザを知る──Webサイトを表示するアプリケーション|［作って学ぶ］ブラウザのしくみ 第1章]] によると、JavaScript エンジンも文字列をトークンに分け（[[lexical-analysis|字句解析]]）、AST を作ってから解釈する。

## 例

- [[rust|Rust]] のマクロは、トークン列や AST に対して動作する（[[Effective Rust 項目28 Rust におけるマクロ|Effective Rust 項目28]]）。
- [[eslint|ESLint]] のルールは、禁止したいコードの AST ノードを指定して書く。typescript-eslint の Playground で AST を確かめられる。
- [[go|Go]] の[[mutation-testing|ミューテーションテスト]]ツール [[gremlins|Gremlins]] は、文字列置換ではなく AST を書き換えて変異体を作る。
- [[elixir|Elixir]] のコードをコンパイルした beam ファイルから AST を取り出すと、[[erlang|Erlang]] のコードに変換して表示できる。
- [[ast-explorer|AST explorer]] では、さまざまなパーサが生成する AST を見られる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[lexical-analysis|字句解析]]
- [[ast-explorer|AST explorer]]
- [[apollo-server|Apollo Server]]: Resolver の実行順序を、クエリをパースした AST から決める

## 出典

- [Abstract syntax tree - Wikipedia](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
- [[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側 第1章 ブラウザを知る──Webサイトを表示するアプリケーション|［作って学ぶ］ブラウザのしくみ 第1章]]
- [[Effective Rust 項目28 Rust におけるマクロ|Effective Rust 項目28 Rust におけるマクロ]]
