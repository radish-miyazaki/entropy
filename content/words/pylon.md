---
title: Pylon
aliases: []
description: TypeScript の型から GraphQL Schema を自動生成する、Code first の GraphQL API フレームワーク
tags: [word, graphql, typescript]
date: 2024-09-10
---

## TL;DR

[[code-first|Code first]] で [[graphql|GraphQL]] API を作るフレームワーク。スキーマを書かず、[[typescript|TypeScript]] の型から [[graphql-schema|GraphQL Schema]] を自動生成する。

## 仕組み

開発者は TypeScript で型と [[graphql-resolver|Resolver]] を書くだけでよい。内部では Web フレームワークに [[hono|Hono]]、GraphQL サーバに GraphQL Yoga を使っている。特定のランタイムに依存せず、Node.js、[[bun|Bun]]、Cloudflare Workers、[[deno|Deno]] で動く。`npm create pylon@latest` でプロジェクトを作れる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[code-first|Code first]]
- [[graphql|GraphQL]]
- [[hono|Hono]]

## 出典

- [Pylon](https://pylon.cronit.io/)
