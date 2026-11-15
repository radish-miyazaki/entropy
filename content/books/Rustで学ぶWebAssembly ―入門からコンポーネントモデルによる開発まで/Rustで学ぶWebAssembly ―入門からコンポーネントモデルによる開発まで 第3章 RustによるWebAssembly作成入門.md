---
title: Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで › RustによるWebAssembly作成入門
description: cargo-component で CLI として実行できる WebAssembly Component を作り、Wasmtime で実行し、wasmtime-wasi を使って Rust のプログラムからも呼び出す章
tags: [book-chapter, rust, webassembly]
date: 2024-10-18
book: "[[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで]]"
chapter: 3
---

## TL;DR

- [[cargo-component]] を使うと、通常の Rust のプロジェクトと同じ感覚で、CLI として実行できる [[webassembly-component|WebAssembly Component]] を作れる。
- `wasmtime` コマンドで実行できる Component は `wasi:cli/command` World を実装しており、[[wasmtime-wasi]] を使えば Rust のプログラムからも実行できる。

## 内容

### プロジェクトの作成とビルド

まず [[cargo-component]] をインストールする。

```sh
cargo install cargo-component
```

`cargo component new` でプロジェクトを作成する。ディレクトリ構成は通常のバイナリクレートと同じで、`src/main.rs` には Hello, world! を出力するコードが生成される。

```sh
cargo component new hello-wasi-cli
```

ビルドには `cargo component build` を使う。

```sh
$ cargo component build -r --target=wasm32-wasip1
...
    Creating component target/wasm32-wasip1/release/hello-wasi-cli.wasm
```

### 実行

実行するには [[webassembly|WebAssembly]] のランタイムが必要である。ここでは [[wasmtime|Wasmtime]] を使う。

```sh
$ wasmtime target/wasm32-wasip1/release/hello-wasi-cli.wasm
Hello, world!
```

### ライブラリクレートの利用

通常のプロジェクトと同じく、WebAssembly Component のプロジェクトでもサードパーティ製のクレートを使える。

```sh
cargo add ferris-says
```

`cargo component add` はクレートではなく WebAssembly Component を依存関係に追加するためのコマンドなので注意する。

`ferris_says::say` を呼ぶように `src/main.rs` を書き換えてビルドし、`wasmtime` で実行すると、カニのアスキーアートが Hello, world! を話す。

### wasi:cli/command World の実装

`wasmtime` コマンドで実行できる WebAssembly Component は、`wasi:cli/command` World を実装している。これは [[wasm-tools]] で確かめられる。

```sh
$ wasm-tools component wit target/wasm32-wasip1/release/hello-wasi-cli.wasm
package root:component;

world root {
  import wasi:cli/environment@0.2.0;
  import wasi:cli/exit@0.2.0;
  ...
  export wasi:cli/run@0.2.0;
}
```

結果から、この Component は `wasi:cli/run` インタフェースを export していることが分かる。つまり、ライブラリクレートと同じように、[[rust|Rust]] のプログラムから実行できる。

[[wasmtime-wasi]] を使うと、`wasi:cli/run` を実装した Component を Rust から簡単に呼び出せる。詳しくは[[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで 第5章 依存関係の解決と合成|第5章]]で扱う。新しいプロジェクトに `clap`、[[anyhow]]、`wasmtime`、`wasmtime-wasi` を追加し、`src/main.rs` を次のように書く。

```rs
async fn start(cli: Cli) -> anyhow::Result<()> {
    let mut config = wasmtime::Config::new();
    config.async_support(true);
    let engine = Engine::new(&config)?;

    let mut linker = Linker::new(&engine);
    let mut store = Store::new(&engine, Ctx::new());

    wasmtime_wasi::add_to_linker_async(&mut linker)?;

    let component = Component::from_file(&engine, cli.wasm_file)?;

    let command =
        wasmtime_wasi::bindings::Command::instantiate_async(&mut store, &component, &linker)
            .await?;

    let guest = command.wasi_cli_run();
    let _ = guest.call_run(&mut store).await?;

    Ok(())
}
```

`Ctx` は `WasiCtx` と `ResourceTable` を持つ構造体で、`WasiView` トレイトを実装している。引数に先ほど生成した Wasm ファイルのパスを渡して実行すると、`wasmtime` で実行したときと同じ出力が得られる。

```sh
cargo run -- ../hello-wasi-cli/target/wasm32-wasip1/release/hello-wasi-cli.wasm
```

## キーワード

- [[webassembly|WebAssembly]]
- [[webassembly-component|WebAssembly Component]]
- [[cargo-component]]
- [[wasmtime|Wasmtime]]
- [[wasm-tools]]
- [[wasmtime-wasi]]
- [[wasi|WASI]]
- [[crate|クレート]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
