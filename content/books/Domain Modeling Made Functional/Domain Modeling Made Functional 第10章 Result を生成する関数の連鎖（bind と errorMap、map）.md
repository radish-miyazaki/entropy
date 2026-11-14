---
title: Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）
description: Result を返すスイッチ関数を bind、map、mapError で 2 トラックの関数に変換し、鉄道指向プログラミングの形で合成する
tags: [book-chapter, ddd, fsharp]
date: 2024-08-04
book: "[[Domain Modeling Made Functional]]"
chapter: 10
---

## TL;DR

- `Result` を返す関数を、本書ではスイッチ関数と呼ぶ。一般には[[monadic-function|モナディック関数]]と呼ばれる。
- スイッチ関数を合成するには、成功と失敗の 2 本の線路を持つ 2 トラックの形にそろえる。これを 2 トラックモデル、または[[railway-oriented-programming|鉄道指向プログラミング]]と呼ぶ。
- そのために、スイッチ関数を 2 トラック関数に変換する `bind`（`flatMap`）、1 トラック関数を 2 トラック関数に変換する `map`、エラー型を共通の[[discriminated-union|選択型]]に変換する `mapError` を使う。

## 内容

### アダプタブロックが必要な理由

スイッチ関数は、1 つの入力を受け取り、成功か失敗のどちらかの出力に分岐する。2 つのスイッチ関数をつなぐときは、1 つめが成功したら次の関数へ進み、失敗したら次の関数をバイパスしてそのまま失敗を流したい。すべてのステップをこうつなぐと、成功の線路と失敗の線路が並走する形になる。これが 2 トラックモデルである。

ただし、1 つめの関数の出力は 2 トラック（成功か失敗）なのに、2 つめの関数の入力は 1 トラックなので、`Result` を返す関数はそのままでは合成できない。2 つめの関数が 2 トラックの入力を受け取れれば、つなげられる。そこで、スイッチ関数を受け取って 2 トラックの関数に変換するアダプタブロックを作り、すべてのステップを 2 トラックの関数にそろえる。

### bind と map の実装

スイッチ関数を 2 トラック関数に変換するアダプタブロックは、[[functional-programming|関数型プログラミング]]で非常に重要で、`bind` や `flatMap` と呼ばれる。[[haskell|Haskell]] の `>>=` に当たる。

```haskell
(>>=) :: Monad m => m a -> (a -> m b) -> m b
```

```fsharp
// val bind: f: ('a -> Result<'b,'c>) -> aResult: Result<'a,'c> -> Result<'b,'c>
let bind f aResult =
  match aResult with
  | Ok success -> f success
  | Error failure -> Error failure
```

1 トラックの関数を 2 トラックの関数に変換するアダプタブロックもあると便利である。これも重要で、`map` と呼ばれる。Haskell では `fmap` や `<$>` として提供されている。

```haskell
fmap :: Functor f => (a -> b) -> f a -> f b
(<$>) :: Functor f => (a -> b) -> f a -> f b
```

```fsharp
// val map: f: ('a -> 'b) -> aResult: Result<'a,'c> -> Result<'b,'c>
let map f aResult =
  match aResult with
  | Ok success -> Ok (f success)
  | Error failure -> Error failure
```

これらの関数は[[domain|ドメイン]]のあらゆる場所で使うので、`Result.fs` のようなユーティリティモジュールにまとめておく。

```fsharp
module Result =
  let bind f aResult = ...
  let map f aResult = ...
```

### 合成と型チェック

当然ながら、あるステップの出力型と次のステップの入力型が一致しないと合成できない。次の例では、`FunctionA` は `FunctionB` と合成できるが、`FunctionC` とは直接合成できない。

```fsharp
type FunctionA = Apple -> Result<Bananas, ...>
type FunctionB = Bananas -> Result<Cherries, ...>
type FunctionC = Cherries -> Result<Lemon, ...>
```

`bind` を使うと、次のようにつなげられる。

```fsharp
let functionABC input =
  input
  |> functionA
  |> Result.bind functionB
  |> Result.bind functionC
```

### 共通のエラー型に変換する

今のエラートラックでは、すべての関数が同じエラー型を持つ必要がある。しかし、エラー型はステップごとに異なることが多いので、互換性を持たせる必要がある。そこで、`map` に似ているが失敗のトラックに作用する `mapError` を用意する。

```fsharp
// val mapError: f: ('a -> 'b) -> aResult: Result<'c,'a> -> Result<'c,'b>
let mapError f aResult =
  match aResult with
  | Ok success -> Ok success
  | Error failure -> Error (f failure)
```

たとえば次の 2 つの関数は、エラー型が異なるので合成できない。

```fsharp
type FunctionA = Apple -> Result<Bananas, AppleError>
type FunctionB = Bananas -> Result<Cherries, BananasError>
```

そこで、両方のエラーを表せる新しい選択型を作り、`mapError` でそれぞれのエラーを変換する。

```fsharp
type FruitError =
  | AppleErrorCase of AppleError
  | BananasErrorCase of BananasError

let functionAWithFruitError input =
  input |> functionA |> Result.mapError AppleErrorCase

let functionBWithFruitError input =
  input |> functionB |> Result.mapError BananasErrorCase
```

これで `bind` による合成ができる。

```fsharp
// val functionAB : Apple -> Result<Cherries, FruitError>
let functionAB input =
  input
  |> functionAWithFruitError
  |> Result.bind functionBWithFruitError
```

## キーワード

- [[railway-oriented-programming|鉄道指向プログラミング]]
- [[monadic-function|モナディック関数]]
- [[monad|モナド]]
- [[functor|ファンクタ]]
- [[discriminated-union|選択型]]
- [[error-handling|エラー処理]]
- [[haskell|Haskell]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
