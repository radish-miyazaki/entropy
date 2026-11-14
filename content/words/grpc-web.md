---
title: gRPC Web
aliases: []
description: Web ブラウザから gRPC サーバと通信するためのライブラリとプロトコル
tags: [word, grpc]
date: 2024-09-27
---

## TL;DR

[[web-browser|Web ブラウザ]]から [[grpc|gRPC]] サーバと通信するためのライブラリとプロトコル。サポートするのは Unary RPC と Server streaming RPC だけである。

## なぜ必要か

ブラウザからは gRPC を直接呼べない。理由は 2 つある。

1 つ目は、gRPC は [[http2|HTTP/2]] を使うが、ブラウザは HTTP/2 の使用を強制できないことである。ブラウザは、サーバと HTTP/2 で通信できるときは HTTP/2 を使い、そうでなければ勝手に [[http-1-1|HTTP/1.1]] にフォールバックする。

2 つ目は、gRPC は [[http-trailer|HTTP Trailer]] を多用するが、ブラウザを含む多くの HTTP 実装がこれをサポートしていないことである。

## 仕組み

### HTTP/2 を強制できない問題

Envoy などのプロキシサーバを間に挟み、ブラウザからの HTTP/1.1 の通信を HTTP/2 に変換して gRPC サーバに渡す。

### HTTP Trailer を使えない問題

gRPC Web プロトコルでは、HTTP Trailer をレスポンスボディの末尾にエンコードして付ける。ただし、ほとんどの gRPC サーバは gRPC Web プロトコルをサポートしていないので、プロキシサーバで変換する。

[[buf|Buf]] が開発した [[connect-rpc|Connect]] で作った gRPC サーバは、gRPC Web プロトコルをサポートしている。そのため、プロキシを挟まずにブラウザと直接やり取りできる。

## 注意点

HTTP/1.1 でもストリーミングの受信はできるが、送信には HTTP/2 が必要になる。そのため、クライアントからストリーミングで送る RPC は使えない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[grpc|gRPC]]
- [[connect-rpc|Connect]]
- [[http2|HTTP/2]]
- [[http-trailer|HTTP Trailer]]

## 出典

- [grpc/grpc-web](https://github.com/grpc/grpc-web)
- [gRPC Web プロトコルの仕様（PROTOCOL-WEB.md）](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md)
- [Why do I need a proxy to call gRPC backends? - Connect](https://connectrpc.com/docs/faq/#why-do-i-need-a-proxy-to-call-grpc-backends)
- https://symthy.hatenablog.com/entry/2022/09/24/160309
- https://zenn.dev/nitaking/scraps/d0ce9fdaba5efb
- https://zenn.dev/jy8752/books/33743f8091c39d/viewer/2
- https://zenn.dev/daijinload/articles/14a77cd4ae3393
- https://qiita.com/SYM_simu/items/85d572e3520e98e09044
