---
title: Domain Modeling Made Functional 第11章 オプション型を DTO に変換する
description: オプション型は None を null に置き換えて DTO にする。値型をラップしている場合は null 許容型に変換する
tags: [book-chapter]
date: 2024-08-07
book: "[[Domain Modeling Made Functional]]"
chapter: 11
---

## TL;DR

- オプション型を [[dto|DTO]] にするときは、`None` を `null` に置き換える。
- 参照型をラップしているならそのままでよいが、値型をラップしているなら `Nullable<int>` のような null 許容型に変換する。

## 内容

[[Domain Modeling Made Functional 第11章 ドメイン型を DTO に変換する方法|ドメイン型を DTO に変換する方法]]の 1 つである。

オプション型を DTO にするには、`None` を `null` に置き換える必要がある。ラップしている型によって扱いが変わる。

- 参照型をラップしている場合: 参照型は `null` を取れるので、そのままでよい。[[fsharp|F#]] では `class` 型や `string` が参照型である（[参照型 - C# reference](https://learn.microsoft.com/ja-jp/dotnet/csharp/language-reference/keywords/reference-types)）
- 値型をラップしている場合: 値型は `null` を取れないので、`Nullable<int>` のような null 許容型に変換する（[null 許容値型 - F#](https://learn.microsoft.com/ja-jp/dotnet/fsharp/language-reference/nullable-value-types)）。F# では `struct` 型と、`string` 以外の基本型が値型である（[値型 - C# reference](https://learn.microsoft.com/ja-jp/dotnet/csharp/language-reference/builtin-types/value-types)）

## キーワード

- [[dto|DTO]]
- [[fsharp|F#]]

## 自分の理解

F# の参照型を一覧にした公式ページは見つからなかった。ただ、F# は C# と同じ .NET 上で動くので、C# と同じはずだと考えている。

Swift でも構造体は値型、クラスは参照型だった。値型と参照型の区別は、言語をまたいだ共通認識として持っておいてよさそうだ。
