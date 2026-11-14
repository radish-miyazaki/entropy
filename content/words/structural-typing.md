---
title: 構造的型付け
aliases: []
description: 型の名前ではなく、型が持つメンバーの構造で互換性を判断する型システムの考え方
tags: [word, 型システム, typescript]
date: 2026-11-14
---

## TL;DR

型の名前ではなく、型が持つメンバー（構造）で型どうしの互換性を判断する考え方。型の名前で判断する[[nominal-typing|名前的型付け]]と対になる。[[typescript|TypeScript]] が採用している。

## なぜ必要か

[TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/type-compatibility.html) によると、TypeScript は [[javascript|JavaScript]] の書き方に合わせて設計されている。JavaScript では無名のオブジェクトや関数式を多く使うので、構造で関係を判断するほうが自然である。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目4 構造的型付けに慣れる|Effective TypeScript 項目4]] では、TypeScript が構造的型付けで JavaScript の[[duck-typing|ダックタイピング]]をモデリングしていると説明している。

## 仕組み

TypeScript Handbook の基本ルールでは、`y` が少なくとも `x` と同じメンバーを持っていれば、`x` は `y` と互換性がある。

## 例

```ts
interface Pet {
  name: string
}
class Dog {
  name: string
}
let pet: Pet = new Dog() // Dog は Pet を実装すると宣言していないが、代入できる
```

## 注意点

Effective TypeScript 項目4 によると、構造的型付けでは、値が型宣言にないプロパティを持っている可能性がある。TypeScript では宣言したプロパティだけを持つ「閉じた型」を表現できないので、オブジェクトのプロパティを反復処理するときに予期しない挙動になりやすい。名前で型を区別したいときは [[branded-types|Branded Types]] を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nominal-typing|名前的型付け]]
- [[duck-typing|ダックタイピング]]
- [[subtyping|サブタイプ]]
- [[branded-types|Branded Types]]

## 出典

- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目4 構造的型付けに慣れる|Effective TypeScript 項目4 構造的型付けに慣れる]]
- [Type Compatibility - TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)
