---
title: gqlgen
aliases: []
description: Schema first のアプローチで GraphQL サーバを作る Go のライブラリ
tags: [word, go, graphql]
date: 2024-09-24
---

## TL;DR

[[go|Go]] で [[graphql|GraphQL]] サーバを作るためのライブラリ。[[schema-first|Schema first]] のアプローチに基づき、`gqlgen` コマンドでスキーマからコードを生成する。

## 仕組み

gqlgen は「Schema first」「型安全」「コード生成」の 3 つを原則にしている。まず GraphQL のスキーマ定義言語で API を記述し、サーバはそのスキーマを中心に組み立てる。繰り返しになる定型コードは `gqlgen` コマンドが生成するので、開発者はアプリケーションのロジックに集中できる。型のない汎用的な map をコードに持ち込まないことも重視している。

## 例

`gqlgen` コマンドは次のようにインストールする。

```sh
$ go install github.com/99designs/gqlgen@latest
```

今の公式のクイックスタートでは、モジュールを作ってから gqlgen をツールの依存として追加し、`go tool gqlgen init` で設定ファイルとモデルを生成する。そのあと `go run server.go` でサーバを起動する。

```sh
$ go mod init example
$ go get -tool github.com/99designs/gqlgen
$ go tool gqlgen init
$ go run server.go
```

設定ファイルの `gqlgen.yml` では、GraphQL の型と Go のモデルの対応（`models:`）などを指定する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[schema-first|Schema first]]
- [[graphql-schema|GraphQL Schema]]
- [[juniper|Juniper]]: Rust の GraphQL サーバライブラリ。こちらはコードファースト

## 出典

- [gqlgen](https://gqlgen.com/)
- https://zenn.dev/hsaki/books/golang-graphql
