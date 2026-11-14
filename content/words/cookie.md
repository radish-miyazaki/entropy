---
title: Cookie
aliases: []
description: HTTP でサーバとブラウザの間の状態を管理する仕組みと、そのためにブラウザに保存される情報
tags: [word, web, http]
date: 2024-11-13
---

## TL;DR

[[http|HTTP]] で、サーバと[[web-browser|ブラウザ]]の間の状態を管理するための仕組み。または、そのためにブラウザに保存される情報を指す。主にセッション管理、ユーザ設定の保持、トラッキングに使われる。

## 仕組み

ブラウザが保存できる Cookie の数とサイズには制限がある。[[rfc|RFC]] 6265 は、ブラウザが満たすべき最低限の要件として、次の 3 つを定めている。

- 1 つのドメインにつき、少なくとも 50 個の Cookie を保存できること
- 全体で、少なくとも 3000 個の Cookie を保存できること
- 1 つの Cookie につき、少なくとも 4096 バイトを保存できること

## 注意点

RFC 6265 が定めるのは最低限の要件なので、実際の制限はブラウザの実装によって異なる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[local-storage|Local Storage]]
- [[session-storage|Session Storage]]
- [[cors|CORS]]
- [[csrf|CSRF]]

## 出典

- [RFC 6265 Section 6.1 Limits](https://datatracker.ietf.org/doc/html/rfc6265#section-6.1)
