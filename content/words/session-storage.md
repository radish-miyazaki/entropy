---
title: Session Storage
aliases: []
description: タブやウィンドウを閉じると消える、タブごとにキーと値の組でデータを保存する Web Storage API の一種
tags: [word, web]
date: 2024-11-13
---

## TL;DR

[[web-storage-api|Web Storage API]] の一種。[[local-storage|Local Storage]] と同じくキーと値の組でデータを保存するが、タブやウィンドウを閉じるとデータが消える。

## 仕組み

Local Storage との違いは次の 2 点である。

- **ウィンドウやタブを閉じると、データが削除される。**
- 同じ[[origin|オリジン]]の同じタブ内のページでは共有されるが、**別のタブやウィンドウとは共有されない。**

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[local-storage|Local Storage]]
- [[cookie|Cookie]]

## 出典

- [HTML Standard - The sessionStorage getter](https://html.spec.whatwg.org/multipage/webstorage.html#dom-sessionstorage-dev)
