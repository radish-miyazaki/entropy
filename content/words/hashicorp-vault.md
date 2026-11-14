---
title: HashiCorp Vault
aliases: []
description: トークン、パスワード、証明書、暗号鍵などのシークレットを保管し、アクセスを制御するツール
tags: [word, hashicorp]
date: 2026-07-09
---

## TL;DR

[[hashicorp|HashiCorp]] が提供する、シークレットにアクセスするためのツール。トークン、パスワード、証明書、暗号鍵などを保管し、アクセスを厳密に制御する。Google Cloud の Secret Manager のようなものである。

## 仕組み

UI、CLI、HTTP API から使える。Key/Value のシークレットエンジンは、任意のシークレットを Vault のストレージバックエンドに保管する。Database のシークレットエンジンは、あらかじめ設定したロールに基づいて DB の認証情報を動的に生成する。Transit のシークレットエンジンは、転送中のデータを暗号化する「Encryption as a Service」を提供する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ephemeral-resource|Ephemeral resource]]
- [[mint|ミント]]

## 出典

- [HashiCorp Vault](https://developer.hashicorp.com/vault)
