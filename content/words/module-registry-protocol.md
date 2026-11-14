---
title: Module Registry Protocol
aliases: []
description: Terraform CLI がモジュールのバージョン一覧とダウンロード先を調べるために使う、モジュールレジストリの API の仕様
tags: [word, terraform, hashicorp]
date: 2026-08-06
---

## TL;DR

[[terraform|Terraform]] CLI がモジュールのメタデータを調べ、インストールするモジュールのパッケージの場所を知るために使うプロトコル。[[hashicorp|HashiCorp]] が仕様を公開している。

## なぜ必要か

公開の Terraform Registry（`registry.terraform.io`）以外に、組織が自前のモジュールレジストリを立てられる。このプロトコルを実装すれば、自分が管理するホスト名でモジュールを公開し、Terraform CLI からそのまま使える。広く使ってもらうモジュールなら、公開の Terraform Registry に置くほうがよい。

## 仕組み

### モジュールのアドレス

モジュールのアドレスは `hostname/namespace/name/system` の形をとる。`hostname` はレジストリのホスト名、`namespace` はモジュールの所有者、`name` はモジュールが提供する抽象化の名前、`system` は対象のプラットフォーム（`aws` や `azurerm` など）である。`hostname` を省略すると `registry.terraform.io` になる。バージョンは [[semantic-versioning|セマンティックバージョニング]] 2.0 に従う。

### サービスディスカバリ

Terraform CLI は、まずホスト名に対してリモートのサービスディスカバリを行い、`modules.v1` の値を API のベース URL として受け取る。以下のエンドポイントのパスは、このベース URL からの相対パスである。

### エンドポイント

- `GET :namespace/:name/:system/versions`: モジュールのバージョン一覧を JSON で返す。CLI はこれを使って、設定のバージョン制約に合うバージョンを選ぶ。モジュールがなければ `404 Not Found` を返す
- `GET :namespace/:name/:system/:version/download`: 成功すると、空のボディで `204 No Content` を返す。ダウンロード先は `X-Terraform-Get` ヘッダで返し、`module` ブロックの `source` 引数と同じ形式で書ける。ただし、別のモジュールレジストリのアドレスは指定できない

## 例

公開レジストリの `hashicorp/consul/aws` は、`registry.terraform.io/hashicorp/consul/aws` を省略した書き方である。

## 注意点

公開の Terraform Registry は、レジストリの UI で使う情報のために、HashiCorp の仕様ページに書かれた API に拡張を加えている。Terraform CLI はこの拡張を使わない。サードパーティのレジストリを使えるのは、Terraform CLI 0.11 以降に限られる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[hashicorp|HashiCorp]]
- [[terraform|Terraform]]

## 出典

- [Module Registry Protocol - Terraform - HashiCorp Developer](https://developer.hashicorp.com/terraform/internals/module-registry-protocol)
