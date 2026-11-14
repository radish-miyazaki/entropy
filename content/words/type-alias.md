---
title: 型エイリアス
aliases: []
description: 既存の型に別の名前を付けること。新しい型は作らない
tags: [word, 型システム]
date: 2026-11-14
---

## TL;DR

既存の型に別の名前を付けること。別名を付けるだけで、元の型と区別される新しい型は作らない。

## なぜ必要か

F# のドキュメントによると、型エイリアス（F# では type abbreviation）を使うと、型に意味のある名前を付けてコードを読みやすくできる。書くのが面倒な長い型にも短い名前を付けられる。元になる型を変えたくなったときも、使っている側のコードを書き換えずに済む。

[[Domain Modeling Made Functional]] では、すべてのエフェクトをそのまま書いた関数の型は読みにくいので、型エイリアスでまとめるとよいとしている。

## 仕組み

[[typescript|TypeScript]] では `type 名前 = 型` と書く。オブジェクトの型だけでなく、`type ID = number | string` のようにユニオン型などどんな型にも名前を付けられる。[[fsharp|F#]] では `type SizeType = uint32` と書き、`type Transform<'a> = 'a -> 'a` のように型パラメータも取れる。

## 例

```ts
type Point = {
  x: number
  y: number
}
```

## 注意点

型エイリアスはあくまで別名なので、同じ型の「別のバージョン」は作れない。TypeScript のハンドブックの例では、`type UserInputSanitizedString = string` と定義しても、その変数にはただの `string` を代入できる。値を取り違えないように区別したいなら、F# の単純型（ケースが 1 つだけの[[discriminated-union|判別共用体]]）や[[newtype-pattern|newtype パターン]]、[[branded-types|ブランド型]]を使う。Domain Modeling Made Functional によると、型エイリアスにはオーバーヘッドがない代わりに、型の安全性は下がる。

TypeScript の `interface` との違いは、後から宣言を開き直してプロパティを足せない点である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[newtype-pattern|newtype パターン]]
- [[branded-types|ブランド型]]
- [[declaration-merging|宣言のマージ]]
- [[type-annotation|型アノテーション]]

## 出典

- [TypeScript: Documentation - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
- [Type Abbreviations - F# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/type-abbreviations)
- [[Domain Modeling Made Functional 第5章 単純な値のモデリング|Domain Modeling Made Functional 第5章 単純な値のモデリング]]
