---
title: RustによるWebアプリケーション開発 設計からリリース・運用まで › ビルドスピードの改善
description: Rust のビルド時間を、ビルドの調整、Docker イメージの調整、CI の調整の 3 つの面から短くする方法をまとめた節
tags: [book-chapter, rust]
date: 2024-10-14
book: "[[RustによるWebアプリケーション開発 設計からリリース・運用まで]]"
chapter: 7
---

## TL;DR

- [[rust|Rust]] は実行速度と引き換えにビルドが遅く、多くのクレートに依存する Web アプリケーションでは特に時間がかかる。
- ビルドそのもの、Docker イメージ、CI の 3 つの面から、ビルド時間を短くする方法を紹介している。

## 内容

### ビルドの調整

**Rust を最新にする。** 2023 年から 2024 年の 1 年で、ビルドは 15% ほど速くなった。Rust を最新に保てば、その恩恵を受けられる。

**`cargo check` を日常的に使う。** 開発中は `cargo build` ではなく `cargo check` でコンパイルが通るかを確かめる。一般に `check` は `build` より 2〜3 倍速い。rust-analyzer がファイルの保存時に走らせているのも `cargo check` である。

**性能の高いマシンを使う。** PC を買い替えるか、[[aws|AWS]] に高性能な EC2 インスタンスを用意する。

**どのフェーズが重いかを計測する。** [[measure-dont-guess|推測するな、計測せよ]]である。`--timings` を付けてビルドすると、クレートごとのコンパイル時間やリソースの使用量が `target/cargo-timings` に HTML で出力される。キャッシュが効いていると正しく計測できないので、先に `cargo clean` する。

```sh
cargo clean
cargo build --timings
```

**不要な依存とフィーチャーを消す。** 大きく速くなることはまれだが、使っていないものは消すべきである。依存やフィーチャーが多いほど、脆弱性のリスクも増える。不要な依存は [[cargo-machete]] で見つけられ、CI でも使える。

```yaml
jobs:
  check:
    name: Check
    runs-on: ubuntu-latest
    steps:
      - name: Install cargo-related tools
        uses: taiki-e/install-action@v2
        with:
          tool: cargo-machete
      - name: Check unused dependencies
        run: cargo machete
```

不要なフィーチャーは、[[cargo-features-manager]] で見つけて消すか、`default` フィーチャーを無効にして必要なものだけを有効にする。

```toml
anyhow = { version = "1.0.89", default-features = false }
```

