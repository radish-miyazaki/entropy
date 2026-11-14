---
title: protoc-gen-doc
aliases: [proto-gen-doc]
description: .proto ファイルのコメントから HTML や Markdown などのドキュメントを生成する protoc のプラグイン
tags: [word, protocol-buffers]
date: 2024-09-30
---

## TL;DR

[[protocol-buffers|Protocol Buffers]] のコンパイラ [[protoc|protoc]] のプラグインで、`.proto` ファイルに書いたコメントからドキュメントを生成する。proto2 と proto3 の両方に対応している。

## 仕組み

出力形式として HTML、[[markdown|Markdown]]、DocBook、JSON が組み込まれている。Go のテンプレートファイルを渡せば、独自の形式でも出力できる。

protoc を実行するときに、出力先を `--doc_out` で、形式と出力ファイル名を `--doc_opt` で指定する。`--doc_opt` は `<形式>|<テンプレートファイル>,<出力ファイル名>` の形で書く。

## 例

`proto/` 以下のすべての `.proto` ファイルから、`doc/index.html` を生成する。

```sh
protoc --doc_out=./doc --doc_opt=html,index.html proto/*.proto
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[protocol-buffers|Protocol Buffers]]
- [[protovalidate]]

## 出典

- [pseudomuto/protoc-gen-doc](https://github.com/pseudomuto/protoc-gen-doc)
- [protoc-gen-doc で Protocol Buffers のドキュメントを生成する - まくろぐ](https://maku.blog/p/ikw7gpz/)
