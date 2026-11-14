---
title: .NET
aliases: []
description: さまざまな種類のアプリを作るための、無料でオープンソースのクロスプラットフォームな開発プラットフォーム
tags: [word, dotnet]
date: 2026-11-14
---

## TL;DR

さまざまな種類のアプリを作るための、無料でオープンソースのクロスプラットフォームな開発プラットフォーム。複数の言語で書いたプログラムを動かせ、最もよく使われる言語は C# である。Microsoft とコミュニティが開発している。

## 仕組み

公式ドキュメントによると、.NET はランタイム、ライブラリ、コンパイラ、SDK とツール、ASP.NET Core や Windows Forms のようなアプリスタックで構成される。中心になるのはランタイム、ライブラリ、言語の 3 つで、.NET の大部分は C# で書かれている。

ランタイムは、トレーシング方式の[[garbage-collection|ガベージコレクション]]で自動的にメモリを管理する。GC と厳格なコンパイラを使うので、型安全かつメモリ安全である。並行処理は `async` / `await` と `Task` で書ける。パッケージマネージャは NuGet で、`dotnet build` で依存の取得からビルドまでを行える。

.NET は MIT ライセンスで公開され、Arm64、x64、x86 のアーキテクチャで動く。新しいバージョンは毎年 11 月に出る。

## 例

- [[fsharp|F#]] は .NET 上で動く言語である。
- [[nunit|NUnit]] は .NET 向けのテスティングフレームワークで、[[fsunit|FsUnit]] はそれを F# らしく書けるようにする。
- [[suave|Suave]] は .NET 上で動く F# の Web サーバである。

## 注意点

.NET には歴史的な理由で複数の実装がある。現在の .NET（.NET Core）はクロスプラットフォームでオープンソースの実装である。.NET Framework は Windows 向けの元祖の実装で、保守段階にある。Mono はコミュニティによる .NET Framework のクロスプラットフォーム実装である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fsharp|F#]]
- [[nunit|NUnit]]
- [[fsunit|FsUnit]]
- [[suave|Suave]]

## 出典

- [Introduction to .NET - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/introduction)
