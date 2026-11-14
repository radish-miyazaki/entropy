---
title: ZITADEL
aliases: [Zitadel]
description: Go で実装された、開発者向けの OSS の IAM 基盤
tags: [word, iam, zitadel]
date: 2026-07-02
---

## TL;DR

開発者向けの OSS の [[iam|IAM]] 基盤。[[go|Go]] で実装されている。[[single-sign-on|SSO]]、MFA、[[passkey|パスキー]]、[[oidc|OIDC]]、[[saml|SAML]]、SCIM、マルチテナントを標準で備えている。

## 仕組み

API ファーストで設計されており、すべての機能を [[grpc|gRPC]] と [[rest-api|REST API]] で公開している。

Identity Brokering の機能を持ち、OIDC などの標準プロトコルで外部の [[idp|IdP]] と連携できる。各ユーザは 1 つの ZITADEL アカウントを持ち、そこに複数の外部アイデンティティをリンクできる。

提供形態は 2 つある。公式のマネージドなクラウドサービスである ZITADEL Cloud と、セルフホスティングである。

ドキュメントによると、データの階層の最上位はインスタンスである。ブランディング、ログインやパスワードのポリシーなどの既定値は、インスタンスで設定する。ふつうは 1 つのインスタンスが、1 つのドメインと 1 つの issuer を受け持つ。1 つのインスタンスには複数の組織を置け、社内の部署、法人の顧客、一般消費者のグループなどを表せる。インストールすると 1 つ目のインスタンスが作られ、system API で仮想インスタンスを足せる。法人の顧客がさらに自社の顧客を持ち、独自のドメインが要る場合に使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[keycloak|Keycloak]]
- [[iam|IAM]]
- [[Zitadel の Key Concepts を理解する|Zitadel の Key Concepts を理解する]]

## 出典

- [ZITADEL](https://zitadel.com/)
- [ZITADEL Docs](https://zitadel.com/docs)
- [Instance - ZITADEL Docs](https://zitadel.com/docs/concepts/structure/instance)
- [API リファレンス](https://zitadel.com/docs/apis/introduction)
- [zitadel/zitadel - GitHub](https://github.com/zitadel/zitadel)
