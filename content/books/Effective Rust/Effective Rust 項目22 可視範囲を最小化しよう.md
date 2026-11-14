---
title: Effective Rust 項目22 可視範囲を最小化しよう
description: Rust の可視性の文法（pub、pub(crate)、pub(super)、pub(in path)）を整理し、一度公開したものは戻しにくいので可視範囲はできるだけ狭くしようという項目
tags: [book-chapter, rust]
date: 2024-12-27
book: "[[Effective Rust]]"
chapter: 22
---

## TL;DR

- [[rust|Rust]] の可視性の単位は[[module|モジュール]]で、アイテムはデフォルトで private である。`pub` には範囲を絞る書き方もある。
- public を private に戻すのは破壊的変更になり、将来の選択肢も狭めるので、他の人が使う可能性があるコードでは、可視範囲をできるだけ狭くする。

## 内容

https://effective-rust.com/visibility.html

### 可視性の文法

モジュールの各アイテム（型、メソッド、定数）はデフォルトで private で、同じモジュールとそのサブモジュールからしかアクセスできない。他から使うアイテムには `pub` を付ける。ただし、`pub` を付けても中身まで自動で public になるわけではない。

```rust
// モジュールに pub を付けても、中の型や関数は public にならない
pub mod somemodule {
    // 構造体に pub を付けても、フィールドは public にならない
    #[derive(Debug, Default)]
    pub struct AStruct {
        count: i32,
        pub name: String,
    }

    // メソッドにも個別に pub を付ける
    impl AStruct {
        fn canonical_name(&self) -> String {
            self.name.to_lowercase()
        }

        pub fn id(&self) -> String {
            format!("{}-{}", self.canonical_name(), self.count)
        }
    }
}
```

`pub` は、そのアイテムを含むモジュールが見えるすべてのコードに対してアイテムを見えるようにする。そのため、`somecrate::somemodule` が private なら、中で `pub` を付けても外からは見えない。例外として、`enum` を public にするとバリアントとそのフィールドもすべて public になる。[[trait|トレイト]]を public にすると、メソッドもすべて public になる。

`pub` には範囲を細かく指定する書き方がある（参考: https://doc.rust-jp.rs/rust-by-example-ja/mod/visibility.html ）。

- `pub(crate)`: クレート内のコードにだけ公開する。クレート全体で使うが外には出したくないヘルパ関数などに使う
- `pub(super)`: 親モジュールとそのサブモジュールにだけ公開する。深いモジュール構造を持つクレートで、使える範囲を限りたいときに使う
- `pub(in <path>)`: 指定した祖先モジュール内のコードにだけ公開する。公開 API からは見えない機能をサブモジュールに分けて、ソースコードを整理するのに使う。たとえば標準ライブラリは、イテレータアダプタを内部の `std::iter::adapters` に集め、各メソッドを `pub(in crate::iter)` にしたうえで、`std::iter` から `pub use` で再エクスポートしている
- `pub(self)`: private と同じ。マクロが生成するコードの可視性を現在のモジュールに限るときなどに使う

private なのに使われていないアイテムがあると、コンパイラは警告を出す。

### 可視範囲を狭くする理由

他の人が使ったり再利用したりする可能性があるなら、可視範囲はできるだけ狭くする（参考: [Rust API Guidelines](https://rust-lang.github.io/api-guidelines/future-proofing.html#structs-have-private-fields-c-struct-private)）。これは Rust に限らない。理由は 2 つある。

1 つ目は、一度 public にしたものを private に戻すのが難しいからである。クレートを使うコードにとって破壊的変更になり、メジャーバージョンを上げる必要がある（[Cargo の SemVer 互換性](https://doc.rust-lang.org/cargo/reference/semver.html#api-compatibility)）。逆に private を public にするのは影響がないので、マイナーバージョンを上げるだけでよい（[[semantic-versioning|セマンティックバージョニング]]）。

2 つ目は、後の選択肢を狭めないためである。public なものが多いほど、互換性を壊さずに変更するのが難しくなる。データ構造の内部実装を公開していれば、より効率的なアルゴリズムに切り替えるのに破壊的変更が要る。ヘルパ関数を公開していれば、利用者がその動作の細部に依存したコードを書いてしまう。これは特にライブラリで問題になるが、一時的な解決策がそのまま使われ続けることも多いので、最初から習慣にしておくとよい。

## キーワード

- [[module|モジュール]]
- [[semantic-versioning|セマンティックバージョニング]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
