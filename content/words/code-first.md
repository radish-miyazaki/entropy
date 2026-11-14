---
title: Code first
aliases: []
description: スキーマを先に書かず、バックエンドのコードから自動生成する開発の進め方
tags: [word, graphql]
date: 2024-09-09
---

## TL;DR

スキーマを先に書かず、バックエンドのコードから自動生成する開発の進め方。[[schema-first|Schema first]] と対になる。

## なぜ必要か

[[graphql|GraphQL]] では、[[graphql-schema|GraphQL Schema]] をバックエンドのコードから生成し、フロントエンドはその GraphQL Schema を利用する。バックエンドのコードから GraphQL Schema、GraphQL Schema からフロントエンドのコードと流れるので、コードとスキーマが常に一致する。バックエンドの言語さえ分かれば、GraphQL の知識はそれほど要らない。比較的小規模で、すばやく開発したい場合に向いている。

## 例

[[nestjs|NestJS]] は Code first での開発に対応している（[Resolvers](https://docs.nestjs.com/graphql/resolvers#code-first)、[Interfaces](https://docs.nestjs.com/graphql/interfaces#code-first)）。[[pylon|Pylon]] も TypeScript のコードから GraphQL Schema を生成する。

## 注意点

GraphQL Schema がバックエンドだけの資産になり、特定の言語やフレームワークに依存する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[schema-first|Schema first]]
- [[graphql-schema|GraphQL Schema]]
- [[pylon|Pylon]]

## 出典

- [Resolvers - NestJS](https://docs.nestjs.com/graphql/resolvers#code-first)
