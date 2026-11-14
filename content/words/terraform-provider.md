---
title: プロバイダ
aliases: []
description: Terraform がクラウドや SaaS などの API を操作するためのプラグイン
tags: [word, terraform]
date: 2026-11-14
---

## TL;DR

[[terraform|Terraform]] がクラウドや SaaS などの API を操作するためのプラグイン。プロバイダごとに、管理できる[[terraform-resource|リソース]]の種類と[[terraform-data-source|データソース]]が追加される。

## なぜ必要か

公式ドキュメントによると、Terraform はプロバイダなしではインフラを何も管理できない。API を持つサービスであれば、プロバイダを通じてほぼ何でも扱える。

## 仕組み

プロバイダは Terraform 本体とは別に配布され、独自のバージョン番号を持つ。公開されたプロバイダの主な置き場は [[terraform-registry|Terraform Registry]] で、作業ディレクトリを `terraform init` で初期化したときにインストールされる。プロバイダを変えたら、初期化し直す必要がある。

Registry では、プロバイダに保守する主体を表すバッジが付く。[[hashicorp|HashiCorp]] が保守する Official、技術パートナーが公開する Partner、コミュニティが公開する Community などがある。

## 注意点

`terraform init` で互換性のないバージョンが入らないよう、設定の中で使えるバージョンを制約しておく。依存関係のロックファイルは、使うプロバイダのバージョンを固定するので、バージョン管理に含める。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[terraform-registry|Terraform Registry]]
- [[terraform-resource|リソース]]
- [[terraform-data-source|データソース]]

## 出典

- [Providers - HashiCorp Developer](https://developer.hashicorp.com/terraform/language/providers)
