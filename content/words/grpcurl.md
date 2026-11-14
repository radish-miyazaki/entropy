---
title: gRPCurl
aliases: []
description: gRPC サーバにリクエストを送る CLI のクライアントツール
tags: [word, grpc]
date: 2024-09-29
---

## TL;DR

[[grpc|gRPC]] サーバにリクエストを送る CLI のクライアントツール。gRPC 版の [[curl|curl]] のような位置づけである。

## 仕組み

gRPC はバイナリの [[protocol-buffers|Protocol Buffers]] でやり取りするので、curl では扱えない。gRPCurl はリクエストを [[json|JSON]] で受け取り、Protocol Buffers に変換して送る。変換にはサービスの定義が必要で、gRPCurl は次の 3 つのどれかから定義を得る。

- サーバの Reflection API（既定）: 動いているサーバにスキーマを問い合わせる
- proto のソースファイル: `-proto` と、必要なら `-import-path` で渡す
- protoset ファイル: `protoc --descriptor_set_out` で作ったコンパイル済みの定義。スクリプトで何度も呼ぶときに速い

ストリーミングを含むすべての種類の RPC メソッドに対応している。[[tls|TLS]] と平文のどちらでも接続でき、クライアント証明書を使う相互 TLS にも対応している。`list` でサーバが公開しているサービスやメソッドの一覧を、`describe` でその定義を表示できる。

## 例

Homebrew でインストールできる。

```sh
$ brew install grpcurl
```

ローカルの gRPC サーバのメソッドを呼ぶ。

```sh
$ grpcurl --plaintext localhost:8080 radish.weather.v1.WeatherService.GetWeather
```

リクエストの本文は `-d` に JSON で渡す。`-d @` とすると標準入力から読む。ヘッダやメタデータは `-H name:value` で付ける。オプションはすべて、サーバのアドレスとメソッド名より前に書く。

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
