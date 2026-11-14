---
title: CDK for Terraform
aliases: [CDKTF]
description: 汎用のプログラミング言語でインフラを定義し、Terraform の設定に変換するツール
tags: [word, terraform, aws-cdk]
date: 2025-07-08
---

## TL;DR

HCL の代わりに、TypeScript、Python、Java、C#、Go といった汎用のプログラミング言語でインフラを定義できるツール。書いたコードは [[terraform|Terraform]] の設定に変換される。

## 仕組み

[[aws-cdk|AWS CDK]] の考え方とライブラリをもとに、コードを Terraform の設定に変換する。Terraform Registry にある任意のプロバイダやモジュールを使える。

使い方は次の 3 段階である。

1. 組み込みかカスタムのテンプレートからアプリケーションを作る
2. プロバイダやモジュールのスキーマから生成されたクラスを使ってリソースを定義する
3. `cdktf` CLI でデプロイする。または、コードを JSON の設定ファイルに合成（synthesize）し、Terraform で直接使う

## 注意点

2025 年 12 月 10 日に非推奨となり、HashiCorp はサポートとメンテナンスを終えている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[terraform|Terraform]]
- [[aws-cdk|AWS CDK]]

## 出典

- [CDK for Terraform](https://developer.hashicorp.com/terraform/cdktf)
- https://zenn.dev/yutaro1985/articles/cdktf-for-usual-terraform-users
