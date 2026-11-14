---
title: コンピュテーション式
aliases: []
description: F# でモナドやアプリカティブなど、文脈を持つ計算を書くための構文
tags: [word, fsharp]
date: 2024-08-05
---

## TL;DR

[[fsharp|F#]] で[[monad|モナド]]や[[applicative|アプリカティブ]]を表現するための構文。制御フローとバインドを使って、順に実行したり組み合わせたりできる計算を簡潔に書ける。

## なぜ必要か

非同期の計算や、値を順に生成する計算のように、特定の文脈に依存する計算は、文脈の外に「漏れ」やすいので書くのが難しい。コンピュテーション式は、こうした計算を書くための統一された構文と抽象化の仕組みを提供する。

## 仕組み

すべてのコンピュテーション式は、ビルダー型によって支えられている。ビルダー型は、式の中で使える操作を定義する。たとえば、`let!` はビルダー型の `Bind` メンバー、`return` は `Return` メンバーに変換される。`let!`、`and!`、`do!`、`yield`、`return` などのキーワードは、ビルダー型に対応するメンバーがある場合にだけ使える。

F# のコアライブラリには、シーケンス式、非同期式、タスク式、クエリ式の 4 つが組み込まれている。

## 例

```fsharp
let fetchAndDownload url =
    async {
        let! data = downloadData url

        let processedData = processData data

        return processedData
    }
```

`List` モナド、`Maybe` モナド、`Result` モナドもコンピュテーション式で表現できる。`Result` の例は [[Domain Modeling Made Functional 第10章 コンピュテーション式の導入|Domain Modeling Made Functional 第10章]] にある。

## 注意点

公式ドキュメントによると、[[haskell|Haskell]] の do 記法などとは違い、コンピュテーション式は 1 つの抽象化に結び付いていない。

## 自分の理解

[[haskell|Haskell]] の do 記法に近いかもしれない（[参考](https://qiita.com/7shi/items/92139286a4e9b5620d69)）。

## 関連

- [[monad|モナド]]
- [[applicative|アプリカティブ]]
- [[fsharp|F#]]

## 出典

- [計算式 - F# | Microsoft Learn](https://learn.microsoft.com/ja-jp/dotnet/fsharp/language-reference/computation-expressions)
- [List モナド](http://fsharpintro.net/listmonad.html)
- [Maybe モナド](http://fsharpintro.net/maybemonad.html)
- [[Domain Modeling Made Functional 第10章 コンピュテーション式の導入|Domain Modeling Made Functional 第10章]]
