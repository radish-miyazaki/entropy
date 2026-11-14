---
title: Ratatui のチュートリアルをする（Hello Ratatui）
description: Ratatui 公式の Hello Ratatui チュートリアルに沿って、cargo-generate でプロジェクトを作り、hello world を表示した
tags: [blog, rust, ratatui]
date: 2026-02-08
draft: false
---

## TL;DR

- [[ratatui|Ratatui]] 公式の [Hello Ratatui](https://ratatui.rs/tutorials/hello-ratatui/) チュートリアルに沿って、ターミナルに「hello world」を表示した。
- プロジェクトは [[cargo-generate|cargo-generate]] で公式のテンプレートから作成できる。

## 環境

- [[rust|Rust]]: 1.93.0
- cargo-generate: 0.23.7

## 検証

### プロジェクト作成

[公式のテンプレート](https://github.com/ratatui/templates/tree/main/hello-world)からプロジェクトを作成する。

```sh
$ cargo generate ratatui/templates hello-world
```

`Cargo.toml` の `[dependencies]` には、次の 3 つの[[crate|クレート]]が入っている。

```toml
[dependencies]
color-eyre = "0.6.3"
crossterm = "0.29.0"
ratatui = "0.30.0"
```

color-eyre は、panic と `eyre::Report` のエラーレポートを色付きで見やすく出力するためのクレートである。`eyre` は [[anyhow|anyhow]] をフォークしたクレートで、[[trait-object|トレイトオブジェクト]]を使ったエラーハンドリング型を提供し、エラーレポートをカスタマイズできる。Crossterm は、クロスプラットフォームに対応したターミナル操作のライブラリである。

### src/main.rs

`app` 関数のループの中で「hello world」を描画し、何かのキーが押されたらアプリケーションを終了する。

```rust
use ratatui::{DefaultTerminal, Frame};

fn main() -> color_eyre::Result<()> {
    color_eyre::install()?;
    ratatui::run(app)?;
    Ok(())
}

fn app(terminal: &mut DefaultTerminal) -> std::io::Result<()> {
    loop {
        // hello world という文字列を表示
        terminal.draw(render)?;

        // 何かしらのキーが押下されたら、アプリケーションを終了
        if crossterm::event::read()?.is_key_press() {
            break Ok(());
        }
    }
}

fn render(frame: &mut Frame) {
    frame.render_widget("hello world", frame.area());
}
```

### 動作確認

```sh
$ cargo run
```

## キーワード

- [[ratatui|Ratatui]]
- [[rust|Rust]]
- [[cargo-generate|cargo-generate]]
- [[crate|クレート]]
- color-eyre
- [[anyhow|anyhow]]
- [[trait-object|トレイトオブジェクト]]
- Crossterm

## 参考

- https://ratatui.rs/tutorials/hello-ratatui/
- https://github.com/ratatui/templates/tree/main/hello-world
