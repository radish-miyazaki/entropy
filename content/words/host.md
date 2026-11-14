---
title: ホスト
aliases: []
description: URL のオーソリティに含まれる、ネットワーク上の機器を表す完全修飾ドメイン名または IP アドレス
tags: [word, ネットワーク, url]
date: 2024-11-13
---

## TL;DR

[[url|URL]] のオーソリティに含まれる要素で、ネットワーク上の機器を表す [[fqdn|完全修飾ドメイン名]]（FQDN）または [[ip-address|IP アドレス]] のことである。英語では Host と呼ぶ。

## 仕組み

[RFC 1738](https://datatracker.ietf.org/doc/html/rfc1738#section-3.1) では、ホストを次のように定義している。

> The fully qualified domain name of a network host, or its IP address as a set of four decimal digit groups separated by ".".

つまり、ホストには `www.example.com` のような FQDN か、`.` で区切った 4 つの 10 進数の組で表す IP アドレスを書く。

URI の一般的な構文を定めた RFC 3986 では、オーソリティを `[ userinfo "@" ] host [ ":" port ]` と定義している。ホストには、角かっこで囲んだ IP リテラル（IPv6 アドレスなど）、ドット区切りの 10 進数で書いた IPv4 アドレス、DNS 名などの登録名のいずれかを書く。ホストは大文字と小文字を区別しないが、登録名は小文字で書くことが推奨されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[url|URL]]
- [[fqdn|完全修飾ドメイン名]]
- [[ip-address|IP アドレス]]
- [[port-number|ポート番号]]
- [[localhost]]
- [[host-header|Host]]

## 出典

- [URI - MDN](https://developer.mozilla.org/ja/docs/Web/URI#オーソリティ)
- [RFC 1738](https://datatracker.ietf.org/doc/html/rfc1738#section-3.1)
- [RFC 3986, Section 3.2.2: Host](https://www.rfc-editor.org/rfc/rfc3986.html#section-3.2.2)
