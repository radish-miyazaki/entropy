---
title: Web Storage API
aliases: [Web Storage]
description: ブラウザにキーと値の組でデータを保存する API で、sessionStorage と localStorage がある
tags: [word, ブラウザ]
date: 2026-11-14
---

## TL;DR

[[web-browser|ブラウザ]]にキーと値の組でデータを保存する API。[[session-storage|sessionStorage]] と [[local-storage|localStorage]] の 2 つがある。

## なぜ必要か

MDN によると、Web Storage API を使うと、[[cookie|Cookie]] よりも直感的な方法でキーと値の組を保存できる。

## 仕組み

`Window.sessionStorage` と `Window.localStorage` が、それぞれ `Storage` オブジェクトを返す。`Storage` を通じて、オリジンとストレージの種類ごとにデータを保存・取得・削除する。

2 つの違いは、データを分ける単位と寿命である。sessionStorage はタブとオリジンごとに分かれ、タブを閉じるとデータが消える。localStorage はオリジンだけで分かれ、同じオリジンのドキュメントはすべて同じ領域を共有する。ブラウザを閉じて開き直してもデータが残る。

ストレージの内容が変わると、ドキュメントの `Window` で `storage` イベントが発生する。

## 注意点

MDN によると、どちらも同期的に動く。性能が求められる場面や大きなデータには、IndexedDB が勧められている。プライベートモードでは localStorage も sessionStorage と同じように扱われ、ブラウザやタブを閉じるとデータが消える。サードパーティ Cookie を無効にしていると、サードパーティの iframe からは Web Storage にアクセスできない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[local-storage|Local Storage]]
- [[session-storage|Session Storage]]
- [[cookie|Cookie]]
- [[same-origin-policy|同一オリジンポリシー]]

## 出典

- [Web Storage API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
