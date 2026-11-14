---
title: Spin
aliases: []
description: Fermyon 社が開発している、WebAssembly Component でサービスを書く OSS のマイクロサービスフレームワーク
tags: [word, rust, go]
date: 2024-10-23
---

## TL;DR

Fermyon 社が開発している OSS のマイクロサービスフレームワーク。`wasi:http/proxy@0.2.0` を実装した [[webassembly-component|WebAssembly Component]] としてサービスをビルドし、動かす。

## なぜ必要か

サービスをイベント駆動型で記述できる。`wasi:http/proxy@0.2.0` を実装した WebAssembly Component をビルドでき、そうした Component をアプリの一部として動かすこともできる。[[docker|Docker]] や [[kubernetes|Kubernetes]] 上での実行にも対応している。

## 仕組み

### Spin CLI

プロジェクトの作成やビルド、起動は CLI で行う。CLI は Homebrew でインストールできる。

```sh
$ brew tap fermyon/tap
$ brew install fermyon/tap/spin
$ spin -h
```

`spin new <名前>` でプロジェクトを作る。実行すると、`http-rust` や `http-go`、`http-empty` などのテンプレートから選ぶよう聞かれる。`http-empty` を選ぶと、マニフェストファイル `spin.toml` だけが作られる。

### spin.toml

`spin.toml` は Spin プロジェクトのマニフェストファイルで、アプリで使う WebAssembly Component とトリガを設定する。Component は `[component.<アプリ内で使う名前>]` テーブルに書き、`source` に [[webassembly|WASM]] ファイルへのパスを指定する。Web で公開されている Component なら、URL とダイジェストを指定してもよい。

```toml
[component.hello-world]
source = "./hello_wasi_http.wasm"
```

### トリガ

トリガは、設定したパターンにマッチするパスへアクセスがあったときに、対応する Component を呼び出す機能である。一般的な Web フレームワークのルーティングにあたる。`[[trigger.http]]` に、`component`（`spin.toml` で定義した Component 名）と `route`（呼び出すパス）を書く。

```toml
[[trigger.http]]
component = "hello-world"
route = "/hello-world/..."
```

`spin up` でアプリケーションを起動する。デフォルトでは 3000 番ポートで待ち受ける。

### Component の追加とビルド

`spin add` を使うと、Spin が提供する高水準な API で Component を開発できる。テンプレートと呼び出すパスを聞かれ、[[rust|Rust]] なら `Cargo.toml` と `src/lib.rs` を持つディレクトリが作られる。同時に `spin.toml` にも Component とビルドの設定が追加される。

```rust
use spin_sdk::http::{IntoResponse, Request, Response};
use spin_sdk::http_component;

#[http_component]
fn handle_echo(req: Request) -> anyhow::Result<impl IntoResponse> {
    Ok(Response::builder()
        .status(200)
        .header("content-type", "text/plain")
        .body("Hello, Fermyon")
        .build())
}
```

`#[http_component]` マクロは、直後の関数を `handler` 関数の実装にする。`handler` 関数は、`wasi:http/proxy` World の `wasi:http/incoming-handler` インタフェースを実装する関数である（[[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで 第7章 Hello, wasi：http／proxy|第7章 Hello, wasi:http/proxy]]）。これにより、ビルドした Component は `wasi:http/proxy` World を実装する。`incoming-request` などのリソースは、Spin が提供するラッパを通じて操作する。

受信した HTTP リクエストは `Request` として渡され、`body` メソッドでボディを取り出せる。レスポンスは `Response::builder` で作った `ResponseBuilder` に、`status`、`header`、`body` を設定し、`build` で組み立てる。

`spin build` でビルドする。[[wasm-tools|wasm-tools]] で成果物の World を見ると、`wasi:http/proxy` が import するインタフェースに加えて、`fermyon:spin/key-value` などの Spin 固有のインタフェースにも依存していることが分かる。

## 注意点

`spin add` で生成される設定は、デフォルトのビルドターゲットが `wasm32-wasi` になっている。`wasm32-wasip1` を使う場合は、`spin.toml` の `source` と `command` を書き換える。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[webassembly-component|WebAssembly Component]]
- [[wasi|WASI]]
- [[wasm-tools|wasm-tools]]

## 出典

- [[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで]]
- [Spin Documentation](https://developer.fermyon.com/spin/v2/index)
- [Writing Spin Applications](https://developer.fermyon.com/spin/v2/writing-apps#writing-an-application-manifest)
- [Spin Triggers](https://developer.fermyon.com/spin/v2/triggers)
- [spin-sdk - crates.io](https://crates.io/crates/spin-sdk)
- [fermyon/spin - GitHub](https://github.com/fermyon/spin)
- https://qiita.com/takuhiro/items/d825c46942321a271679
- https://zenn.dev/chikoski/articles/advent-of-spin-2023
