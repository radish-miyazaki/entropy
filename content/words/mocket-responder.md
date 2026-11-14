---
title: Responder -- Mocket
aliases: []
description: Mocket でレスポンスボディをシリアライズするためのトレイト
tags: [word, mocket]
date: 2025-12-04
---

## TL;DR

[[mocket|Mocket]] は、`Responder` トレイトの実装を使ってレスポンスボディを[[serialization|シリアライズ]]する。

## 仕組み

`Responder` は、レスポンスのヘッダなどを設定する `options` と、ボディを書き出す `output` を持つ。

```moonbit
pub(open) trait Responder {
  options(Self, res : HttpResponse) -> Unit
  output(Self, buf : @buffer.Buffer) -> Unit
}
```

次の型には最初から実装がある。

- テキスト: `String`、`StringView`
- JSON: `Json`、`&ToJson`
- バイナリ: `Bytes`
- HTML: `Html`
- `HttpResponse`、`HttpRequest`

## 例

独自の型に `Responder` を実装すれば、その型をそのままハンドラから返せる。次は CSV を返す例である。

```moonbit
struct Csv(String)

impl @mocket.Responder for Csv with options(_, res) -> Unit {
  res.headers["Content-Type"] = "text/csv; charset=utf-8"
}

impl @mocket.Responder for Csv with output(self, buf) -> Unit {
  buf.write_bytes(@encoding/utf8.encode(self.0))
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[mocket|Mocket]]
- [[mocket-body-reader|Body Reader -- Mocket]]: リクエスト側の逆の処理

## 出典

- [Responder - Mocket](https://mocket.oboard.fun/guide/responder.html)
