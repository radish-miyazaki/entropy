---
title: FIM
aliases: [Federation Identity Management, Federated Identity Management]
description: 複数の組織やドメインをまたいで、信頼関係に基づき認証情報を連携する仕組み
tags: [word, 認証]
date: 2026-06-30
---

## TL;DR

複数の組織やドメインをまたいで、信頼関係（trust relationship）に基づき認証情報を連携する仕組み。認証を自前で持たず、信頼できる別の主体（[[idp|IdP]]）に任せ、その結果を受け取って利用する。

## なぜ必要か

[[single-sign-on|SSO]] は、同じ組織・ドメインの中で、1 組の資格情報で複数のサービスにアクセスできるようにすることである。ユーザが一度認証すれば、ほかのサービスで再びログインを求められない。つまり SSO は、UX と認証機能を定義する概念である。

SSO だけでは、外部のユーザにアクセス権を与えるときに問題が起きる。自社の IdP に外部ユーザを作れば回避できるが、そのユーザの管理を自社が負うことになる。また、そのユーザが相手の企業を退職してアカウントが無効になったときなどに、同期する手間がかかる。

FIM は、複数の組織やドメインをまたいで、1 つのアイデンティティでサービスにアクセスできるようにする。認証とユーザ管理の責任を相手企業の IdP に負わせたまま連携できるので、この問題を解決できる。

## 仕組み

IdP とアプリは別々の組織・ドメインにあり、共有・重複するユーザは存在しない。両者の間では、プロトコルと暗号鍵に基づくサークル・オブ・トラストが成り立つ。実装に使うプロトコルには、[[saml|SAML]] 2.0、[[oidc|OIDC]]、[[oauth-2|OAuth 2.0]]、WS-Federation がある。

SSO との違いは、信頼境界（trust boundary）にある。SSO は 1 つの組織・ドメインの中で完結し、FIM は組織・ドメインの境界をまたぐ。

## 例

FIM と SSO を組み合わせたものに、フェデレーテッド SSO がある。FIM がドメイン間で IdP の信頼関係を確立し、SSO が認証に成功した後のシームレスなログイン体験を提供する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[single-sign-on|SSO]]
- [[idp|IdP]]
- [[saml|SAML]]
- [[oidc|OIDC]]

## 出典

- [OIDC vs SAML: When to Use Which](https://cloudevolvers.com/blog/oidc-vs-saml-when-to-use-which/)
- [Federated Identity vs Single Sign-On: Key Differences](https://auth0.com/blog/federated-identity-vs-single-sign-on-key-differences/)
