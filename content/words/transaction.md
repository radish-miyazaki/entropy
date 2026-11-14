---
title: トランザクション
aliases: []
description: データベース管理システムの中で行う、ひとまとまりの作業単位。全部成功するか、何も起きなかったかのどちらかになる
tags: [word, データベース]
date: 2026-11-14
---

## TL;DR

データベース管理システムの中で行う、ひとまとまりの作業単位。他のトランザクションから独立して扱われ、中の操作は全部反映されるか、まったく反映されないかのどちらかになる。

## なぜ必要か

Wikipedia によると、トランザクションには 2 つの目的がある。1 つ目は、システムが途中で止まっても障害から回復でき、データベースの整合性を保てる作業単位を提供することである。2 つ目は、同時にデータベースにアクセスするプログラムどうしを隔離することである。隔離がなければ、プログラムの結果が誤ったものになりうる。

## 仕組み

トランザクションが満たすべき性質は、頭文字を取って [[acid|ACID]] と呼ばれる。

- Atomicity（原子性）: 完全に実行されるか、何の効果もないかのどちらかである
- Consistency（一貫性）: データベースの既存の制約に従う
- Isolation（独立性）: 他のトランザクションに影響しない
- Durability（永続性）: 変更が永続的なストレージに書き込まれる

同時に実行されるトランザクションどうしが互いの変更をどこまで見えるかは、[[transaction-isolation-level|トランザクション分離レベル]]で決める。

## 例

[[Domain Modeling Made Functional]] によると、一般的なルールは「1 つのトランザクションにつき 1 つの[[aggregate|集約]]だけを更新する」である。ただし、2 つの口座間の送金のように、複数の集約を 1 つのトランザクションで更新しなければならない場合もある。

## 注意点

Domain Modeling Made Functional によると、異なるデータベースや外部サービスをまたぐ場合は、データストアのトランザクションを使えない。その場合は処理がうまくいくと想定し、不整合を見つける仕組みと、エラーを打ち消す[[compensating-transaction|補償トランザクション]]を用意する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[acid|ACID]]
- [[transaction-isolation-level|トランザクション分離レベル]]
- [[compensating-transaction|補償トランザクション]]
- [[aggregate|集約]]

## 出典

- [Database transaction - Wikipedia](https://en.wikipedia.org/wiki/Database_transaction)
- [[Domain Modeling Made Functional 第6章 同じコンテキストの集約間の整合性|Domain Modeling Made Functional 第6章 同じコンテキストの集約間の整合性]]
- [[Domain Modeling Made Functional 第12章 トランザクションを扱う|Domain Modeling Made Functional 第12章 トランザクションを扱う]]
