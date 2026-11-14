---
title: Local-only calories tracker app
description: PGlite でブラウザの中にデータベースを持ち、オフラインでも動くカロリー記録アプリを作るプロジェクトテンプレート
tags: [article, react, effect, xstate, typescript, drizzle, tailwind-css, pglite]
date: 2025-06-09
article-authors: [Sandro Maglione]
site: typeonce.dev
published:
url: https://www.typeonce.dev/course/calories-tracker-local-only-app
---

## TL;DR

- サーバに頼らず、ブラウザの中だけで動くカロリー記録アプリを作るプロジェクトテンプレートである。
- [[pglite|PGlite]] をローカルの Postgres として使い、ローカルファーストへの最初の段階として「ローカルオンリー」なアプリを作る。

## 内容

### ローカルオンリーとは

ローカルファーストのアプリはクライアントにローカルのデータストアを持つ。このコースでは、その最初の段階として、サーバから独立し、クライアントだけで完結するローカルオンリーのアプリを作る。アプリは Vite で作り、すべてブラウザの中で動く。[[pglite|PGlite]] がデータベースをクライアントに持ち込むので、完全にオフラインでも動くアプリを作れる。

### 作るもの

利用者の端末だけで最初から最後まで動くカロリー記録アプリである。[[pwa|PWA]] としてインストールでき、オフラインでも使える。

### 使う技術

ルーティングには TanStack Router を使い、型安全なルートとローダーを書く。データベースは PGlite と [[drizzle|Drizzle]] で扱い、マイグレーションは drizzle-kit で行う。PGlite の `live` 拡張でリアクティブなクエリを使う。状態管理には [[xstate|XState]] のアクターモデルを使い、ロジックと検証には [[effect-ts|Effect]] と [[effect-schema|Schema]] を使う。UI は Tailwind CSS v4 と react-aria-components などで作り、vite-plugin-pwa で PWA とオフライン対応を行う。

### モジュール

1. Architecture of a local app
2. Schemas and local database
3. State management with actors
4. Routing and loaders
5. Reactive queries
6. UI styling and components

次の段階は複数の端末での利用や共同編集への対応である。そのためには、ローカルのデータベースを端末どうしで同期する同期エンジンが必要になる。

## キーワード

- [[react|React]]
- [[effect-ts|Effect（TypeScript）]]
- [[xstate|XState]]
- [[typescript|TypeScript]]
- [[drizzle|Drizzle]]
- [[pglite|PGlite]]
- [[pwa|PWA]]
- [[effect-schema|Schema]]
- ローカルファースト
- TanStack Router

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%
