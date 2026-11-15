---
title: Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで › 他のプログラムから利用されるWasmコンポーネント
description: WIT でインタフェースを定義したライブラリとしての WebAssembly Component を作り、Wasmtime の API や bindgen マクロを使ってホスト側の Rust プログラムから呼び出す章
tags: [book-chapter, rust, webassembly]
date: 2024-10-18
book: "[[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで]]"
chapter: 4
---

## TL;DR

- `cargo component new --lib` で、[[wit|WIT]] に定義したインタフェースを実装するライブラリとしての [[webassembly-component|WebAssembly Component]] を作れる。
- ライブラリの Component は単体では実行できないので、[[wasmtime|Wasmtime]] の API や `bindgen!` マクロを使って、ホスト側の Rust プログラムから呼び出す。

## 内容

### プロジェクトの作成

`cargo component new --lib greet` を実行すると、[[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで 第3章 RustによるWebAssembly作成入門|第3章]]と異なり、`wit/world.wit` という [[wit|WIT]] ファイルが生成される。`src/lib.rs` も `cargo new --lib` とは中身が違い、`mod bindings` と `Guest` トレイトの実装が書かれている。

`bindings` モジュールは、`cargo component build` の実行時に `wit/world.wit` から `src/bindings.rs` として生成される。その中に `Guest` トレイトが定義されており、これを実装すると、WIT の定義に沿ったライブラリとしての Component を作れる。

### WIT の修正とインタフェースの実装

`wit/world.wit` を次のように書き換える。

```wit
package radish:greet;

interface greetable {
    name: func() -> string;
    greet: func(name: string) -> string;
}

world greetable-provider {
    export greetable;
}
```

もう一度 `cargo component build` を実行し、`src/bindings.rs` を作り直す。この時点ではビルドは失敗するが、気にしなくてよい。そのあと、`src/lib.rs` で `Component` 構造体に新しい `Guest` トレイトを実装する。

```rs
use crate::bindings::exports::radish::greet::greetable::Guest;

struct Component;

impl Guest for Component {
    fn name() -> String {
        "WebAssembly Component".to_string()
    }

    fn greet(name: String) -> String {
        format!("Hello, {}!", name)
    }
}

bindings::export!(Component with_types_in bindings);
```

`cargo component build --target wasm32-unknown-unknown` でビルドが通る。

### Component を利用するプログラム

ライブラリとして作った Component は、他のプログラムの一部として実行される前提なので、[[wasmtime|Wasmtime]] の CLI から直接は実行できない。そこで、Component を呼び出すプログラム `greet-user` を作り、`clap`、[[anyhow]]、`wasmtime` を追加する。

呼び出しは次の手順で行う。

1. [`Component::from_file`](https://docs.rs/wasmtime/latest/wasmtime/component/struct.Component.html#method.from_file) で Wasm ファイルを読み込む。引数には `Engine` を渡す
2. 読み込んだ `Component` は構文解析の結果にすぎず、そのままでは実行できない。`Linker` を使って [[webassembly-instance|WebAssembly Instance]] を作る。`Store` は作成した Instance と、その実行状態を管理する。`Store::new` の第 2 引数は `Store` が持つデータの初期値で、今回は `()` を渡す
3. `Instance` の `get_export` で、インタフェースや関数を指す `ComponentExportIndex` を取得する。これは配列の添字や `HashMap` のキーのような役割を持つ
4. `get_typed_func` で、関数への参照を持つ `TypedFunc` を作る
5. `TypedFunc` の `call` で関数を呼び出す。関数は複数の値を返しうるので、戻り値はタプルになる。呼び出したあとは、戻り値の変換が終わったことを伝えるために `post_return` を呼ぶ

```rs
fn start(args: Args) -> anyhow::Result<()> {
    let engine = Engine::default();
    let component = Component::from_file(&engine, &args.wasm_file)?;
    let linker = Linker::new(&engine);
    let mut store = Store::new(&engine, ());
    let instance = linker.instantiate(&mut store, &component)?;

    let greetable_index = instance
        .get_export(&mut store, None, "radish:greet/greetable")
        .unwrap();
    let greet_index = instance
        .get_export(&mut store, Some(&greetable_index), "greet")
        .unwrap();
    let greet: TypedFunc<(String,), (String,)> =
        instance.get_typed_func(&mut store, greet_index).unwrap();

    let (return_value,) = greet.call(&mut store, ("world!".to_string(),))?;
    greet.post_return(&mut store)?;
    println!("{return_value}");

    Ok(())
}
```

### WIT から生成したコードを使う

関数を名前で探す代わりに、WIT ファイルからコードを生成して呼び出すこともできる。[`wasmtime::component::bindgen`](https://docs.rs/wasmtime/latest/wasmtime/component/macro.bindgen.html) マクロは、ビルド時に WIT の World の定義から、Component をラップする構造体とメソッドを生成する。`world` には World の名前を、`path` には WIT ファイルのあるディレクトリを指定する。

```rs
bindgen!({
    world: "greetable-provider",
    path: "../greet/wit"
});
```

World 名の構造体（ここでは `GreetableProvider`）の `instantiate` 関数で Instance を作る。`{名前空間}_{パッケージ名}_{インタフェース名}` のメソッド（ここでは `radish_greet_greetable`）でインタフェースのラッパーを取得し、`call_{関数名}` で関数を呼び出す。

```rs
let provider = GreetableProvider::instantiate(&mut store, &component, &linker)?;
let greetable = provider.radish_greet_greetable();

let message = greetable.call_greet(&mut store, "world")?;
println!("{message}");
```

## キーワード

- [[webassembly-component|WebAssembly Component]]
- [[wit|WIT]]
- [[cargo-component]]
- [[wasmtime|Wasmtime]]
- [[webassembly-instance|WebAssembly Instance]]
- [[anyhow]]
- [[trait|トレイト]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
