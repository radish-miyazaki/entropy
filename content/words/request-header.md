---
title: リクエストヘッダ
aliases: []
description: HTTP のリクエストに付け、リクエストの文脈やクライアントの情報をサーバに伝えるヘッダフィールド
tags: [word, http]
date: 2026-11-14
---

## TL;DR

クライアントが [[http|HTTP]] のリクエストに付けて送る[[header-field|ヘッダフィールド]]。リクエストの文脈、クライアントの情報、認証情報などをサーバに伝える。

## なぜ必要か

サーバは、リクエストの対象だけでなく、誰がどんな状況で送ったかを知ると、適切な応答を返せる。たとえば、ユーザエージェントの制限を避けたり、認証済みのクライアントにだけ応答したりできる。

## 仕組み

[RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html) の 3.4 節によると、リクエストのヘッダには、リクエストの修飾子、クライアントの情報、表現のメタデータを伝えるフィールドが入る。10.1 節では、リクエストの文脈（ユーザ、ユーザエージェント、リクエストの元になったリソースの情報）を伝えるフィールドとして、Expect、From、[[referer|Referer]]、TE、[[user-agent|User-Agent]] を定めている。

## 例

- [[user-agent|User-Agent]]: リクエストを送ったユーザエージェントの情報。サーバは相互運用性の問題の切り分けや、利用状況の分析に使う
- [[referer|Referer]]: リクエストの対象 URI を取得した元のリソースの URI。フィールド名は referrer の誤記のまま定められている
- [[authorization-header|Authorization]]: ユーザエージェントがオリジンサーバに対して自分を認証するための情報（11.6.2 節）

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[header-field|ヘッダフィールド]]
- [[representation-header|表現ヘッダ]]
- [[http-request|HTTP リクエスト]]

## 出典

- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
