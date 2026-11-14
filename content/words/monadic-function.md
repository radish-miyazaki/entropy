---
title: モナディック関数
aliases: []
description: 通常の値を受け取り、Result のように「拡張」された値を返す関数
tags: [word, 関数型プログラミング]
date: 2026-11-14
---

## TL;DR

「通常」の値を受け取り、ある種の「拡張」された値を返す関数。[[Domain Modeling Made Functional]] では、`Result` を返す関数をスイッチ関数と呼んでおり、これがモナディック関数に当たる。

## なぜ必要か

[[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）|Domain Modeling Made Functional 第10章]]によると、前の関数の出力は成功か失敗の 2 トラックで、次の関数の入力は 1 トラックなので、`Result` を返す関数はそのままでは合成できない。モナディック関数を合成する方法として、[[monad|モナド]]や[[applicative|アプリカティブ]]がある。

## 仕組み

[[Domain Modeling Made Functional 第10章 なんとなく理解するモナドとアプリカティブ|Domain Modeling Made Functional 第10章]]によると、モナディック関数を直列につなげるのがモナドで、並列に組み合わせるのがアプリカティブである。直列につなぐには `bind`（`flatMap`、[[haskell|Haskell]] の `>>=`）を使い、モナディック関数を 2 トラックの関数に変換する。

## 例

F# では、`Result` を返す関数を `Result.bind` でつなげる。

```fsharp
type FunctionA = Apple -> Result<Bananas, ...>
type FunctionB = Bananas -> Result<Cherries, ...>

let functionAB input =
  input
  |> functionA
  |> Result.bind functionB
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[monad|モナド]]
- [[applicative|アプリカティブ]]
- [[functional-programming|関数型プログラミング]]

## 出典

- [[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）|Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖]]
- [[Domain Modeling Made Functional 第10章 なんとなく理解するモナドとアプリカティブ|Domain Modeling Made Functional 第10章 なんとなく理解するモナドとアプリカティブ]]
