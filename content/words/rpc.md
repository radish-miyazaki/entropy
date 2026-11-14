---
title: RPC
aliases: []
description: ネットワーク上の別の端末にある手続きを、メソッド名と引数を指定して呼び出す仕組み
tags: [word]
date: 2024-09-24
---

## TL;DR

ネットワーク上の別の端末にある手続きを呼び出して通信する仕組み。遠隔手続き呼び出しとも呼ぶ。

## 仕組み

[[rest-api|REST API]] では、パスと HTTP メソッドを指定してリソースを操作する。一方、RPC ではパスやメソッドを意識する必要はなく、**呼び出すメソッドの名前と引数を指定する**。

## 例

- [[grpc|gRPC]]
- JSON-RPC
- XML-RPC

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[grpc|gRPC]]
- [[connect-rpc|Connect]]
- [[rest-api|REST API]]

## 出典

- [RPC とは - IT用語辞典 e-Words](https://e-words.jp/w/RPC.html)
- [遠隔手続き呼出し - Wikipedia](https://ja.wikipedia.org/wiki/遠隔手続き呼出し)
