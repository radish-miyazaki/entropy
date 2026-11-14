---
title: ファズテスト
aliases: [fuzz testing, ファジング]
description: プログラムにランダムな入力値を与えてバグを見つけるソフトウェアテストの手法
tags: [word, テスト]
date: 2025-01-18
---

## TL;DR

ソフトウェアテストの手法の 1 つで、プログラムにランダムな入力値を与えてバグを見つける。

## なぜ必要か

意図的な攻撃者が制御できる入力をプログラムが受け取る場合に特に役立つ。人が考えたテストケースでは思い付かない入力を大量に試せるので、想定外の入力でクラッシュする箇所を見つけられる。

## 仕組み

入力を完全にランダムに作るだけでは、同じ処理ばかりを繰り返し試してしまう。[[coverage-guided-fuzzing|カバレッジガイデッドテスト]]を使うと、新しいコードパスを通った入力をもとに次の入力を作るので、効率よくファズテストを実行できる。代表的なツールに [[libfuzzer|libFuzzer]] があり、[[rust|Rust]] では [[cargo-fuzz]] から利用できる。

## 例

Go の公式ドキュメントによると、[[go|Go]] は 1.18 から標準のツールチェーンでファジングに対応している。ファズテストは `*_test.go` に `FuzzXxx` という名前の関数で書き、`f.Add` でシードコーパスを与え、`f.Fuzz` にファズターゲットを渡す。

```go
func FuzzFoo(f *testing.F) {
    f.Add([]byte("hello"), int64(572293)) // シードコーパス
    f.Fuzz(func(t *testing.T, b []byte, n int64) {
        // ファズターゲット: 速く、決定的にする
    })
}
```

`go test` ではシードコーパスだけを単体テストとして実行し、`go test -fuzz=FuzzFoo` でファジングを始める。失敗した入力は最小化してから `testdata/fuzz/FuzzFoo/` に保存され、以後の `go test` で回帰テストとして使われる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[coverage-guided-fuzzing|カバレッジガイデッドテスト]]
- [[libfuzzer|libFuzzer]]
- [[cargo-fuzz]]
- [[property-based-testing|プロパティベーステスト]]
- [[Effective Rust 項目30 ユニットテスト以上のものを書こう]]

## 出典

- [Go Fuzzing - The Go Programming Language](https://go.dev/doc/security/fuzz/)
