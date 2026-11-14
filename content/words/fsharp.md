---
title: F#
aliases: []
description: OCaml をもとに開発された、クロスプラットフォームで動く静的型付けの関数型プログラミング言語
tags: [word, プログラミング言語, 関数型プログラミング]
date: 2023-12-12
---

## TL;DR

クロスプラットフォームで動く、静的型付けの[[functional-programming|関数型プログラミング]]言語。[[ocaml|OCaml]] をもとに開発された。

## なぜ必要か

簡潔で堅牢、かつ性能の高いコードを書くための言語である。プログラミングの細部ではなく、問題のドメインに集中したまま、整理された自己文書化的なコードを書ける。オープンソースで、.NET の資産と相互運用できる。

## 仕組み

軽量な構文、デフォルトで不変な値、型推論と自動ジェネリック化、第一級関数、パターンマッチ、非同期プログラミングなどの機能を持つ。レコードや判別共用体でデータを表し、パターンマッチと組み合わせると、すべてのケースを扱っているかをコンパイラが確かめてくれる。オブジェクトも完全にサポートしている。

## 例

```fsharp
let names = [ "Peter"; "Julia"; "Xi" ]

let getGreeting name = $"Hello, {name}"

names
|> List.map getGreeting
|> List.iter (fun greeting -> printfn $"{greeting}! Enjoy your F#")
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ocaml|OCaml]]
- [[functional-programming|関数型プログラミング]]

## 出典

- [F# とは - .NET | Microsoft Learn](https://learn.microsoft.com/ja-jp/dotnet/fsharp/what-is-fsharp)
- [F# 言語リファレンス - Microsoft Learn](https://learn.microsoft.com/ja-jp/dotnet/fsharp/language-reference/)
