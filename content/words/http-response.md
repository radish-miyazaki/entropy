---
title: HTTP レスポンス
aliases: []
description: サーバがクライアントに返す HTTP メッセージで、ステータスライン、ヘッダ、ボディから成る
tags: [word, http]
date: 2026-11-14
---

## TL;DR

サーバが [[http-request|HTTP リクエスト]]に応えて返す [[http-message|HTTP メッセージ]]である。HTTP のバージョンとステータスコードを書いたステータスラインで始まり、ヘッダと任意のボディが続く。

## 仕組み

[RFC 9112](https://httpwg.org/specs/rfc9112.html) の定義では、[[http-1-1|HTTP/1.1]] のメッセージはスタートラインと CRLF で始まり、0 個以上のヘッダの行、ヘッダの終わりを示す空行、任意のメッセージボディが続く。レスポンスでは、スタートラインがステータスラインになる。

```text
status-line   = HTTP-version SP status-code SP [ reason-phrase ]
status-code   = 3DIGIT
```

ステータスラインは、プロトコルのバージョン、空白 1 文字、3 桁のステータスコード、空白 1 文字、理由フレーズの順に並ぶ。理由フレーズは省略できる。

## 例

[[http-message|HTTP メッセージ]]のページの例では、アクセスが成功したときのレスポンスは次のようになる。

```http
HTTP/1.1 200 OK
...

<!DOCTYPE html>
<html>
  ...
</html>
```

## 注意点

理由フレーズ（`OK` や `Not Found`）は人が読むためのものである。[[http-message|HTTP メッセージ]]のページにあるとおり、クライアントは理由フレーズの内容で挙動を変えてはいけない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[http-message|HTTP メッセージ]]
- [[http-request|HTTP リクエスト]]
- [[http|HTTP]]
- [[connection-header|Connection]]

## 出典

- [RFC 9112: HTTP/1.1](https://httpwg.org/specs/rfc9112.html)
- [[http-message|HTTP メッセージ]]
