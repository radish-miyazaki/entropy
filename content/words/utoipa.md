---
title: utoipa
aliases: []
description: マクロでエンドポイントに情報を付け、OpenAPI ドキュメントを自動で生成する Rust のクレート
tags: [word, rust]
date: 2024-10-14
---

## TL;DR

[[openapi|OpenAPI]] ドキュメントを自動で生成するための [[rust|Rust]] の[[crate|クレート]]。エンドポイントに[[macro|マクロ]]を付けると、そこから OpenAPI が生成される（[[code-first|Code first]]）。

## 仕組み

Actix Web、[[axum]]、Rocket など、さまざまな Web フレームワーク向けのユーティリティを提供している。ドキュメントを表示するインタフェースは、Swagger UI のほか Redoc や RapiDoc にも対応している。

ドキュメントの定義は `#[derive(utoipa::OpenApi)]` を付けた構造体に書く。`#[openapi(...)]` には次の 3 つを指定する。

- `info`: タイトルや連絡先などのメタデータ
- `paths`: ハンドラ関数。指定する関数には `#[utoipa::path]` を付け、HTTP メソッドとパス、リクエストボディ、レスポンス（正常系と異常系の両方）を書く
- `components`: リクエストやレスポンスの型。`ToSchema` トレイトを実装する必要があり、[[derive-macro|derive マクロ]]が用意されている。ここで指定した型は、`#[utoipa::path]` の中で型名で参照できる

## 例

axum と Redoc を使い、レスポンスの型に chrono の日付型と [[uuid|UUID]] を使う場合の例。OpenAPI の情報はリリースビルドに不要なので、`#[cfg(debug_assertions)]` や `#[cfg_attr(debug_assertions, ...)]` でデバッグビルドに限っている。

```toml
utoipa = { version = "4.2.3", features = ["axum_extras", "uuid", "chrono"] }
utoipa-redoc = { version = "4.0.0", features = ["axum"] }
```

```rust
#[derive(utoipa::OpenApi)]
#[openapi(
    info(
        title = "...",
        contact(name = "...", url = "...", email = "..."),
        description = "...",
    ),
    paths(
        ...
    ),
    components(schemas(
        model::book::CreateBookRequest,
        model::book::CreateBookResponse,
        ...
    ))
)]
pub struct ApiDoc;
```

ハンドラ関数に `#[utoipa::path]` を付ける。

```rust
#[cfg_attr(
    debug_assertions,
    utoipa::path(
        post,
        path = "/api/v1/books",
        request_body = CreateBookRequest,
        responses(
            (status = 201, description = "蔵書の登録に成功した場合", response = CreateBookResponse),
            (status = 400, description = "リクエストのパラメータに不備があった場合"),
            (status = 401, description = "認証されていないユーザがアクセスした場合"),
            (status = 422, description = "リクエストした蔵書の登録に失敗した場合")
        )
    )
)]
pub async fn register_book(...) ... {...}
```

リクエストの型に `ToSchema` を実装する。

```rust
#[derive(Debug, Deserialize, Validate)]
#[cfg_attr(debug_assertions, derive(ToSchema))]
#[serde(rename_all = "camelCase")]
pub struct CreateBookRequest {
    pub title: String,
    pub author: String,
    pub isbn: String,
    pub description: String,
}
```

Redoc のエンドポイントを追加する。

```rust
#[cfg(debug_assertions)]
use api::openapi::ApiDoc;
#[cfg(debug_assertions)]
use utoipa::OpenApi;
#[cfg(debug_assertions)]
use utoipa_redoc::{Redoc, Servable};

// 通常のエンドポイント
let router = Router::new().merge(...);

#[cfg(debug_assertions)]
let router = router.merge(Redoc::with_url("/docs", ApiDoc::openapi()));
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[openapi|OpenAPI]]
- [[code-first|Code first]]
- [[axum]]

## 出典

- [utoipa - docs.rs](https://docs.rs/utoipa/latest/utoipa/)
- [juhaku/utoipa - GitHub](https://github.com/juhaku/utoipa)
- [Choose your flavor - utoipa](https://github.com/juhaku/utoipa?tab=readme-ov-file#choose-your-flavor-and-document-your-api-with-ice-cold-ipa)
- [utoipa-swagger-ui](https://github.com/juhaku/utoipa/tree/master/utoipa-swagger-ui)
- [utoipa-redoc](https://github.com/juhaku/utoipa/tree/master/utoipa-redoc)
- [utoipa-rapidoc](https://github.com/juhaku/utoipa/tree/master/utoipa-rapidoc)
- [OpenApi derive - utoipa](https://docs.rs/utoipa/latest/utoipa/derive.OpenApi.html)
- [utoipa::path - utoipa](https://docs.rs/utoipa/latest/utoipa/attr.path.html)
- [ToSchema - utoipa](https://docs.rs/utoipa/latest/utoipa/trait.ToSchema.html)
