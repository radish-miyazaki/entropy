---
title: Ephemeral resource
aliases: []
description: Terraform の実行中だけ存在し、state や plan ファイルに保存されない一時的なリソース
tags: [word, terraform]
date: 2026-07-08
---

## TL;DR

[[terraform|Terraform]] の操作中だけ存在する一時的なリソース。`state` や `plan` ファイルに保存されない。v1.10 以降で使える。

## なぜ必要か

パスワードや接続情報など、永続化したくないデータを扱うために使う。従来は data source で一時トークンを取得していたが、data source は値を state に保存してしまう。ephemeral resource は永続化しないので、この問題を避けられる。

## 仕組み

### ライフサイクル

Open →（Renew）→ Close の順で処理される。結果が必要になったときに Open で開き、リモートの有効期限を超えて必要なら Renew でプロバイダに更新を頼み、依存するプロバイダの処理が終わったら Close で閉じる。Renew と Close は必須ではない。たとえば [[hashicorp-vault|Vault]] のシークレットでは、Open でリースを取得し、Renew で延長し、Close でリースを終了して即時に失効させる。

### plan と apply

依存グラフのノードになり、resource や data source と同じように振る舞う。resource や data source が ephemeral の属性に依存していれば、ephemeral を先にプロビジョニングする。入力引数が plan の時点で分からなければ、実行を apply まで遅らせる。apply の作成リソース数には数えられない。

### 参照できる場所

`ephemeral.<TYPE>.<LABEL>` の構文で参照する。参照できる場所は、managed resource の[[write-only-argument|write-only 引数]]、別の ephemeral ブロック、locals、`ephemeral = true` を付けた variable や output、provider の設定などに限られる。locals で参照すると、その locals の値も state と plan に保存されない。メタ引数は `count`、`for_each`（どちらか一方）、`depends_on`、`provider`、`lifecycle`（`precondition`、`postcondition`）が使える。

## 例

`random_password` の ephemeral resource が一時パスワードを作り、`password_wo` という write-only 引数に渡す。どちらも Terraform の実行の外には残らないので、値は state と plan から除外される。

```hcl
ephemeral "random_password" "db_password" {
  length           = 16
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "aws_db_instance" "example" {
  # ...
  password_wo         = ephemeral.random_password.db_password.result
  password_wo_version = 1
}
```

## 注意点

生成した値は保存されないので、失いたくない値は別のリソースに取り込んで保存する。

write-only 引数は ephemeral resource ではなく、managed resource 側の引数である。「state に残さない」点は同じだが別物で、両者を組み合わせて使うのが典型である。


%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[write-only-argument|write-only 引数]]
- [[terraform-basic-blocks|Terraform の基本ブロックを整理する]]
- [[hashicorp-vault|HashiCorp Vault]]

## 出典

- [Ephemeral values in resources](https://developer.hashicorp.com/terraform/language/manage-sensitive-data/ephemeral)
- [ephemeral block reference](https://developer.hashicorp.com/terraform/language/block/ephemeral)
- [Ephemeral resources (Plugin Development)](https://developer.hashicorp.com/terraform/plugin/framework/ephemeral-resources)
- [Use ephemeral resources in the Google Cloud provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/using_ephemeral_resources)
