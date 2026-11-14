---
title: OIDC
aliases: [OpenID Connect]
description: 認可フレームワークである OAuth 2.0 で認証を扱うための拡張プロトコル
tags: [word, 認証]
date: 2026-07-02
---

## TL;DR

認可フレームワークである [[oauth-2|OAuth 2.0]] で、認証を扱うための拡張プロトコル。OpenID Foundation が策定した。

## 仕組み

OpenID Connect Core 1.0 によると、OIDC は OAuth 2.0 の上に載るシンプルなアイデンティティレイヤである。クライアントは、認可サーバが行った認証に基づいて、エンドユーザの身元を確かめられる。

クライアントは、認可リクエストに `openid` スコープを含めることで、この拡張を要求できる。

大まかな流れは次のとおりである。

1. クライアント（Relying Party、RP）が OpenID Provider（OP）に認証リクエストを送る
2. OP がエンドユーザを認証し、認可を得る
3. OP が ID トークンと、通常はアクセストークンを返す
4. RP はアクセストークンを付けて UserInfo エンドポイントにリクエストを送る
5. UserInfo エンドポイントが、エンドユーザに関するクレームを返す

ID トークンは、OIDC が OAuth 2.0 に足した主な拡張で、認証に関するクレームを持つ [[jwt|JWT]] である。発行者を表す `iss`、発行者の中でエンドユーザを一意に識別する `sub`、受け取り手（RP の client_id）を表す `aud`、有効期限の `exp`、発行時刻の `iat` は必須のクレームである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[oauth-2|OAuth 2.0]]
- [[saml|SAML]]
- [[idp|IdP]]
- [[pkce|PKCE]]
- [[jwt|JWT]]

## 出典

- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
