---
title: Domain Modeling Made Functional 第9章 各ステップを実装する前に、単純型を実装する
description: パイプラインの各ステップを実装する前に、OrderId などの単純型を create と value 関数を持つモジュールとして実装する
tags: [book-chapter, ddd, fsharp]
date: 2024-07-30
book: "[[Domain Modeling Made Functional]]"
chapter: 9
---

## TL;DR

- 各ステップの前に、`OrderId` や `ProductCode` などの単純型を[[smart-constructor|スマートコンストラクタ]]で実装する。
- 生成用の `create` 関数と内部値を返す `value` 関数を、型と同じ名前のモジュールにまとめる。

## 内容

ほとんどの単純型は何らかの制約を受けているので、[[smart-constructor|スマートコンストラクタ]]を使って作る（[[Domain Modeling Made Functional 第6章 単純な値の完全性]]）。必要な関数は次の 2 つである。

1. `create` 関数: プリミティブな値から型を構築する
2. `value` 関数: 内部値を返す

これらの関数は単純型と同じファイルに置き、適用する型と同じ名前のモジュールに入れる。

```fsharp
module Domain =
  type OrderId = private OrderId of string

  module OrderId =
    let create str =
      if String.IsNullOrEmpty(str) then
        // ひとまず Result を避けるため、例外を発生させる
        failwith "OrderId must not be null or empty"
      elif str.Length > 50 then
        failwith "OrderId must not be more than 50 chars"
      else
        OrderId str

    let value (OrderId str) = str
```

文字列の検証は多くの型で使い回すので、汎用的な関数として切り出しておくと便利である。

```fsharp
let createString name ctor maxLen str =
  if String.IsNullOrEmpty(str) then
    let msg = sprintf "%s must not be null or empty" name
    failwith msg
  elif str.Length > maxLen then
    let msg = sprintf "%s must not be more than %i chars" name maxLen
    failwith msg
  else
    ctor str
```

## キーワード

- [[smart-constructor|スマートコンストラクタ]]
- [[domain-primitive|ドメインプリミティブ]]
- [[fsharp|F#]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
