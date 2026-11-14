---
title: gRPCurl
aliases: []
description: gRPC サーバにリクエストを送る CLI のクライアントツール
tags: [word, grpc]
date: 2024-09-29
---

## TL;DR

[[grpc|gRPC]] サーバにリクエストを送る CLI のクライアントツール。gRPC 版の [[curl|curl]] のような位置づけである。

## 例

Homebrew でインストールできる。

```sh
$ brew install grpcurl
```

ローカルの gRPC サーバのメソッドを呼ぶ。

```sh
$ grpcurl --plaintext localhost:8080 radish.weather.v1.WeatherService.GetWeather
```

## 注意点

サーバが Reflection API に対応していないと、次のようなエラーになる。

```
Error invoking method "radish.weather.v1.WeatherService.GetWeather": failed to query for service descriptor "radish.weather.v1.WeatherService": server does not support the reflection API
```

`-protoset` に proto ファイルをビルドした結果を渡しても回避できるが、手元に proto ファイルが必要になる。

```sh
$ grpcurl -protoset <(buf build proto -o -) \
  -plaintext \
  -d '{"latitude": 1.0, "longitude": 1.0}' \
  localhost:8080 radish.weather.v1.WeatherService.GetWeather
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[buf-curl|buf curl]]
- [[grpc|gRPC]]

## 出典

- [fullstorydev/grpcurl](https://github.com/fullstorydev/grpcurl)
- https://qiita.com/KinjiKawaguchi/items/a4ccff65fd19e33a8621
