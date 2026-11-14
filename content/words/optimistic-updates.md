---
title: 楽観的更新
aliases: [楽観的更新]
description: Web API へのリクエストが成功する前提で、レスポンスを待たずに先に UI を更新する手法
tags: [word, ui]
date: 2024-09-16
---

## TL;DR

Web API へのリクエストが成功する前提で、レスポンスを待たずに先に UI を更新する手法。英語では Optimistic updates と呼ぶ。

## なぜ必要か

リクエストの成否を待たずに更新するので、ユーザへのフィードバックが速い。

## 仕組み

まずリクエストが成功したと仮定して UI を更新する。実際にレスポンスが返ってきたら、その内容で UI を描画し直す。このような UI を Optimistic UI と呼ぶ。

[[react|React]] では [[use-optimistic|useOptimistic]] を使って実現する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[use-optimistic|useOptimistic]]

## 出典

- [Optimistic Updates - TanStack Query](https://tanstack.com/query/v5/docs/framework/react/guides/optimistic-updates)
