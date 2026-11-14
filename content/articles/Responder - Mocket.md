---
title: Responder - Mocket
description: Mocket でレスポンスボディをシリアライズするためのトレイト
tags: [article, mocket, moonbit]
date: 2025-12-04
article-authors: []
site: Mocket
published:
url: https://mocket.oboard.fun/guide/responder.html
---

## TL;DR

[[mocket|Mocket]] は `Responder` トレイトの実装を使ってレスポンスボディを[[serialization|シリアライズ]]する。

## 内容

### Responder トレイト

`Responder` はレスポンスのヘッダなどを設定する `options` と、ボディを書き出す `output` を持つ。

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

### 独自の型への実装

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

## キーワード

- [[mocket|Mocket]]
- [[serialization|シリアライズ]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [[Body Reader - Mocket]]: リクエスト側の逆の処理
- [[Routing - Mocket]]
