---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目18 推論可能な型でコードを乱雑にしない
description: 型推論が効く場所では型アノテーションを省き、関数のシグネチャやオブジェクトリテラル、戻り値など必要な場所にだけ付ける項目
tags: [book-chapter, typescript]
date: 2025-04-30
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 18
---

## TL;DR

- [[type-inference|型推論]]が効く場所では、[[type-annotation|型アノテーション]]は不要である。
- 理想は、関数のシグネチャには型アノテーションがあり、関数本体のローカル変数にはない状態である。
- ただし、オブジェクトリテラルと一部の戻り値の型には、推論できる場合でも型アノテーションを付ける。

## 内容

### シグネチャにだけ型を書く

関数やメソッドのシグネチャには型アノテーションを書き、本体のローカル変数には書かないのが理想である。ローカル変数の型は、引数の型から推論される。

```ts
function logProduct(product: Product) {
  const { id, name, price } = product
  console.log(id, name, price)
}
```

シグネチャであっても、引数にデフォルト値がある場合や、関数をコールバックとして渡す場合は、型アノテーションが要らない。

```ts
function parseNumber(str: string, base = 10) { ... }
```

```ts
// Express.js
app.get("/health", (req, res) => {
  res.json({ message: "Hello, world" })
})
```

### 推論できても型アノテーションを付けるケース

1 つ目はオブジェクトリテラルである。型アノテーションを付けると[[excess-property-checking|余剰プロパティチェック]]が有効になる。

2 つ目は戻り値の型である。ただし付けるべきなのは、`return` が複数ある場合、公開 API の一部である場合、名前付きの型を返したい場合に限られる。戻り値の型を書くと、次の利点がある。

- 最初に完全な型を書くことで、本当に必要な関数を実装できる（[[test-driven-development|TDD]] に近い考え方）。
- [[typescript|TypeScript]] が戻り値の型を解析する手間を省ける（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目78 コンパイラーのパフォーマンスに注意を払う|項目78]]）。
- 名前付きの型を返せる。

たとえば次の `add` の戻り値は、`{ x: number; y: number; }` と推論される。

```ts
interface Vector2D {
  x: number
  y: number
}

function add(a: Vector2D, b: Vector2D) {
  return { x: a.x + b.x, y: a.y + b.y }
}
```

これを `Vector2D` として扱いたい場合は、`function add(a: Vector2D, b: Vector2D): Vector2D` と戻り値の型を明示する。

## キーワード

- [[typescript|TypeScript]]
- [[type-inference|型推論]]
- [[type-annotation|型アノテーション]]
- [[excess-property-checking|余剰プロパティチェック]]
- [[test-driven-development|テスト駆動開発]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
