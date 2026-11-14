---
title: Fork-Join model
aliases: []
description: タスクごとに処理を分岐（fork）させ、すべての完了を待ってから合流（join）して後続の処理を行う並列処理のモデル
tags: [word, 並行処理]
date: 2025-03-02
---

## TL;DR

タスクごとに 1 つの[[process|プロセス]]を生成し（fork）、それらのタスクがすべて完了するのを待ってから（join）後続の処理を行う並列処理のモデル。

## 仕組み

処理をタスクに分け、タスクごとにプロセスを生成して並列に実行する。後続の処理は、すべてのタスクが完了するまで始まらない。最終的な結果を得るためにすべてのタスクの完了を待つ、同期的な処理が前提になる。

## 注意点

[[go|Go]] の [[fan-in-pattern|Fan-In pattern]] や [[fan-out-pattern|Fan-Out pattern]] と混同しやすい。Fork-Join model はすべてのタスクの完了を待つ。一方、Fan-In / Fan-Out は非同期に処理を行い、必要に応じて結果を集約できるので、より柔軟に設計できる。

## 自分の理解

Fan-In / Fan-Out は[[design-pattern|デザインパターン]]なので、実現方法がより具体的である。

## 関連

- [[fan-in-pattern|Fan-In pattern]]
- [[fan-out-pattern|Fan-Out pattern]]
- [[worker-pool-pattern|Worker Pool pattern]]

## 出典

- [[Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス]]
- [Fork–join model - Wikipedia](https://en.wikipedia.org/wiki/Fork–join_model)
