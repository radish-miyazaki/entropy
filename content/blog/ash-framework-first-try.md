---
title: Ash Framework を触ってみる
description: Ash Framework の Get Started を読み進め、ドメイン、リソース、アクション、データレイヤ、リレーションシップの書き方を確かめた
tags: [blog, elixir, ash-framework]
date: 2025-04-25
draft: false
---

## TL;DR

- [[ash-framework|Ash Framework]] の [Get Started](https://hexdocs.pm/ash/get-started.html) を読み進めた。
- リソースをドメインでまとめ、操作はアクション、属性は `attributes`、関係は `relationships` に書く。永続化にはデータレイヤの指定が必要になる。

## 環境

- OS: macOS
- [[elixir|Elixir]]: 1.18.3
- [[erlang|Erlang]]/[[otp|OTP]]: 27
- Ash Framework: 3.5.6
- [[igniter|Igniter]]: 0.5.47

## 検証

コードは Get Started のページにあるので、ここでは書かない。

### 事前準備

Get Started では mix ではなく Igniter でのプロジェクト作成を勧めているようなので、先に Igniter をグローバルにインストールした。

```sh
mix archive.install hex igniter_new
```

次にプロジェクトを作成する。

```sh
mix igniter.new helpdesk --install ash
```

[[phoenix|Phoenix]] と一緒に使いたい場合は次のようにする。

```sh
mix igniter.new helpdesk --install ash,ash_phoenix --with phx.new
```

### Creating our first resource

`mix ash.gen.resource` を使えばリソースを自動で生成できるが、このチュートリアルでは手で書く。

[[domain|ドメイン]]のモジュールには `use Ash.Domain` を書く。`resources` の中に `resource <モジュール名>` を並べると、複数のリソースのモジュールを 1 つのドメインにまとめられる。

リソースのモジュールには `use Ash.Resource` を書く。`use Ash.Resource, domain: Helpdesk.Support` のように書くと、リソースをドメインに関連づけられる。リソースに対する操作（アクション）は `actions` に、リソースの属性は `attributes` に書く。

`config.exs` の内容は全然分からなかった。設定の意味は [Backwards Compatibility Config](https://hexdocs.pm/ash/backwards-compatibility-config.html) に書かれている。

### Try our first resource out

リソースのインスタンスを作るには、`Ash.Changeset.for_create` にアクション名（ここでは `:create`）を渡して changeset を作り、それを `Ash.create!/1` に渡す。

### Customizing our Actions / Updates and validations

属性の値に対するバリデーションは、`attribute` の `do` ブロックの中に書く。アクションが受け取る値は、`create` や `update` などの各アクションの `do` ブロックの中で `accept` を使って定義する。値は `for_create` の第 2 引数にマップで渡せる。

### Querying without persistence

`Ash.read!/1` にリソースのモジュールを渡すとデータを取得できる。ただし、[[persistence|永続化]]を担うデータレイヤがないとエラーになる。データレイヤは、リソースのモジュールで `data_layer: Ash.DataLayer.Ets` のように指定する（ETS を使う場合）。

### Adding relationships

リソース間の関係は、リソースのモジュールの `relationships` に書く。どのような関係を持つかは、`has_many` や `belongs_to` などで表す。

## 考察

changeset を作ってから `Ash.create!/1` に渡す流れは、Ecto の `Ecto.Changeset` と同じだと感じた。

## キーワード

- [[ash-framework|Ash Framework]]
- [[elixir|Elixir]]
- [[erlang|Erlang]]
- [[otp|OTP]]
- [[igniter|Igniter]]
- [[phoenix|Phoenix]]
- [[domain|ドメイン]]
- [[persistence|永続化]]

## 参考

- https://hexdocs.pm/ash/get-started.html
- https://hexdocs.pm/ash/backwards-compatibility-config.html
