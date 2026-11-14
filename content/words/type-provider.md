---
title: 型プロバイダ
aliases: []
description: 外部のデータソースをもとに、F# のプログラムで使う型やプロパティ、メソッドをコンパイラが生成する仕組み
tags: [word, "f#"]
date: 2024-08-09
---

## TL;DR

[[fsharp|F#]] で、プログラムが使う型、プロパティ、メソッドを提供するコンポーネント。外部のデータソースをもとに、F# コンパイラが型を生成する。

## なぜ必要か

外部のデータを、型付けされた形でそのまま扱える。たとえば `FSharp.Data.SqlClient` を使うと、コンパイル時に SQL のクエリやコマンドに合わせた型が作られる。SQL のクエリが正しくなければコンパイルエラーになり、成功すれば出力と完全に一致するレコード型が返される。

## 仕組み

生成される型は、型プロバイダへの入力によって決まる。入力には、サンプルのデータソース（JSON スキーマのファイルなど）、外部サービスの URL、データソースへの接続文字列などを渡せる。型は、プログラムが実際に参照したときに展開するようにもできる。

型プロバイダには 2 つの形式がある。

- 生成型プロバイダ: .NET の型として、生成されるアセンブリに書き込まれる型を作る。他のアセンブリからも使える
- 消去型プロバイダ: 生成元のアセンブリやプロジェクトの中でしか使えない型を作る。型はアセンブリに書き込まれない。大きなデータソースの一部だけを使う場合に便利である

## 例

- FSharp.Data: JSON、XML、CSV、HTML の型プロバイダ
- [SQLProvider](https://fsprojects.github.io/SQLProvider/): リレーショナルデータベースに型付きでアクセスする
- [FSharp.Data.SqlClient](https://fsprojects.github.io/FSharp.Data.SqlClient/): T-SQL をコンパイル時に検査して埋め込む
- [FSharp.Data.GraphQL](https://fsprojects.github.io/FSharp.Data.GraphQL/index.html): GraphQL サーバーをもとに型を提供する

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fsharp|F#]]

## 出典

- [型プロバイダー - F# | Microsoft Learn](https://learn.microsoft.com/ja-jp/dotnet/fsharp/tutorials/type-providers/)
- [[Domain Modeling Made Functional 第12章 RDB からの読み取り|Domain Modeling Made Functional 第12章 RDB からの読み取り]]
