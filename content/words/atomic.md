---
title: アトミック
aliases: [atomic]
description: 処理が不可分であること
tags: [word, 並行処理]
date: 2025-03-09
---

## TL;DR

処理が不可分であること。他の[[thread|スレッド]]は処理の途中経過を見られず、処理は必ず完了するか、まったく実行されないかのどちらかになる。

## 例

データベースの[[transaction|トランザクション]]でも、原子性（Atomicity）は [[acid|ACID]] の性質の 1 つである。PostgreSQL の用語集によると、トランザクションのすべての操作が 1 つの単位として完了するか、何も行われないかのどちらかになる。実行中にシステムが障害で止まっても、復旧後に途中までの結果は見えない。

[[go|Go]] の `sync/atomic` パッケージは、変数への読み書きや加算をアトミックに行う関数と型を提供している。ドキュメントによると、プログラムで実行されるアトミック操作はすべて、ある 1 つの逐次一貫な順序で実行されたかのように振る舞う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[atomic-operation|アトミック操作]]
- [[atomic-variable|アトミック変数]]
- [[acid|ACID]]

## 出典

- [Glossary - PostgreSQL Documentation](https://www.postgresql.org/docs/current/glossary.html)
- [atomic package - sync/atomic - Go Packages](https://pkg.go.dev/sync/atomic)
