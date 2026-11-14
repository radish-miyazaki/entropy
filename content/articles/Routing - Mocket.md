---
title: Routing - Mocket
description: Mocket のルーティング。HTTP メソッドごとのメソッドでルートを登録し、パスパラメータやワイルドカードも扱える
tags: [article, mocket, moonbit]
date: 2025-12-04
article-authors: []
site: Mocket
published:
url: https://mocket.oboard.fun/guide/routing.html
---

## TL;DR

[[mocket|Mocket]] のルーティングでは、[[http|HTTP]] メソッドを `Mocket` の同名のメソッドで表し、パスとハンドラを登録する。

## 内容

### HTTP メソッドとハンドラ

ルートは `get`、`post`、`put`、`delete` などのメソッドで登録する。`all` メソッドを使うと、どの HTTP メソッドでも受け付けられる。

```moonbit
app.get("/", _evt => "GET request")
app.post("/users", _evt => ({ "message": "User created" } : Json))
app.put("/users/:id", _evt => "User updated")
app.delete("/users/:id", _evt => "User deleted")
app.all("/api/*", _evt => "API endpoint")
```

ハンドラ関数は `MocketEvent` を受け取り、[[Responder - Mocket|Responder]] を返す。

```moonbit
async fn get_users_handler(
  _evt : @mocket.MocketEvent,
) -> &@mocket.Responder noraise {
  ...
}
```

### パスパラメータ

[[dynamic-routes|Dynamic Routes]] は `:id` のように書き、値は `evt.params["id"]` で取り出す。`:id?` のように `?` を付けるとオプショナルなパラメータになり、パターンマッチで処理を分けられる。

```moonbit
app.get("/users/:id/posts/:post_id", evt => {
  let user_id = evt.params["id"]
  let post_id = evt.params["post_id"]
  ({ "user_id": user_id, "post_id": post_id } : Json)
})

app.get("posts/:id?", evt => match evt.params.get("id") {
  Some(id) => "Post ID: " + id.to_string()
  None => "All posts"
})
```

### Catch-all ルートとグループ

`*` を使うと、残りのパスをすべて受け取る Catch-all ルートになる。受け取ったパスは `evt.params.get("_")` で取り出す。ルートのマッチングは定義した順に行われる。

```moonbit
app.get("/files/*", evt => {
  let file_path = evt.params.get("_").unwrap_or("")
  "File path:" + file_path.to_string()
})
```

ルートのグループ化には `group` メソッドを使う。

```moonbit
app.group("group", api_v1 => api_v1.get("/users", get_users_handler))
```

## キーワード

- [[mocket|Mocket]]
- [[http|HTTP]]
- [[dynamic-routes|Dynamic Routes]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [[Responder - Mocket]]
- [[Middleware - Mocket]]
