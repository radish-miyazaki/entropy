---
title: モジュール
aliases: []
description: Terraform で、まとめて管理するリソースの集まり。構成を再利用する単位になる
tags: [word, terraform]
date: 2026-11-14
---

## TL;DR

[[terraform|Terraform]] がまとめて管理する[[terraform-resource|リソース]]の集まり。再利用できるモジュールを使うと、インフラの構築を標準化し、同じ構成を繰り返し作れる。

## 仕組み

公式ドキュメントによると、ワークスペースのルートディレクトリにある設定ファイルはルートモジュールと呼ばれる。`module` ブロックで呼び出すモジュールは子モジュールと呼ばれる。ルートモジュールは子モジュールを何度でも呼び出せ、子モジュールもさらに子モジュールを呼び出せる。

モジュールはローカルのファイルシステム、レジストリ、VCS のリポジトリから読み込める。公開されたモジュールは [[terraform-registry|Terraform Registry]] にあり、`source` と `version` を指定すると自動でダウンロードされる。モジュールの値は[[terraform-input-variable|入力変数]]で受け取り、[[terraform-output-value|出力値]]で外に公開する。呼び出し側は `module.<label>.<output>` の形で出力値を参照する。

## 例

```hcl
module "consul" {
  source  = "hashicorp/consul/aws"
  version = "0.1.0"
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[terraform-input-variable|入力変数]]
- [[terraform-output-value|出力値]]
- [[terraform-registry|Terraform Registry]]
- [[module-registry-protocol|Module Registry Protocol]]
- [[module|モジュール]]

## 出典

- [Modules overview - HashiCorp Developer](https://developer.hashicorp.com/terraform/language/modules)
- [module block reference - HashiCorp Developer](https://developer.hashicorp.com/terraform/language/block/module)
