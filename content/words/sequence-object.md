---
title: シーケンスオブジェクト
aliases: []
description: 一意な値を生成するための、1 行だけの特殊なテーブル。PostgreSQL や MySQL にある
tags: [word, データベース]
date: 2024-08-01
---

## TL;DR

一意な識別子を生成するための、1 行だけの特殊なテーブル。シーケンスジェネレータ、または単にシーケンスとも呼ばれる。

## 仕組み

[[postgresql|PostgreSQL]] のドキュメントでは、次のように説明されている。

> シーケンスオブジェクトは、シーケンスジェネレータ、あるいは単にシーケンスとも呼ばれます。シーケンスオブジェクトは特殊な一行だけのテーブルで、CREATE SEQUENCEで作成されます。シーケンスオブジェクトは一般的にテーブルの行に一意の識別子を生成するために使用されます。

PostgreSQL にも [[mysql|MySQL]] にも存在する。

## 例

`id` 列（`BIGSERIAL PRIMARY KEY`）でよく使われるが、それ以外の一意な値を作るときにも使える。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[postgresql|PostgreSQL]]
- [[mysql|MySQL]]

## 出典

- [シーケンス操作関数 - PostgreSQL 13 文書](https://www.postgresql.jp/document/13/html/functions-sequence.html)
