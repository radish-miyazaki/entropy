---
title: buf curl
aliases: []
description: gRPC、gRPC Web、Connect のサーバにリクエストを送る Buf CLI のコマンド
tags: [word, grpc, protocol-buffers]
date: 2024-09-29
---

## TL;DR

[[grpc|gRPC]] サーバにリクエストを送る [[buf-cli|Buf CLI]] のコマンド。gRPC だけでなく、[[grpc-web|gRPC Web]] と [[connect-rpc|Connect]] のプロトコルにも対応している。

## 仕組み

使うプロトコルは `--protocol` で指定する。HTTPS でない URL に gRPC で送るときは、`--http2-prior-knowledge` も付ける。このフラグがないと [[http-1-1|HTTP/1.1]] が使われるが、gRPC には [[http2|HTTP/2]] が必要だからである。

## 例

```sh
$ buf curl --http2-prior-knowledge --protocol grpc \
  http://localhost:8080/radish.weather.v1.WeatherService/GetWeather
```

## 注意点

`--http2-prior-knowledge` を付けずに `http` の URL へ gRPC で送ると、次のエラーになる。

```
Failure: grpc protocol cannot be used with plain-text URLs (http)
unless --http2-prior-knowledge flag is set
```

サーバが Reflection API に対応していないと、次のエラーになる。

```
Failure: failed to resolve symbol "radish.weather.v1.WeatherService": unimplemented: HTTP status 404 Not Found
```

## 自分の理解

Connect なら [[curl|curl]] でも呼べるのでは、と思った。プロトコルごとにツールを使い分けなくてよいのが利点なのかもしれない。

## 関連

- [[grpcurl|gRPCurl]]
- [[buf-cli|Buf CLI]]

## 出典

- [buf curl - Usage](https://buf.build/docs/curl/usage)
- [buf curl - Reference](https://buf.build/docs/reference/cli/buf/curl)
