---
title: Domain Modeling Made Functional 第10章 Result 型を使ってエラーを明示する
description: 例外ではなく Result 型を使い、成功か失敗か、失敗の原因は何かを関数のシグネチャで明示する
tags: [book-chapter, ddd, fsharp]
date: 2024-08-02
book: "[[Domain Modeling Made Functional]]"
chapter: 10
---

## TL;DR

- 関数型プログラミングでは、成功したか失敗したか、失敗の原因は何かを明示する。
- 例外ではなく `Result` 型を返すと、起こりうるエラーがシグネチャに現れる。

## 内容

[[functional-programming|関数型プログラミング]]では、物事をできるだけ明示的にすることを重視する。[[error-handling|エラー処理]]も同じで、成功したか失敗したか、失敗の原因は何かを明示する（[[Domain Modeling Made Functional 第8章 全域関数]]）。

例外を使うと、どんなエラーが起こるかがシグネチャから分からない。[[Domain Modeling Made Functional 第9章 最初のステップの実装]]で使った次の型では、住所の検証が失敗しうることが読み取れない。

```fsharp
type CheckAddressExists = UnvalidatedAddress -> CheckedAddress
```

`Result` 型を使うと、失敗の可能性とその種類を型で表せる。

```fsharp
type CheckAddressExists =
  UnvalidatedAddress -> Result<CheckedAddress, AddressValidationError>

and AddressValidationError =
  | InvalidFormat of string
  | AddressNotFound of string
```

## キーワード

- [[error-handling|エラー処理]]
- [[total-function|全域関数]]
- [[functional-programming|関数型プログラミング]]
- [[fsharp|F#]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
