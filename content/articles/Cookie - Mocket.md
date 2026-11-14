---
title: Cookie - Mocket
description: Mocket での Cookie の設定・取得・削除の方法
tags: [article, mocket, moonbit]
date: 2025-12-05
article-authors: []
site: Mocket
published:
url: https://mocket.oboard.fun/guide/cookie.html
---

## TL;DR

[[mocket|Mocket]] では、[[cookie|Cookie]] の設定と削除を `HttpResponse` のメソッドで、取得を `HttpRequest` のメソッドで行う。

## 内容

Cookie を設定するには `HttpResponse` の `set_cookie` メソッドを使う。有効期限や `HttpOnly` などの属性は引数で指定する。

```moonbit
app.get("/login", evt => {
  evt.res.set_cookie("session_id", "12345", max_age=3600, http_only=true)
  "Logged in"
})
```

Cookie を取得するには `HttpRequest` の `get_cookie` メソッドを使う。戻り値は `Option` なので、パターンマッチで有無を分ける。

```moonbit
app.get("/dashboard", evt => match evt.req.get_cookie("session_id") {
  Some(cookie) => "Session ID: " + cookie.value
  None => "Not logged in"
})
```

Cookie を削除するには `HttpResponse` の `delete_cookie` メソッドを使う。

```moonbit
app.get("/logout", evt => {
  evt.res.delete_cookie("session_id")
  "Logged out"
})
```

## キーワード

- [[mocket|Mocket]]
- [[cookie|Cookie]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [[Routing - Mocket]]
