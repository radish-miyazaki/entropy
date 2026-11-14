---
title: "Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで 第7章 Hello, wasi:http/proxy"
description: wasi:http/proxy World を実装した WebAssembly Component で HTTP レスポンスを返し、cargo component serve で動かす章
tags: [book-chapter, rust, webassembly, wasi]
date: 2024-10-30
book: "[[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで]]"
chapter: 7
---

## TL;DR

- `wasi:http/proxy` World を実装した [[webassembly-component|WebAssembly Component]] で、ブラウザに Hello, world! を表示する。
- 実装するのは `Guest` トレイトの `handle` 関数だけだが、提供される操作がプリミティブなので、実際には [[fermyon-spin|Spin]] などのフレームワークを使う。

## 内容

### フレームワークを使う理由

`wasi:http/proxy` を直接実装するのは学習用で、実際には [[fermyon-spin|Spin]] などのフレームワークを使う。理由は 2 つある。1 つは、`IncomingRequest` が提供する操作がプリミティブなものだけで、POST のデータやパス、クエリパラメータを取り出す処理を自作する必要があることである。もう 1 つは、URL のパスに応じて呼び出す Component を変えるルーティングの仕組みがないことである。

### プロジェクトの作成

[[cargo-component]] で、`wasi:http/proxy` を対象にしたプロジェクトを作る。

```sh
cargo component new \
  --lib \
  --target wasi:http/proxy \
  --namespace radish \
  hello-wasi-http
```

生成された `src/lib.rs` を見ると、`Guest` トレイトの `handle` 関数を実装すればよいことが分かる。

```rs
use bindings::exports::wasi::http::incoming_handler::{
    Guest,
    IncomingRequest,
    ResponseOutparam,
};

struct Component;

impl Guest for Component {
    fn handle(request: IncomingRequest, response_out: ResponseOutparam) {
        unimplemented!()
    }
}
```

### 実装

`handle` 関数は、ホストコード（Component を利用するコード）から呼び出される。元になっているのは、`wasi:http/proxy` World が export している `wasi:http/incoming-handler` インタフェースの関数である。引数には、[[http|HTTP]] リクエストを表す `IncomingRequest` と、HTTP レスポンスを作るための `ResponseOutparam` が渡される。今回は Hello, world! を返すだけなので、`ResponseOutparam` だけを使う。

```rs
fn handle(_request: IncomingRequest, response_out: ResponseOutparam) {
    // ヘッダの設定
    let headers = [(
        FieldKey::from("Content-Type"),
        FieldValue::from("text/html"),
    )];
    let headers = Headers::from_list(&headers).unwrap();

    // HTTP レスポンスの作成とステータスコードの設定
    let response = OutgoingResponse::new(headers);
    response.set_status_code(200).unwrap();
    let body = response.body().unwrap();

    // レスポンスボディの書き込み
    let stream = body.write().unwrap();
    stream.blocking_write_and_flush(b"Hello, world!").unwrap();

    // レスポンスボディへの書き込みが終わったことを通知
    drop(stream);

    // レスポンスボディの操作が終わったことを通知
    OutgoingBody::finish(body, None).unwrap();

    // HTTP レスポンスの操作が成功したことを通知
    ResponseOutparam::set(response_out, Ok(response));
}
```

### 実行

`wasi:http/proxy` を実装した Component は、`cargo component serve` でビルドして実行できる。

```sh
$ cargo component serve
...
Serving HTTP on http://0.0.0.0:8080/
```

`localhost:8080` にアクセスすると、Hello, world! が表示される。

## キーワード

- [[webassembly-component|WebAssembly Component]]
- [[wasi|WASI]]
- [[cargo-component]]
- [[fermyon-spin|Spin]]
- [[http|HTTP]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
