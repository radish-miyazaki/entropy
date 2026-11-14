---
title: Phluxor
aliases: []
description: PHP でアクターモデルを実現するためのツールキット
tags: [word, php, アクターモデル]
date: 2024-12-22
---

## TL;DR

[[php|PHP]] で[[actor-model|アクターモデル]]を実現するためのツールキット。Swoole の上で動く。

## 仕組み

メッセージのクラスは [[protocol-buffers|Protocol Buffers]] の定義から自動生成する。シリアライズとデシリアライズに Protocol Buffers を採用し、クラスタリングには [[grpc|gRPC]] を使うためである。

> Serialize / DeserializeにはProtocol Buffersを採用し、クラスタリングにはgRPCを利用します。

アクターの状態を[[persistence|永続化]]する仕組み（Persistent Actors）も備えている。

## 例

PHP カンファレンス 2024 で講演があり、デモのソースコードが公開されている。

- [講演のプロポーザル](https://fortee.jp/phpcon-2024/proposal/10b2afa2-d7a2-4b55-b443-d4fd1bce1638)
- [ytake/phpcon2024-actor-model](https://github.com/ytake/phpcon2024-actor-model)
- [ytake/phpcon2024-actor-model-impl](https://github.com/ytake/phpcon2024-actor-model-impl)

## 注意点

README には、まだ本番環境では使わないようにと書かれている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[actor-model|アクターモデル]]
- [[proto-actor|Proto.Actor]]
- [[tell-ask|Tell/Ask]]

## 出典

- [ytake/phluxor](https://github.com/ytake/phluxor)
- [Phluxor](https://phluxor.github.io/)
- [CodeZine の記事](https://codezine.jp/article/detail/20281)
