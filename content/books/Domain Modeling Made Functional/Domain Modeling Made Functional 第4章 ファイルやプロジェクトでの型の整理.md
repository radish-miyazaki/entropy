---
title: Domain Modeling Made Functional › ファイルやプロジェクトでの型の整理
description: F# は宣言の順番に厳しいので、共有される型を先に、単純な型を上に置くように、依存される側から順に並べる
tags: [book-chapter, ddd, fsharp]
date: 2024-07-12
book: "[[Domain Modeling Made Functional]]"
chapter: 4
---

## TL;DR

- [[fsharp|F#]] では、前にある型や前にコンパイルされるファイルから、後のものを参照できない。
- 共有される型を先に、サブドメイン固有の型を後に置き、ファイル内では単純な型を上に並べる。

## 内容

### 宣言の順番のルール

F# には、宣言の順番について厳しいルールがある。ファイルの上部にある型は、下部にある型を参照できない。コンパイル順が前のファイルは、後のファイルを参照できない。そのため、型を書くときはどう並べるかを考える必要がある。

### ファイルの分け方

標準的なのは、すべての[[domain|ドメイン]]の型を `Types.fs` や `Domain.fs` のような 1 つのファイルにまとめ、それに依存する関数を後ろのファイルに置く方法である。

型が多く、複数のファイルに分ける必要があるときは、共有されるものを先に、[[subdomain|サブドメイン]]固有のものを後に置く。

```
Common.Types.fs
Common.Functions.fs
OrderTaking.Types.fs
OrderTaking.Functions.fs
Shipping.Types.fs
Shipping.Functions.fs
```

ファイルの中では、単純な型を一番上に置き、それに依存する複雑な型を下に並べる。

```fsharp
module Payments =
    // 単純型
    type CheckNumber = CheckNumber of int

    // ドメイン型
    type PaymentMethod =
        | Cash
        | Check of CheckNumber
        | Card of ...

    // トップレベル型
    type Payment = {
        Amount : ...
        Currency : ...
        Method : PaymentMethod
    }
```

### module rec

F# 4.1 からは、`module rec` を使うとモジュール内のどこからでも型どうしを参照できる（[F# のドキュメント](https://learn.microsoft.com/ja-jp/dotnet/fsharp/language-reference/modules#recursive-modules)）。それまでは `and` を使っていた。ただし、型を正しい依存関係の順に並べたほうが、ほかの F# のコードとの一貫性が保たれる。

```fsharp
module rec Payments =
    type Payment = {
        Amount : ...
        Currency : ...
        Method : PaymentMethod
    }

    type PaymentMethod =
        | Cash
        | Check of CheckNumber
        | Card of ...

    type CheckNumber = CheckNumber of int
```

## キーワード

- [[fsharp|F#]]
- [[domain|ドメイン]]
- [[subdomain|サブドメイン]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
