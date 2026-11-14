---
title: Protocol Buffers
aliases: []
description: Google が 2008 年に OSS 化した IDL。データをバイナリ形式にシリアライズし、gRPC で使われる
tags: [word]
date: 2024-09-24
---

## TL;DR

Google が 2008 年に OSS として公開した [[interface-description-language|IDL]]。データをバイナリ形式に[[serialization|シリアライズ]]するので、サイズが小さく高速に通信できる。[[grpc|gRPC]] のシリアライズに使われている。

## なぜ必要か

型安全にデータをやり取りできる。また、特定のプログラミング言語に依存しないので、定義から各言語のコードを生成できる。

## 仕組み

`protoc` コマンドで各言語のコードを生成する。2024 年時点で公式にサポートしている言語は C++、C#、Java、[[kotlin|Kotlin]]、Objective-C、PHP、[[python|Python]]、[[ruby|Ruby]] である。それ以外の言語は、サードパーティのプラグインとして公開されている。スキーマを起点にコードを生成するので、[[schema-first|Schema first]] な開発ができる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[grpc|gRPC]]
- [[schema-first|Schema first]]
- [[protobuf-well-known-types|Well-Known Types]]
- [[buf-schema-registry|BSR]]

## 出典

- [Language Guide (proto 3)](https://protobuf.dev/programming-guides/proto3/)
- [Third-Party Add-ons for Protocol Buffers](https://github.com/protocolbuffers/protobuf/blob/main/docs/third_party.md)
