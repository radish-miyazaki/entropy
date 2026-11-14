---
title: HTTP メッセージ
aliases: []
description: サーバとクライアントがデータを交換する手段で、HTTP リクエストと HTTP レスポンスの両方を指す言葉
tags: [word, http]
date: 2024-11-14
---

## TL;DR

サーバとクライアントがデータを交換する手段である。[[http-request|HTTP リクエスト]]と [[http-response|HTTP レスポンス]]の両方を指す言葉として使う。

## 仕組み

[[http-1-1|HTTP/1.1]] 以前のバージョンでは、HTTP メッセージは人間にも読める形式のままコネクション上を送られる。[[http2|HTTP/2]] からは、メッセージを HTTP フレームに分割して送ることで、性能を上げている。

HTTP メッセージは、スタートライン、ヘッダ、ボディの 3 つで構成される。

### スタートライン

リクエストではリクエストライン、レスポンスではステータスラインと呼ぶ。

リクエストラインは、[[http-method|HTTP メソッド]]、アクセスするリソース、HTTP のバージョンの 3 つを含む。[RFC 7230 3.1.1](https://datatracker.ietf.org/doc/html/rfc7230#section-3.1.1) では `request-line = method SP request-target SP HTTP-version CRLF` と定義されている。`SP` は空白 1 文字、`CRLF` は改行を表す。

ステータスラインは、HTTP のバージョン、[[status-code|ステータスコード]]、理由フレーズ（`OK` や `Not Found` など）の 3 つを含む。[RFC 7230 3.1.2](https://datatracker.ietf.org/doc/html/rfc7230#section-3.1.2) では `status-line = HTTP-version SP status-code SP reason-phrase CRLF` と定義されている。

### ヘッダ

スタートラインの次の行から、空行までの部分である。1 つの[[header-field|ヘッダフィールド]]は、`:` で区切った Key-Value の組で書く（[RFC 7230 3.2](https://datatracker.ietf.org/doc/html/rfc7230#section-3.2)）。

ヘッダは基本的に任意だが、HTTP/1.1 からはリクエストに [[host-header|Host]] ヘッダが必須になった。1 つの [[ip-address|IP アドレス]]と[[port-number|ポート番号]]で複数の Web サイトを運用しているとき、サーバは Host ヘッダの値でアクセス先の Web サイトを判断するからである。

ヘッダの順番に決まりはない。ただし [RFC 7230 3.2.2](https://datatracker.ietf.org/doc/html/rfc7230#section-3.2.2) は、サーバがメッセージを処理しないことをできるだけ早く判断できるよう、制御データを含むヘッダ（リクエストの `Host`、レスポンスの `Date`）を先に送ることを推奨している。

### ボディ

ヘッダの後の空行より後ろの部分である。`GET` リクエストのボディは RFC で意味が定められていないため、空であることが多い。`POST` や `PUT` リクエストには更新内容が入る。`GET` のレスポンスには、HTML などのリソースの内容が入る。

## 例

`http://example.com/index.html` にアクセスするリクエストは次のようになる。

```http
GET /index.html HTTP/1.1
Host: example.com
```

アクセスが成功したときのレスポンスは次のようになる。

```http
HTTP/1.1 200 OK
...

<!DOCTYPE html>
<html>
  ...
</html>
```

## 注意点

RFC 7230 は「A client SHOULD ignore the reason-phrase content.」としている。クライアントは理由フレーズによって挙動を変えてはいけない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[http|HTTP]]
- [[http-request|HTTP リクエスト]]
- [[http-response|HTTP レスポンス]]
- [[header-field|ヘッダフィールド]]
- [[host-header|Host]]
- [[connection-header|Connection]]

## 出典

- [HTTP メッセージ - MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Messages)
- [RFC 7230](https://datatracker.ietf.org/doc/html/rfc7230)
