---
title: AoT
aliases: [Ahead of Time, AOT]
description: プログラムを実行する前に、ネイティブコードへコンパイルしておく方式
tags: [word]
date: 2024-11-01
---

## TL;DR

Ahead of Time コンパイルの略。プログラムを実行する前に、ネイティブコードへコンパイルしておく方式である。実行中にコンパイルする [[jit-compilation|JIT]] と対になる。

## なぜ必要か

.NET の Native AOT のドキュメントによると、AOT でコンパイルしたアプリは起動が速く、メモリの使用量も小さい。実行時に JIT コンパイラを使わないので、JIT が許されない制限のある環境でも動く。デプロイするインスタンスの数が多いクラウドのインフラや大規模なサービスで、特に効果が大きい。

## 仕組み

.NET の Native AOT では、発行（publish）のときに中間言語（IL）をネイティブコードへコンパイルする。出来上がるアプリは Linux x64 や Windows x64 のような特定の実行環境向けになり、.NET ランタイムが入っていないマシンでも動く。

## 注意点

.NET の Native AOT では、`Assembly.LoadFile` のような動的な読み込みや、`System.Reflection.Emit` のような実行時のコード生成が使えない。トリミングも必須になる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[jit-compilation|JIT]]

## 出典

- [Native AOT deployment overview - .NET](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/)
