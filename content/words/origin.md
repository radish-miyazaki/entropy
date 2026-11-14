---
title: オリジン
aliases: []
description: URI のスキーム、ホスト、ポート番号の組。ブラウザが権限やアクセスの範囲を決める単位になる
tags: [word, web, セキュリティ]
date: 2026-11-14
---

## TL;DR

URI の[[url-scheme|スキーム]]、[[host|ホスト]]、[[port-number|ポート番号]]の 3 つの組。[[web-browser|ブラウザ]]などのユーザエージェントが、権限やアクセスの範囲を決める単位として使う。RFC 6454 で定義されている。

## なぜ必要か

RFC 6454 によると、ユーザエージェントは異なるオリジンを互いに隔離し、オリジン間の通信を制御された形でだけ許す。ある URI のコンテンツが別の URI のオブジェクトにアクセスできるのは、2 つの URI が同じオリジンに属するときだけである。この考え方が[[same-origin-policy|同一生成元ポリシー]]である。

## 仕組み

URI からスキーム、ホスト、ポート番号を取り出し、その 3 つの組をオリジンとする。3 つがすべて一致すれば同じオリジン、1 つでも違えば別のオリジンになる。

## 例

RFC 6454 の例では、次の URI はすべて同じオリジンである。スキーム、ホスト、ポート番号がどれも同じになる。

```
http://example.com/
http://example.com:80/
http://example.com/path/file
```

次の URI は、上とはそれぞれ別のオリジンである。順にポート番号、スキーム、ホストが違う。

```
http://example.com:8080/
https://example.com:80/
http://www.example.com/
```

[[local-storage|Local Storage]] や [[session-storage|Session Storage]] のデータは、オリジンごとに保存される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[same-origin-policy|同一生成元ポリシー]]
- [[cors|CORS]]
- [[content-security-policy|Content Security Policy]]
- [[site-isolation|Site Isolation]]

## 出典

- [RFC 6454 - The Web Origin Concept](https://datatracker.ietf.org/doc/html/rfc6454)
