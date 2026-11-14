---
title: オープン・クローズドの原則
aliases: []
description: ソフトウェアの構成要素は、拡張に対して開かれ、修正に対して閉じていなければならないという原則
tags: [word, 設計]
date: 2024-07-23
---

## TL;DR

「ソフトウェアの構成要素は、拡張に対して開かれていて、修正に対して閉じていなければならない」という原則。[[solid-principles|SOLID 原則]]の O にあたる。

## なぜ必要か

Wikipedia（日本語版）によると、既存のコードを書き換えずに振る舞いを広げられるので、稼働中のシステムでは、変更後のコードレビューや単体テストなどの品質検査を最小限に抑えられる。

## 仕組み

Bertrand Meyer が 1988 年の著書『Object-Oriented Software Construction』で提唱した。モジュールは、フィールドや関数を足して拡張できる間は「開いている」。安定したインタフェースを持ち、他のモジュールから使える状態になれば「閉じている」。

この原則には 2 つの解釈がある。Meyer の原則は、[[inheritance|継承]]で実装を拡張する考え方である。クラスはコンパイルして使えるので閉じているが、サブクラスを作れば拡張できるので開いている。もう 1 つは、Robert C. Martin が 1996 年の記事で示したポリモーフィックな原則である。変わらない[[interface|インタフェース]]を定め、それを実装するクラスを差し替えて振る舞いを足す。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[solid-principles|SOLID 原則]]

## 出典

- [Open–closed principle - Wikipedia](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)
- [開放/閉鎖原則 - Wikipedia](https://ja.wikipedia.org/wiki/開放/閉鎖原則)
