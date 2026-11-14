---
title: LINQ
aliases: []
description: C# の言語にクエリ機能を直接組み込んだ一連の技術（Language-Integrated Query）
tags: [word, "c#"]
date: 2025-06-14
---

## TL;DR

Language-Integrated Query の略で、クエリ機能を C# の言語に直接組み込んだ一連の技術である。コレクション、SQL データベース、XML などに同じ書き方でクエリを書ける。

## なぜ必要か

従来、データへのクエリは単なる文字列で書いていたので、コンパイル時の型チェックや IntelliSense の補完が効かなかった。さらに、SQL データベース、XML ドキュメント、Web サービスなど、データソースごとに別のクエリ言語を覚える必要があった。LINQ では、クエリはクラスやメソッドと同じく言語の構成要素になる。

## 仕組み

クエリ式は宣言的な構文で書き、絞り込み、並べ替え、グループ化を短いコードで表せる。コンパイラはクエリ式を標準クエリ演算子のメソッド呼び出しに変換する。そのため、同じクエリをメソッド構文でも書ける。両者に意味や性能の違いはない。

クエリは `foreach` などで結果を列挙するまで実行されない（遅延実行）。`IEnumerable<T>` に対するクエリはデリゲートに、`IQueryable<T>` に対するクエリは式ツリーにコンパイルされる。Entity Framework Core のようなプロバイダは、式ツリーを SQL に変換して実行する。

## 例

80 点を超える点数だけを取り出すクエリである。

```csharp
int[] scores = [97, 92, 81, 60];

IEnumerable<int> scoreQuery =
    from score in scores
    where score > 80
    select score;

foreach (var i in scoreQuery)
{
    Console.Write(i + " ");
}
// Output: 97 92 81
```

## 注意点

`Count` や `Max` のように、対応するクエリ式の句がない操作もある。これらはメソッド呼び出しで書く。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [言語統合クエリ (LINQ) - C# | Microsoft Learn](https://learn.microsoft.com/ja-jp/dotnet/csharp/linq/)
