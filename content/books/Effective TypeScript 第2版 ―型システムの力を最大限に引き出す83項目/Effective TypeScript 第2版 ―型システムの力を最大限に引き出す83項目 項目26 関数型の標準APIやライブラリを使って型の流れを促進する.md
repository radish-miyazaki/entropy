---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目26 関数型の標準APIやライブラリを使って型の流れを促進する
description: ループの代わりに map や reduce などの関数型 API や Lodash を使うと、型情報が保たれて型アノテーションが減り、可読性も上がるという項目
tags: [book-chapter, typescript]
date: 2025-05-01
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 26
---

## TL;DR

- ループの代わりに、`map` や `reduce` といった関数型の標準 API や、[[lodash|Lodash]] のようなユーティリティライブラリを使う。
- 変換の過程で型情報が正しく保たれるので[[type-annotation|型アノテーション]]を減らせ、[[readability|可読性]]も上がる。

## 内容

ループで配列を組み立てると、途中の変数に型が付かず、型エラーになったり型アノテーションが必要になったりする。

```ts
let allPlayers = []
for (const players of Object.values(rosters)) {
  allPlayers = allPlayers.concat(players) // 型エラー
}
```

関数型の標準 API を使うと、変換の過程で型情報が正確に保たれる。型アノテーションを書かなくて済み、コードも読みやすくなる。

```ts
const allPlayers = Object.values(rosters).flat()
```

## キーワード

- [[typescript|TypeScript]]
- [[lodash|Lodash]]
- [[type-annotation|型アノテーション]]
- [[readability|可読性]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
