---
title: Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで 第5章 依存関係の解決と合成
description: WIT の import で依存するインタフェースの実装を、Component どうしの合成か、ホストコードでのトレイト実装によって与える方法をまとめた章
tags: [book-chapter, rust, webassembly]
date: 2024-10-21
book: "[[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで]]"
chapter: 5
---

## TL;DR

- [[wit|WIT]] の `import` で依存するインタフェースがある Component を実行するには、そのインタフェースの実装を与える必要がある。これを依存関係の解決と呼ぶ。
- 解決方法は 2 つある。実装を [[webassembly-component|WebAssembly Component]] として与えて [[wac]] などで合成する方法と、ホストコードで `bindgen!` が生成したトレイトを実装する方法である。後者は動的に解決できる。

## 内容

[[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで 第4章 他のプログラムから利用されるWasmコンポーネント|第4章]]で作った `greet` プロジェクトをそのまま使う。

### import を持つ World の定義

`greet` の `wit` ディレクトリに、`greetable` を import して `sayable` を export する World を追加する。

```wit
package radish:greet;

interface sayable {
    say: func() -> string;
}

world hello-world {
    import greetable;
    export sayable;
}
```

[[cargo-component]] は `wit` ディレクトリ内のすべての WIT ファイルを処理する。World が複数あると、どれを実装するか選べずにビルドが失敗する（`multiple worlds found; one must be explicitly chosen`）。そのため、`Cargo.toml` で実装する World を明示する。

```toml
[package.metadata.component]
package = "radish:greet"

[package.metadata.component.target]
world = "greetable-provider"
```

次に、`hello-world` World を実装するプロジェクトを `cargo component new --lib hello-world` で作る。`Cargo.toml` の `[package.metadata.component.target]` で、`path = "../greet/wit"` と `world = "hello-world"` を指定する。`sayable` の実装では、import した `greetable` の `name` と `greet` を呼び出せる。

```rs
use bindings::{
    exports::radish::greet::sayable::Guest,
    radish::greet::greetable::{greet, name},
};

struct Component;

impl Guest for Component {
    fn say() -> String {
        let name = name();
        let greetings = greet(&name);
        let mut buffer = Vec::new();

        ferris_says::say(&greetings, 80, &mut buffer).unwrap();
        String::from_utf8(buffer).unwrap()
    }
}
```

ビルドしてできた Wasm ファイルは、依存するインタフェースの実装がないと実行できない。

### Component の合成で解決する

あるインタフェースに依存する Component（`hello-world`）と、そのインタフェースを実装する Component（`greet`）を組み合わせて新しい Component を作ることを、合成と呼ぶ。ここでは [[wac]] の `wac plug` を使う。

```sh
wac plug \
  target/wasm32-unknown-unknown/release/hello_world.wasm \
  --plug ../greet/target/wasm32-unknown-unknown/release/greet.wasm \
  -o composed-hello-world.wasm
```

`--plug` には、依存するインタフェースを実装した Component を指定する。レジストリ（[[wa-dev|wa.dev]]）にある Component も指定できる（[[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで 第6章 コマンドラインインターフェースアプリケーションの作成|第6章]]）。`-o` は出力するファイル名である。合成した Component は、第 4 章と同じく `bindgen!` で `hello-world` World のコードを生成し、`HelloWorld::instantiate` で Instance を作れば実行できる。

### ホストコードで解決する

ホストコード（Component を利用するコード）で、依存するインタフェースの[[trait|トレイト]]を実装して解決することもできる。`bindgen!` マクロは、World が依存するインタフェースを実装するためのトレイトを `{名前空間}::{パッケージ名}::{インタフェース名}::Host` に生成する。

```rs
use radish::greet::greetable::Host;

struct Greet {
    name: String,
}

impl Host for Greet {
    fn name(&mut self) -> String {
        self.name.clone()
    }

    fn greet(&mut self, name: String) -> String {
        format!("Hello from {name}")
    }
}
```

生成された構造体の `add_to_linker` 関数に `Linker` と、`Store` のデータから実装を取り出す関数を渡す。これで `Linker` が依存関係を動的に解決できるようになる。

```rs
let mut store = Store::new(&engine, Greet::new("Native code".to_string()));
HelloWorld::add_to_linker(&mut linker, |greet: &mut Greet| greet)?;
let hello_world = HelloWorld::instantiate(&mut store, &component, &linker)?;
let message = hello_world.radish_greet_sayable().call_say(&mut store)?;
```

### wasi:cli/imports の実装

cargo-component はターゲットが `wasm32-wasip1` のとき `wasi:cli/imports` World のインタフェースを依存関係に自動で追加するので、ビルドターゲットを `wasm32-unknown-unknown` から `wasm32-wasip1` に変えると、実行時に `component imports instance wasi:cli/environment@0.2.0, but a matching implementation was not found in the linker` というエラーになる。追加された import は [[wasm-tools]] の `wasm-tools component wit` で確認できる。

これらの [[wasi|WASI]] のインタフェースは、[[wasmtime-wasi]] クレートで実装できる。使うには、`Store` のデータとなる構造体に [`WasiView`](https://docs.rs/wasmtime-wasi/latest/wasmtime_wasi/trait.WasiView.html) トレイトを実装する。`WasiCtx` は環境変数、標準入出力のストリーム、Component からアクセスを許可したディレクトリなど、WASI の実行状態を持つ。`ResourceTable` はリソースの使用状況を管理するデータ構造である。

```rs
struct Greet {
    name: String,
    wasi_ctx: WasiCtx,
    resource_table: ResourceTable,
}

impl WasiView for Greet {
    fn table(&mut self) -> &mut ResourceTable {
        &mut self.resource_table
    }

    fn ctx(&mut self) -> &mut WasiCtx {
        &mut self.wasi_ctx
    }
}
```

最後に、`wasmtime_wasi::add_to_linker_sync`（同期処理用）または `add_to_linker_async`（非同期処理用）で、wasmtime-wasi の実装を `Linker` に渡す。

## キーワード

- [[webassembly-component|WebAssembly Component]]
- [[wit|WIT]]
- [[cargo-component]]
- [[wac]]
- [[wa-dev|wa.dev]]
- [[wasm-tools]]
- [[wasi|WASI]]
- [[wasmtime-wasi]]
- [[trait|トレイト]]

## 自分の理解

依存するインタフェースの実装を与えることを「依存関係の解決」と呼んでいるが、一般的な名前かどうかは分からない。
