---
title: Terraform の基本ブロックを整理する
description: Terraform の terraform、provider、variable、locals、data、resource、ephemeral、module、output の各ブロックとメタ引数を、参照のしかたと state に残るかで整理した
tags: [blog, terraform]
date: 2026-07-08
draft: false
---

## TL;DR

- [[terraform|Terraform]] の基本ブロックを、渡す値、参照のしかた、[[terraform-state|state]] に残るかどうかで整理した。
- 値の参照には `var.`、`local.`、`data.`、`ephemeral.`、`module.` の接頭辞が付き、`resource` だけは接頭辞が付かない。
- 秘密情報は `ephemeral` で取得し、write-only 引数（`*_wo`）に渡すと、平文が state に残らない。

## 検証

### 前提: Terraform の考え方

Terraform のコードは宣言的である。実際にクラウドやサービスの API を呼び出すのは [[Terraformの教科書 第3章 Terraform プロバイダの紹介|プロバイダ]]で、型の接頭辞（`aws_`、`google_`、`random_` など）が、どのプロバイダの担当かを示す。

1 つのディレクトリにある `.tf` ファイルは、すべて連結して読まれる。`main.tf`、`variables.tf`、`outputs.tf` のような分け方は人間向けの慣習にすぎない。ただし例外もあり、`override.tf` と `*_override.tf` は他の設定を上書きする。

### 全体マップ

| グループ | ブロック            | 概要                               |
| -------- | ------------------- | ---------------------------------- |
| 設定     | terraform, provider | どのツール・接続先を使うか         |
| 入れる   | variable, locals    | 外から・内部で値を用意する         |
| 調べる   | data, ephemeral     | 既存のものを読む・その場で発行する |
| 作る     | resource, module    | 実体を作る・別モジュールを呼ぶ     |
| 出す     | output              | 結果を外へ公開する                 |

### terraform {}: ツール自体の設定

Terraform 本体のバージョン制約と、使うプロバイダの入手元とバージョンを宣言する。渡す値は `required_version`（制約の文字列）と `required_providers`（プロバイダの `source` と `version`）である。設定を書くだけで、参照する対象ではない。

```hcl
terraform {
  required_version = "~> 1.9"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }
}
```

### provider {}: 接続先と認証

どのリージョンやエンドポイントに、どの認証情報で接続するかを定義する。渡す値は、リージョン、認証情報、エンドポイントなど、そのプロバイダ固有の接続設定である。同じ種類のプロバイダを複数使うときは `alias` で区別する。`provider.<型>` の形では参照せず、`resource` や `module` に `provider = aws.us_east` や `providers = { aws = aws.us_east }` で渡す。

```hcl
provider "aws" {
  region = "ap-northeast-1"
}

# 同じ種類を複数使うときは alias で区別する
provider "aws" {
  alias  = "us_east"
  region = "us-east-1"
}
```

### variable {}: モジュールへの入力

呼び出し元、CLI、tfvars など、外から受け取る値の受け口である。渡す値は `type`、`default`、`description`、`validation`、`sensitive`、`nullable` で、自分の[[module|モジュール]]の中から `var.<名前>` で参照する。値は `module {}` ブロック、`*.tfvars`、`-var` オプション、環境変数 `TF_VAR_*` で与える。

```hcl
variable "instance_count" {
  description = "起動するインスタンス数"
  type        = number
  default     = 1

  validation {
    condition     = var.instance_count >= 1
    error_message = "1 以上を指定してください。"
  }
}
```

### locals {}: 内部の計算用の値

モジュールの中で使い回す計算結果に名前を付ける。外から渡すことも、外から見ることもできない。変数、関数、他のリソースの参照を組み合わせた任意の式を書け、`local.<名前>` で参照する。定義は複数形の `locals`、参照は単数形の `local` である。

```hcl
locals {
  name_prefix = "${var.project}-${var.environment}"
  common_tags = {
    Project   = var.project
    ManagedBy = "terraform"
  }
}
```

### data {}: 既存のものを読む

リソースを作らず、プロバイダが API を呼び出して既存の情報を取得する。渡す値は `most_recent`、`owners`、`filter` などの絞り込み条件で、`data.<型>.<名前>.<属性>` で参照する。結果は state に残り、主に plan と apply のリフレッシュの段階で読まれる。

```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-*-amd64-server-*"]
  }
}
```

### resource {}: 実体を作る

インフラの実体を作成、更新、削除して管理する、Terraform の主役である。渡す値はそのリソース固有の設定とメタ引数で、`<型>.<名前>.<属性>` のように接頭辞なしで参照する。state に残る。依存関係は参照から自動で決まり、次の例では AMI を読んでからインスタンスを作る。

```hcl
resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  tags          = local.common_tags
}
```

### ephemeral {}: 一時的に扱う

Terraform 1.10 から使える [[ephemeral-resource|Ephemeral resource]] は、秘密情報を発行・取得するが記録には残さない。値は実行中のメモリ上にだけ存在し、state に残らず、plan や apply の差分にも出ない。渡す値は生成の条件や取得のキーで、`ephemeral.<型>.<名前>.<属性>` で参照する。値を渡せる先も、他の ephemeral、`provider` の設定、write-only 引数（`*_wo`）のような記録に残らない場所に限られる。

