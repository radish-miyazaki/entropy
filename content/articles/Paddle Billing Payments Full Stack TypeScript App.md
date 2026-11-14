---
title: Paddle Billing Payments Full Stack TypeScript App
description: Paddle を使った支払いを、クライアントとサーバの両方に実装する TypeScript のフルスタックなプロジェクトテンプレート
tags: [article, typescript, react, tailwind-css, xstate, effect, drizzle, react-router, nodejs]
date: 2025-06-09
article-authors: [Sandro Maglione]
site: typeonce.dev
published:
url: https://www.typeonce.dev/course/paddle-payments-full-stack-typescript-app
---

## TL;DR

- Paddle を使った支払いの仕組みを、クライアントとサーバの両方に実装するプロジェクトテンプレートである。
- クライアントは XState でチェックアウトの流れを管理し、サーバは Effect で Paddle の Webhook を検証・処理する。

## 内容

### 作るもの

Paddle は Merchant of Record として、支払いと税金、コンプライアンスへの対応を引き受けるサービスである。このコースでは、Paddle を使って動く支払いの仕組みをフルスタックで実装する。

クライアント側では、`@paddle/paddle-js` で Paddle のインラインチェックアウトを組み込み、チェックアウトの流れを [[xstate|XState]] で管理する。サーバ側では、`@paddle/paddle-node-sdk` で Paddle の Webhook を受け取る。署名を検証し、イベントを [[effect-ts|Effect]] で処理する。

### 使う技術

[[monorepo|モノレポ]]の構成には Turborepo を使う。クライアントは [[react|React]]、[[react-router|React Router]] v7、Effect、XState、Tailwind CSS v4、React Aria で作る。サーバは Effect（`@effect/platform`）と Node.js の `node:http`、dotenv、tsx で作る。

### 進め方

このコースは手順を一つずつ追うものではなく、プロジェクト全体の構成とコードのアーキテクチャに重点を置いている。技術ごとの長所と短所や、実装の要点を説明する。モジュールは次の 4 つである。

1. Project configuration
2. Shared API definition
3. Server implementation
4. Client implementation

## キーワード

- [[typescript|TypeScript]]
- [[react|React]]
- [[xstate|XState]]
- [[effect-ts|Effect（TypeScript）]]
- [[drizzle|Drizzle]]
- [[react-router|React Router]]
- [[monorepo|モノレポ]]
- Paddle
- Webhook

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%
