---
title: DNS
aliases: [Domain Name System]
description: ドメイン名と IP アドレスを対応付けるシステム
tags: [word, ネットワーク]
date: 2024-11-12
---

## TL;DR

[[domain-name|ドメイン名]]と [[ip-address|IP アドレス]]を対応付けるシステム。ドメイン名から IP アドレスへの変換を正引き、その逆を逆引きと呼ぶ。

## 仕組み

DNS の情報を管理する DNS サーバはインターネット上にあり、ユーザが Web サイトにアクセスする直前に使われる。DNS は [[rfc|RFC]] 1034 と RFC 1035 の仕様に基づいて実装される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fqdn|完全修飾ドメイン名]]
- [[subdomain|サブドメイン]]
- [[host|ホスト]]

## 出典

- [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034)
- [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035)
