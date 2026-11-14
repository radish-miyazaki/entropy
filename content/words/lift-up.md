---
title: 型を持ち上げる
aliases: []
description: 異なる型を、別の型との共通の型にアップキャストすること
tags: [word]
date: 2024-07-30
---

## TL;DR

異なる型を、別の型との共通の型にアップキャストすること。英語では Lift up と呼ぶ。

## 例

[[Domain Modeling Made Functional]] では、[[fsharp|F#]] の `Result` を返す関数をつなぐときに使う。型の異なるエラーを返す関数は、そのままではつなげない。そこで共通の[[discriminated-union|選択型]]を作り、`Result.mapError` で各関数のエラーをその型に持ち上げる。

FSharp.Core のドキュメントによると、`Result.mapError` は `Error` の値にだけ関数を適用し、`Ok` の値はそのまま返す。

```fsharp
Ok 1 |> Result.mapError (fun x -> "bar") // Ok 1
Error "foo" |> Result.mapError (fun x -> "bar") // Error "bar"
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[result-type|Result 型]]
- [[discriminated-union|選択型]]

## 出典

- [[Domain Modeling Made Functional]]
- [Result Module - FSharp.Core](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-core-resultmodule.html)
