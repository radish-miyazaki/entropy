---
title: HashiCorp Vault
aliases: []
description: トークン、パスワード、証明書、暗号鍵などのシークレットを保管し、アクセスを制御するツール
tags: [word, hashicorp]
date: 2026-07-09
---

## TL;DR

[[hashicorp|HashiCorp]] が提供する、シークレットにアクセスするためのツール。トークン、パスワード、証明書、暗号鍵などを保管し、アクセスを厳密に制御する。Google Cloud の Secret Manager のようなものである。

## なぜ必要か

公式ドキュメントによると、現代のソフトウェアはシークレットに頼って動いている。Vault はシークレットの管理を一か所に集め、オンプレミス、クラウド、その混在のどの環境でも、監査付きでアクセスを管理できるようにする。

## 仕組み

UI、CLI、HTTP API から使える。Key/Value のシークレットエンジンは、任意のシークレットを Vault のストレージバックエンドに保管する。Database のシークレットエンジンは、あらかじめ設定したロールに基づいて DB の認証情報を動的に生成する。Transit のシークレットエンジンは、転送中のデータを暗号化する「Encryption as a Service」を提供する。

公式ドキュメントによると、Vault は保存したデータを暗号化し、設定した認証・認可の方式でアクセスを制限する。クライアントが認証すると、Vault はリクエストを内部のエンティティとセキュリティポリシーに結び付けるアクセストークンを発行する。認証や認可が成功したかどうかにかかわらず、すべての操作は監査ログに残る。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ephemeral-resource|Ephemeral resource]]
- [[mint|ミント]]

## 出典

- [HashiCorp Vault](https://developer.hashicorp.com/vault)
- [What is Vault? - HashiCorp Developer](https://developer.hashicorp.com/vault/docs/what-is-vault)
