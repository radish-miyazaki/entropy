---
title: Body Reader - Mocket
description: Mocket でリクエストボディをデシリアライズするためのトレイト
tags: [article, mocket, moonbit]
date: 2025-12-04
article-authors: []
site: Mocket
published:
url: https://mocket.oboard.fun/guide/body-reader.html
---

## TL;DR

[[mocket|Mocket]] は `BodyReader` トレイトの実装を使ってリクエストボディをデシリアライズする。

## 内容

### BodyReader トレイト

`BodyReader` は `HttpRequest` から自分の型の値を作る `from_request` を持つ。

```moonbit
pub(open) trait BodyReader {
  from_request(req : HttpRequest) -> Self raise
}
```

次の型には最初から実装がある。

- テキスト: `String`、`StringView`
- JSON: `Json`
- バイナリ: `Bytes`
- 配列: `Array`、`FixedArray`

### 独自の型への実装

独自の型に `BodyReader` を実装すれば、リクエストボディをその型として受け取れる。次は CSV を受け取る例である。

```moonbit
impl @mocket.BodyReader for Csv with from_request(req) -> Csv {
  let text : String = req.body()
  Csv(text)
}
```

## キーワード

- [[mocket|Mocket]]
- デシリアライズ

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [[Responder - Mocket]]: レスポンス側の逆の処理
