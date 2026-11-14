---
title: HMAC
aliases: [Hash Based Message Authentication Code]
description: 一方向ハッシュ関数を使ってメッセージ認証コード（MAC）を作る方式
tags: [word, セキュリティ]
date: 2024-09-25
---

## TL;DR

Hash Based Message Authentication Code の略。一方向ハッシュ関数を使って、[[message-authentication-code|メッセージ認証コード]]（MAC）を作る方式である。

## なぜ必要か

RFC 2104 によると、HMAC は、共有した秘密鍵を使ってメッセージの完全性を確かめる仕組みである。構成が特定のハッシュ関数の詳細に依存しないので、使うハッシュ関数を差し替えられる。

## 仕組み

使う一方向ハッシュ関数は、1 種類に決まっていない。SHA-1、SHA-224、SHA-256、SHA-384、SHA-512 など、さまざまな関数を使える。

RFC 2104 では、ハッシュ関数を H、秘密鍵を K、メッセージを text として、HMAC を `H(K XOR opad, H(K XOR ipad, text))` と定義している。ipad は 0x36 を、opad は 0x5C を、ハッシュ関数のブロック長 B バイト分並べた値である。鍵は B バイトまでの任意の長さでよく、それより長い鍵は先にハッシュをかけて使う。

## 注意点

RFC 2104 はハッシュ関数の出力長より短い鍵を、安全性を下げるので強く非推奨としている。鍵はランダムに選び、定期的に更新する必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[message-authentication-code|メッセージ認証コード]]
- 一方向ハッシュ関数

## 出典

- [RFC 2104: HMAC: Keyed-Hashing for Message Authentication](https://www.rfc-editor.org/rfc/rfc2104)
