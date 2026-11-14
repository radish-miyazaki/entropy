---
title: Connect
aliases: []
description: Buf が開発した、ブラウザと gRPC 互換の HTTP API を作るためのライブラリ群
tags: [word, grpc]
date: 2024-09-07
---

## TL;DR

[[buf|Buf]] が開発した、Web ブラウザと [[grpc|gRPC]] に互換性のある [[http|HTTP]] API を作るためのライブラリ群。gRPC、[[grpc-web|gRPC Web]]、独自の Connect の 3 つのプロトコルに対応している。

## なぜ必要か

gRPC Web では、ブラウザから gRPC を使うために Envoy などのプロキシサーバを経由する必要があった。Connect では、ブラウザが直接サーバと通信できる。

## 仕組み

gRPC、gRPC Web、Connect の 3 つのプロトコルをサポートする、マルチプロトコルのライブラリである。対応している言語は [[go|Go]]、Node.js（[[javascript|JavaScript]]、[[typescript|TypeScript]]）、Swift、[[kotlin|Kotlin]] である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[grpc|gRPC]]
- [[grpc-web|gRPC Web]]
- [[buf|Buf]]
- [[buf-curl|buf curl]]

## 出典

- [Connect](https://connectrpc.com/)
- [Introduction - Connect](https://connectrpc.com/docs/introduction)
