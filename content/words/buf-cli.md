---
title: Buf CLI
aliases: []
description: Buf が開発した、Protocol Buffers の開発を楽にする CLI ツール
tags: [word, protocol-buffers]
date: 2024-09-27
---

## TL;DR

[[buf|Buf]] が開発した、[[protocol-buffers|Protocol Buffers]] の開発を楽にするための CLI ツール。コード生成、破壊的変更の検知、リンタ、フォーマッタなど、開発や保守に役立つ機能を持つ。

## 仕組み

[[protoc|protoc]] とは別の独自コンパイラを内蔵しており、protoc より高速に処理できる。設定は `buf.yaml` に書く。現在の設定ファイルの形式は v2 である。

## 例

Homebrew でインストールできる。

```sh
$ brew install bufbuild/buf/buf
$ buf --version
1.42.0
```

主なコマンドは次のとおり。

- `buf config init`: `buf.yaml` を生成する
- [[buf-generate|buf generate]]: コードを生成する
- [[buf-lint|buf lint]]: リンタ
- [[buf-format|buf format]]: フォーマッタ
- [[buf-breaking|buf breaking]]: 破壊的変更を検知する
- [[buf-curl|buf curl]]: [[grpc|gRPC]] サーバにリクエストを送る。[[grpcurl|gRPCurl]] に近い

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[buf|Buf]]
- [[buf-schema-registry|BSR]]
- [[protoc|protoc]]

## 出典

- [Buf CLI](https://buf.build/product/cli)
- [buf config init](https://buf.build/docs/reference/cli/buf/config/init)
- [Migrate to v2 configuration files](https://buf.build/docs/migration-guides/migrate-v2-config-files)
- https://zenn.dev/jy8752/articles/63f139ec228e96
