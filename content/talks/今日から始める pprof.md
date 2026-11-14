---
title: 今日から始める pprof
description: Go のプロファイラ pprof の取り方と見方を、CLI アプリケーションの改善を題材に学ぶワークショップ
tags: [talk, go, パフォーマンス]
date: 2025-10-03
speakers: [ymotongpoo]
company:
event: "[[Go Conference 2025]]"
held: 2025-09-27
slide: https://speakerdeck.com/ymotongpoo/pprof-workshop-for-beginners
video:
---

## TL;DR

- Go 標準の pprof でプロファイルを取り、Web UI でボトルネックを探して改善する流れを学ぶワークショップ。
- 実際にはベンチマークテストと一緒にプロファイルを取ることが多く、本番環境では継続的にプロファイルを取るのが理想である。

## 内容

ワークショップの枠から外れてしまったので、資料とリポジトリを見ながら一人で進めた。

### プロファイルとは

Go でプロファイルといえば、通常はパフォーマンスプロファイルを指す。プログラムのどこが実行速度を律速しているかを調べる手法で、CPU 使用率やメモリ使用量、スレッド数などを、統計的にコールスタック（関数）単位で集める。

### プロファイルを取る標準パッケージ

CLI やバッチツールでは [runtime/pprof](https://pkg.go.dev/runtime/pprof) を使う。HTTP サーバでは [net/http/pprof](https://pkg.go.dev/net/http/pprof) を使い、`/debug/pprof/profile`（CPU）、`/debug/pprof/heap`（ヒープ）、`/debug/pprof/block`（[[goroutine|ゴルーチン]]のブロック）、`/debug/pprof/mutex`（[[mutex|Mutex]] の保持）、`/debug/pprof/trace`（トレース）といったエンドポイントから取得する。どちらの場合も、コードに[[instrumentation|計装]]しないとプロファイルは取れない。ワークショップでは CLI アプリケーションを改善するので、`runtime/pprof` を使う。

### Web UI での見方

`go tool pprof -http :<ポート番号>` で Web UI が立ち上がる。`-http` を付けないと対話モードになる。Web UI には次のビューがある。

- Flame Graph: 横に長いほどリソースを使っている。
- Top: Linux の `top` と同じく、関数をリソースの消費順に表で並べる。
- Graph: 箱が大きいほど消費が多い。差分を比べるときは、緑（改善）から灰色、赤（悪化）のグラデーションで表示される。
- Source: 行単位でリソースの消費を表示する。Go のアセンブリにも対応している。

ほかに Peek や Disassemble もある。

### 結果の読み方

標準パッケージや有名なパッケージはベンチマークテストを実行しているので、まずは自分が書いたコードに原因があると考える。Flat（その関数自体が直接使った時間やメモリ）が大きければアルゴリズムに問題がある。Cum（その関数が呼び出す関数も含めた累計）が大きければ、外部の関数の呼び出し方に問題がある。Flame Graph や Graph でボトルネックの見当を付け、Source で掘り下げる。

改善の結果は計測でしか判断できないので、プロファイルは常に取る。改善前後の差分は次のように比べる。

```sh
go tool pprof -http :9999 -base cpu.prof cpu.prof.2
```

### 実際の取り方

上のようにプロファイルを取ることはあまりない。実際にはベンチマークテストのときに一緒に出力することが多い。ヒープを取るときは `-memprofile` を付ける。

```sh
go test -bench=. -cpuprofile=cpu.prof
go test -bench=. -memprofile=mem.prof
```

### 継続的なプロファイリング

常時稼働しているサービスでは、パフォーマンスの問題は突然やってくる。そのため、本当は本番環境で継続的にプロファイルを取りたい。CNCF のオブザーバビリティホワイトペーパーでも、ログ、メトリクス、トレースなどと並ぶ重要な[[telemetry|テレメトリ]]として、継続的なプロファイルが挙げられている。自作は現実的ではないので、[[pyroscope|Pyroscope]] などの専用サービスを使う。

## キーワード

- pprof
- Flame Graph
- [[goroutine|ゴルーチン]]
- [[mutex|Mutex]]
- [[instrumentation|計装]]
- [[benchmark-test|ベンチマークテスト]]
- [[telemetry|テレメトリ]]
- [[pyroscope|Pyroscope]]

## 自分の理解

いい加減、[[効率的なGo ―データ指向によるGoアプリケーションの性能最適化|効率的な Go]] を読まないと…。

## 関連

- [ワークショップのページ](https://gocon.jp/2025/workshops/1018925/)
- [ワークショップのリポジトリ](https://github.com/ymotongpoo/20250927-gocon-workshop)
