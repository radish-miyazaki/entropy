---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目74 実行時に型を再構築する方法を知る
description: 実行時に消える TypeScript の型を実行時にも使うための 3 つの方法（外部ソースから生成、実行時の型ライブラリ、型から値を生成）を比べる項目
tags: [book-chapter, typescript]
date: 2025-06-07
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 74
---

## TL;DR

- [[typescript|TypeScript]] の型は実行時に消えるので、そのままでは実行時のバリデーションに使えない。
- 外部ソースから型を生成する、実行時の型ライブラリで型を定義する、型から実行時の値を生成する、の 3 つの方法がある。

## 内容

TypeScript の型は実行時に消去されるので、実行時にはアクセスできない。そのため、実行時のバリデーションの実装が煩雑になりやすい。これを避けるには、次のいずれかの方法を取る。

### 外部ソースから型を生成する

[[openapi|OpenAPI]] や [[graphql-schema|GraphQL Schema]] のような外部ソースがあれば、そこから型を生成する（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目42 たまたま目にしたデータに基づく型を避ける|項目42]]）。OpenAPI なら [[json-schema-to-typescript]] が使える。

信頼できる情報源が新たに増えない（[[single-source-of-truth|Single Source of Truth]]）のが利点で、追加のビルドステップが必要になるのが欠点である。

### 実行時の型ライブラリを使って型を定義する

TypeScript では静的な型から実行時の値は作れないが、逆は `typeof` を使えばできる。

```ts
const val = { postId: "123", title: "First", body: "That is all" }
type ValType = typeof val
//   ^? type ValType = { postId: string; title: string; body: string; }
```

アプリケーションでこれを行うには、通常 [[zod|Zod]] などのライブラリを使う。TypeScript の型では表現しにくいルール（有効なメールアドレスや整数など）を表現でき、追加のビルドステップも要らない。

一方で、Zod の定義（`z.object`）と TypeScript の定義（`interface`）が混在し、Zod の使い方を別に学ぶ必要もある。また、実行時の型は伝染する。ある型が別の型を参照していれば、参照先の型も実行時の型に作り変えなければならない。

### 型から実行時の値を生成する

TypeScript の型から JSON Schema を生成する [[typescript-json-schema]] のようなツールを使う方法もある。型を TypeScript で定義できるのが利点で、新しいライブラリとビルドステップが必要になる（CI に組み込む）のが欠点である。

## キーワード

- [[typescript|TypeScript]]
- [[openapi|OpenAPI]]
- [[graphql-schema|GraphQL Schema]]
- [[json-schema-to-typescript]]
- [[single-source-of-truth|Single Source of Truth]]
- [[zod|Zod]]
- [[typescript-json-schema]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
