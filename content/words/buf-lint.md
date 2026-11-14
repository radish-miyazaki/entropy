---
title: buf lint
aliases: []
description: Protocol Buffers のスキーマを、Buf が定めたルールで静的解析する Buf CLI のコマンド
tags: [word, protocol-buffers]
date: 2024-09-29
---

## TL;DR

[[protocol-buffers|Protocol Buffers]] のスキーマを、[[buf|Buf]] が定めたルールで静的解析する [[buf-cli|Buf CLI]] のコマンド。

## 仕組み

警告は Buf が定義したルールに基づいて出る。デフォルトでは `STANDARD` ルール（以前は `DEFAULT` と呼ばれていた）が適用される。

設定は、ほかのコマンドと同じく `buf.yaml` に書く。このファイルは通常、スキーマのルートである `proto` ディレクトリと同じ階層に置く。必須ではなく、なければデフォルトの設定で実行される。

```yaml
version: v2
modules:
  - path: proto
    name: buf.build/tutorials/lint
lint:
  use:
    - STANDARD
```

## 例

`package weather;` で、enum の値に接頭辞がない proto ファイルに `buf lint` をかけると、次のような警告が出る。

```
proto/radish/weather/v1/weather.proto:3:1:Package name "weather" should be suffixed with a correctly formed version, such as "weather.v1".
proto/radish/weather/v1/weather.proto:6:3:Enum value name "SUNNY" should be prefixed with "CONDITION_".
proto/radish/weather/v1/weather.proto:6:3:Enum zero value name "SUNNY" should be suffixed with "_UNSPECIFIED".
proto/radish/weather/v1/weather.proto:21:18:RPC request type "Location" should be named "GetWeatherRequest" or "WeatherServiceGetWeatherRequest".
```

警告に従って直すと、次の形になる。直したあとに `buf lint` を実行すると、何も出力されず終了コード 0 で終わる。

```proto
syntax = "proto3";

// パッケージ名はディレクトリと一致させる
package radish.weather.v1;

enum Condition {
  // enum の 0 は <ENUM 名>_UNSPECIFIED にする
  // enum の値には <ENUM 名> の接頭辞を付ける
  CONDITION_UNSPECIFIED = 0;
  CONDITION_SUNNY = 1;
  CONDITION_RAINY = 2;
}

// リクエストメッセージは <RPC 名>Request にする
message GetWeatherRequest {
  float latitude = 1;
  float longitude = 2;
}
```

[[visual-studio-code|Visual Studio Code]] の拡張機能を入れると、警告がエディタ上に表示される。表示には `buf.yaml` が必要である。

## 注意点

### 警告を無効にする

`ignore_only` を使うと、ルールごと・ファイルごとに警告を無視できる。既存のプロダクトに Buf CLI を入れて大量の警告が出たときや、外部で公開されているモジュールに警告が出るときに使う。

```yaml
lint:
  use:
    - STANDARD
  ignore_only:
    ENUM_VALUE_PREFIX:
      - proto/radish/weather/v1/weather.proto
```

`--error-format=config-ignore-yaml` を付けて実行すると、警告を無視するために `buf.yaml` に書く内容が出力される。ただし v1.42.0 では、出力が `version: v1` の形で、パスも `proto` ディレクトリからの相対パスになっている。v2 では `buf.yaml` を `proto` ディレクトリと同じ階層に置くので、パスに `proto/` を足す必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[buf-format|buf format]]
- [[buf-breaking|buf breaking]]
- [[buf-cli|Buf CLI]]

## 出典

- [Lint - Overview](https://buf.build/docs/lint/overview)
- [buf lint - Reference](https://buf.build/docs/reference/cli/buf/lint)
- [Lint - Tutorial](https://buf.build/docs/lint/tutorial)
- [Lint rules](https://buf.build/docs/lint/rules)
- [buf.yaml v2 - lint](https://buf.build/docs/configuration/v2/buf-yaml#lint)
- [Migrate to v2 configuration files](https://buf.build/docs/migration-guides/migrate-v2-config-files#v2-configuration)
- [vscode-buf](https://marketplace.visualstudio.com/items?itemName=bufbuild.vscode-buf)
- https://zenn.dev/jy8752/books/33743f8091c39d/viewer/4
