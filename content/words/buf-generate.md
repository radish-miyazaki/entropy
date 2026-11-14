---
title: buf generate
aliases: []
description: Protocol Buffers のスキーマからコードを生成する Buf CLI のコマンド
tags: [word, protocol-buffers]
date: 2024-09-29
---

## TL;DR

[[protocol-buffers|Protocol Buffers]] のスキーマからコードを生成する [[buf-cli|Buf CLI]] のコマンド。生成には `buf.gen.yaml` が必要である。

## 仕組み

### buf.gen.yaml

コード生成のための設定ファイルで、`buf.yaml` と同じくワークスペースのルートに置く。出力する言語、使うプラグイン、[[protoc|protoc]] に渡していたオプションなどを指定できる。

```yaml
version: v2
plugins:
  - protoc_builtin: cpp
    out: gen/cpp
```

プラグインはローカルにインストールして使う（Local plugins）こともできるし、インストールせずに使う（Remote plugins）こともできる。Remote plugins の実体は [[buf-schema-registry|BSR]] で管理されている。

### Managed mode

proto ファイルには、生成するコードのパッケージ名など、言語ごとのオプションがある。これらは proto ファイルに書くので、クライアント側のコード生成のためのオプションまで、スキーマの作成者が書くことになる。

```proto
option java_multiple_files = true;
option java_outer_classname = "WeatherProto";
option java_package = "com.acme.weather.v1";
```

Managed mode を使うと、こうしたオプションを proto ファイルから取り除き、`buf.gen.yaml` 側で指定できる。スキーマの設計者は API の設計に集中できる。有効にするには `managed.enabled` を `true` にし、値は `managed.override` で指定する。

```yaml
version: v2
managed:
  enabled: true
  override:
    - file_option: go_package_prefix
      value: github.com/acme/weather/gen/go
```

## 例

Remote plugins で [[go|Go]] のコードを生成する。`go_package` を指定していない proto ファイルで実行すると、Go のインポートパスが決まらずに失敗する。

```
Failure: plugin "buf.build/protocolbuffers/go:v1.34.2" exited with non-zero status 1: protoc-gen-go: unable to determine Go import path for "radish/weather/v1/weather.proto"
```

proto ファイルに `go_package` を足す代わりに、Managed mode で指定すれば成功する。`opt: paths=source_relative` は、生成したファイルを proto ファイルからの相対パスに置くためのオプションである。[[grpc|gRPC]] のサーバのコードも生成するなら、`buf.build/grpc/go` を足す。

```yaml
version: v2
managed:
  enabled: true
  override:
    - file_option: go_package_prefix
      value: github.com/acme/weather/gen
plugins:
  - remote: buf.build/protocolbuffers/go
    out: gen/go
    opt: paths=source_relative
  - remote: buf.build/grpc/go
    out: gen/go
    opt: paths=source_relative
```

```sh
$ buf generate proto
```

生成したコードで gRPC サーバを立てれば、[[buf-curl|buf curl]] や [[grpcurl|gRPCurl]] で動作を確かめられる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[buf-cli|Buf CLI]]
- [[buf-schema-registry|BSR]]
- [[protoc|protoc]]

## 出典

- [Generate - Overview](https://buf.build/docs/generate/overview)
- [buf generate - Reference](https://buf.build/docs/reference/cli/buf/generate)
- [Generate - Tutorial](https://buf.build/docs/generate/tutorial)
- [buf.gen.yaml v2](https://buf.build/docs/configuration/v2/buf-gen-yaml)
- https://zenn.dev/jy8752/books/33743f8091c39d/viewer/7
