---
title: めだかの「みんなのkanban」学校
aliases: []
description: Todo、Doing、Done の 3 列の Kanban アプリケーションを作りながら、Clojure による Web アプリケーション開発の基本を学ぶ本
tags: [book, clojure]
date: 2025-11-17
book-authors: []
publisher:
isbn:
---

## TL;DR

- Todo、Doing、Done の 3 列からなる Kanban アプリケーションを作りながら、[[clojure|Clojure]] による Web アプリケーション開発の基本を学ぶ本である。
- バックエンドからフロントエンド、開発環境までを、ソフトウェアを 1 つずつ積み上げる形で構築する。

## 対象読者

Clojure で Web アプリケーションを作る流れを一通り学びたい人向けの本である。Kanban アプリは、列が 1 つの Todo アプリを複数列に発展させたものと捉えられる。Todo アプリと同じく CRUD 操作という Web アプリケーションの基本を含んでいる。タスクを作成し、列の間で移動させ、最後に削除するまでの基本機能を実装する。ドラッグ&ドロップやリアルタイム同期のような高度な機能は扱わない。

技術構成は次のとおりである。

- バックエンド: http-kit で Web サーバを起動し、reitit でルーティングを定義し、lacinia で [[graphql|GraphQL]] API を提供する。データベースは [[postgresql|PostgreSQL]] で、next.jdbc と honeysql でアクセスする。malli でスキーマを検証し、component でシステムを管理する。
- フロントエンド: [[clojurescript|ClojureScript]] と [[reagent|Reagent]] で構築する。Reagent は [[react|React]] のラッパーである。GraphQL クライアントには [[apollo-client|Apollo Client]] を使う。
- 開発環境: [[nix|Nix]] で JVM や Clojure のバージョンを固定する。Docker Compose で PostgreSQL を起動し、sqldef で宣言的にスキーマを管理する。

%%

## 感想

全体を通しての評価や気づき。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]
- [[めだかのclojure.core学校]]
- [[めだかの「ゼロから作るgit」学校]]
- [技術書典の頒布ページ](https://techbookfest.org/product/ipUkyY6mDn8AWhv9DL4apy?productVariantID=jjGHueqcXmnnRpezru9eFf)
