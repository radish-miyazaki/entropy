---
title: IdP
aliases: [Identity Provider]
description: アイデンティティを管理してユーザを認証し、結果をアサーションとして RP や SP に発行する、フェデレーションの中心となるエンティティ
tags: [word, 認証]
date: 2026-07-02
---

## TL;DR

フェデレーション（認証連携）の中心となるエンティティ。アイデンティティを作成・保存・管理し、ユーザを認証する。

## 仕組み

IdP は利用者の認証情報を管理し、認証を行った上で、その結果をアサーションとして信頼先の RP（Relying Party）や SP（Service Provider）に発行する。[[saml|SAML]] では、IdP が署名した XML のアサーションを SP が検証してアクセスを許可する。

NIST SP 800-63-4 の定義では、IdP は、フェデレーションの取引で利用者についてのアサーションを作成し、それを RP に送る当事者である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[iam|IAM]]: IdP は IAM のうち「誰であるか（認証）」を担当するコンポーネントである
- [[saml|SAML]]
- [[oidc|OIDC]]

## 出典

- [identity provider - NIST CSRC Glossary](https://csrc.nist.gov/glossary/term/identity_provider)
