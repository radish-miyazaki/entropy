---
title: Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで 第6章 コマンドラインインターフェースアプリケーションの作成
description: レジストリ wa.dev に WIT パッケージと WebAssembly Component を登録し、それを合成して PNG をグリッチする CLI アプリケーションを作る章
tags: [book-chapter, rust, webassembly]
date: 2024-10-23
book: "[[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで]]"
chapter: 6
---

## TL;DR

- [[warg|Warg]] でログインし、[[wit|WIT]] パッケージと [[webassembly-component|WebAssembly Component]] をレジストリ [[wa-dev|wa.dev]] に登録する。
- 登録した Component を [[wac]] で CLI アプリケーションと合成し、[[wasmtime|Wasmtime]] で実行する。

## 内容

### CLI から wa.dev に接続する

クライアントツールから [[wa-dev|wa.dev]] を使うには、wa.dev に公開鍵を登録する必要がある。ヘッダの「Setup new CLI」に手順が表示されるので、それに従う。

1. `warg login --registry warg.wa.dev` を実行し、wa.dev に表示されたトークンを入力する。公開鍵が生成されて表示される
2. 生成された公開鍵を wa.dev に貼り付ける
3. 「Create credentials」をクリックする

`warg` でログインすれば、ログイン状態やパッケージのキャッシュなどは `wkg` や [[cargo-component]] にも共有される。別々にログインする必要はない。

### WIT パッケージをレジストリに登録する

`wit` ディレクトリを作り、登録する WIT ファイルを書く。

```wit
package radish:glitch-art;

interface png-glitchable {
    enum filter-type {
        none,
        sub,
        up,
        average,
        paeth
    }

    record scan-line {
        filter-type: filter-type,
        pixel-data: list<u8>
    }

    glitch: func(scan-line: scan-line) -> scan-line;
}

world png-glitcher {
    export png-glitchable;
}

world png-glitcher-cli {
    import png-glitchable;
}
```

`wkg wit build` を実行すると文法をチェックし、エラーがなければ WIT パッケージの Wasm ファイルと `wkg.lock` を生成する。

登録には、wa.dev の Web 画面でパッケージを作成したときに表示される `warg publish release` コマンドを使う。レジストリはパッケージを[[semantic-versioning|セマンティックバージョニング]]で管理しており、`--version` でバージョンを指定する。

```sh
wkg wit build
warg publish release --name radish:glitch-art --version 0.0.1 radish:glitch-art.wasm
```

### 登録した WIT を実装する Component

cargo-component で、レジストリ上の World を対象にしたプロジェクトを作る。

```sh
cargo component new \
  --lib \
  --target radish:glitch-art/png-glitcher@0.0.1 \
  --namespace radish \
  first-glitch-art
```

このとき、`wkg` のデフォルトレジストリに wa.dev を設定しておかないと `no registry configured for namespace "radish"` というエラーになる（[wasm-pkg-tools の README](https://github.com/bytecodealliance/wasm-pkg-tools?tab=readme-ov-file#configuration)）。

```sh
wkg config --default-registry wa.dev
```

生成された `src/lib.rs` で、`png-glitchable` インタフェースの `glitch` 関数を実装する。ここでは、スキャンラインの先頭の画素をランダムな値に置き換える。

```rs
impl Guest for Component {
    fn glitch(mut scan_line: ScanLine) -> ScanLine {
        let mut rng = rand::thread_rng();
        scan_line.pixel_data[0] = rng.gen_range(0..=255);
        scan_line
    }
}
```

`cargo component build -r` でビルドし、WIT パッケージと同じく `warg publish release` で wa.dev に登録する（https://wa.dev/radish:first-glitch-art）。

### 登録した Component を使う CLI

`png-glitcher-cli` World を実装する CLI アプリケーション `png-glitch-cli` を作る。`cargo new` でプロジェクトを作り、`clap`、[[anyhow]]、`png-glitch` などのクレートを追加する。先ほどの `wit` ディレクトリ、`wkg.lock`、WIT パッケージの Wasm ファイルをプロジェクト内に移し、`Cargo.toml` に実装する World を書く。

```toml
[package.metadata.component]
package = "radish:png-glitch-cli"
target = "radish:glitch-art/png-glitch-cli@0.0.1"
```

`bindings` モジュールは World の定義から生成するので、ビルドには `cargo component build` を使う。`src/main.rs` では、png-glitch クレートの `FilterType` と WIT で定義した `FilterType` を相互に変換するため、両方向に `From` トレイトを実装する。そのうえで、画像のスキャンラインごとに import した `glitch` 関数を呼び出し、結果を書き戻す。

`cargo component build -r` でビルドすると Component ができるが、`glitch` の実装を持っていないので、そのままでは実行できない。そこで、wa.dev に登録した `radish:first-glitch-art` と [[wac]] で合成する（[[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで 第5章 依存関係の解決と合成|第5章]]）。`--plug` には、レジストリに登録した Component を指定できる。

```sh
wac plug \
  --plug radish:first-glitch-art \
  target/wasm32-wasip1/release/png-glitch-cli.wasm \
  -o first-glitch.wasm
```

[[wasmtime|Wasmtime]] で実行する。`--dir` で、Component がアクセスできるディレクトリを指定する。ここではカレントディレクトリへのアクセスを許可している。

```sh
wasmtime --dir=./ first-glitch.wasm original.png
```

## キーワード

- [[wa-dev|wa.dev]]
- [[warg|Warg]]
- [[wit|WIT]]
- [[webassembly-component|WebAssembly Component]]
- [[cargo-component]]
- [[wac]]
- [[wasmtime|Wasmtime]]
- [[semantic-versioning|セマンティックバージョニング]]

## 自分の理解

WIT パッケージの登録では、最初に `wkg publish` を試してつまずいた。まず `component package version not found` というエラーになり、[issue のコメント](https://github.com/bytecodealliance/wasm-pkg-tools/issues/117#issuecomment-2425133153)から、パッケージ名にバージョン（`package radish:glitch-art@0.1.0;`）が必要だと分かった。次は `no registry configured for namespace "radish"` と言われた。wa.dev を探しに行ってくれるものだと思っていたが、原因は `wkg` のデフォルトレジストリを設定していなかったことだった。README の一番上に書いてあった。結局、wa.dev の画面に表示された `warg publish release` を使って登録できた。
