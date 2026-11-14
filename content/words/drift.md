---
title: Drift
aliases: []
description: Terraform で、State ファイルと実際のインフラとの間に生じた不整合
tags: [word, terraform]
date: 2026-07-09
---

## TL;DR

[[terraform|Terraform]] で、State ファイルと実際のインフラとの間に生じた不整合のこと。

## なぜ必要か

HashiCorp のチュートリアルによると、ドリフトは主に、Terraform で管理しているリソースを誰かが手作業で変更したときに起きる。不整合を放置すると、Terraform が意図しない形で状態を合わせようとして、リソースを削除したり作り直したりすることがある。そのため、Terraform で管理しているリソースは手作業で変更しないことが推奨されている。

## 仕組み

`terraform plan -refresh-only` を実行すると、[[terraform-state|State]] と実際のインフラを比べて差分を表示する。このコマンドは何も変更しない。`terraform apply -refresh-only` は、承認すると検出した差分を State に書き込む。どちらも、インフラを設定ファイルに合わせて変更することはしない。

ドリフトを解消する方法は 2 つある。1 つは `apply -refresh-only` で State を実際のインフラに合わせる方法である。ただし設定ファイルは変わらないので、次に通常の `apply` を実行すると手作業の変更は元に戻る。もう 1 つは、設定ファイルを実際のインフラに合わせて書き換え、管理外のリソースを `terraform import` で取り込む方法である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[terraform|Terraform]]
- [[terraform-state|ステート]]

## 出典

- [Manage resource drift - Terraform - HashiCorp Developer](https://developer.hashicorp.com/terraform/tutorials/state/resource-drift)
