---
title: 選択型
aliases: [判別共用体, タグ付きユニオン, tagged union]
description: 名前の付いた複数のケースのうち、どれか 1 つの値を取る型
tags: [word, 型システム, fsharp, typescript]
date: 2026-11-14
---

## TL;DR

名前の付いた複数のケースのうち、どれか 1 つの値を取る型。[[Domain Modeling Made Functional]] では選択型（OR 型）と呼び、[[fsharp|F#]] では判別共用体、[[typescript|TypeScript]] ではタグ付きユニオンなどと呼ぶ。直和型とも呼ばれる。

## なぜ必要か

F# の公式ドキュメントによると、判別共用体は、ケースごとに形の違うデータ、正常と異常のように特別なケースを持つデータ、小さなクラス階層の代わりなどに向く。再帰的に定義すれば木構造も表せる。

[[Domain Modeling Made Functional]] の第 10 章では、[[domain-error|ドメインエラー]]を選択型で表す理由を 3 つ挙げている。起こりうるエラーをコードの中で明示的に文書化できること、エラーの追加情報も示せること、要件の変化に合わせて型を安全に広げたり狭めたりできることである。コンパイラがパターンマッチの網羅性を確かめるので、ケースを足すと対応していない箇所が分かる。

## 仕組み

F# では、`|` で区切ってケースを並べ、各ケースに名前（ケース識別子）と、必要なら値の型を付ける。ケース識別子はコンストラクタとしても、パターンマッチでも使う。ケースが 1 つだけの選択型は、プリミティブな値を包む型を作るのに使える。[[Domain Modeling Made Functional]] の第 4 章では、レコード型（AND 型）と選択型（OR 型）を組み合わせて型を作る仕組みを[[algebraic-type-system|代数的な型システム]]と呼んでいる。

TypeScript の公式ドキュメントによると、ユニオンのすべての型がリテラル型の共通のプロパティを持つとき、TypeScript はそれを判別可能なユニオンとみなし、そのプロパティ（判別子）を調べるとユニオンの型を絞り込める。

## 例

```fsharp
type Shape =
    | Circle of radius: float
    | Rectangle of width: float * length: float

let area shape =
    match shape with
    | Circle r -> 3.14 * r * r
    | Rectangle(w, l) -> w * l
```

```ts
type Shape = { kind: "circle"; radius: number } | { kind: "square"; sideLength: number }

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2
    case "square":
      return shape.sideLength ** 2
    default:
      const _exhaustiveCheck: never = shape
      return _exhaustiveCheck
  }
}
```

TypeScript では、`default` で `never` に代入しておくと、ケースを足したときに対応漏れがコンパイルエラーになる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[algebraic-data-type|代数的データ型]]
- [[algebraic-type-system|代数的な型システム]]
- [[domain-error|ドメインエラー]]

## 出典

- [Discriminated Unions - F# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/discriminated-unions)
- [TypeScript: Documentation - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [[Domain Modeling Made Functional 第4章 型の合成|Domain Modeling Made Functional 第4章 型の合成]]
- [[Domain Modeling Made Functional 第10章 ドメインエラーを扱う|Domain Modeling Made Functional 第10章 ドメインエラーを扱う]]
