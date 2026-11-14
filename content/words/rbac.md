---
title: RBAC
aliases: [Role-Based Access Control]
description: 権限をロールに割り当て、ユーザをロールに割り当てることで、アクセスを制御するモデル
tags: [word]
date: 2025-06-15
---

## TL;DR

権限をロールに割り当て、ユーザをロールに割り当てることで、アクセスを制御するモデル。ユーザごとに権限を管理する代わりに、職務に対応するロールを単位にする。

## なぜ必要か

NIST によると、RBAC を使うと、組織の構造に近い単位でセキュリティを管理できる。管理者はユーザごとのアクセス制御リストを保つ必要がなく、職務ごとに必要な操作を決め、従業員を適切なロールに割り当てればよい。

## 仕組み

ユーザは 1 つ以上のロールに割り当てられ、ロールには 1 つ以上の権限が割り当てられる。ユーザは、自分のロールに許された権限だけを使える。互いに排他的なロールやロールの階層といった複雑な部分は、RBAC のソフトウェアが扱う。

NIST の説明では、RBAC は 1992 年に David Ferraiolo と Rick Kuhn が形式化した。2000 年に Sandhu らの枠組みと統合されて NIST RBAC モデルとなり、2004 年に ANSI/INCITS 359-2004 として米国の国家規格になった。2012 年には INCITS 359-2012 として改訂されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[abac|ABAC]]
- [[access-control-models|Access Control Model の一覧]]
- [[cedar|Cedar]]

## 出典

- [Role Based Access Control - NIST CSRC](https://csrc.nist.gov/projects/role-based-access-control)
