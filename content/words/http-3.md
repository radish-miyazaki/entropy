---
title: HTTP/3
aliases: []
description: 2022 年に RFC 9114 で発表された、QUIC を土台にする HTTP のバージョン
tags: [word, http]
date: 2024-09-30
---

## TL;DR

2022 年に RFC 9114 で発表された [[http|HTTP]] の標準バージョン。[[quic|QUIC]] プロトコルを土台にしている。

## なぜ必要か

[[http2|HTTP/2]] では、[[tcp|TCP]] の制約による遅延やブロッキングが問題になっていた。たとえば [[head-of-line-blocking|HOL ブロッキング]]では、送信側が受信側の確認応答を受け取るまで次のデータを送れない。

## 仕組み

QUIC は [[udp|UDP]] の上で通信するので、TCP より速く通信できる。QUIC は複数のストリームを独立して扱うので、HOL ブロッキングを避けられる。

UDP は TCP より信頼性が低いので、QUIC は次の機能を自分で持つ。

- パケットロスが起きたら、そのストリームだけを再送する
- シーケンス番号でデータの順序を保証する

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[http2|HTTP/2]]
- [[http-1-1|HTTP/1.1]]
- [[quic|QUIC]]

## 出典

- [RFC 9114](https://datatracker.ietf.org/doc/html/rfc9114)
- [[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側]]
- [[Real World HTTP 第3版 ―歴史とコードに学ぶインターネットとウェブ技術]]
- [Software Design 2023年10月号](https://gihyo.jp/magazine/SD/archive/2023/202310)
