---
title: Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで › importブロックを使いこなす
description: v1.5.0 で追加された import ブロックを使い、既存リソースから HCL のコードを生成してステートに取り込む方法を説明する章
tags: [book-chapter, terraform]
date: 2025-10-24
book: "[[Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで]]"
chapter: 8
---

## TL;DR

- `import` ブロックは v1.5.0 で追加され、既存のリソースから HCL のコードを生成してステートに取り込める。
- 既存リソースの取り込みだけでなく、新しく `.tf` ファイルを書くときの手本としても使える。

## 内容

### import ブロック以前の取り込み方

`import` ブロックが登場する前は、まず `terraform import` で既存のリソースを[[terraform-state|ステート]]に取り込んだ。その後、`terraform plan` を繰り返しながら、差分がなくなるまで設定を書き足していた。

### import ブロックを使った取り込み方

`import` ブロックでリソースの識別子と取り込み先のリソースのパスを指定して `terraform plan` を実行すると、既存のリソースから [[hcl|HCL]] のコードを生成できる。手順は次のとおり。

1. `import` ブロックを書く
2. `terraform plan -generate-config-out=<出力先ファイル名>.tf` を実行する
3. 生成されたコードを確認する
4. `terraform apply` で既存のリソースをステートに取り込む

```hcl
import {
  to = aws_scheduler_schedule.schedule
  id = "default/sample-scale-up"
}
```

```sh
terraform plan -generate-config-out=generated.tf
```

### もう 1 つの使い道

`import` ブロックは、設定の書き方が分からないときにも役に立つ。Terraform Registry にあるプロバイダのドキュメントやサンプルだけでなく、実際に作ったリソースから生成したコードを見ながら定義を進められる。

## キーワード

- [[terraform|Terraform]]
- [[terraform-state|ステート]]
- [[hcl|HCL]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
