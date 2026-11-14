---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目8 型空間のシンボルと値空間のシンボルの見分け方を知る
description: TypeScript のシンボルは型空間と値空間のどちらかにあり、typeof や extends のように空間によって意味が変わる構文もあると説く項目
tags: [book-chapter, typescript]
date: 2025-04-26
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 8
---

## TL;DR

- [[typescript|TypeScript]] のシンボルは、型空間と値空間のどちらかに属する。型空間のコードは JavaScript に変換すると消える。
- `class` や `enum` のように両方の空間に導入される構文や、`typeof` のように空間によって意味が変わる構文がある。

## 内容

### 型空間と値空間

型空間のコードは [[javascript|JavaScript]] のコードには残らないので（[[type-erasure|型消去]]）、[TS Playground](https://www.typescriptlang.org/play/) で生成される JavaScript を確認すると、型空間と値空間を見分ける直感を養える。

すべての値には静的な型があるが、型には型空間からしかアクセスできない。`type` や `interface` のような型空間の構文は、変換時に消える。

一方、`class` や `enum` のように、型と値の両方を導入する構文もある（`enum` はなるべく使わない：[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目72 TypeScriptの独自機能の使用を避け、ECMAScriptの機能を使う|項目72]]）。次の例では、`Cylinder` を値として `instanceof` に使い、その結果 `shape` の型が `Cylinder` に絞り込まれる。

```ts
class Cylinder {
  radius: number
  height: number

  constructor(radius: number, height: number) {
    this.radius = radius
    this.height = height
  }
}

function calcVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    shape // shape: Cylinder
    shape.radius // shape.radius: number
  }
}
```

### 空間によって意味が変わる構文

次の構文は、型空間と値空間で意味が変わる。

| 構文      | 値空間                                                           | 型空間                                                                  |
| --------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `typeof`  | 実行時の型を表す文字列を返す                                     | 値を受け取り、TypeScript の型を返す                                     |
| `[]`      | `obj['field']` と `obj.field` のどちらでもプロパティを参照できる | `Person['first']` のようにブラケット記法を使い、中に型を入れる          |
| `this`    | JavaScript の `this`                                             | メソッドの戻り値で自身を指す `this` 型                                  |
| `&`、`\|` | ビット AND とビット OR                                           | [[intersection-type\|インターセクション型]]と[[union-type\|ユニオン型]] |
| `const`   | 新しい変数を宣言する                                             | `as const` で、リテラルやリテラル式の推論される型を変える               |
| `extends` | サブクラスを定義する                                             | サブタイプやジェネリック型の制約を定義する                              |
| `in`      | `for (key in object)` のループ                                   | [[mapped-type\|マップ型]]                                               |
| `!`       | 論理 NOT 演算子                                                  | [[non-null-assertion\|非 null アサーション]]                            |

値空間の `typeof` が返すのは、`'string'`、`'number'`、`'boolean'`、`'undefined'`、`'object'`、`'function'`、`'symbol'`、`'bigint'` のどれかで、TypeScript の型とは異なる。

型空間の `[]` には型を入れるので、ユニオン型や `number` も使える。

```ts
const first: Person["first"] = jane["first"]

type PersonEl = Person["first" | "last"]

type Tuple = [string, number, Date]
type TupleEl = Tuple[number]
```

値空間の `this` については[[javascript-this|JavaScript の this]]（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目69 コールバックのthisがAPIの一部なら、それに型を与える|項目69]]）を参照する。型空間の `this` 型（polymorphic this type）は、サブクラスでメソッドチェーンを実装するときに便利である。そのほか、`as const` は[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目20 変数の型がどのように決まるか理解する|項目20]]、マップ型は[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目15 型演算とジェネリック型を使って重複を避ける|項目15]]、非 null アサーションは[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目9 型アノテーションを型アサーションより優先的に使用する|項目9]]で扱う。

## キーワード

- [[type-erasure|型消去]]
- [[javascript-this|JavaScript の this]]
- [[intersection-type|インターセクション型]]
- [[union-type|ユニオン型]]
- [[mapped-type|マップ型]]
- [[non-null-assertion|非 null アサーション]]
- [[subtyping|サブタイプ]]
- [[generics|ジェネリクス]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
