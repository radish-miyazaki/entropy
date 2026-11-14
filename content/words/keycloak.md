---
title: Keycloak
aliases: [KEYCLOAK]
description: SSO や ID ブローカリング、ユーザフェデレーションを備えた OSS の IAM 製品
tags: [word, iam]
date: 2026-07-02
---

## TL;DR

OSS の [[iam|IAM]] 製品。[[oidc|OpenID Connect]]、[[oauth-2|OAuth 2.0]]、[[saml|SAML]] 2.0 という標準プロトコルに基づいている。Cloud Native Computing Foundation（CNCF）のインキュベーションプロジェクトである。

## 仕組み

[[single-sign-on|シングルサインオン]]に対応しており、ユーザは Keycloak で一度ログインすれば、複数のアプリケーションに再ログインなしでアクセスできる。ログアウトも同じく一度で済む。

外部の OpenID Connect や SAML 2.0 の [[idp|IdP]] や、ソーシャルログインを使ったサインイン（ID ブローカリング）を、管理コンソールから設定できる。ユーザフェデレーションの機能もあり、既存の LDAP や Active Directory のサーバに接続できる。

管理者は管理コンソールで、アプリケーション、ID ブローカリング、ユーザフェデレーション、ユーザの権限やセッションを管理する。ユーザはアカウント管理コンソールで、プロフィールやパスワードの変更、二要素認証の設定、セッションの管理ができる。ロールベースより細かい認可ポリシーを定義する認可サービスもある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[zitadel|ZITADEL]]
- [[iam|IAM]]
- [[rbac|RBAC]]

## 出典

- [Keycloak](https://www.keycloak.org/)
