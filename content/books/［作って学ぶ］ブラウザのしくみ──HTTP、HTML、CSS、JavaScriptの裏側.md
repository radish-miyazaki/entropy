---
title: ［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側
aliases: [作って学ぶブラウザのしくみ]
description: シンプルなブラウザを Rust で実装しながら、Web サイトを開くまでにブラウザの中で何が起きているのかを学ぶ本
tags: [book, web-ブラウザ, rust]
date: 2024-11-01
book-authors: []
publisher: 技術評論社
isbn: 9784297145460
---

## TL;DR

- 近年の[[web-browser|ブラウザ]]は高機能かつ巨大で、仕組みを詳しく理解するのが難しい。本書はシンプルなブラウザを [[rust|Rust]] で実装し、Web サイトを開くまでに何が起きているのかを理解することを目的とする。
- 作ったブラウザは、別冊で解説している自作 OS の上で動かす。

## 目次

1. [[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側 第1章 ブラウザを知る──Webサイトを表示するアプリケーション|第1章 ブラウザを知る──Webサイトを表示するアプリケーション]]
2. [[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側 第2章 URLを分解する──リソースを指定する住所|第2章 URLを分解する──リソースを指定する住所]]
3. [[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側 第3章 HTTPを実装する──ネットワーク通信を支える約束事|第3章 HTTPを実装する──ネットワーク通信を支える約束事]]
4. [[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側 第4章 HTMLを解析する──HTMLからDOMツリーへの変換|第4章 HTMLを解析する──HTMLからDOMツリーへの変換]]
5. 第5章 CSSで装飾する──CSSOMとレイアウトツリーの構築
6. 第6章 GUIを実装する──ユーザーとのやりとり
7. 第7章 JavaScriptを動かす──ページの動的な変更

%%

## 感想

全体を通しての評価や気づき。書くときはこのコメントを外す
%%

## 関連

- [[web-browser|ブラウザ]]
- [[rust|Rust]]
- [技術評論社の書籍ページ](https://gihyo.jp/book/2024/978-4-297-14546-0)
- [d0iasm/sababook](https://github.com/d0iasm/sababook)（本書のブラウザのソースコード）
- [hikalium/wasabi](https://github.com/hikalium/wasabi)（ブラウザを動かす OS）
