---
title: CEL
aliases: [Common Expression Language]
description: Google が開発した、式を評価するための言語。チューリング完全ではなく、高速に評価できる
tags: [word]
date: 2024-09-30
---

## TL;DR

Google が開発した、値を評価する式を書くための言語。正式名は Common Expression Language。[[protovalidate]] のルールの記述に採用されている。

## なぜ必要か

式の評価のしかたを仕様として定めているので、異なるアプリケーションやプログラミング言語のあいだで、同じ式を同じ意味で扱える。主な用途として、セキュリティポリシーの記述や、システム間でやり取りするデータとしての式が挙げられている。

## 仕組み

CEL の式は線形時間で評価され、値を書き換えず、チューリング完全ではない。この制約は意図的なもので、同じようにサンドボックス化した JavaScript より桁違いに速く評価できるとしている。

## 例

口座の残高、または当座貸越の枠で引き出しをまかなえるかを判定する式。

```cel
account.balance >= transaction.withdrawal
    || (account.overdraftProtection
    && account.overdraftLimit >= transaction.withdrawal - account.balance)
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[protovalidate]]

## 出典

- [google/cel-spec](https://github.com/google/cel-spec)
