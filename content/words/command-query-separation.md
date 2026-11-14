---
title: コマンドクエリ分離
aliases: [CQS]
description: データを返すコード（クエリ）と、データを更新するコード（コマンド）を混在させないという設計思想
tags: [word]
date: 2024-08-09
---

## TL;DR

「データを返すコード（クエリ）は、データを更新するコード（[[command|コマンド]]）と混在させるべきではない」という設計思想。Command-query separation を略して CQS と呼ぶ。[[cqrs|CQRS]] の元になった。

## 仕組み

質問をしたとき（クエリ）に、その答えを変える（コマンド）べきではない、という考え方である。

この考え方はデータベースにも当てはめられる。読み取りはデータベースの状態を変えずに、有用なデータを返す。読み取り以外の操作は、データベースの状態を変えるだけで、データを返さない。

[[functional-programming|関数型プログラミング]]に当てはめると、次のように表せる。

- データを返す関数は、副作用（状態の更新）を持つべきではない
- 副作用を持つ関数は、データを返すべきではない（ユニット型を返す）

## 例

F# で、データストアへの操作を型で表すと次のようになる。読み取り以外の操作は `Unit` を返す。

```fsharp
type CreateData = Data -> Unit
type ReadData = Query -> Data
type UpdateData = Data -> Unit
type DeleteData = Key -> Unit
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cqrs|CQRS]]
- [[command|コマンド]]

## 出典

- [コマンドクエリ分離 - Wikipedia](https://ja.wikipedia.org/wiki/コマンドクエリ分離)
- [[Domain Modeling Made Functional 第12章 コマンドとクエリを分離する|Domain Modeling Made Functional 第12章 コマンドとクエリを分離する]]
