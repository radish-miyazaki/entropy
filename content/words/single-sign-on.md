---
title: シングルサインオン
aliases: [SSO]
description: 1 つのアカウントと認証器で、複数のアプリケーションにシームレスにアクセスできるようにする認証の仕組み
tags: [word, 認証, iam]
date: 2026-11-14
---

## TL;DR

1 つのアカウントとその認証器で、複数のアプリケーションにシームレスにアクセスできるようにする認証のプロセス。一般にフェデレーションのプロトコルで実装する。

## なぜ必要か

ユーザが一度認証すれば、ほかのサービスで再びログインを求められない。[[fim|FIM]] のノートでは、SSO を UX と認証機能を定義する概念としている。

## 仕組み

[NIST の用語集](https://csrc.nist.gov/glossary/term/single_sign_on)では、NIST SP 800-63-4 を出典として、SSO を「1 つのアカウントとその認証器を使って、複数のアプリケーションにシームレスにアクセスする認証のプロセス」と定義し、一般にフェデレーションのプロトコルで実装されるとしている。

## 例

- [[saml|SAML]] は主に SSO や認証連携（フェデレーション）に使う標準規格である
- [[keycloak|Keycloak]] は SSO に対応しており、一度ログインすれば複数のアプリケーションに再ログインなしでアクセスでき、ログアウトも一度で済む
- [[zitadel|ZITADEL]] は SSO を標準で備えた [[iam|IAM]] 基盤である

## 注意点

[[ldap|LDAP]] は SSO の文脈で出てくることが多いが、SSO のためのプロトコルではない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fim|FIM]]
- [[saml|SAML]]
- [[oidc|OIDC]]
- [[idp|IdP]]
- [[iam|IAM]]

## 出典

- [single sign-on - Glossary | CSRC](https://csrc.nist.gov/glossary/term/single_sign_on)
