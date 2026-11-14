---
title: curl
aliases: []
description: URL を使ってサーバとデータをやり取りするコマンドラインツールとライブラリ
tags: [word, http, ネットワーク]
date: 2026-11-14
---

## TL;DR

URL を使って、サーバとの間でデータを送受信するコマンドラインツール。転送の機能はすべてライブラリの libcurl が担っている。

## 仕組み

curl のマニュアルによると、[[http|HTTP]]（HTTPS）のほか、FTP、SFTP、SMTP、IMAP、POP3、LDAP、MQTT、WebSocket など多くのプロトコルに対応している。ただし、ビルドによっては一部のプロトコルに対応していないことがある。

公式サイトによると、libcurl は自動車、テレビ、ルータ、プリンタ、携帯電話などに組み込まれ、200 億を超える環境で使われている。

## 例

`-H`（`--header`）で追加のヘッダを、`-d`（`--data`）で送るデータを指定する。HTTP で `-d` を使うと POST リクエストになる。

[[graphql|GraphQL]] のクエリは、`{"query": "..."}` を JSON のボディにして POST するだけで実行できる（[[graphql-query-with-curl|curl で GraphQL クエリを実行する]]）。

```sh
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "query { authors { name } }"}'
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[http|HTTP]]
- [[grpcurl|gRPCurl]]: gRPC 版の curl のような位置づけのツール
- [[buf-curl|buf curl]]

## 出典

- [[graphql-query-with-curl|curl で GraphQL クエリを実行する]]
- [curl - Tool and library for transferring data with URL syntax](https://curl.se/)
- [curl - How To Use](https://curl.se/docs/manpage.html)
