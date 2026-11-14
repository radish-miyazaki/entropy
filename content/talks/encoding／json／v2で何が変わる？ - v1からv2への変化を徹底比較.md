---
title: "encoding/json/v2で何が変わる? - v1からv2への変化を徹底比較"
description: encoding/json の v1 が抱える仕様、API、性能の課題と、それを解決する v2 と jsontext の設計、v1 との関係、移行手順を紹介する発表
tags: [talk, go, json]
date: 2025-09-27
speakers: [nagano]
company:
event: "[[Go Conference 2025]]"
held: 2025-09-27
slide: https://speakerdeck.com/nagano/v2dehe-gabian-waruka
video:
---

## TL;DR

- `encoding/json` の v1 には、仕様への準拠、API の使いやすさ、性能に課題があった。
- v2 は構文を扱う `encoding/json/jsontext` と意味を扱う `encoding/json/v2` に分かれ、v1 も内部では v2 で再実装されて同じコードベースを共有する。

## 内容

### v1 の課題

v1 は [[json|JSON]] の標準仕様に完全には準拠していない。キーが重複すると後の値が優先されるので、署名検証、監査、差分適用の場面で脆弱性になりうる（例: [CVE-2017-12635](https://nvd.nist.gov/vuln/detail/CVE-2017-12635)）。無効な [[utf-8|UTF-8]] がエラーにならないので、データが壊れるおそれがある。構造体へのマッピングではキーの大文字と小文字を区別しないが、RFC 8259 では区別する。map や slice の[[zero-value|ゼロ値]]（nil）は `null` になるが、外部との連携では `[]` や `{}` にしたい。また、`MarshalJSON` をポインタレシーバで定義すると、値レシーバからはそのメソッドを呼べないので、`v` と `&v` で結果が変わることがある。

API も扱いづらい。`json.NewDecoder(r).Decode(v)` は入力の末尾の余分なデータを拒否できず、チェックには追加のコードが要る。

```go
r := strings.NewReader(`{"a":1} true`)
dec := json.NewDecoder(r)
var v map[string]int
_ = dec.Decode(&v) // 1 個目だけ受理され、余分なデータがあっても警告はない

// チェックするには追加のコードが必要
if err := dec.Decode(&struct{}{}); err != io.EOF {
	// ...
}
```

`DisallowUnknownFields()` のような Encoder / Decoder のオプションはインスタンスごとに設定するもので、`Marshal` / `Unmarshal` では使えない。`Compact` などのユーティリティ関数は入力が `[]byte`、出力が `*bytes.Buffer` なので、すべてをメモリに載せる前提になり、`io.Writer` に直接書けない。

性能面では、ストリーミングに対応しておらず JSON 全体を内部でバッファリングする。`MarshalJSON` が `[]byte` を返すので、メモリアロケーションが避けられない。`UnmarshalJSON` では境界の検出と実際のパースで 2 回読むので、ネストした構造では[[computational-complexity|計算量]]が指数関数的に増える。実際に [[kubernetes|Kubernetes]] でも問題になった（[issue](https://github.com/kubernetes/kube-openapi/issues/315)）。

### v2 のコンセプト

v2 は、構文と意味を別のパッケージに分けた。`jsontext` は JSON の文法に基づく処理に特化し、トークン単位の低レベルな操作、RFC 8259 に準拠した検証、位置情報付きのエラー報告を担う。`json/v2` は Go の値と JSON の相互変換を担い、拡張できるオプションや、Marshaler / Unmarshaler のカスタマイズを提供する。

この分離で、`io.Reader` / `io.Writer` に直接読み書きでき、インデントやゼロ値のフィールドの省略といったオプションも増えた。RFC 8259 に完全に準拠するので、不正な JSON、重複キー、無効な UTF-8 を検出できる。ストリーミングでデータを少しずつ処理するので、大きなデータも少ないメモリで速く扱える。

### v1 との関係と変更点

v1 は廃止されず、引き続きサポートされる。v1 は内部的に v2 を基に再実装されていて、同じコードベースを共有する。そのため、v2 に入る後方互換な機能追加、バグ修正、性能改善は v1 にも効く。

v2 では検証が厳格になり、エラーの種類が明確になった。空の slice と map は、`omitempty` を付けても nil でも、`[]`、`{}` として出力される。すべての API で `opts ...json.Options` を受け取れるようになり、タグには次のものが加わった。

- `omitzero`: ゼロ値なら省略する
- `omitempty`: JSON の空値（`""`、`null`、`[]`、`{}`）なら省略する
- `format`: `time.Time` などのフォーマットを指定する
- `inline`: 構造体のフィールドを平坦に展開する
- `unknown`: 未知のフィールドの扱いを制御する

### 移行手順

1. `GOEXPERIMENT=jsonv2` を付けてビルドとテストを実行し、v1 互換モードで検証する
2. インポートパスを `encoding/json` から `encoding/json/v2` に置き換える
3. ビルドして、ゼロ値や `omitempty` の扱い、`io.Reader` / `io.Writer` の利用箇所などの破壊的変更に対応する

## キーワード

- [[go|Go]]
- [[json|JSON]]
- [[utf-8|UTF-8]]
- [[zero-value|ゼロ値]]
- [[computational-complexity|計算量]]
- [[kubernetes|Kubernetes]]

## 自分の理解

`format` タグはめちゃくちゃ便利だ。

## 関連

- [セッションのページ](https://gocon.jp/2025/talks/958036/)
- [encoding/json/v2 - pkg.go.dev](https://pkg.go.dev/encoding/json/v2)
- [Go 1.25 Release Notes](https://go.dev/doc/go1.25#json_v2)
- [公式のベンチマーク](https://github.com/go-json-experiment/jsonbench)
