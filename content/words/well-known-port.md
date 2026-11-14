---
title: ウェルノウンポート
aliases: [Well Known Port]
description: TCP や UDP のポート番号のうち、サービスやプロトコルのために予約されている 0 番から 1023 番のポート番号
tags: [word, ネットワーク]
date: 2024-11-05
---

## TL;DR

IP による通信で使われる [[tcp|TCP]] や [[udp|UDP]] の[[port-number|ポート番号]]のうち、サービスやプロトコルが使うために予約されている 0 番から 1023 番のポート番号。

## 仕組み

どのポート番号をどのサービスが使うかは、[[iana|IANA]] のデータベースで管理されている。

[[rfc|RFC]] 6335 では、ポート番号を 3 つの範囲に分けている。0〜1023 番は System Ports（Well Known Ports）、1024〜49151 番は User Ports（Registered Ports）で、どちらも IANA が割り当てる。49152〜65535 番は Dynamic Ports（Private Ports、Ephemeral Ports）で、割り当てられない。System Ports の割り当ては User Ports より条件が厳しく、IETF Review か IESG Approval の手続きでしか認められない。

## 例

Web や FTP などのクライアントは、特別な指定がなければウェルノウンポートにアクセスする。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[port-number|ポート番号]]
- [[iana|IANA]]

## 出典

- [Service Name and Transport Protocol Port Number Registry - IANA](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)
- [RFC 6335](https://www.rfc-editor.org/rfc/rfc6335.html)
- [ウェルノウンポート - e-Words](https://e-words.jp/w/ウェルノウンポート.html)
