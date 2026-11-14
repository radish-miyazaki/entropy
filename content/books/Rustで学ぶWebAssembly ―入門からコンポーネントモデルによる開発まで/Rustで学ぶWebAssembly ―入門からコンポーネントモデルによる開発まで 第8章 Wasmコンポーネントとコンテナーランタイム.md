---
title: Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで 第8章 Wasmコンポーネントとコンテナーランタイム
description: Docker Desktop のランタイムを切り替えて、WebAssembly Component や Spin アプリケーションをコンテナイメージにして実行する章
tags: [book-chapter, rust, webassembly]
date: 2024-11-01
book: "[[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで]]"
chapter: 8
---

## TL;DR

- Docker Desktop の標準のランタイムは [[webassembly-component|WebAssembly Component]] を実行できないので、設定で containerd のイメージストアと Wasm のサポートを有効にする。
- `FROM scratch` に Wasm ファイルをコピーしたイメージを `--platform wasi/wasm` でビルドし、Wasm 用のランタイムを指定して `docker run` で実行する。

## 内容

### WebAssembly Component の有効化

Docker は階層構造のアーキテクチャをとっている。クライアントは GUI（Docker Desktop）や CLI（`docker`）である。高レベルランタイムは、クライアントからのリクエストを受け取り、必要に応じて低レベルランタイムを起動する。低レベルランタイムは、実際にコンテナを起動する。

2024 年 11 月 1 日時点では、Docker Desktop の標準の高レベル・低レベルランタイムは WebAssembly Component の実行に対応していない。そのため、設定画面でランタイムを切り替える。

1. 右上の歯車アイコンから設定画面を開く
2. General で「Use containerd for pulling and storing images」にチェックを入れ、「Apply & restart」をクリックする。これで WebAssembly を実行するための高レベルランタイムが有効になる
3. Features in development で「Enable Wasm」にチェックを入れ、「Apply & restart」をクリックする

### コンテナイメージの作成と実行

この方法が使えるのは、`wasi:cli/command` World を実装した Component だけである。[[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで 第3章 RustによるWebAssembly作成入門|第3章]]で作った Component を使う。

```dockerfile
# 親イメージを持たないベースイメージを作る
FROM scratch

# 実行する Wasm ファイルをイメージにコピーする
COPY ./target/wasm32-wasip1/release/hello-wasi-cli.wasm /hello-wasi-cli.wasm

# イメージの実行時に、コピーした Wasm ファイルを実行する
ENTRYPOINT ["/hello-wasi-cli.wasm"]
```

イメージは `docker buildx build` で作る。成功すると、Docker Desktop の Images に表示される。

```sh
docker buildx build --platform wasi/wasm -t hello-wasi-cli .
```

通常のコンテナイメージと同じく `docker run` で実行する。`--runtime` で、Component の実行に [[wasmtime|Wasmtime]] を使うよう指定する。

```sh
docker run --rm --runtime=io.containerd.wasmtime.v1 --platform=wasi/wasm hello-wasi-cli
```

### Spin アプリケーションのイメージ作成と実行

[[fermyon-spin|Spin]] のプロジェクトも、ほぼ同じ手順でイメージにできる。違いは、`spin.toml` と、アプリケーションで使う Wasm ファイルをすべてコピーし、`ENTRYPOINT` に `spin.toml` を指定する点である。

```dockerfile
FROM scratch

COPY spin.toml /spin.toml
COPY echo.wasm /echo.wasm
COPY first-glitch-art-api.wasm /first-glitch-art-api.wasm
COPY hello_wasi_http.wasm /hello_wasi_http.wasm

ENTRYPOINT ["/spin.toml"]
```

```sh
docker buildx build --platform wasi/wasm -t hello-world-with-spin .
docker run \
  --runtime=io.containerd.spin.v2 \
  --platform=wasi/wasm \
  -p 3000:80 \
  hello-world-with-spin
```

ランタイムには `io.containerd.spin.v2` を使う。これは Spin アプリケーション用のランタイムで、`ENTRYPOINT` に指定された `spin.toml` を読み、その設定に従って Component を起動する。

コンテナの中で起動した Spin アプリケーションは、コンテナの実行環境から切り離されたサンドボックスで動く。そのため、サンドボックス内のポート番号と、コンテナを実行している環境のポート番号を対応付ける必要がある。上のコマンドでは `-p 3000:80` で対応付けており、3000 番ポートへのアクセスが、サンドボックス内のプログラムの 80 番ポートに転送される。ブラウザや CLI からアクセスするときも 3000 番ポートを指定する。

```sh
$ curl localhost:3000/hello-world
Hello, world!
```

## キーワード

- [[webassembly-component|WebAssembly Component]]
- [[wasmtime|Wasmtime]]
- [[fermyon-spin|Spin]]
- [[wasi|WASI]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
