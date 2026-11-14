---
title: Go で WebAssembly を利用した実用的なプラグインシステムの構築方法
description: Go と WebAssembly でプラグインシステムを作るときにぶつかる並行処理、メモリ、ネットワーク、TLS などの壁と、その回避策を紹介する発表
tags: [talk, go, webassembly]
date: 2025-09-27
speakers: [goccy]
company:
event: "[[Go Conference 2025]]"
held: 2025-09-27
slide: https://speakerdeck.com/goccy/go-de-webassembly-woli-yong-sita-shi-yong-de-napuraguinsisutemunogou-zhu-fang-fa
video:
---

## TL;DR

- [[webassembly|WebAssembly]] をプラグインに使うと、Host が Guest の処理を制限でき、Guest がクラッシュしても Host は巻き込まれない。
- Go の WASI 対応は Preview 1 までなので、ネットワーク、TLS、コマンド実行などは標準ライブラリの差し替えや Host への委譲で回避する。

## 内容

### プラグインに WebAssembly を使う利点

Guest（プラグイン本体）で実行する処理を、Host（プラグインを使うアプリケーション）が制限できる。Guest がクラッシュしても、Host は巻き込まれない。一度ビルドすれば、ランタイムさえあればどこでも動く。

### Go の WASI 対応

[[wasi|WASI]] の仕様は Preview 2（WASI 0.2）までリリースされている。一方、Go が実装しているのは Go 1.21 で対応した Preview 1（WASI 0.1）までで、ネットワークソケットやスレッドは使えない。Go 1.21 で wasmimport（Host 関数の利用）が、1.24 で wasmexport（Guest 関数の公開）が使えるようになった。TinyGo を使うとサイズは小さくなるが、`reflect` を使うコードなどはビルドできない。

ランタイムは wazero 一択である。Pure Go で実装された唯一のランタイムで、採用実績もある。WASM の命令を逐次実行するインタプリタと、機械語を生成して実行するコンパイラの 2 つを持つ。

### WebAssembly の壁

Guest の関数を呼び出すと、関数を抜けた時点で非同期処理も止まる。インスタンスはシングルスレッドで非同期割り込みもなく、スレッドセーフではない。最小の Go コードでもインスタンス化に 8 MB のメモリを使うので、リクエストごとにインスタンスを作って[[concurrency|並行処理]]するのは難しい。

ネットワークソケットは、wasmimport で HTTP リクエストを Host に委譲できる。しかし、サードパーティのライブラリまで含めてすべての箇所を置き換えるのは現実的ではない。また、WASI Preview 1 のビルドにはサーバ証明書を検証するためのシステム証明書ストアがないので、証明書を明示しないと [[tls|TLS]] の通信が失敗する。`exec.Command` によるコマンド実行もサポートされていない。

### 回避策

ネットワークソケットは、[wasi-go](https://github.com/dispatchrun/wasi-go) と [net](https://github.com/dispatchrun/net) を使えば wazero で使える。標準ライブラリの実装はビルド時に差し替える。`go build -overlay` で任意のファイルに差し替え、`//go:linkname` で他のパッケージのシンボルを直接参照する。シンボルの解決がリンク時まで遅れるので、パッケージの循環参照を避けられる。プラグインのビルド専用のコマンドを用意すれば、利用者は差し替えを意識しなくて済む。

TLS とコマンド実行も、標準ライブラリの差し替えで対応する。`crypto/x509.(*Certificate).Verify` や `os/exec.(*Cmd).Start` などを差し替え、差し替えた関数から wasmimport で Host に処理を委譲する。処理が Host に戻るので、実行したくないコマンドをはじくといった安全な実行もできる。

メモリは、インスタンスをいくつか起動しておき、ロードバランスする運用が有効である。Host と Guest のメモリ管理は別なので、Guest 側で[[garbage-collection|ガベージコレクション]]が適切に動くよう環境変数を設定したり、`runtime.GC()` を明示的に呼んだりする工夫も効く。

### Tips

`GOMAXPROCS` に 2 以上を指定すると [[panic|panic]] するので、環境変数を Guest に渡すときは `GOMAXPROCS` を除く。外部の API を使うときは、`GOOGLE_API_USE_CLIENT_CERTIFICATE=false` と `GOOGLE_API_USE_MTLS_ENDPOINT=never` で mTLS の処理を無効にする必要がある。

## キーワード

- [[go|Go]]
- [[webassembly|WebAssembly]]
- [[wasi|WASI]]
- TinyGo
- wazero
- [[concurrency|並行処理]]
- [[tls|TLS]]
- [[garbage-collection|ガベージコレクション]]
- [[panic|panic]]

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [セッションのページ](https://gocon.jp/2025/talks/958532/)
