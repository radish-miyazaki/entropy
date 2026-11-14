---
title: Middleware -- Mocket
aliases: []
description: Mocket のミドルウェア。use_middleware で登録し、next を呼んで後続の処理につなぐ
tags: [word, mocket]
date: 2025-12-05
---

## TL;DR

[[mocket|Mocket]] の[[middleware|ミドルウェア]]は、`use_middleware` で登録する関数である。動作は一般的なミドルウェアのパターンと同じである。

## 仕組み

ミドルウェアは `Mocket` インスタンスの `use_middleware` メソッドで登録する。パスを指定すると、そのパスにだけ適用される。

```moonbit
app.use_middleware(my_middleware)         // 全体に適用
app.use_middleware(my_middleware, "/api") // 特定のパスにのみ適用
```

ミドルウェアの関数は `MocketEvent` と `next` 関数を引数に受け取り、[[mocket-responder|Responder]] を返す。`next` を呼ぶと後続の処理が実行される。

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

## 例

[[cors|CORS]] 用のミドルウェアが組み込みで用意されている。

```moonbit
app.use_middleware(@cors.handle_cors())
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[mocket|Mocket]]
- [[mocket-routing|Routing -- Mocket]]

## 出典

- [Middleware - Mocket](https://mocket.oboard.fun/guide/middleware.html)
- [CORS - Mocket](https://mocket.oboard.fun/guide/cors.html)
