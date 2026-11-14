---
title: Terraform Registry
aliases: []
description: Terraform のプロバイダ、モジュール、ポリシーを探すための公開カタログ
tags: [word, terraform]
date: 2026-11-14
---

## TL;DR

[[terraform|Terraform]] の[[terraform-provider|プロバイダ]]、[[terraform-module|モジュール]]、ポリシーのライブラリを探すための公開カタログ。

## 仕組み

公式ドキュメントによると、Registry の内容は、[[hashicorp|HashiCorp]]、HashiCorp の信頼できるパートナー、Terraform のコミュニティのいずれかが保守している。公開者は [[github|GitHub]] のアカウントでサインインする。

`terraform init` を実行すると、Terraform は設定で指定されたプロバイダを Registry からダウンロードする。モジュールも `module` ブロックに `source` と `version` を書けば Registry から取得できる。

## 注意点

組織の中だけでモジュールを共有したいときは、公開の Registry ではなくプライベートレジストリを使う。HCP Terraform や Terraform Enterprise はプライベートレジストリを持っている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[terraform-provider|プロバイダ]]
- [[terraform-module|モジュール]]
- [[module-registry-protocol|Module Registry Protocol]]

## 出典

- [Terraform Registry - HashiCorp Developer](https://developer.hashicorp.com/terraform/registry)
- [Providers - HashiCorp Developer](https://developer.hashicorp.com/terraform/language/providers)
- [Modules overview - HashiCorp Developer](https://developer.hashicorp.com/terraform/language/modules)
