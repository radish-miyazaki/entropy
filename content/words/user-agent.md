---
title: User-Agent
aliases: []
description: クライアントが自分のアプリケーション名をサーバに伝える HTTP のリクエストヘッダ
tags: [word, http]
date: 2024-11-05
---

## TL;DR

クライアントからサーバに送る [[http|HTTP]] の[[request-header|リクエストヘッダ]]。クライアントが自分のアプリケーション名を入れる。

## 仕組み

1992 年版の [[http-0-9|HTTP/0.9]] から存在するヘッダである。

[[rfc|RFC]] 9110 によると、User-Agent はリクエストを送るユーザエージェントについての情報を持つ。サーバはこれを使って相互運用性の問題を見つけたり、レスポンスをユーザエージェントに合わせたりする。値は 1 つ以上のプロダクト（名前と、省略できる `/` 区切りのバージョン）と、括弧で囲んだコメントを並べたものである。

```
User-Agent = product *( RWS ( product / comment ) )
```

## 例

curl の場合は `curl/7.48.0` のような値が入る。

## 注意点

RFC 9110 では、送信側はプロダクトを特定するのに必要な情報だけを入れ、広告などの不要な情報を入れてはならない（MUST NOT）としている。細かすぎる値はリクエストの遅延を増やし、ユーザが望まないうちに識別されるリスクを高める。互換性を主張するために、他の実装のプロダクト名を使うことも勧めていない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[header-field|ヘッダフィールド]]
- [[referer|Referer]]
- [[authorization-header|Authorization]]

## 出典

- [User-Agent - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/User-Agent)
- [RFC 9110: HTTP Semantics - 10.1.5. User-Agent](https://www.rfc-editor.org/rfc/rfc9110.html#name-user-agent)
- [HTTP Request fields - W3C](https://www.w3.org/Protocols/HTTP/HTRQ_Headers.html#user-agent)
