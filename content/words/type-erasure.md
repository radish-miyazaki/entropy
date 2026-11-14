---
title: 型消去
aliases: []
description: コンパイル時に型の情報を取り除き、実行時のコードに型を残さないこと
tags: [word, 型システム]
date: 2026-11-14
---

## TL;DR

コンパイルするときに型の情報を取り除き、実行時のコードに型を残さないこと。[[typescript|TypeScript]] の型は、[[javascript|JavaScript]] に変換するときにすべて消える。

## なぜ必要か

TypeScript のハンドブックによると、型アノテーションは JavaScript（ECMAScript）の一部ではないので、TypeScript をそのまま実行できるブラウザやランタイムはない。TypeScript のコンパイラは、TypeScript 固有のコードを取り除いたり変換したりして、実行できる JavaScript にする。TypeScript 固有のコードの多くは消され、型アノテーションも完全に消える。

## 仕組み

`function greet(person: string, date: Date)` を `tsc` でコンパイルすると、出力は `function greet(person, date)` になり、引数の型アノテーションがなくなる。そのため、型アノテーションがプログラムの実行時の振る舞いを変えることはない。[[type-assertion|型アサーション]]も同じく消えるので、実行時のチェックは行われない。

## 例

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] によると、interface は型空間にしか存在せず、生成される JavaScript には残らないので、実行時に行われる `instanceof` のチェックには使えない。[TS Playground](https://www.typescriptlang.org/play/) で生成された JavaScript を見ると、型空間と値空間を見分ける直感を養える。

## 注意点

Effective TypeScript によると、生成されるコードは型に依存しないので、実行時に型をチェックすることも、型によって実行時の値や動作、パフォーマンスを変えることもできない。実行時に型で処理を分けたいなら、[[discriminated-union|タグ付きユニオン]]のように、型の情報を値として持たせる必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[transpile|トランスパイル]]
- [[type-annotation|型アノテーション]]
- [[type-assertion|型アサーション]]
- [[discriminated-union|判別共用体]]

## 出典

- [TypeScript: Documentation - The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html#erased-types)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目3 コード生成は型に依存しないことを理解する|Effective TypeScript 第2版 項目3]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目8 型空間のシンボルと値空間のシンボルの見分け方を知る|Effective TypeScript 第2版 項目8]]
