---
title: ACL
aliases: [Access Control List]
description: リソースごとに「誰が」「何をできるか」をエントリの一覧で定義するアクセス制御の仕組み
tags: [word, セキュリティ]
date: 2025-01-06
---

## TL;DR

Access Control List の略で、リソースごとに「誰が」「何をできるか」を定義するアクセス制御の仕組みである。[[domain-driven-design|ドメイン駆動設計]]では、同じ略語で[[anti-corruption-layer|腐敗防止層]]（Anti-Corruption Layer）を指すことがあるので、文脈で区別する。

## 仕組み

ACL は 1 つ以上のエントリで構成される。Google Cloud Storage の場合、各エントリは次の 2 つを持つ。

- 権限（permission）: どの操作ができるか。`READER`、`WRITER`、`OWNER` があり、上位の権限は下位の権限を含む
- スコープ（scope）: 誰が操作できるか。ユーザーアカウント、サービスアカウント、Google グループ、ドメイン、`allUsers`（インターネット上の全員）など

ACL はバケットやオブジェクトといった個々のリソースに付ける。

## 注意点

Cloud Storage では多くの場合 ACL を使わず、均一なバケットレベルのアクセスを有効にして IAM だけでアクセスを管理することが推奨されている。ACL と IAM を併用すると、どちらか一方で許可されていればアクセスできる。しかも、IAM で付けた権限は ACL に、ACL で付けた権限は IAM ポリシーに表示されない。

`publicRead` などの事前定義 ACL を付けると、認証なしで誰でも読み取れる状態になる。また、事前定義 ACL を既存のリソースに適用すると既存の ACL が置き換わり、自分のアクセス権を失うことがある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[anti-corruption-layer|腐敗防止層]]

## 出典

- [アクセス制御リスト（ACL） - Cloud Storage](https://docs.cloud.google.com/storage/docs/access-control/lists?hl=ja)
