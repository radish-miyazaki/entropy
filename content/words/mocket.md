---
title: Mocket
aliases: []
description: JavaScript バックエンドとネイティブバックエンドの両方で動く、MoonBit の Web フレームワーク
tags: [word, moonbit]
date: 2025-12-04
---

## TL;DR

[[moonbit|MoonBit]] の [[web-framework|Web フレームワーク]]。JavaScript バックエンドとネイティブバックエンドの両方をサポートしている。

## 仕組み

[[moonbit|MoonBit]] のプロジェクトを作り、依存に `oboard/mocket` を追加して使う。

```sh
moon new mocket_example
moon add oboard/mocket
```

`@mocket.new()` でアプリケーションを作り、ルートを登録してから `serve` で起動する。機能ごとの詳細は次のページにまとめている。

- [[mocket-routing|Routing -- Mocket]]
- [[mocket-responder|Responder -- Mocket]]
- [[mocket-body-reader|Body Reader -- Mocket]]
- [[mocket-middleware|Middleware -- Mocket]]
- [[mocket-cookie|Cookie -- Mocket]]
- [[mocket-websocket|WebSocket -- Mocket]]

## 例

`cmd/main/main.mbt` に次のように書く。

```moonbit
fn main {
  let app = @mocket.new()
  app.get("/", _ => "Hello, Mocket!")
  app.group("/api", group => group.get("/status", _ => (
    { "status": "ok" } : Json)))
  app.serve(port=4000)
}
```

`--target` でバックエンドを選んで実行する。どちらのバックエンドでもページが表示された。

```sh
# JavaScript バックエンド
moon run cmd/main --target js
# ネイティブバックエンド
moon run cmd/main --target native
```

## 自分の理解

名前から、[[rust|Rust]] の Web フレームワークである Rocket にインスパイアされているのかもしれない。

## 出典

- [oboard/mocket](https://github.com/oboard/mocket)
- [Mocket（公式サイト）](https://mocket.oboard.fun/)
- [Getting Started - Mocket](https://mocket.oboard.fun/guide/getting-started.html)
- [oboard/mocket - mooncakes.io](https://mooncakes.io/docs/oboard/mocket)
