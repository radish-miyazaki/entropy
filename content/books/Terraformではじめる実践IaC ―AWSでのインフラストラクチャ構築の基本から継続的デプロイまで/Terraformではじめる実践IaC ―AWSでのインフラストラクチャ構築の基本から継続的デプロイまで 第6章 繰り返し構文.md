---
title: Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで 第6章 繰り返し構文
description: count と for_each の違いと、for_each で使う toset 関数を説明する章
tags: [book-chapter, terraform]
date: 2025-10-24
book: "[[Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで]]"
chapter: 6
---

## TL;DR

- `count` は数を渡してリソースを複製し、`for_each` は実際の値をキーにしてリソースを作る。
- 配列の値ごとにリソースを作るなら、破壊的変更を避けるために `for_each` を使う。

## 内容

[[terraform|Terraform]] の繰り返し構文では、リソースが作られる順序は保証されず、毎回変わる。

### count

`count` には `number` を渡し、リソースを複製する。

```hcl
resource "terraform_data" "count_echo" {
  count = 3
  provisioner "local-exec" {
    command = "echo \"Terraform calls ${count.index}\" >> echo.txt"
  }
}
```

配列を使って次のように書くこともできる。

```hcl
locals {
  name = ["taro", "hanako", "jiro"]
}

resource "aws_cloudwatch_event_rule" "sample" {
  count               = length(local.name)
  name                = element(local.name, count.index)
  schedule_expression = "rate(5 minutes)"
}
```

しかし、これは純粋なリソースの複製ではなく、同じコードを繰り返し使っているだけである。配列の途中の要素を消すと、インデックスがずれてリソースが作り直されるなどの破壊的変更が起こりうる。この場合は `for_each` を使うほうがよい。

### for_each

`for_each` は、`count` と違って実際の値をキーにして、繰り返しリソースを作る。

```hcl
locals {
  name = ["taro", "hanako", "jiro"]
}

resource "aws_cloudwatch_event_rule" "sample" {
  for_each            = toset(local.name)
  name                = each.value
  schedule_expression = "rate(5 minutes)"
}
```

`map` を繰り返すこともできる。

```hcl
locals {
  person = {
    taro   = { name = "taro", pref = "tokyo" }
    hanako = { name = "hanako", pref = "kanagawa" }
    jiro   = { name = "jiro", pref = "nagano" }
  }
}

resource "aws_cloudwatch_event_rule" "sample" {
  for_each            = { for p in local.person : p.name => p }
  name                = "${each.value.name}-${each.value.pref}"
  schedule_expression = "rate(5 minutes)"
}
```

### toset 関数

[`toset`](https://developer.hashicorp.com/terraform/language/functions/toset) は、`tuple` や `list` を `set` に変換する関数である。`set` は集合なので、要素に順序も重複もなく、すべての要素が同じ型を持つ。そのため `toset` で変換すると、要素の順序は失われ、重複した要素は 1 つにまとめられる。

## キーワード

- [[terraform|Terraform]]
- [[hcl|HCL]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
