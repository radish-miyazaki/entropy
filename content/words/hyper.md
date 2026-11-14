---
title: hyper
aliases: []
description: HTTP クライアントや HTTP サーバを作るための、Rust の低レベルな HTTP ライブラリ
tags: [word, rust]
date: 2024-10-06
---

## TL;DR

HTTP クライアントや HTTP サーバを立ち上げる機能を提供する [[rust|Rust]] の[[crate|クレート]]。公式ドキュメントは、ライブラリやアプリケーションの部品として使う低レベルな HTTP ライブラリだと説明している。

## 仕組み

HTTP/1 と HTTP/2 に対応し、非同期で動く。クライアントとサーバの両方の API を持つ。`http1`、`http2`、`client`、`server` などの機能はフィーチャフラグで選んで有効にする。デフォルトでは、どれも有効になっていない。

## 例

公式ガイドの Hello World サーバでは、[[tokio|Tokio]] の `TcpListener` で接続を受け、接続ごとにタスクを起動して `http1::Builder` で HTTP/1 の接続を処理する。`service_fn` は、関数からリクエストへの応答方法を表す `Service` を作る。`TokioIo` は、Tokio のストリームを hyper の IO トレイトに合わせるためのラッパである。

```rust
async fn hello(_: Request<hyper::body::Incoming>) -> Result<Response<Full<Bytes>>, Infallible> {
    Ok(Response::new(Full::new(Bytes::from("Hello, World!"))))
}

// 接続ごとに
let io = TokioIo::new(stream);
tokio::task::spawn(async move {
    if let Err(err) = http1::Builder::new()
        .serve_connection(io, service_fn(hello))
        .await
    {
        eprintln!("Error serving connection: {:?}", err);
    }
});
```

## 注意点

低レベルなライブラリなので、手軽な HTTP クライアントが欲しいだけなら、公式ドキュメントは reqwest を勧めている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[tower]]
- [[axum]]

## 出典

- [hyper](https://hyper.rs/)
- [hyper - docs.rs](https://docs.rs/hyper/latest/hyper/)
- [hyperium/hyper - GitHub](https://github.com/hyperium/hyper)
- [Hello World サーバ - hyper](https://hyper.rs/guides/1/server/hello-world/)
