---
title: Effective Rust › データ構造を表現するために型システムを用いよう
description: Rust の基本型・集約型・enum を整理し、フィールド付き enum で不変条件を型にエンコードして無効な状態を表現できないようにする項目
tags: [book-chapter, rust]
date: 2024-12-10
book: "[[Effective Rust]]"
chapter: 1
---

## TL;DR

- [[rust|Rust]] は暗黙の型変換を許さず、基本型・集約型・`enum` でデータ構造を表現する。
- フィールド付き `enum` を使うと、データ構造の[[invariant|不変条件]]を型にエンコードでき、「型で無効な状態を表現できない」ようにできる。
- 失敗しうる操作の結果は常に `Result<T, E>` で表す。

## 内容

https://effective-rust.com/use-types.html

### 基本型

整数型には符号ありの `i8`〜`i128` と符号なしの `u8`〜`u128` がある。さらに、ターゲットのポインタサイズ（32 ビットか 64 ビット）に合わせた `isize` と `usize` がある。メモリアドレス空間のサイズより多くの要素はメモリ上に持てないので、標準のコレクションでは `len()` の戻り値やインデックスに `usize` を使うのが一般的である。

ほかに `bool`、浮動小数点数型の `f32` と `f64`、ユニット型の `()`、文字型の `char` がある。`char` は Unicode スカラ値を保持し、内部的には 4 バイトで格納される。[[go|Go]] の `rune` 型に近い。

Rust では、型変換を明示しないとコンパイルエラーになる。大きい整数型から小さい整数型への代入はもちろん、その逆もエラーになる。

```rust
let x: i32 = 42;
let y: i16 = x; // コンパイルエラー

let x = 42i32;
let y: i64 = x; // これもコンパイルエラー
```

変換用のヘルパメソッドは用意されているが、失敗したときの処理を呼び出し側に強制する。たとえば `char` から `u32` への変換は常に成功する。一方、`u32` には Unicode スカラ値として不正な値もあるので、`char::from_u32` は `Option<char>` を返す。`char::from_u32_unchecked` は値が有効だと仮定する `unsafe` な関数で、仮定が誤っていれば[[undefined-behavior|未定義動作]]になる。

### 集約型

- **配列**: 1 つの型のインスタンスを複数保持する。数はコンパイル時に決まる（例: `[u32; 4]`）
- **タプル**: 複数の型のインスタンスを保持する。要素数と型はコンパイル時に決まる。同じ型の要素が複数あるなら、名前を付けて構造体にしたほうがよい
- **構造体**: タプルと同じく複数の型のインスタンスを保持するが、型全体と各フィールドが名前を持つ
- **タプル構造体**: 型全体は名前を持つが、フィールドは名前を持たず `s.0` のようにアクセスする

### enum

`enum` は相互に排他的な値の集合を表す。`enum` を定義すると新しい型が生まれるので、たとえば `bool` を引数に取る関数の可読性と保守性を高められる。

```rust
pub enum Sides { Both, Single }
pub enum Output { BlackAndWhite, Color }

pub fn print_page(sides: Sides, color: Output) { /* ... */ }

print_page(Sides::Both, Output::Color);
print_page(Output::BlackAndWhite, Sides::Single); // コンパイルエラー
```

[[newtype-pattern|Newtype パターン]]で `bool` を包んでも同じ効果が得られる（[[Effective Rust 項目6 newtypeパターンを活用しよう|項目6]]）。引数が常に `bool` だと分かっているなら Newtype パターンを、将来ほかの値を取りうるなら `enum` を使う。また、`enum` の値に `match` を使うと、コンパイラはすべてのパターンを網羅するよう強制する。

### フィールド付き enum

Rust の `enum` の真価は、各バリアントにデータを持たせられることにある。これにより `enum` を[[algebraic-data-type|代数的データ型]]として扱える。この機能を使うと、データ構造の不変条件を型システムにエンコードでき、設計者の意図を人間とコンパイラの両方に伝えられる。

> 型で無効な状態を表現できないようにしよう

```rust
pub enum SchedulerState {
    Inert,
    Pending(HashSet<Job>),
    Running(HashMap<CpuId, Vec<Job>>),
}
```

この型定義を見るだけで、スケジューラが完全に起動するまで `Job` は `Pending` にあり、起動すると CPU プールに割り当てられることが分かる。この機能がなければ、「`monochrome` が true なら `fg_color` は (0, 0, 0) でなければならない」のような制約はコメントで書くしかない。フィールド付き `enum` なら、次のように型で表せる。

```rust
pub enum Color {
    Monochrome,
    Foreground(RgbColor),
}

pub struct DisplayProps {
    pub x: u32,
    pub y: u32,
    pub color: Color,
}
```

### よく使う enum

`Option<T>` は、値が存在する（`Some(T)`）か、しない（`None`）かを表す。コレクションを扱うときは、要素数 0 のコレクションと、コレクション自体がない状態を区別するかを決める必要がある。区別しないなら `Vec<Thing>`、区別するなら `Option<Vec<Thing>>` を使う。`String` の空文字列も同じである。

`Result<T, E>` は、成功時の結果 `T` を `Ok` に、失敗時のエラー `E` を `Err` に持つ。

> 失敗する可能性がある操作の結果は常に `Result<T, E>` にエンコードしよう

これらを使うと設計の意図が明確になる。さらに、標準の変換メソッド（[[Effective Rust 項目3 OptionとResultに対してはmatchを用いずに変換しよう|項目3]]）や `?` 演算子（[[Effective Rust 項目4 標準のError型を使おう|項目4]]）を利用できる。

## キーワード

- [[rust|Rust]]
- [[algebraic-data-type|代数的データ型]]
- [[invariant|不変条件]]
- [[newtype-pattern|Newtype パターン]]
- [[undefined-behavior|未定義動作]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
