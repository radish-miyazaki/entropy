---
title: HTTP/1.1
aliases: []
description: 1997 年に RFC 2068 で発表された HTTP のバージョンで、持続的接続とパイプライン化を導入した
tags: [word, http]
date: 2024-09-30
---

## TL;DR

1997 年に RFC 2068 で発表された [[http|HTTP]] の標準バージョン。[[persistent-connection|持続的接続]]（Keep-Alive）とパイプライン化を導入した。

## なぜ必要か

[[http-1-0|HTTP/1.0]] では、1 つの [[tcp|TCP]] 接続で 1 つのリクエストと 1 つのレスポンスしか処理しなかった。TCP は、データを送る前に 3 回のやり取り（ハンドシェイク）で接続を確立する。そのため、1 つのページにある画像、JavaScript、CSS などを取りに行くたびに接続を張ると、性能が落ちる。

## 仕組み

### 持続的接続

TCP 接続を再利用して、複数のリクエストとレスポンスを処理する。リソースごとに TCP 接続を確立する必要がなくなった。

### パイプライン化

1 つの TCP 接続で、レスポンスを待たずに複数のリクエストを送る。

## 注意点

パイプライン化では、サーバはリクエストを受けた順にレスポンスを返す必要がある。そのため、1 つのレスポンスが遅れたり失われたりすると、それ以降のレスポンスも使えなくなる（[[head-of-line-blocking|HOL ブロッキング]]）。この問題は TCP 自体でも起こり、[[http-3|HTTP/3]] は QUIC でこれを解決している。

一部のサーバやプロキシがパイプライン化をサポートしていないこともあり、今はあまり使われない。代わりに [[http2|HTTP/2]] のマルチプレキシングが使われる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[http-1-0|HTTP/1.0]]
- [[http2|HTTP/2]]
- [[http-3|HTTP/3]]

## 出典

- [RFC 2068](https://datatracker.ietf.org/doc/html/rfc2068)。その後、1999 年に [RFC 2616](https://datatracker.ietf.org/doc/html/rfc2616)、2014 年に [RFC 7230](https://datatracker.ietf.org/doc/html/rfc7230)〜[RFC 7235](https://datatracker.ietf.org/doc/html/rfc7235)、2022 年に [RFC 9110](https://datatracker.ietf.org/doc/html/rfc9110) で改訂された
- [HTTP の持続的接続 - Wikipedia](https://ja.wikipedia.org/wiki/HTTPの持続的接続)
- [HTTP パイプライン - Wikipedia](https://ja.wikipedia.org/wiki/HTTPパイプライン)
