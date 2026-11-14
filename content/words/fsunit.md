---
title: FsUnit
aliases: []
description: NUnit や xUnit などのテスティングフレームワークを F# に適した構文でラップしたライブラリ
tags: [word, fsharp, テスト]
date: 2024-07-31
---

## TL;DR

[[nunit|NUnit]] や xUnit などの標準的な[[testing-framework|テスティングフレームワーク]]を、[[fsharp|F#]] に適した構文でラップしたライブラリ。

## なぜ必要か

既存の [[dotnet|.NET]] のテスティングフレームワークを使ったまま、単体テストを関数型らしく、F# になじむ書き方で書けるようにする。

## 仕組み

NUnit、xUnit、MSTest に対応しており、フレームワークごとに NuGet パッケージが分かれている。

## 例

```fsharp
open NUnit.Framework
open FsUnit

1 |> should equal 1
1 |> should not' (equal 2)
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nunit|NUnit]]
- [[unquote|Unquote]]
- [[expecto|Expecto]]

## 出典

- [FsUnit](https://fsprojects.github.io/FsUnit/)
