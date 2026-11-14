---
title: ステート
aliases: []
description: Terraform が、管理するインフラと設定の対応を記録したデータ
tags: [word, terraform]
date: 2026-11-14
---

## TL;DR

[[terraform|Terraform]] が、管理するインフラと設定の対応を記録したデータ。既定ではローカルの `terraform.tfstate` に保存される。

## なぜ必要か

公式ドキュメントによると、Terraform はステートを使って、リモートのシステムにあるオブジェクトと、設定で宣言した[[terraform-resource|リソース]]のインスタンスを対応づける。管理するオブジェクトのメタデータの追跡や、大きなインフラでの性能の改善にも使う。

## 仕組み

Terraform は操作の前にリフレッシュを行い、実際のインフラに合わせてステートを更新する。そのうえで、ステートと設定を比べて変更の内容を決める。

既定では、[[terraform-workspace|ワークスペース]]ごとのステートをローカルの `terraform.tfstate` に保存し、1 つ前のステートを `terraform.tfstate.backup` に残す。HashiCorp は、HCP Terraform かリモートのバックエンドにステートを置くことを勧めている。

## 注意点

ローカルに置くと、他人と共同作業しにくく、ファイルを失うとステートも失う。ステートには秘密の値が入ることがあるので、ロックやアクセス制御のない場所に置くと、データの消失や秘密の漏えいにつながる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[terraform-workspace|ワークスペース]]
- [[terraform-resource|リソース]]
- [[drift|Drift]]
- [[ephemeral-resource|Ephemeral resource]]

## 出典

- [State - HashiCorp Developer](https://developer.hashicorp.com/terraform/language/state)
