---
title: 完全修飾ドメイン名
aliases: [FQDN, Fully Qualified Domain Name]
description: ネットワークに接続された機器を識別するための、省略のない完全なドメイン名
tags: [word, ネットワーク]
date: 2024-11-13
---

## TL;DR

ネットワークに接続された機器を識別するための、省略のない完全な[[domain-name|ドメイン名]]である。英語では Fully Qualified Domain Name といい、FQDN と略す。

## 仕組み

ドメイン名の各ラベルは `.` で区切られる。FQDN は、ホスト名から最上位のドメインまでをすべてつなげて書いたものである。

RFC 8499 によると、FQDN は多くの場合「ノードのドメイン名」を明確に言い表したものである。厳密には長さ 0 のルートのラベルまで含むので、`www.example.net.` のように末尾にドットを付けて書く。

## 例

`www.example.com`

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[host|ホスト]]
- [[domain-name|ドメイン名]]
- [[dns|DNS]]
- [[url|URL]]

## 出典

- [RFC 8499: DNS Terminology](https://www.rfc-editor.org/rfc/rfc8499.html)
