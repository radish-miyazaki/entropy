---
title: buf breaking
aliases: []
description: Protocol Buffers のスキーマの破壊的変更を検知する Buf CLI のコマンド
tags: [word, protocol-buffers]
date: 2024-09-29
---

## TL;DR

[[protocol-buffers|Protocol Buffers]] のスキーマの[[breaking-change|破壊的変更]]を検知する [[buf-cli|Buf CLI]] のコマンド。

## 仕組み

変更前の状態を `--against` で指定し、今のスキーマと比べる。たとえば Git でコミットした状態と比べるときは `.git` を指定する。

設定は、ほかのコマンドと同じく `buf.yaml` に書く。`use` で検知に使うルールを指定でき、指定しなければ `FILE` が使われる。

```yaml
version: v2
breaking:
  use:
    - WIRE
    - FILE_NO_DELETE
```

## 例

コミット済みの proto ファイルで、enum の値 `CONDITION_RAINY = 2;` をコメントアウトしてから実行すると、削除が検知される。

```sh
$ buf breaking proto --against '.git'
proto/radish/weather/v1/weather.proto:5:1:Previously present enum value "2" on enum "Condition" was deleted.
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[buf-lint|buf lint]]
- [[buf-cli|Buf CLI]]
- [[breaking-change|破壊的変更]]

## 出典

- [Breaking change detection - Overview](https://buf.build/docs/breaking/overview)
- [buf breaking - Reference](https://buf.build/docs/reference/cli/buf/breaking)
- [Breaking change detection - Tutorial](https://buf.build/docs/breaking/tutorial)
- [Breaking change rules](https://buf.build/docs/breaking/rules)
- [buf.yaml v2 - breaking](https://buf.build/docs/configuration/v2/buf-yaml#breaking)
- https://zenn.dev/jy8752/books/33743f8091c39d/viewer/6
