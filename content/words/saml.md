---
title: SAML
aliases: [Security Assertion Markup Language]
description: 認証・属性・認可の情報を XML のアサーションで表し、それを伝えるプロトコルを定めた、SSO や認証連携のための標準規格
tags: [word, 認証]
date: 2026-06-30
---

## TL;DR

認証・属性・認可に関する情報を XML でエンコードした「アサーション」と、それを伝えるプロトコルの構文と意味を定めた標準規格。OASIS（Organization for the Advancement of Structured Information Standards）が策定した。主に [[single-sign-on|SSO]] や認証連携（フェデレーション）に使う。

## 仕組み

SAML には 3 つの登場人物がいる。Subject（Principal）は認証される主体で、ユーザやコンピュータなど、ドメイン内で ID を持つエンティティである。[[idp|IdP]] は ID を管理し、ユーザを認証してアサーションを発行する。SP（Service Provider）は Subject がアクセスしたいサービスで、受け取ったアサーションを検証してアクセスを許可する。

構成要素は、アサーション、プロトコル、バインディング、プロファイルの 4 つである。アサーションは、IdP が認証・属性・認可のデータを SP に送るための XML で、IdP が署名する。認証ステータスやタイムスタンプ、名前、メールアドレスなどの属性を含み、次の 3 種類のステートメントで構成される。

- 認証ステートメント（`<AuthnStatement>`）
- 属性ステートメント（`<AttributeStatement>`）
- 認可判断ステートメント（`<AuthzDecisionStatement>`）

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[idp|IdP]]
- [[oidc|OIDC]]
- [[iam|IAM]]
- [[single-sign-on|SSO]]

## 出典

- [[Real World HTTP 第3版 ―歴史とコードに学ぶインターネットとウェブ技術]]
- [What is SAML and how does it work? - Stytch](https://stytch.com/blog/what-is-saml/)
