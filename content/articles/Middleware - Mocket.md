---
title: Middleware - Mocket
description: Mocket のミドルウェア。use_middleware で登録し、next を呼んで後続の処理につなぐ
tags: [article, mocket, moonbit]
date: 2025-12-05
article-authors: []
site: Mocket
published:
url: https://mocket.oboard.fun/guide/middleware.html
---

## TL;DR

[[mocket|Mocket]] の[[middleware|ミドルウェア]]は `use_middleware` で登録する関数である。動作は一般的なミドルウェアのパターンと同じである。

## 内容

### 登録とミドルウェアの関数

ミドルウェアは `Mocket` インスタンスの `use_middleware` メソッドで登録する。パスを指定すると、そのパスにだけ適用される。

```moonbit
app.use_middleware(my_middleware)         // 全体に適用
app.use_middleware(my_middleware, "/api") // 特定のパスにのみ適用
```

ミドルウェアの関数は `MocketEvent` と `next` 関数を引数に受け取り、[[Responder - Mocket|Responder]] を返す。`next` を呼ぶと後続の処理が実行される。

```moonbit
pub async fn my_middleware(
  evt : @mocket.MocketEvent,
  next : async () -> &@mocket.Responder noraise,
) -> &@mocket.Responder noraise {
  println("Request received: " + evt.req.url)
  let res = next()
  println("Response sent")
  res
}
```

### 組み込みの CORS ミドルウェア

[CORS のページ](https://mocket.oboard.fun/guide/cors.html)によると、[[cors|CORS]] 用のミドルウェア `@cors.handle_cors()` が組み込みで用意されている。

```moonbit
app.use_middleware(@cors.handle_cors())
```

## キーワード

- [[mocket|Mocket]]
- [[middleware|ミドルウェア]]
- [[cors|CORS]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [[Routing - Mocket]]
- [[Responder - Mocket]]
