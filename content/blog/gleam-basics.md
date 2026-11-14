---
title: "Gleam: Basics"
description: Gleam Language Tour の Basics の章を読み、モジュール、数値、文字列、変数、型、ブロック、リスト、定数の基本をまとめた
tags: [blog, gleam]
date: 2024-08-01
draft: false
---

## TL;DR

- [[gleam-language-tour|Gleam Language Tour]] の Basics の章を読み、[[gleam|Gleam]] の基本的な文法をまとめた。
- Gleam は null も暗黙の型変換もない強い型システムを持ち、`Int` と `Float` で演算子を使い分ける。値は [[immutability|イミュータブル]] で、等価性は構造で判定する。

## 背景

Gleam を学ぶため、公式のチュートリアルである Gleam Language Tour を Basics の章から読み進めた。

## 検証

### モジュールと import

Gleam では、すべてのコードが `gleam/io` のような [[module|モジュール]] に属する。別のモジュールのコードを使うときは `import` を書く。`as` を付けると、別名でアクセスできる。

```gleam
import gleam/io
import gleam/string as text

pub fn main() {
  io.println(text.reverse("Hello, Joe!"))
}
```

`import` のときに `.{}` で名前を指定すると、モジュール名を付けずに（修飾せずに）関数を使える。ただし、関数がどこで定義されているかが分かりにくくなり、可読性が落ちるので、あまり使わないほうがよい。

```gleam
import gleam/io.{println}

pub fn main() {
  io.println("This is qualified")
  println("This is unqualified")
}
```

### 型チェック

Gleam は強力な型システムを持つ。`null` も暗黙の型変換もなく、常に完全な型チェックを行う。たとえば `gleam/io.println` のシグネチャは `pub fn println(string: String) -> Nil` なので、文字列以外を渡すとコンパイルエラーになる。

```gleam
import gleam/io

pub fn main() {
  io.println("My lucky number is:")
  io.println(4)
}
```

```text
error: Type mismatch
  ┌─ /src/main.gleam:5:14
  │
5 │   io.println(4)
  │              ^

Expected type:

    String

Found type:

    Int
```

文字列以外の値を表示したいときは、`pub fn debug(term: a) -> a` というシグネチャを持つ `gleam/io.debug` を使う。

### Int と Float

`Int` 型は整数を表す。[[beam|BEAM]] 上で実行する場合は最大値・最小値がない。JavaScript のランタイム上で実行する場合は、64 bit の浮動小数点数として表現される。整数を操作する標準ライブラリとして、`gleam/int` が提供されている。

```gleam
import gleam/int
import gleam/io

pub fn main() {
  io.debug(int.max(42, 77))      // 77
  io.debug(int.clamp(5, 10, 20)) // 10
}
```

`Float` 型は浮動小数点数を表す。[[erlang|Erlang]] と JavaScript のどちらのランタイムでも 64 bit の浮動小数点数として表現されるが、動作はランタイムごとに少し異なる。JavaScript では、表現できる最大値を超えると `Infinity`（最小値なら `-Infinity`）になり、`Infinity` どうしを割ると `NaN` になる。Erlang では、オーバーフローするとエラーになる。なお、0 による除算はオーバーフローせず、結果は 0 と定義されている。これは `Int` も同じである。

演算子はオーバーロードされていないので、`Float` には `.` の付いた専用の演算子を使う。浮動小数点数を操作する標準ライブラリとして、`gleam/float` が提供されている。

```gleam
io.debug(1.0 +. 1.5)
io.debug(5.0 /. 2.5)
io.debug(2.2 >. 1.3)
io.debug(3.14 /. 0.0) // 0.0
```

数値は `1_000_000` のように `_` で区切って書ける。2 進数、8 進数、16 進数は、接頭辞の `0b`、`0o`、`0x` で書く。10 の冪乗は `7.0e7` や `3.0e-4` のように `e` で表す。

```gleam
0b00001111 // 15
0o17       // 15
0xF        // 15
```

### 等価性

等価性を調べる演算子として `==` と `!=` がある。演算子の両側は同じ型でなければならない。等価性は構造で判定されるので、2 つの値が同じメモリ上の位置にあるかではなく、同じ構造を持つかで決まる。

### String と Bool

文字列は `"` で囲み、型は `String` である。複数行にまたがってもよく、Unicode の文字を含められる。文字列の連結には `<>` 演算子を使う。エスケープ文字として `\"`、`\\`、`\f`、`\n`、`\r`、`\t`、コードポイントを表す `\u{xxxxxx}` を使える。文字列を操作する標準ライブラリとして、`gleam/string` が提供されている。

