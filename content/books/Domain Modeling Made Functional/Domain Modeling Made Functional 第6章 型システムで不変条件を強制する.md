---
title: Domain Modeling Made Functional › 型システムで不変条件を強制する
description: 「注文には 1 行以上の明細がある」のような不変条件は、NonEmptyList のような型で直接表現できる
tags: [book-chapter, ddd, fsharp]
date: 2024-07-19
book: "[[Domain Modeling Made Functional]]"
chapter: 6
---

## TL;DR

- [[invariant|不変条件]]は、[[type-system|型システム]]で直接表現できる。
- 「`Order` は 1 行以上の `OrderLine` を持つ」という条件は、空にならないリストの型で表す。

## 内容

[[invariant|不変条件]]は、[[type-system|型システム]]で直接表現できる。たとえば「`Order` は 1 行以上の `OrderLine` を持つ」という条件である。

空にならないリストは [[fsharp|F#]] に組み込まれていないので、自分で定義する。この場合、`add` や `remove` のような操作関数も必要になる。

```fsharp
type NonEmptyList<'a> = {
    First: 'a
    Last: 'a list
}
```

[FSharpx.Collections](https://fsprojects.github.io/FSharpx.Collections/) のようなライブラリを使う方法もある。このライブラリには [`NonEmptyList<'T>`](https://fsprojects.github.io/FSharpx.Collections/reference/fsharpx-collections-nonemptylist-1.html) が用意されている。

```fsharp
type Order = {
    // ...
    OrderLine: NonEmptyList<OrderLine>
    // ...
}
```

## キーワード

- [[invariant|不変条件]]
- [[type-system|型システム]]
- [[fsharp|F#]]
- [[integrity|完全性]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
