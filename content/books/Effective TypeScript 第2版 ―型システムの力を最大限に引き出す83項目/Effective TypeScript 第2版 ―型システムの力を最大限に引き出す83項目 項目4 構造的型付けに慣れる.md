---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目4 構造的型付けに慣れる
description: TypeScript は構造的型付けで JavaScript のダックタイピングをモデリングしており、値は型宣言にないプロパティを持ちうると説く項目
tags: [book-chapter, typescript]
date: 2025-04-18
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 4
---

## TL;DR

- [[typescript|TypeScript]] は[[structural-typing|構造的型付け]]で、[[javascript|JavaScript]] の[[duck-typing|ダックタイピング]]をモデリングしている。
- 構造的型付けでは、値は型宣言に書かれていないプロパティを持っている可能性がある。

## 内容

### 構造で型を判断する

JavaScript はダックタイピングを前提とした言語であり、TypeScript は構造的型付けでこれをモデリングしている。構造的型付けでは、型の名前ではなく、型の「構造」が一致するかで代入できるかを判断する。次の例では、`NamedVector` は `Vector2D` の `x` と `y` を持っているので、`calcLen` に渡しても型エラーにならない。

```ts
interface Vector2D {
  x: number
  y: number
}
interface NamedVector {
  name: string
  x: number
  y: number
}

const calcLen = (v: Vector2D) => Math.sqrt(v.x ** 2 + v.y ** 2)

const v: NamedVector = { x: 3, y: 4, name: "Pythagoras" }
calcLen(v) // 型エラーにならない
```

### 型は「開いている」

構造的型付けでは、関数の引数などの値は、型宣言に書かれていないプロパティを持っている可能性がある。関数を実装するときは、宣言したプロパティだけを持つ型（閉じた型、シールされた型）が渡されると考えがちだが、TypeScript ではそのような型を表現できない。そのため、特にオブジェクトのプロパティを反復処理するときに、予期しない挙動になりやすい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目60 オブジェクトに対して反復処理する方法を知る|項目60]]）。

クラスも例外ではない。次の例では、コンストラクタの検証を通っていない値でも、構造が同じなので `SmallNumContainer` 型に代入できてしまう。

```ts
class SmallNumContainer {
  num: number

  constructor(num: number) {
    if (num < 0 || num >= 10) {
      throw new Error(`You gave me ${num} but I want something 0-9`)
    }
    this.num = num
  }
}

const a = new SmallNumContainer(5)
const b: SmallNumContainer = { num: 2024 } // 型エラーにならない
```

### 構造的型付けの利点

構造的型付けには利点もある。1 つ目は、テストでモックを作りやすいことである。たとえば次の `getAuthors` には、本物のデータベースの代わりに、`runQuery` を持つ任意のオブジェクトを渡せる。

```ts
interface DB {
  runQuery: (sql: string) => any[];
}

const getAuthors = (database: DB): Author[] => { ... };
```

2 つ目は、ライブラリ間の依存関係を切り離せることである（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目70 型を部分的にコピーして依存を断ち切る|項目70]]）。

## キーワード

- [[structural-typing|構造的型付け]]
- [[duck-typing|ダックタイピング]]
- [[javascript|JavaScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
