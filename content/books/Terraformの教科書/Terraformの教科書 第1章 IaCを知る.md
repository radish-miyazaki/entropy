---
title: Terraformの教科書 第1章 IaCを知る
description: Terraform が Terraform Core と、RPC で呼び出される Plugin（Provider と Provisioner）から成ることと、terraform init による Plugin の取得とバージョン選択の流れをまとめた章
tags: [book-chapter, terraform]
date: 2026-07-07
book: "[[Terraformの教科書]]"
chapter: 1
---

## TL;DR

- [[terraform|Terraform]] は、本体の Terraform Core と、Core から [[rpc|RPC]] で呼び出される Terraform Plugin から成る。
- Plugin には、特定のサービス向けの Provider Plugin と、リソースの作成後などにスクリプトを実行する Provisioner Plugin がある。

## 内容

### Terraform Core

Terraform Core は [[go|Go]] で書かれ、コンパイルされたバイナリ（Terraform CLI）として配布される。主な責務は次のとおりである。

- [[infrastructure-as-code|IaC]] の構成ファイルとモジュールの読み込みと補間
- リソースの[[terraform-state|ステート]]管理
- リソースグラフの構築
- プランの実行
- RPC を使った Terraform Plugin の読み込み

### Terraform Plugin

Terraform Plugin は、Terraform Core から RPC で呼び出される実行可能バイナリである。メインの Terraform バイナリとは別のプロセスとして動き、RPC のインタフェースを通じてメインと通信する。大きく 2 種類に分かれる。

1 つ目は [[aws|AWS]] など特定のサービス向けの Provider Plugin（[[terraform-provider|プロバイダ]]）である。API 呼び出しで使うライブラリの初期化、インフラやプロバイダとの認証、サービスに対応するリソースの定義、設定値の計算を助ける関数の定義を受け持つ。

2 つ目は Provisioner Plugin である。リソースの作成後や破棄後に、そのリソース上でコマンドやスクリプトを実行する。

Provisioner Plugin は多くが組み込みで用意されている。Provider Plugin は必要に応じて動的に追加され、`terraform init` の実行時に自動でダウンロードされる。

### Plugin の取得とバージョン選択

`terraform init` を実行すると、Terraform は作業ディレクトリの構成ファイルを読み込んで必要な Plugin を判断する。次に、インストール済みの Plugin を探し、必要なら追加の Plugin をダウンロードして使うバージョンを決める。最後にロックファイル `.terraform.lock.hcl` を作成する。

Plugin が既にインストールされている場合は、構成ファイルに書かれたバージョン制約と比べて、次の順にバージョンを選ぶ。

1. 制約を満たすバージョンがインストール済みなら、それを使う
2. 制約を満たすバージョンがないが、[[hashicorp|HashiCorp]] が配布する Provider の 1 つであれば、[[terraform-registry|Terraform Registry]] から条件に合う最新のバージョンをダウンロードし、`.terraform/providers/` 以下に保存する
3. 制約を満たすバージョンがなく、Terraform Registry でも配布されていなければ失敗する。この場合は手動でインストールする

Plugin を新しいバージョンに上げるには、`terraform init` に `--upgrade` フラグを付ける。Terraform Registry をもう一度確認し、新しいバージョンがないかを調べる。ただし、対象は `.terraform/providers/` にある Plugin だけである。

## キーワード

- [[terraform|Terraform]]
- [[infrastructure-as-code|Infrastructure as Code]]
- [[rpc|RPC]]
- [[terraform-provider|プロバイダ]]
- [[terraform-state|ステート]]
- [[terraform-registry|Terraform Registry]]
- [[hashicorp|HashiCorp]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
