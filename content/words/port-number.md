---
title: ポート番号
aliases: []
description: サーバ上の特定のサービスやアプリケーションにアクセスするために使う番号
tags: [word, ネットワーク]
date: 2024-11-13
---

## TL;DR

サーバ上の特定のサービスやアプリケーションにアクセスするために使う番号である。

## 仕組み

RFC 6335 によると、ポート番号には 2 つの役割がある。同じ 2 つのエンドポイント間の通信を区別することと、接続先のアプリケーションプロトコルやサービスを示すことである。ポート番号は 16 ビットの値なので、範囲は 0〜65535 になる。[[tcp|TCP]]、[[udp|UDP]]、SCTP、DCCP がポート番号を使う。

同 RFC では、ポート番号を次の 3 つの範囲に分けている。System Ports と User Ports は [[iana|IANA]] が割り当てて登録簿を管理し、Dynamic Ports は割り当てない。

- System Ports（Well Known Ports）: 0〜1023
- User Ports（Registered Ports）: 1024〜49151
- Dynamic Ports（Private Ports、Ephemeral Ports）: 49152〜65535。ローカルで動的に使うために取ってあり、サービスの識別には使わない

[[url|URL]] ではポート番号を省略できる。省略した場合は、プロトコルごとに決められたデフォルトのポート番号（[[well-known-port|ウェルノウンポート]]）が使われる。

## 例

[[http|HTTP]] のデフォルトのポート番号は `80` である。RFC 6335 によると、ポート番号は `http` のようなサービス名と対になっている。

## 注意点

RFC 6335 は、ポート番号の空間は有限なので、できるだけポート番号ではなくサービス名を使うことを推奨している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[well-known-port|ウェルノウンポート]]
- [[host|ホスト]]
- [[socket|ソケット]]
- [[tcp|TCP]]
- [[udp|UDP]]

## 出典

- [RFC 6335 - Internet Assigned Numbers Authority (IANA) Procedures for the Management of the Service Name and Transport Protocol Port Number Registry](https://www.rfc-editor.org/rfc/rfc6335.html)
