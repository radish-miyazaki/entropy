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

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[keycloak|Keycloak]]
- [[iam|IAM]]
- [[zitadel-key-concepts|Zitadel の Key Concepts を理解する]]

## 出典

- [ZITADEL](https://zitadel.com/)
- [ZITADEL Docs](https://zitadel.com/docs)
- [API リファレンス](https://zitadel.com/docs/apis/introduction)
- [zitadel/zitadel - GitHub](https://github.com/zitadel/zitadel)
