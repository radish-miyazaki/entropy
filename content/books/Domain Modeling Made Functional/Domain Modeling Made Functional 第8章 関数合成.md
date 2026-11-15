---
title: Domain Modeling Made Functional › 関数合成
description: 関数の出力を次の関数の入力につないで組み合わせ、基本的な関数からアプリケーション全体を組み立てる
tags: [book-chapter]
date: 2024-07-26
book: "[[Domain Modeling Made Functional]]"
chapter: 8
---

## TL;DR

- [[function-composition|関数合成]]は、1 つ目の関数の出力を 2 つ目の関数の入力につないで、関数を組み合わせることである。
- 基本的な関数を合成してサービスを、サービスを合成してワークフローを作り、最終的にアプリケーション全体を組み立てられる。
- 型が合わない関数どうしは、両方の型を含む「最小」の型にそろえて合成する。

## 内容

[[Domain Modeling Made Functional 第8章 Understanding Functions|Understanding Functions]] の一節である。

関数合成とは、1 つ目の関数の出力を 2 つ目の関数の入力につないで、関数を組み合わせることである。合成すると、関数が小さな関数からできていることや、小さな関数が何を扱っていたかといった情報を隠せる。

### F# での関数合成

[[fsharp|F#]] では、最初の関数の出力の型と、2 番目の関数の入力の型が同じであれば、パイプ演算子 `|>` で合成できる。

```fsharp
let add1 x = x + 1
let square x = x * x

let add1ThenSquare x =
    x |> add1 |> square

add1ThenSquare 5 // 36
```

```fsharp
let isEven x =
    (x % 2) = 0
let printBool x =
    sprintf "value is %b" x

let isEvenThenPrint x =
    x |> isEven |> printBool

isEvenThenPrint 2
```

### 関数からアプリケーション全体を組み立てる

合成を使うと、アプリケーション全体を組み立てられる。まず、アプリケーションの最下層にある基本的な関数から始める。複数の基本的な関数を合成して、サービスの関数を作る。複数のサービスの関数を合成して、[[workflow|ワークフロー]]を処理する関数を作る。最後に、ワークフローを並列に合成し、入力に応じて特定のワークフローを選んで呼び出すコントローラ（ディスパッチャ）を作れば、アプリケーションができる。どの層も、入力と出力を持つ関数でできている。

### 関数を合成するときの課題

一方の関数の出力が、もう一方の関数の入力と合わない場合がある。たとえば `int` と `Option<int>` である。この場合は、両方の型を含む「最小」の型を考える。この例なら、1 つ目の関数の出力を `Option` に変える。

```fsharp
let add1 x = x + 1

let printOption x =
    match x with
    | Some i -> printfn "The int is %i" i
    | None -> printfn "No value"

5 |> add1 |> Some |> printOption // The int is 6
```

より複雑な例は、[[Domain Modeling Made Functional 第9章 残りのステップの実装|残りのステップの実装]]と[[Domain Modeling Made Functional 第10章 Implementation： Working with Errors|第10章 Implementation: Working with Errors]] で扱う。

## キーワード

- [[function-composition|関数合成]]
- [[fsharp|F#]]
- [[workflow|ワークフロー]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
