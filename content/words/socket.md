---
title: ソケット
aliases: [ソケットアドレス]
description: TCP/IP ネットワークで通信の送信元や送信先を識別するアドレスで、IP アドレスとポート番号の組で表す
tags: [word, ネットワーク]
date: 2024-11-15
---

## TL;DR

ソケットアドレスは、[[tcp|TCP]]/IP ネットワークで通信するときに、送信元や送信先を識別するためのアドレスである。通常は [[ip-address|IP アドレス]]と[[port-number|ポート番号]]の組で表す。

## 仕組み

[RFC 793](https://datatracker.ietf.org/doc/html/rfc793) では、ソケットを次のように説明している。

> An address which specifically includes a port identifier, that is, the concatenation of an Internet Address with a TCP port.

## 例

[[web-browser|ブラウザ]]が Web サーバに [[http-request|HTTP リクエスト]]を送るとき、ソケットアドレスは Web サーバの IP アドレスと、HTTP の標準のポート番号 `80` の組になる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ip-address|IP アドレス]]
- [[port-number|ポート番号]]
- [[tcp|TCP]]

## 出典

- [RFC 793](https://datatracker.ietf.org/doc/html/rfc793)
- [Understanding sockets - IBM Documentation](https://www.ibm.com/docs/ja/zos/2.3.0?topic=concepts-understanding-sockets)
