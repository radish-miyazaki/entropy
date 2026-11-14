---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目15 型演算とジェネリック型を使って重複を避ける
description: DRY は型にも当てはまるとして、型の命名、extends、keyof、マップ型、ユーティリティ型などで型の重複を減らす方法を説く項目
tags: [book-chapter, typescript]
date: 2025-04-29
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 15
---

## TL;DR

- [[dry|DRY]] は型にも当てはまる。型に名前を付け、`extends`、`keyof`、[[mapped-type|マップ型]]、[[utility-types|ユーティリティ型]]などを使って重複を減らす。
- ただしやりすぎに注意し、共通化するものが本当に共通かを確かめる。

## 内容

### 型と DRY

DRY は型にも当てはまる。ただし、やりすぎには注意する（[[dry-shuhari|DRY の守破離]]、「重複は間違った抽象化よりはるかに無害である」）。プロパティや型を共有するときは、それらが本当に共通のものかを確かめる。次の例は、`Product` と `Customer` がたまたま `id` と `name` を持っているだけで、共通化する意味がない。

```ts
// ダメな例
interface NameAndIdentified {
  id: number
  name: string
}
interface Product extends NameAndIdentified {
  priceDollars: number
}
interface Customer extends NameAndIdentified {
  address: string
}
```

著者の経験則では、共通化した型に名前を付けにくいときは、共通化に意味がないことが多い。

### 型の重複を避ける方法

同じ型を繰り返し書く代わりに、その型に名前を付ける。interface 間でフィールドが重複するなら、`extends` を使う。同じ型レベルの演算を繰り返すなら、ジェネリック型を使って型をマッピングする（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目50 ジェネリックを型に対する関数と考える|項目50]]）。

### 型をマッピングする TypeScript の機能

`keyof` は型のキーのユニオンを返す（`type OptionKeys = keyof Options`）。`typeof` は値から型を作る（`type Options = typeof INIT_OPTIONS`）。ただし `typeof` を使うのは、Single Source of Truth として使いたい値があるときだけにする。通常は先に型を定義し、値がその型に代入できることを宣言したほうがよい。型が明示的になり、予期しない型の拡大（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目20 変数の型がどのように決まるか理解する|項目20]]）も起きにくくなる。

インデックスアクセス型を使うと、型の一部を取り出せる（`type ActionType = Action['type']`）。マップ型を使うと、既存の型のキーから新しい型を作れる。

```ts
type OptionsUpdate = { [k in keyof Options]?: Options[k] }
```

マップ型で `as` を使うと、キーの名前を変えられる。これはテンプレートリテラル型と組み合わせると便利である（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目54 テンプレートリテラル型を使ってDSLや文字列間の関係をモデリングする|項目54]]）。

```ts
type LongToShort = { [k in keyof ShortToLong as ShortToLong[k]]: k }
```

### 準同型なマップ型

インデックスの部分で `K in keyof T` を使うマップ型を、準同型（homomorphic）なマップ型と呼ぶ。準同型なマップ型では、`readonly` や `?` などの修飾子や [[tsdoc|TSDoc]] のコメントが新しい型に引き継がれる。

```ts
interface Customer {
  title?: string
  readonly name: string
}

type PickName = Pick<Customer, "name"> // { readonly name: string; }
type ManualName = { [K in "name"]: Customer[K] } // { name: string; }
```

### 型の再利用に役立つユーティリティ型

- `Pick<T, Keys>`: 型 `T` から、`Keys` で指定したキーだけを持つ型を返す
- `Partial<T>`: 型 `T` のすべてのプロパティをオプションにした型を返す
- `ReturnType<T>`: 関数型 `T` の戻り値の型を返す

## キーワード

- [[dry|DRY]]
- [[dry-shuhari|DRY の守破離]]
- [[mapped-type|マップ型]]
- [[utility-types|ユーティリティ型]]
- [[generics|ジェネリクス]]
- [[tsdoc|TSDoc]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
