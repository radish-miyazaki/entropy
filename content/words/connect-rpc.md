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

Connect プロトコルは [[http|HTTP]] の上で動く RPC のプロトコルで、特定の HTTP バージョンに固有のフレーミングに依存しない。単項（リクエストとレスポンスが 1 つずつ）の RPC は、`/package.Service/Method` の形のパスへの POST リクエストで呼び出す。ボディは gRPC のようなバイナリのフレーミングを使わず、Protobuf か [[json|JSON]] のメッセージをそのまま入れる。双方向ストリーミングには [[http2|HTTP/2]] が必要だが、それ以外の RPC は [[http-1-1|HTTP/1.1]] でも使える。

## 例

公式ドキュメントでは、単項 RPC のやり取りを次のように示している。

```http
POST /connectrpc.greet.v1.GreetService/Greet HTTP/1.1
Host: demo.connectrpc.com
Content-Type: application/json

{"name": "Buf"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"greeting": "Hello, Buf!"}
```

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
- [Connect Protocol Reference](https://connectrpc.com/docs/protocol)
