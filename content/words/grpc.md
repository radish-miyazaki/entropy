---
title: gRPC
aliases: []
description: Google が 2015 年に OSS 化した、Protocol Buffers と HTTP/2 を使う RPC のプロトコル
tags: [word, grpc]
date: 2024-09-07
---

## TL;DR

Google が 2015 年に OSS 化した、[[rpc|RPC]] のためのプロトコル。データ形式に [[protocol-buffers|Protocol Buffers]]、通信に [[http2|HTTP/2]] を使う。

## なぜ必要か

データをバイナリに[[serialization|シリアライズ]]して送るので、送信するデータ量が減り、高速に通信できる。型付きのデータをやり取りでき、特定の言語やプラットフォームにも依存しない。そのため、次のような場面に向いている。

- マイクロサービス間の通信: 複数の言語やプラットフォームで構成されることがある。バックエンドどうしであれば、gRPC の恩恵を多く受けられる
- モバイルのユーザが使うサービス: 通信量を減らせるので、通信容量の制限にかかりにくい
- 通信速度が求められる場面

## 仕組み

Protocol Buffers は [[interface-description-language|IDL]] の役割を持ち、定義からサーバとクライアントに必要なコードを自動生成できる。開発は [[schema-first|Schema first]] で進める。

1. Protocol Buffers のファイル（proto ファイル）を書く
2. proto ファイルをコンパイルして、サーバとクライアントのコードを生成する
3. 生成されたコードを使って、機能を実装する

公式に対応している言語は C#（.NET）、C++、Dart、[[go|Go]]、Java、[[kotlin|Kotlin]]、Node.js、Objective-C、PHP、[[python|Python]]、[[ruby|Ruby]] である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[protocol-buffers|Protocol Buffers]]
- [[connect-rpc|Connect]]
- [[grpc-web|gRPC Web]]
- [[buf|Buf]]
- [[grpcurl|gRPCurl]]

## 出典

- [gRPC](https://grpc.io/)