```gleam
io.debug(string.reverse("1 2 3"))     // "3 2 1"
io.debug(string.append("abc", "def")) // "abcdef"
```

真偽値は `True` か `False` で、型は `Bool` である。多くの言語と同じく、論理演算子は短絡評価される。真偽値を操作する標準ライブラリとして、`gleam/bool` が提供されている。

### 変数の束縛

`let` で値を変数に束縛する。変数名と関数名は `snake_case` で書く。別の値で再束縛はできるが、値はイミュータブルなので、値そのものは変わらない。

```gleam
let x_str = "Original"
let y_str = x_str
let x_str = "New"
io.println(x_str) // "New"
io.debug(y_str)   // "Original"
```

使っていない変数があると、コンパイラは警告を出す。`let _score = 1000` のように名前の先頭に `_` を付けると、この警告を出さないようにできる。

### 型注釈と型の import

変数には `let _name: String = "Gleam"` のように型注釈を付けられる。ただし、型推論が強力なので、型注釈を付けることは一般的ではない。主な用途はドキュメントである。異なる型の値を束縛しようとすると、コンパイルエラーになる。

関数と同じように、他のモジュールで定義された型も `import` できる。`.{type StringBuilder}` のように `type` を付けると、型をモジュール名なしで使える。関数とは違い、型ではこちらの書き方が推奨されている。

```gleam
import gleam/string_builder.{type StringBuilder}

pub fn main() {
  let _text: StringBuilder = string_builder.new()
}
```

### 型エイリアス

型エイリアスは `type` で定義する。新しい型ができるわけではなく、元の型と同じ型として扱われる。`pub` を付けると、他のモジュールから使える。型名は `UpperCamelCase` で書く。

```gleam
pub type UserId = Int

let one: UserId = 1
let two: Int = 1
io.debug(one == two) // True
```

### ブロック

`{}` でまとめた 1 つ以上の式をブロックと呼ぶ。各式は順に評価され、最後の式の値が返る。これは [[rust|Rust]] と同じである。ブロックの中で束縛した変数は、ブロックの中でしか使えない。ブロックは、二項演算子の評価順序を変えるときにも使う。

```gleam
let fahrenheit = {
  let degrees = 64
  degrees
}
let celsius = { fahrenheit - 32 } * 5 / 9
io.debug(celsius) // 17
```

### リストと定数

リストは順序付けられた値の集合で、`[1, 2, 3]` のように書く。正確には、イミュータブルな [[singly-linked-list|単方向リスト]] である。そのため、先頭への要素の追加や削除は効率がよいが、長さを数えたり、任意の位置の要素を取り出したりするのはコストが高い。そうした操作が多いときは、`Iterator` や `Dict` など別の型を使うほうがよい。リストはジェネリック型で、要素が整数なら `List(Int)`、文字列なら `List(String)` になる。`..` で別のリストを展開できる。

```gleam
let ints = [1, 2, 3]
io.debug([-1, 0, ..ints]) // [-1, 0, 1, 2, 3]
```

定数は、モジュールの最上位で `const` を使って定義する。値はリテラルでなければならず、関数は使えない。複数の関数で同じ値を作るよりも効率がよくなる可能性がある。ただし、効果は Erlang と JavaScript のどちらにコンパイルするかで異なる。

```gleam
const ints: List(Int) = [1, 2, 3]
const floats = [1.0, 2.0, 3.0]
```

## 考察

ブロックで評価順序を変える書き方は、他の言語で `()` を使うところの代わりのようである。

## キーワード

- [[gleam|Gleam]]
- [[gleam-language-tour|Gleam Language Tour]]
- [[module|モジュール]]
- [[beam|BEAM]]
- [[erlang|Erlang]]
- [[immutability|イミュータブル]]
- [[singly-linked-list|単方向リスト]]
- [[rust|Rust]]

## 参考

- [gleam/int](https://hexdocs.pm/gleam_stdlib/gleam/int.html)
- [gleam/float](https://hexdocs.pm/gleam_stdlib/gleam/float.html)
- [gleam/string](https://hexdocs.pm/gleam_stdlib/gleam/string.html)
- [gleam/bool](https://hexdocs.pm/gleam_stdlib/gleam/bool.html)
- [gleam/iterator](https://hexdocs.pm/gleam_stdlib/gleam/iterator.html)
- [gleam/dict](https://hexdocs.pm/gleam_stdlib/gleam/dict.html)
