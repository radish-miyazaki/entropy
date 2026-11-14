---
title: "Gleam: Basics"
description: Gleam Language Tour の Basics の章。モジュール、数値、文字列、変数、型、ブロック、リスト、定数の基本
tags: [article, gleam]
date: 2024-08-01
article-authors: []
site: Gleam
published:
url: https://tour.gleam.run/
---

## TL;DR

- [[Gleam Language Tour|Gleam Language Tour]] の Basics の章。[[gleam|Gleam]] の基本的な文法を扱う。
- Gleam は null も暗黙の型変換もない強い型システムを持ち、`Int` と `Float` で演算子を使い分ける。値は [[immutability|イミュータブル]] で、等価性は構造で判定する。

## 内容

### モジュールと import

すべてのコードは `gleam/io` のような [[module|モジュール]] に属し、別のモジュールのコードは `import` で使う。`as` を付けると別名でアクセスできる。

```gleam
import gleam/io
import gleam/string as text

pub fn main() {
  io.println(text.reverse("Hello, Joe!"))
}
```

`import gleam/io.{println}` のように名前を指定すると、モジュール名なしで関数を使える。ただし、関数がどこで定義されたかが分かりにくくなるので、あまり使わないほうがよい。

### 型チェック

Gleam には `null` も暗黙の型変換もなく、常に完全な型チェックを行う。`io.println` のシグネチャは `pub fn println(string: String) -> Nil` なので、`io.println(4)` はコンパイルエラーになる。文字列以外を表示するときは `io.debug` を使う。

### Int と Float

`Int` は [[beam|BEAM]] 上では最大値・最小値がなく、JavaScript 上では 64 bit の浮動小数点数で表現される。`Float` はどちらのランタイムでも 64 bit の浮動小数点数だが、オーバーフローすると JavaScript では `Infinity` になり、[[erlang|Erlang]] ではエラーになる。0 による除算は、`Int` も `Float` も結果が 0 と定義されている。

演算子はオーバーロードされていないので、`Float` には `+.` や `/.` のように `.` の付いた演算子を使う。数値は `1_000_000` のように区切れ、`0b`、`0o`、`0x` の接頭辞で 2 進数、8 進数、16 進数を書ける。

### 等価性、String、Bool

`==` と `!=` の両側は同じ型でなければならない。等価性は同じメモリ上の位置にあるかではなく、同じ構造を持つかで決まる。

文字列は `"` で囲み、型は `String` である。複数行にまたがってもよく、`<>` で連結する。真偽値は `True` か `False` で、論理演算子は短絡評価される。

### 変数と型

`let` で値を変数に束縛する。別の値で再束縛はできるが、値そのものはイミュータブルなので変わらない。使っていない変数には警告が出るが、`_score` のように先頭に `_` を付けると出ない。

型注釈は `let _name: String = "Gleam"` のように付けられるが、型推論が強力なので、主な用途はドキュメントである。他のモジュールの型は `import gleam/string_builder.{type StringBuilder}` のように `type` を付けて import する。関数とは違い、型ではこの書き方が推奨されている。

型エイリアスは `pub type UserId = Int` のように定義する。新しい型はできず、元の型と同じものとして扱われる。

### ブロック

`{}` でまとめた式をブロックと呼び、最後の式の値が返る。[[rust|Rust]] と同じである。ブロックの中で束縛した変数は外から使えない。二項演算子の評価順序を変えるときにも使う。

```gleam
let celsius = { fahrenheit - 32 } * 5 / 9
```

### リストと定数

リストは `[1, 2, 3]` のように書く、イミュータブルな単方向リストである。先頭への追加や削除は速いが、長さを数えたり任意の位置の要素を取り出したりするのはコストが高い。型は `List(Int)` のようなジェネリック型で、`[-1, 0, ..ints]` のように別のリストを展開できる。

定数はモジュールの最上位で `const` を使って定義し、値はリテラルでなければならない。複数の関数で同じ値を作るより効率がよくなる可能性があるが、効果はコンパイル先によって異なる。

## キーワード

- [[gleam|Gleam]]
- [[module|モジュール]]
- [[beam|BEAM]]
- [[erlang|Erlang]]
- [[immutability|イミュータブル]]
- 単方向リスト
- [[rust|Rust]]

## 自分の理解

ブロックで評価順序を変える書き方は、他の言語で `()` を使うところの代わりのようである。

## 関連

- [[Gleam Language Tour|Gleam Language Tour]]
- [[Gleam： Functions|Gleam: Functions]]
- [gleam/int](https://hexdocs.pm/gleam_stdlib/gleam/int.html)、[gleam/float](https://hexdocs.pm/gleam_stdlib/gleam/float.html)、[gleam/string](https://hexdocs.pm/gleam_stdlib/gleam/string.html)、[gleam/bool](https://hexdocs.pm/gleam_stdlib/gleam/bool.html)