```hcl
ephemeral "random_password" "db" {
  length  = 20
  special = true
}

# write-only 引数(_wo)に流し込むと state に残らないまま保存できる
resource "aws_secretsmanager_secret_version" "db" {
  secret_id                = aws_secretsmanager_secret.db.id
  secret_string_wo         = ephemeral.random_password.db.result
  secret_string_wo_version = 1
}
```

### module {}: 別のモジュールを呼ぶ

別のディレクトリにあるモジュールを呼び出して実行する。渡す値は `source`（場所）、`providers`（接続の受け渡し）、`count` や `for_each`、呼び出し先の variable の名前と値である。`source` がモジュール名とディレクトリを結び付け、そのディレクトリ内のすべての `.tf` が読まれる。`module.<名前>.<output 名>` で参照でき、見えるのは呼び出し先が `output` で公開したものだけである。

```hcl
module "network" {
  source = "./modules/network"

  vpc_cidr    = "10.0.0.0/16"
  environment = var.environment

  providers = {
    aws = aws.us_east
  }
}
```

### output {}: 外へ公開する

モジュールの結果を、呼び出し元や CLI の表示に公開する出口である。渡す値は `value`（公開する式）、`description`、`sensitive`（値を伏せる）である。呼び出し元からは `module.<モジュール名>.<output 名>` で参照し、ルートモジュールなら `terraform output` で表示できる。

```hcl
output "vpc_id" {
  value = aws_vpc.main.id
}

output "db_password" {
  value     = ephemeral.random_password.db.result
  sensitive = true
}
```

### メタ引数

`data`、`resource`、`module` に共通で使えるメタ引数がある。

| メタ引数             | 意味                         | 参照時                     |
| -------------------- | ---------------------------- | -------------------------- |
| count                | N 個作る、0 で無効にする     | `[0]` が必要（配列になる） |
| for_each             | map や set の要素ごとに 1 個 | `each.key` / `each.value`  |
| depends_on           | 順序を明示する               | —                          |
| provider / providers | 使う接続を指定する           | —                          |
| lifecycle            | 挙動の制御と事前チェック     | —                          |

`count` の例:

```hcl
resource "aws_instance" "bastion" {
  count         = var.enable_bastion ? 1 : 0
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
}
```

`for_each` の例:

```hcl
resource "aws_s3_bucket" "this" {
  for_each = toset(["logs", "assets", "backups"])
  bucket   = "${local.name_prefix}-${each.value}"
}
```

`lifecycle` の例:

```hcl
lifecycle {
  prevent_destroy = true
  ignore_changes  = [password]

  precondition {
    condition     = var.environment != "prod" || var.multi_az
    error_message = "prod では multi_az を有効に。"
  }
}
```

### 参照のしかたの早見表

| 定義                         | 参照の構文                   | 接頭辞           |
| ---------------------------- | ---------------------------- | ---------------- |
| variable "x"                 | `var.x`                      | `var.`           |
| locals { x }                 | `local.x`                    | `local.`（単数） |
| resource "T" "n"             | `T.n.attr`                   | なし             |
| data "T" "n"                 | `data.T.n.attr`              | `data.`          |
| ephemeral "T" "n"            | `ephemeral.T.n.attr`         | `ephemeral.`     |
| module "n"                   | `module.n.<output 名>`       | `module.`        |
| output "x"（呼び出し元から） | `module.<モジュール名>.x`    | —                |
| count 付き                   | `T.n[0]`                     | 添字             |
| for_each 付き                | `each.value` / `T.n["キー"]` | —                |

### state に残るか

| 分類               | ブロック・引数                    | state                  |
| ------------------ | --------------------------------- | ---------------------- |
| 実体・読み取り結果 | data, resource, module            | 残る（差分に出る）     |
| 秘密情報           | ephemeral, write-only 引数 `*_wo` | 残らない               |
| 値の受け渡し       | variable, locals, output          | インフラの実体ではない |
| 環境設定           | terraform, provider               | インフラでも値でもない |

トークン、パスワード、鍵などの秘密情報は、`ephemeral` で取得して `*_wo` 引数に渡せば、平文が state に残らない。

## キーワード

- [[terraform|Terraform]]
- [[terraform-provider|Terraform プロバイダ]]
- [[terraform-state|Terraform の state]]
- [[ephemeral-resource|Ephemeral resource]]
- [[module|モジュール]]
- [[Terraformの教科書 第3章 Terraform プロバイダの紹介|Terraform プロバイダの紹介]]
- [[Terraformの教科書 第3章 Terraform の変数を理解する|Terraform の変数を理解する]]
- [[Terraformの教科書 第3章 Terraform の出力を理解する|Terraform の出力を理解する]]
- [[Terraformの教科書 第3章 Terraform のデータを理解する|Terraform のデータを理解する]]
- [[Terraformの教科書 第3章 Terraform のリソースを理解する|Terraform のリソースを理解する]]
