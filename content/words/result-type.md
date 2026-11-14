---
title: Result 型
aliases: [Result]
description: 成功の値（Ok）か失敗のエラー（Error）のどちらかを持つ型。失敗しうる処理を型で表す
tags: [word, 型システム, fsharp, 関数型プログラミング]
date: 2026-11-14
---

## TL;DR

成功したときの値（`Ok`）か、失敗したときのエラー（`Error`）のどちらかを持つ型。[[fsharp|F#]] では標準ライブラリにある[[discriminated-union|判別共用体]]である。

## なぜ必要か

[[Domain Modeling Made Functional]] によると、エラーは例外でも扱えるが、`Result` を使うと「失敗する可能性がある」という事実を型シグネチャで明示できる。

## 仕組み

[F# のドキュメント](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/results)では、`Result` は次のように定義されている。構造体の判別共用体なので、構造的な等価性を持つ。

```fsharp
type Result<'T,'TError> =
    | Ok of ResultValue:'T
    | Error of ErrorValue:'TError
```

F# のコミュニティでは、`Result` を使ったエラー処理を Railway-oriented Programming と呼ぶ。`Result` を返す検証関数どうしは `Result.bind` でつなげられるので、処理を小さな部品に分けて合成できる。検証の最後には結果をパターンマッチで取り出すことになるので、プログラムの正しさを高められる。

## 例

[[Domain Modeling Made Functional]] では、支払いが失敗しうる処理を次のように表す。エラーの型には、起こりうるエラーのケースを並べた判別共用体を使う。

```fsharp
type PayInvoice =
    UnpaidInvoice -> Payment -> Result<PaidInvoice, PaymentError>
```

同書の第 6 章では、スマートコンストラクタが無効な値を受け取ったときに `Error` を返す。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[discriminated-union|判別共用体]]
- [[error-handling|エラーハンドリング]]
- [[monad|モナド]]
- [[domain-error|ドメインエラー]]

## 出典

- [Results - F# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/results)
- [[Domain Modeling Made Functional 第4章 省略可能な値、エラー、およびコレクションのモデリング|Domain Modeling Made Functional 第4章 省略可能な値、エラー、およびコレクションのモデリング]]
- [[Domain Modeling Made Functional 第6章 単純な値の完全性|Domain Modeling Made Functional 第6章 単純な値の完全性]]
