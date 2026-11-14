---
title: UDP
aliases: [User Datagram Protocol]
description: IP の上で、少ないオーバーヘッドでデータグラムを送るためのプロトコル
tags: [word, ネットワーク]
date: 2024-11-17
---

## TL;DR

[[ip-address|IP]] の上で、アプリケーションが少ないオーバーヘッドでメッセージ（データグラム）を送るためのプロトコルである。User Datagram Protocol の略で、[RFC 768](https://datatracker.ietf.org/doc/html/rfc768) で定められている。

## 仕組み

UDP は、下位のプロトコルとして IP を前提にする。IP のプロトコル番号は 17 である。ヘッダは次の 4 つのフィールドからなる。

- 送信元ポート: 送信側のプロセスを表す。省略でき、使わないときは 0 にする
- 宛先ポート: 宛先の IP アドレスの中で、受信側のポートを表す
- 長さ: ヘッダとデータを合わせたオクテット数。最小値は 8
- チェックサム: 疑似ヘッダ、UDP ヘッダ、データを対象にした 16 ビットのチェックサム

## 注意点

RFC 768 は「delivery and duplicate protection are not guaranteed」としている。届くことも、重複しないことも保証されない。順序どおりに確実にデータを届けたいアプリケーションは [[tcp|TCP]] を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[tcp|TCP]]
- [[port-number|ポート番号]]

## 出典

- [RFC 768](https://datatracker.ietf.org/doc/html/rfc768)
