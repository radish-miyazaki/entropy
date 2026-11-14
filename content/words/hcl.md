---
title: HCL
aliases: [HashiCorp Configuration Language]
description: HashiCorp が開発した、人と機械の両方が扱いやすい構造化された設定言語を作るためのツールキット
tags: [word, terraform, iac]
date: 2026-11-14
---

## TL;DR

HashiCorp Configuration Language の略。人と機械の両方が扱いやすい、構造化された設定言語を作るためのツールキットで、主に DevOps のツールやサーバの設定に使われる。Terraform の設定ファイル（`.tf`）は HCL で書く。

## なぜ必要か

JSON や YAML はデータ構造をシリアライズするための形式であり、HCL は設定の形式を作るための構文と API である。HCL は汎用的なシリアライズ形式と、Ruby のような本格的なプログラミング言語の中間を目指している。

## 仕組み

HCL には、人が読み書きしやすいネイティブ構文と、JSON ベースの構文の 2 つがある。どちらも同じ設定のモデルに変換されるので、手で書いたネイティブ構文のファイルと、機械が生成した JSON のファイルを混ぜて使える。

ネイティブ構文では、算術、`"Hello, ${name}!"` のような文字列テンプレート、関数呼び出しなどの式を書ける。設定を読むアプリケーションは、期待する属性名やブロックの種類を宣言する。HCL はファイルがその構造に合っているかを確かめるので、分かりやすいエラーメッセージを出せる。

## 例

```hcl
io_mode = "async"

service "http" "web_proxy" {
  listen_addr = "127.0.0.1:8080"

  process "main" {
    command = ["/usr/local/bin/awesome-app", "server"]
  }
}
```

## 注意点

HCL v2 は HCL 1.0 と補間言語 HIL を 1 つの言語にまとめたメジャーバージョンで、Go の API は v1 と互換性がない。構文は似ているが、実装は別物である。[[Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで 第1章 Infrastructure as Code（IaC）とTerraform|Terraformではじめる実践IaC 第1章]] によると、Terraform は v0.13 以降は HCL v2 で書く。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [hashicorp/hcl - GitHub](https://github.com/hashicorp/hcl)
- [[Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで 第1章 Infrastructure as Code（IaC）とTerraform|Terraformではじめる実践IaC 第1章]]
