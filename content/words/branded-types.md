---
title: Branded Types
aliases: [Branded Type, ブランド型]
description: 構造が同じ型に目印（ブランド）を付けて区別し、TypeScript で名前的型付けを実現する手法
tags: [word, typescript, 型システム]
date: 2026-11-14
---

## TL;DR

構造が同じ型に、目印（ブランド）となるプロパティを交差型で付け足して区別する手法。構造的型付けの [[typescript|TypeScript]] で、名前的型付けを実現するために使う。

## なぜ必要か

TypeScript のハンドブックによると、TypeScript の型の互換性は構造的部分型に基づいており、型のメンバーだけで型どうしの関係を決める。そのため、ユーザ ID と商品 ID のように意味は違うが構造は同じ `string` を、型だけでは区別できない。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目64 名前的型付けのためにブランドを使うことを検討する|Effective TypeScript 項目64]] によると、Branded Types を使えば、こうした型を区別して定義できる。また「ソート済みである」のような、型システムだけでは表現できない性質も表せる。

## 仕組み

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目64 名前的型付けのためにブランドを使うことを検討する|Effective TypeScript 項目64]] では、実装の方法として、オブジェクト型のプロパティ、プライベートフィールド、文字列の enum、`unique symbol` 型の 4 つを挙げている。`unique symbol` を使う方法では、ブランドのシンボルを `export` しないので、ブランド付きの値を得るには型アサーションか補助関数を通す必要がある。

## 例

```ts
declare const brand: unique symbol
export type UserID = number & { [brand]: "user_id" }
```

## 注意点

ブランドのキーを 1 つにする実装では、ブランドをネストした型が `never` になる。キーが同じなので、ブランドの値が 2 つの文字列を同時に満たさなければならず、そのような値は存在しない。[[nested-branded-types|Branded types をネストさせたい]] では、ブランドのキーを型ごとに分けてこれを避けている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[opaque-types|Opaque Types]]
- [[newtype-pattern|Newtype パターン]]
- [[bottom-type|ボトム型]]

## 出典

- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目64 名前的型付けのためにブランドを使うことを検討する|Effective TypeScript 第2版 項目64 名前的型付けのためにブランドを使うことを検討する]]
- [TypeScript: Documentation - Type Compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)
- [[nested-branded-types|Branded types をネストさせたい]]
