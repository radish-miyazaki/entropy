---
title: tracing
aliases: []
description: スパンやイベントを発行して構造化ログを出力できる、Rust のクレート
tags: [word, rust]
date: 2024-10-13
---

## TL;DR

[[structured-logging|構造化ログ]]を出力するための [[rust|Rust]] の[[crate|クレート]]。[[observability|オブザーバビリティ]]の重要な要素である[[span|スパン]]やイベントを発行できる。

## なぜ必要か

スパンやイベントを発行すると、アプリケーションがどのような処理を行い、どのようなデータを返したかを追跡できる。非同期処理にも対応している。[[tokio|Tokio]] と同じチームが開発しているが、async-std や smol など、Tokio 以外の非同期ランタイムでも使える。

## 仕組み

[[instrumentation|計装]]するには Subscriber の実装が必要で、基本的には公式が提供する `tracing-subscriber` を使う。Subscriber は、スパンの状態を管理しながらイベントを記録し、扱うログレベルや出力形式、出力先を制御する。開発者が自由に実装できるよう、別のクレートとして提供されている。出力形式は JSON などから選べ、形式そのものをカスタマイズすることもできる。

### tracing::instrument

`#[tracing::instrument]` 属性マクロを関数に付けると、その関数のスパンが作られる。これにより、関数の中で起きたイベントを 1 つのまとまりとして扱える。

## 例

### 構造化ログ（JSON）を出力する

`tracing-subscriber` に `json` フィーチャを追加する。

```toml
tracing-subscriber = { version = "0.3.18", features = ["env-filter", "json"] }
```

初期設定で `json` メソッドを呼び出す。

```rust
let subscriber = tracing_subscriber::fmt::layer()
    // ...
    .json();
```

出力されたログは次のとおり。

```json
{
  "timestamp": "2024-10-14T02:18:41.796486Z",
  "level": "INFO",
  "fields": { "message": "Listening on 127.0.0.1:8080" },
  "filename": "src/bin/app.rs",
  "line_number": 87
}
```

ローカルでは構造化ログが読みにくいので、本番環境でのみ構造化ログにすることもできる。

```rust
let subscriber = tracing_subscriber::fmt::layer()
    .with_file(true)
    .with_line_number(true)
    .with_target(false);

// リリースビルドでのみ構造化ログを出力する
#[cfg(not(debug_assertions))]
let subscriber = subscriber.json();
```

### ハンドラ関数にスパンを付ける

`skip` でスパンに含めない引数を指定し、`fields` でスパンに含める情報を加工している。

```rust
#[tracing::instrument(
    skip(_user, registry),
    fields(
        user_id = %_user.user.id.to_string()
    )
)]
pub async fn show_book(
    _user: AuthorizedUser,
    State(registry): State<AppRegistry>,
    Path(book_id): Path<BookId>,
) -> AppResult<Json<BookResponse>> {
    tracing::info!("テスト用のログ");
    // ...
}
```

エンドポイントを呼び出すと、イベントにスパンの情報が付いて出力される。

```json
{
  "timestamp": "2024-10-14T08:20:40.016863Z",
  "level": "INFO",
  "fields": { "message": "テスト用のログ" },
  "filename": "api/src/handler/book.rs",
  "line_number": 103,
  "span": {
    "book_id": "BookId(74fa2a39-674c-4b02-9969-2b5183b6b924)",
    "user_id": "8b0977724de6464baaf0e3a6cf5d470b",
    "name": "show_book"
  },
  "spans": [
    {
      "method": "GET",
      "uri": "/api/v1/books/74fa2a39-674c-4b02-9969-2b5183b6b924",
      "version": "HTTP/1.1",
      "name": "request"
    },
    {
      "book_id": "BookId(74fa2a39-674c-4b02-9969-2b5183b6b924)",
      "user_id": "8b0977724de6464baaf0e3a6cf5d470b",
      "name": "show_book"
    }
  ]
}
```

## 注意点

- `#[tracing::instrument]` を付けただけでは何も出力されない。ログを出すには、`tracing::info!` などのマクロでイベントを発行する必要がある
- `#[tracing::instrument]` は、何も設定しないと関数の引数をすべてスパンに含める。含めたくない引数は `skip` で指定する

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[observability|オブザーバビリティ]]
- [[structured-logging|構造化ログ]]
- [[span|スパン]]
- [[tokio|Tokio]]

## 出典

- [tracing - docs.rs](https://docs.rs/tracing/latest/tracing/)
- [tokio-rs/tracing - GitHub](https://github.com/tokio-rs/tracing)
- [Subscribers - tracing](https://docs.rs/tracing/latest/tracing/#subscribers)
- [Formatters - tracing_subscriber](https://tracing.rs/tracing_subscriber/fmt/#formatters)
- [Customizing formatters - tracing_subscriber](https://tracing.rs/tracing_subscriber/fmt/#customizing-formatters)
- [instrument - tracing_attributes](https://docs.rs/tracing-attributes/latest/tracing_attributes/attr.instrument.html)
- [Skipping fields - tracing_attributes](https://docs.rs/tracing-attributes/latest/tracing_attributes/attr.instrument.html#skipping-fields)
