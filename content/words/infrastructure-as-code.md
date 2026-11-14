---
title: Infrastructure as Code
aliases: [IaC]
description: インフラを GUI での手作業ではなく、設定ファイル（コード）で管理する手法
tags: [word, インフラ]
date: 2026-11-14
---

## TL;DR

インフラを、管理コンソールなどの GUI で手作業で操作するのではなく、設定ファイル（コード）で管理する手法である。略して IaC と呼ぶ。

## なぜ必要か

[[Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで]] によると、同じコードからは同じ操作が実行されるので、作業の正確さが保たれる。コードを直せば、解釈のぶれなく次回から確実に反映される。管理コンソールの画面が変わるたびに手順書を直す手間もなくなる。

Terraform の公式チュートリアルでは、設定をバージョン管理にコミットして、インフラの変更を安全に共同作業できることも利点に挙げている。

## 仕組み

IaC のツールは、書き方で 2 つに分けられる。手続き型はインフラを構築する手順を書き、宣言型はリソースが最終的にどうなってほしいかを書く。Terraform は宣言型である。

適用範囲でも分けられる。Terraform や AWS CloudFormation はクラウドのリソースを、Ansible や Chef は OS より上のミドルウェアなどを、Docker はアプリケーションのパッケージングを受け持つ。これらは組み合わせて使える。

## 注意点

緊急時などには、管理コンソールから直接リソースを操作することも十分にありうるので、すべてを IaC に頼ればよいわけではない。リソースを IaC で管理するかどうかは、そのリソースを何度、どれくらいの頻度で作るかで判断する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [What is Infrastructure as Code with Terraform? - HashiCorp Developer](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code)
- [[Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで 第1章 Infrastructure as Code（IaC）とTerraform|Terraformではじめる実践IaC 第1章]]
