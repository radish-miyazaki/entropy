---
title: HTTP
aliases: []
description: Web ブラウザと Web サーバが通信するときの手順とフォーマットを定めたルール
tags: [word]
date: 2024-11-05
---

## TL;DR

[[web-browser|ブラウザ]]と Web サーバが通信するときの手順とフォーマットをルール化したもの。

## 仕組み

RFC 9110 は、HTTP を分散した協調型のハイパーテキスト情報システムのための、ステートレスなアプリケーション層のプロトコルと定義している。メッセージには、名前と値の組で情報を運ぶ[[header-field|ヘッダフィールド]]を付けられる。

RFC 9114 によると、[[http-1-1|HTTP/1.1]] はリクエストを並列に送るために複数の TCP 接続を開く。[[http2|HTTP/2]] はバイナリのフレームと多重化を加え、1 つの接続で並列にやり取りできるようにした。[[http-3|HTTP/3]] は、同じセマンティクスを QUIC の上で運ぶ。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[rfc|RFC]]
- [[ietf|IETF]]
- [[tcp|TCP]]
- [[header-field|ヘッダフィールド]]

## 出典

- [[Real World HTTP 第3版 ―歴史とコードに学ぶインターネットとウェブ技術]]
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
- [RFC 9114: HTTP/3](https://www.rfc-editor.org/rfc/rfc9114.html)
