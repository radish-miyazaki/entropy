---
title: Domain Modeling Made Functional › 省略可能な値、エラー、およびコレクションのモデリング
description: F# では省略可能な値を Option、エラーを Result、値がないことを unit で表し、コレクションには list を使う
tags: [book-chapter, ddd, fsharp]
date: 2024-07-12
book: "[[Domain Modeling Made Functional]]"
chapter: 4
---

## TL;DR

- 省略可能な値は Option、失敗しうる処理は [[result-type|Result]] という選択型で表す。
- 値がないことは `unit` で表し、ドメインモデルのコレクションには `list` を使う。

## 内容

### 省略可能な値

省略可能な値は、`Option` という選択型（[[discriminated-union|判別共用体]]）で表す。`Some` はデータがあることを、`None` はデータがないことを表す。

```fsharp
type Option<'a> =
    | Some of 'a
    | None
```

[[domain-model|ドメインモデル]]では、次のように使う。`Option<string>` は `string option` とも書ける。

```fsharp
type PersonalName = {
    MiddleInitial : Option<string>
    // ...
}

type PersonalName = {
    MiddleInitial : string option
    // ...
}
```

### エラー

エラーは、`Result` という選択型で表す。例外を使う方法もあるが、`Result` を使うと「失敗する可能性がある」という事実を型シグネチャで明示できる。`Ok` には成功したときの値を、`Error` には失敗したときのエラーデータを入れる（[F# のドキュメント](https://learn.microsoft.com/ja-jp/dotnet/fsharp/language-reference/results)）。

```fsharp
type Result<'T,'TError> =
    | Ok of ResultValue:'T
    | Error of ErrorValue:'TError
```

たとえば、請求書の支払いが失敗する可能性があるなら、次のように書く。エラーの型には、起こりうるエラーのケースを並べた選択型を使う。

```fsharp
type PayInvoice =
    UnpaidInvoice -> Payment -> Result<PaidInvoice, PaymentError>

type PaymentError =
    | CardTypeNotRecognized
    | PaymentRejected
    | PaymentProviderOffline
```

### 値が存在しないこと

[[functional-programming|関数型プログラミング]]では、すべての関数が何かを返さなければならないので、`void` は使えない。代わりに、`()` という値だけを持つ `unit` 型を使う。乱数の生成やデータベースの操作など、[[side-effect|副作用]]を扱うときに使う。

```fsharp
type NextRandom = unit -> int
type SaveCustomer = Customer -> unit
```

### リストとコレクション

F# には次のコレクションがある。

- `list`: 固定サイズのイミュータブルなコレクション（連結リスト）
- `array`: 固定サイズのミュータブルなコレクション。インデックスで要素を取得・代入できる
- `ResizeArray`: 可変サイズの配列。要素を追加・削除できる
- `seq`: 遅延評価のコレクション。要素は必要になったときに返される

ドメインモデリングでは `list` を使うことが推奨されている。

```fsharp
type Order = {
    OrderId : OrderId
    Lines : OrderLine list
}
```

リストはリストリテラルで作り、`::` 演算子（cons）で先頭に要素を足せる。

```fsharp
let aList = [1; 2; 3]
let aNewList = 0 :: aList
```

要素を取り出すときは、[[pattern-matching|パターンマッチ]]を使う。

```fsharp
let printList1 aList =
    match aList with
    | [] -> printfn "list is empty"
    | [x] -> printfn "list has one element: %A" x
    | [x;y] -> printfn "list has two elements: %A and %A" x y
    | longerList -> printfn "list has more than two elements"

let printList2 aList =
    match aList with
    | [] -> printfn "list is empty"
    | first::rest ->
        printfn "list is non-empty with the first element being: %A" first
```

## キーワード

- Option 型
- [[result-type|Result 型]]
- [[discriminated-union|判別共用体]]
- [[side-effect|副作用]]
- [[pattern-matching|パターンマッチ]]
- [[domain-model|ドメインモデル]]

## 自分の理解

[[fsharp|F#]] では、`Option<string>` よりも `string option` の書き方のほうが好まれている気がする。
