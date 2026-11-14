---
title: JWT
aliases: [JSON Web Token]
description: 電子署名で改ざんを検知できる、認証用のトークンの形式
tags: [word, 認証]
date: 2024-09-13
---

## TL;DR

JSON Web Token の略。電子署名によって改ざんを検知でき、認証用のトークンとして使われる。

## なぜ必要か

JWT には次の利点がある。

- 改ざんを検知できる
- 有効期限を付けることで、安全なトークンを発行できる
- セッションと違い、状態をサーバで管理する必要がない
- 任意のデータを含められる

## 仕組み

JWT は Header、Payload、Signature の 3 つの要素を `.` でつないだものである。

- Header: ハッシュアルゴリズムの情報などを含むメタデータ
- Payload: 認証の対象となる情報。ユーザ名や ID など任意の情報を入れられる
- Signature: Header と Payload をそれぞれ Base64 でエンコードし、秘密鍵を使ってハッシュ化したもの

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cookie|Cookie]]

## 出典

- [JWT.io](https://jwt.io/)
- [Introduction to JSON Web Tokens](https://jwt.io/introduction)
