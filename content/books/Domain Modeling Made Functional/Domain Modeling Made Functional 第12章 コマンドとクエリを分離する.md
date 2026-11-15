---
title: Domain Modeling Made Functional › コマンドとクエリを分離する
description: データを返すクエリと状態を更新するコマンドを分ける CQS と、それをモジュールやデータストアに広げた CQRS をデータベースに適用する
tags: [book-chapter]
date: 2024-08-09
book: "[[Domain Modeling Made Functional]]"
chapter: 12
---

## TL;DR

- [[command-query-separation|コマンドクエリ分離]]（CQS）: データを返すコード（クエリ）と、データを更新するコード（[[command|コマンド]]）を混ぜない。関数型プログラミングでは、データを返す関数は[[side-effect|副作用]]を持たず、副作用を持つ関数はユニット型を返す。
- [[cqrs|CQRS]]: クエリとコマンドの[[module|モジュール]]を分ける。データストアを読み込み用と書き込み用に分けることもできるが、物理的に分けるとコピーの手間がかかるので、メリットと見合うかを判断する。

## 内容

[[Domain Modeling Made Functional 第12章 Persistence|第12章 Persistence]]のガイドラインの 1 つである。

### コマンドクエリ分離（CQS）

関数型プログラミングによるドメインモデリングでは、すべてのオブジェクトをイミュータブルとして設計する（[[Domain Modeling Made Functional 第3章 I／O を端に追いやる|I/O を端に追いやる]]）。そこで、ストレージ自体もイミュータブルなオブジェクトとして考える。つまり、ストレージ内のデータを変更するたびに、新しいバージョンのデータストアが返される。

```fsharp
type CreateData = DataStoreState -> Data -> NewDataStoreState
type ReadData = DataStoreState -> Query -> Data
type UpdateData = DataStoreState -> Data -> NewDataStoreState
type DeleteData = DataStoreState -> Key -> NewDataStoreState
```

この 4 つは、Read とそれ以外に分けられる。Read はデータベースの状態を変更せず、有用なデータを返す。Read 以外はデータベースの状態を変更するだけで、有用なデータを返さない。この区別に基づいた設計思想が CQS である。

### 関数型プログラミングに CQS を適用する

[[functional-programming|関数型プログラミング]]での CQS は次のように表せる。

- データを返す関数は、副作用（状態の更新）を持つべきではない
- 副作用を持つ関数は、データを返すべきではない。ユニット型を返す関数であるべきだ

これをデータベースに当てはめて、先ほどの型シグネチャを改善する。`DataStoreState` を `DbConnection` などのデータストアへのハンドルに置き換える。実際のデータストアはミュータブルで新しい状態を返さないので、戻り値は `Unit` にする。

```fsharp
type CreateData = DbConnection -> Data -> Unit
type ReadData = DbConnection -> Query -> Data
type UpdateData = DbConnection -> Data -> Unit
type DeleteData = DbConnection -> Key -> Unit
```

`DbConnection` は特定のデータストアに固有なので、[[partial-application|部分適用]]などで呼び出し側から隠すとよい。

```fsharp
type CreateData = Data -> Unit
type ReadData = Query -> Data
type UpdateData = Data -> Unit
type DeleteData = Key -> Unit
```

さらに、非同期処理やエラーも起こりうるので、エフェクトを型に含める。

```fsharp
type DbError = ...
type DbResult<'a> = AsyncResult<'a,DbError>

type CreateData = Data -> DbResult<Unit>
type ReadData = Query -> DbResult<Data>
type UpdateData = Data -> DbResult<Unit>
type DeleteData = Key -> DbResult<Unit>
```

### コマンドクエリ責務分離（CQRS）

クエリが返すデータとコマンドに渡すデータを、同じ型にすることもできる。

```fsharp
type CreateCustomer = Customer -> DbResult<Unit>
type ReadCustomer = CustomerId -> DbResult<Customer>
```

しかし、次の理由から別の型にしたほうがよい。

1. 2 つのデータは異なることが多い。クエリは非正規化したデータや計算値を返すことがあるが、コマンドはそれを使わない。クエリは ID フィールドを返すが、コマンドのデータには含まれない
2. クエリとコマンドは別々に変わっていく傾向がある。たとえば、クエリでは注文と関連する顧客データをまとめて取得したいが、コマンドでは顧客への参照（`CustomerId`）だけを使う
3. パフォーマンスのために、複数の[[entity|エンティティ]]を一度に返すクエリがある

型を分けると、それぞれを別のモジュールに分ける設計が自然に導かれる。一方がクエリ用の `ReadModel` モジュール、もう一方がコマンド用の `WriteModel` モジュールである。これを CQRS と呼ぶ。

```fsharp
type CreateCustomer = WriteModel.Customer -> DbResult<Unit>
type ReadCustomer = CustomerId -> DbResult<ReadModel.Customer>
```

### CQRS とデータベースの分離

CQRS はデータベースにも適用できる。データストアを、読み込みに最適化したもの（非正規化、多数のインデックスなど）と、書き込みに最適化したもの（インデックスなし、トランザクションありなど）の 2 種類に分ける。

ただし、物理的なデータベースを 2 つに分ける必要はない。たとえば、書き込みモデルを単純なテーブルにし、読み込みモデルをそのテーブルに対するビューとして定義する方法もある。

物理的に分けると、書き込みストアから読み込みストアへデータをコピーする特別なプロセスが必要になる。読み込みストアのデータは書き込みストアより古くなることがあり、[[eventual-consistency|結果整合性]]になる。ドメインによってはこれが問題になる（[[Domain Modeling Made Functional 第6章 異なるコンテキスト間での整合性|異なるコンテキスト間での整合性]]）。データストアを分けることによる設計上のメリットが見合うかを判断する必要がある。

### イベントソーシング

[[event-sourcing|イベントソーシング]]は、CQRS の文脈でよく見かける永続化の手法である。状態そのものを書き換えるのではなく、状態が変わるたびにその変化をイベントとして永続化する。Git のようなバージョン管理システムに近いイメージである。

## キーワード

- [[command-query-separation|コマンドクエリ分離]]
- [[cqrs|CQRS]]
- [[event-sourcing|イベントソーシング]]
- [[command|コマンド]]
- [[side-effect|副作用]]
- [[partial-application|部分適用]]
- [[eventual-consistency|結果整合性]]
- [[entity|エンティティ]]
- [[module|モジュール]]
- [[persistence|永続化]]

## 自分の理解

CQRS は、オブジェクト指向プログラミングでいえば別々のインタフェースを作るイメージだと捉えている。

データストアを物理的に分けると、書き込みストアから読み込みストアへのコピーがとても大変になる。分けるかどうかは、そのメリットと見合うかで判断したい。