**より小さなクレートに変える。** 機能を絞った別のクレートが用意されていることがある。たとえば serde に対する [miniserde](https://github.com/dtolnay/miniserde) は、JSON 以外への対応を省いてコード量とバイナリサイズを小さくしている。

**ビルドオプションを調整する。** [cargo build のオプション](https://doc.rust-lang.org/cargo/commands/cargo-build.html#options)を見直すと速くなることがある。[[cargo-wizard]] を使うと、ある程度自動で調整できる。

**より速い[[linker|リンカ]]を使う。** Rust のリンクは、[[llvm|LLVM]] によるコード生成に次いで時間のかかるフェーズである。ただし、どこでのビルドを速くしたいかを考える必要がある。ローカルでは、コンパイラが成果物をキャッシュし、差分だけを再コンパイルする[[incremental-build|インクリメンタルコンパイル]]が多い。それでもリンクは毎回必要なので、ローカルではリンクの占める時間が比較的大きく、リンカを変える効果が出やすい。一方、CI はフルビルドになりやすく、ほかのフェーズの時間が圧倒的に長いので、効果は小さい。

Linux のデフォルトのリンカは GNU ld だが、より速い [mold](https://github.com/rui314/mold) を使える。`mold -run` で実行するか、`.cargo/config.toml` か環境変数 `RUSTFLAGS` で指定する。macOS では、mold を macOS 向けにした [sold](https://github.com/bluewhalesystems/sold) や、2023 年 9 月の Xcode に含まれる ld64 を使える。sold は将来 mold に[マージされる予定](https://github.com/rui314/mold/issues/1171#issuecomment-2019350145)である。ld64 は mold とほぼ同じ速さとされる。ほかに、LLVM プロジェクトが開発する [lld](https://lld.llvm.org/) も GNU ld よりかなり速い。

```toml
# .cargo/config.toml（lld なら fuse-ld=lld）
[build]
rustflags = ["-C", "link-arg=-fuse-ld=mold"]
```

**[Cranelift](https://cranelift.dev/) を使う。** Rust のコンパイルで最も重いのは、LLVM のコンパイラバックエンドによるコード生成である。Rust はここを改善するため、Cranelift というバックエンド（[rustc_codegen_cranelift](https://github.com/rust-lang/rustc_codegen_cranelift)）を開発している。ただし、まだプレビュー段階で nightly でしか使えない。[[simd|SIMD]] が使えず、生成されるコードは LLVM よりやや遅い。

### Docker イメージの調整

**マルチステージビルドを使う。** ビルド用と実行用で別のイメージを使う。各ステージが独立しているので、依存のない部分は並列に実行できる。キャッシュを意識して書けばキャッシュヒット率も上がる。実行用のイメージが小さくなるので、デプロイ先でのダウンロードが速くなる。

```dockerfile
FROM rust:1.81.0-slim-bookworm AS builder
WORKDIR /app
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
WORKDIR /app
RUN adduser book && chown -R book /app
USER book
COPY --from=builder ./app/target/release/app ./target/release/app
ENV PORT 8080
EXPOSE ${PORT}
ENTRYPOINT [ "./target/release/app" ]
```

**[BuildKit](https://github.com/moby/buildkit) を使う。** 従来の Docker Build を拡張した Docker Engine の機能で、キャッシュの効率化や処理の並列化が行われている。最新版ではデフォルトで有効である。

**軽量なイメージを使う。** slim イメージは、不要なパッケージをできるだけ省いた Debian ベースのイメージである。Google の [distroless](https://github.com/GoogleContainerTools/distroless) はさらに軽く、`sh` すら入っていない。ダウンロードが速く脆弱性も少ないが、`sh` や `sleep` がないので思わぬところで困りやすく、上級者向けである。`nonroot` タグを使うと、root 以外のユーザで動かせる。

```dockerfile
FROM gcr.io/distroless/static-debian12:nonroot AS runner
```

**[[cargo-chef]] を使う。** ワークスペースでも、Docker のビルドで依存のキャッシュを効かせられる。`planner` ステージで `recipe.json` を作り、`builder` ステージでそれをもとに依存を先にビルドする。

```dockerfile
FROM lukemathwalker/cargo-chef:latest-rust-1 AS chef
WORKDIR /app

FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json
COPY . .
RUN cargo build --release
```

### CI の調整

**ジョブを調整する。** どのコマンドがどの成果物を使い、どれが別にビルドを走らせるかを考えて、順序と並列化を決める。`cargo clippy` は `cargo check` の成果物を使うので、`cargo check` の後に走らせれば余計なコンパイルを防げる。`cargo test` の成果物は `cargo build` と別物なので、ビルドとテストのジョブを分けて並列に走らせると速くなる。

**CI 用にビルドオプションを調整する。** CI はフルビルドになりやすいので、`CARGO_INCREMENTAL=0` でインクリメンタルコンパイルを切る。オンのままだと、不要な I/O が発生し、キャッシュの効率も落ちる。デバッグ情報を出さないようにすると、キャッシュが小さくなり読み込みが速くなることがある。ただし、`Cargo.toml` で設定するとローカルの開発にも影響する。

```toml
[profile.dev]
debug = 0
```

**キャッシュを見直す。** 依存に変更がなければキャッシュを使ってビルドでき、処理時間が大きく変わるので、必ず確認する。GitHub Actions では、公式の [actions/cache](https://github.com/actions/cache)（[Rust の例](https://github.com/actions/cache/blob/main/examples.md#rust---cargo)）か、より細かく設定できるサードパーティの [Swatinem/rust-cache](https://github.com/Swatinem/rust-cache) を使う。

```yaml
- uses: Swatinem/rust-cache@v2
```

## キーワード

- [[linker|リンカ]]
- [[llvm|LLVM]]
- [[incremental-build|インクリメンタルビルド]]
- マルチステージビルド
- [[cargo-machete]]
- [[cargo-features-manager]]
- [[cargo-wizard]]
- [[cargo-chef]]
- [[simd|SIMD]]
- [[measure-dont-guess|推測するな、計測せよ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
