---
title: HMAC
aliases: [Hash Based Message Authentication Code]
description: 一方向ハッシュ関数を使ってメッセージ認証コード（MAC）を作る方式
tags: [word, セキュリティ]
date: 2024-09-25
---

## TL;DR

Hash Based Message Authentication Code の略。[[cryptographic-hash-function|一方向ハッシュ関数]]を使って、[[message-authentication-code|メッセージ認証コード]]（MAC）を作る方式である。

## 仕組み

使う一方向ハッシュ関数は、1 種類に決まっていない。SHA-1、SHA-224、SHA-256、SHA-384、SHA-512 など、さまざまな関数を使える。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[message-authentication-code|メッセージ認証コード]]
- [[cryptographic-hash-function|一方向ハッシュ関数]]
