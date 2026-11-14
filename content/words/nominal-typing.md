---
title: 名前的型付け
aliases: []
description: 型の名前や明示的な宣言で、型の互換性を決める方式
tags: [word, 型システム, typescript]
date: 2026-11-14
---

## TL;DR

型の名前や明示的な宣言で、型の互換性を決める方式。構造が同じでも、宣言が別の型を名指ししていれば互換にならない。構造的型付けとは逆の考え方である。

## なぜ必要か

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目64 名前的型付けのためにブランドを使うことを検討する|Effective TypeScript 項目64]] によると、名前的型付けを使うと、意味は違うが構造は同じ型を区別できる。たとえばユーザ ID とただの文字列を、別の型として扱える。

## 仕組み

Wikipedia によると、名前的な型システムでは、2 つの変数の宣言が同じ型の名前を使うときだけ互換になる。部分型の関係も、定義の中で明示的に宣言したときだけ成り立つ。たまたま構造が互換でも、宣言がなければ部分型にならない。C++、C#、[[java|Java]]、[[kotlin|Kotlin]]、[[rust|Rust]] などは、主に名前的な型付けと部分型を使う。

[[typescript|TypeScript]] の公式ハンドブックによると、TypeScript の型の互換性は構造的な部分型に基づく。次のコードで `Dog` は `Pet` を実装すると宣言していないが、メンバが合うので代入できる。C# や Java のような名前的型付けの言語では、同じコードはエラーになる。

```ts
interface Pet {
  name: string
}

class Dog {
  name: string
}

let pet: Pet
pet = new Dog() // 構造的型付けなので OK
```

## 例

TypeScript で名前的型付けを実現するには、[[branded-types|Branded Types]] を使う。

```ts
type UserID = string & { _brand: "user_id" }
```

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目72 TypeScriptの独自機能の使用を避け、ECMAScriptの機能を使う|項目72]] によると、文字列の enum も名前的に型付けされる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[branded-types|Branded Types]]
- [[duck-typing|ダックタイピング]]

## 出典

- [Nominal type system - Wikipedia](https://en.wikipedia.org/wiki/Nominal_type_system)
- [Type Compatibility - TypeScript](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]
