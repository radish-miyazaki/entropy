---
title: Date
aliases: []
description: ドキュメントの日時を指定する HTTP の一般ヘッダ
tags: [word, http]
date: 2024-11-05
---

## TL;DR

ドキュメントの日時を指定する [[http|HTTP]] の一般ヘッダ。1992 年版の [[http-0-9|HTTP/0.9]] から存在する。

## 仕組み

現在の HTTP の仕様である [[rfc|RFC]] 9110 によると、Date ヘッダはメッセージが作られた日時を表す。値は HTTP-date の形式で、送信側は IMF-fixdate の形で生成しなければならない。値には、メッセージを生成した日時のなるべく正確な近似を入れる。

時計を持つオリジンサーバは、2xx、3xx、4xx のレスポンスに Date ヘッダを必ず付ける。1xx と 5xx のレスポンスには付けてもよい。時計を持たないオリジンサーバは、Date ヘッダを生成してはならない。

時計を持つ受信側は、Date ヘッダのないレスポンスをキャッシュしたり転送したりするとき、受け取った時刻を記録して Date ヘッダを付け足さなければならない。

## 例

```http
Date: Tue, 15 Nov 1994 08:12:31 GMT
```

## 注意点

ユーザーエージェントはリクエストに Date ヘッダを付けてもよいが、サーバとの時計のずれを補正したいときのように、サーバに役立つ場合を除いて普通は付けない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[header-field|ヘッダフィールド]]

## 出典

- [Date - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Date)
- [Object Header lines - W3C](https://www.w3.org/Protocols/HTTP/Object_Headers.html#date)
- [RFC 9110 HTTP Semantics, 6.6.1. Date](https://www.rfc-editor.org/rfc/rfc9110.html#name-date)
