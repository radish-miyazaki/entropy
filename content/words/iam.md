---
title: IAM
aliases: [Identity and Access Management]
description: 誰が・何に・どうアクセスできるかを管理する枠組み全体
tags: [word, 認証]
date: 2026-07-02
---

## TL;DR

誰が・何に・どうアクセスできるかを管理する枠組み全体。適切な人やモノが、適切なリソースに、適切なタイミングでアクセスできることを保証するのが目的である。

## 仕組み

IAM は、ユーザプロビジョニング、[[rbac|RBAC]]、認証、認可、ガバナンスまでを含む。[[idp|IdP]] はその一部で、「誰であるか（認証）」を担当するコンポーネントである。

NIST の用語集が引く SP 800-175A では、アイデンティティ管理を、企業などのシステムの中で個々のアイデンティティを管理することと広く説明している。企業の IT では、ロールとアクセス権限を確立し、管理することを指す。

## 例

- [[zitadel|ZITADEL]]
- [[keycloak|Keycloak]]

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[idp|IdP]]
- [[rbac|RBAC]]

## 出典

- [identity and access management - NIST CSRC Glossary](https://csrc.nist.gov/glossary/term/identity_and_access_management)
