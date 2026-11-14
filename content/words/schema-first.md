---
title: Schema first
aliases: []
description: スキーマを先に定義し、そこからコードを生成する開発の進め方
tags: [word, graphql]
date: 2024-09-09
---

## TL;DR

スキーマを先に定義し、そのファイルからコードを生成する開発の進め方。[[code-first|Code first]] と対になる。

## なぜ必要か

[[graphql|GraphQL]] では、[[graphql-schema|GraphQL Schema]] を先に定義し、バックエンドとフロントエンドが同じ GraphQL Schema を参照する。GraphQL Schema を両者で共有する資産にでき、特定の言語やフレームワークにも依存しない。そのため、バックエンドとフロントエンドを別のチームが並行して開発する場合に向いている。

## 例

[[nestjs|NestJS]] は Schema first での開発に対応している（[Resolvers](https://docs.nestjs.com/graphql/resolvers#schema-first)、[Interfaces](https://docs.nestjs.com/graphql/interfaces#schema-first)）。[[grpc|gRPC]] も [[protocol-buffers|Protocol Buffers]] の定義からコードを生成する Schema first で開発する。

## 注意点

GraphQL Schema Language には文法上の制約が多い。GraphQL Schema のバージョン管理が煩雑になりやすく、GraphQL そのものの理解も必要になる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[code-first|Code first]]
- [[graphql-schema|GraphQL Schema]]
- [[rest-api|REST API]]
- [[grpc|gRPC]]

## 出典

- [Resolvers - NestJS](https://docs.nestjs.com/graphql/resolvers#schema-first)
