---
title: OTF
aliases: []
description: Terraform Enterprise の OSS の代替
tags: [word, terraform, oss, go]
date: 2026-08-06
---

## TL;DR

[[terraform|Terraform]] Enterprise の OSS の代替。[[single-sign-on|SSO]]、チーム管理、エージェントの機能を持ち、リソース単位の課金がない。ライセンスは MPL-2.0 で、[[hashicorp|HashiCorp]] とは関係がない。

## 仕組み

公式ドキュメントによると、OTF は OpenTofu にも対応している。通常の Terraform CLI から使え、Terraform Enterprise／Cloud の API の多くと互換がある。plan と apply は、サーバで実行するリモート実行モードと、エージェントで実行するエージェント実行モードから選べる。[[terraform-state|ステート]]は [[postgresql|PostgreSQL]] に保存し、必要な依存は PostgreSQL だけである。サーバは状態を持たないので、[[kubernetes|Kubernetes]] の Pod として複数並べて動かせる。

ほかに、git のコミットから run を起動したりモジュールを公開したりする VCS 連携、OIDC や OAuth によるシングルサインオン、チームごとのワークスペースへのアクセスを制御する [[rbac|RBAC]]、モジュールレジストリがある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[terraform|Terraform]]

## 出典

- [leg100/otf - GitHub](https://github.com/leg100/otf)
- [OTF Docs](https://docs.otf.ninja/)
