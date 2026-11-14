---
title: Relay
aliases: []
description: Meta が開発している React 向けの GraphQL クライアント
tags: [word, react, graphql]
date: 2024-09-25
---

## TL;DR

Meta（旧 Facebook）が開発している、[[react|React]] アプリケーション向けの [[graphql|GraphQL]] クライアント。もとは Facebook アプリの React Native の部分のために作られた。

## 仕組み

各コンポーネントは、必要なデータを [[graphql-fragment|Fragment]] で宣言し、`useFragment` で読み出す。Relay のコンパイラはアプリケーション全体のデータ要件を集約し、効率のよいリクエストにまとめる。コンポーネントが自分のデータ依存を宣言するので、コンポーネントどうしが疎結合になり、再利用しやすくなる。

この考え方は [[fragment-colocation|Fragment Colocation]] と呼ばれる。また、コンポーネントは自分の Fragment で宣言したデータしか受け取れない。これを [[fragment-masking|Fragment Masking]] と呼び、Relay が提唱した。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[apollo-client|Apollo Client]]
- [[urql]]
- [[fragment-colocation|Fragment Colocation]]
- [[fragment-masking|Fragment Masking]]

## 出典

- [Relay](https://relay.dev/)
- [Fragment Masking で Fragment Colocation を強制する](https://scrapbox.io/wada-blog/Fragment%20Masking%20で%20Fragment%20Colocation%20を強制する)
