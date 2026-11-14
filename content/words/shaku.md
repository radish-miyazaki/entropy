---
title: shaku
aliases: []
description: 依存関係が正しく解決できるかをコンパイル時に確かめられる、Rust の DI コンテナのクレート
tags: [word, rust]
date: 2024-10-07
---

## TL;DR

[[rust|Rust]] の [[di-container|DI コンテナ]]の[[crate|クレート]]。[[dependency|依存関係]]が正しく解決できるかを、コンパイル時に確かめられる。

## 仕組み

shaku が提供する[[macro|マクロ]]で、半自動的に依存を解決する。使い方は次の 3 段階である。

1. インタフェースとなるトレイトと、それを実装する構造体を定義し、`#[derive(Component)]` と `#[shaku(...)]` を付ける。注入したいフィールドには `#[shaku(inject)]` を付ける
2. `module!` マクロで、DI コンテナ用の構造体（ここでは `MyModule`）を生成する
3. DI コンテナ用の構造体から、必要なコンポーネントを取り出す

## 例

コンポーネントを定義する。`DateLoggerImpl` は `Logger` に依存している。

```rust
use shaku::{module, Component, Interface, HasComponent};
use std::sync::Arc;

trait Logger: Interface {
    fn log(&self, content: &str);
}

trait DateLogger: Interface {
    fn log_date(&self);
}

#[derive(Component)]
#[shaku(interface = Logger)]
struct LoggerImpl;

impl Logger for LoggerImpl {
    fn log(&self, content: &str) {
        println!("{}", content);
    }
}

#[derive(Component)]
#[shaku(interface = DateLogger)]
struct DateLoggerImpl {
    #[shaku(inject)]
    logger: Arc<dyn Logger>,
    today: String,
    year: usize,
}

impl DateLogger for DateLoggerImpl {
    fn log_date(&self) {
        self.logger.log(&format!("Today is {}, {}", self.today, self.year));
    }
}
```

`module!` マクロで DI コンテナ用の構造体を生成する。

```rust
module! {
    MyModule {
        components = [LoggerImpl, DateLoggerImpl],
        providers = []
    }
}
```

DI コンテナ用の構造体を経由して、コンポーネントを取り出す。

```rust
fn main() {
    let module = MyModule::builder()
        .with_component_parameters::<DateLoggerImpl>(DateLoggerImplParameters {
            today: "Jan 26".to_string(),
            year: 2020
        })
        .build();

    let date_logger: &dyn DateLogger = module.resolve_ref();
    date_logger.log_date();
}
```

## 注意点

[[axum]] 向けに `shaku_axum` というクレートも用意されている。これを使うと、ハンドラで必要な依存を簡単に取り出せる。Actix Web や Rocket 向けのクレートもある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[dependency-injection|依存性の注入]]
- [[di-container|DI コンテナ]]

## 出典

- [shaku - docs.rs](https://docs.rs/shaku/latest/shaku/)
- [AzureMarker/shaku - GitHub](https://github.com/AzureMarker/shaku)
- [shaku_axum - GitHub](https://github.com/AzureMarker/shaku/tree/master/shaku_axum)
- [shaku_axum - docs.rs](https://docs.rs/shaku_axum/latest/shaku_axum/)
