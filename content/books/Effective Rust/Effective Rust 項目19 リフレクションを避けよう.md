---
title: Effective Rust 項目19 リフレクションを避けよう
description: Rust はリフレクションを持たず、std::any の type_name、TypeId、Any でできることは限られるので、トレイトやマクロで代替しようという項目
tags: [book-chapter, rust]
date: 2025-01-03
book: "[[Effective Rust]]"
chapter: 19
---

## TL;DR

- [[rust|Rust]] は[[reflection|リフレクション]]をサポートしていない。
- `std::any::Any` を使えば具体的な型へのダウンキャストはできるが、その型がどのトレイトを実装しているかは分からない。
- 他の言語でリフレクションを使って実現する機能は、[[trait|トレイト]]やマクロで実現する。

## 内容

https://effective-rust.com/reflection.html

### std::any モジュール

Rust はリフレクションをサポートしていないので、「リフレクションを避けよう」というアドバイスに従うのは簡単である。他の言語でリフレクションを使って解く問題の多くは、Rust では別の機能で解ける。[`std::any`](https://doc.rust-lang.org/std/any/index.html) モジュールには似た機能があるが、制約が多いので、他に手段がないときだけ使う。

[`type_name`](https://doc.rust-lang.org/std/any/fn.type_name.html) を使うと型名を取得できる。

```rust
fn tname<T: ?Sized>(_v: &T) -> &'static str {
    std::any::type_name::<T>()
}

let x = 42u32;
println!("x: {} = {}", tname(&x), x); // x: u32 = 42
```

ただし、`type_name` はコンパイル時の情報しか使えないので、[[trait-object|トレイトオブジェクト]]からは具体的な型を得られない。`&dyn Draw` に変換した `Square` の型名は `&dyn Draw` になる。また、ドキュメントにある通り、結果はベストエフォートの説明にすぎず、一意でもなく、コンパイラのバージョンで変わりうる。診断用にだけ使い、結果を解析してはいけない。

グローバルに一意な型の識別子が必要なら [`TypeId`](https://doc.rust-lang.org/std/any/struct.TypeId.html) を使う。ただし通常は、`TypeId` を直接使うより、標準ライブラリが機能を用意している `Any` トレイトを使う。

### Any トレイト

[`Any`](https://doc.rust-lang.org/std/any/trait.Any.html) には、ほぼすべての型に対する[[blanket-implementation|ブランケット実装]]がある。

```rust
impl<T: 'static + ?Sized> Any for T {
    fn type_id(&self) -> TypeId {
        TypeId::of::<T>()
    }
}
```

`T: 'static` の制約があるのは、[[lifetime|生存期間]]が型シグネチャには含まれても `TypeId` には含まれず、生存期間だけが違う型が同じ値になるからである。制約がないと、意図しない型の混同が起きうる。

`dyn Any` の vtable には `type_id` メソッドしかない。`dyn Any` には、型が `T` と等しいかを調べる `is::<T>()` と、等しければ `T` への参照を返す `downcast_ref::<T>()`、`downcast_mut::<T>()` がある。つまり、ダウンキャストするには、プログラマが明示的に `&dyn Any` を作り、そこにコンパイル時の型情報を残しておく必要がある。`Any` はリフレクションの完全な代わりにはならない。

### コンパイル時と実行時の型の違い

Rust では、コンパイル時と実行時で値に結び付く型が違うことがある。トレイトオブジェクトはその例である。`Any` でコンパイル時の情報は得られても、実行時にその値がどのトレイトを実装しているかを調べたり、トレイトオブジェクトを作るのに必要な vtable を得たりはできない。

スーパートレイトも同様で、is-a ではなく also-implements の関係である（[[Effective Rust 項目12 ジェネリクスとトレイトオブジェクトのトレードオフを理解しよう|項目12]]）。`trait Shape: Draw` のとき、`&dyn Shape` の vtable には `Draw` のメソッドも入っているが、`impl Draw for Square` の vtable を取り戻す方法はない。そのため、`dyn Shape` から `dyn Draw` を作る直接の方法はない。

### リフレクションの代わり

- Java など他の言語でも推奨されるように、リフレクションではなくインタフェース、Rust ではトレイトを使う。必要な振る舞いはトレイトとして定義し、メソッドで表せない性質はマーカトレイトで表す
- トレイトオブジェクトを使えば、`dlopen(3)` のようにリンク時には存在しないコードを実行時に読み込んで使える
- 同じライブラリの異なるバージョンを同時に読み込む用途は、Cargo が担うので不要である（[[Effective Rust 項目25 依存グラフを管理しよう|項目25]]）
- マクロ、特に [[derive-macro|derive マクロ]]を使えば、コンパイル時に型の情報を使ったコードを効率的かつ型安全に生成できる（[[Effective Rust 項目28 分別をもってマクロを使おう|項目28]]）

### トレイトのアップキャスト

トレイトのアップキャストを使うと、`U` が `T` のスーパートレイト（`trait T: U`）であれば、`dyn T` を `dyn U` に変換できる。原書の時点では安定版で使えなかったが、Rust 1.86 で安定化された。これにより、[[liskov-substitution-principle|リスコフの置換原則]]でいう is-a の関係に近づく。ただし、この項目の論点は変わらない。

## キーワード

- [[reflection|リフレクション]]
- [[trait|トレイト]]
- [[trait-object|トレイトオブジェクト]]
- [[blanket-implementation|ブランケット実装]]
- [[lifetime|生存期間]]
- [[derive-macro|derive マクロ]]
- [[liskov-substitution-principle|リスコフの置換原則]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
