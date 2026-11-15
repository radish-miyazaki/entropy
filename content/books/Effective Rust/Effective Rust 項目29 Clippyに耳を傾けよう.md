---
title: Effective Rust › Clippyに耳を傾けよう
description: Clippy の警告が出ない状態を保ち、CI でも実行し、lint の一覧を読んで Rust らしい書き方を身につけようという項目
tags: [book-chapter, rust]
date: 2024-12-20
book: "[[Effective Rust]]"
chapter: 29
---

## TL;DR

- [[clippy|Clippy]] の警告が出ない状態を保つ。
- Clippy は CI でも実行する。
- [Clippy の lint の一覧](https://rust-lang.github.io/rust-clippy/stable/index.html)を読むと、Rust らしい書き方を深く理解できる。

## 内容

https://effective-rust.com/clippy.html

### Clippy の警告の種類

Clippy は、[[rust|Rust]] の書き方について、次のようなカテゴリの警告を出す（参考: https://doc.rust-lang.org/stable/clippy/lints.html ）。

- 正確さ（correctness）: よくあるプログラミング上の誤り
- Rust らしさ（idiom）: 標準的な Rust のスタイルに従っていない書き方
- 簡潔さ（concision）: もっと短く書ける書き方
- 性能（performance）: 避けられる処理やメモリ確保
- 読みやすさ（readability）: 人間がもっと読みやすく、理解しやすくなる書き方

たとえば次のコードはコンパイルできるが、Clippy はエラーにする。

```rust
pub fn circle_area(radius: f64) -> f64 {
    let pi = 3.14;
    pi * radius * radius
}
```

```sh
error: approximate value of `f{32, 64}::consts::PI` found
 --> src/main.rs:2:14
  |
2 |     let pi = 3.14;
  |              ^^^^
  |
  = help: consider using the constant directly
  = note: `#[deny(clippy::approx_constant)]` on by default
```

指摘どおり `std::f64::consts::PI` を使えば直る。

### 警告への向き合い方

Clippy の警告には、内容を説明した Web ページへのリンクが付いている。そのページには、なぜそのコードが悪いのかが書かれているので、自分のコードに当てはまるかを判断できる。項目によっては偽陽性の可能性にも触れている。Rust らしい書き方を深く理解したいなら、この一覧を読むとよい。

警告が自分のコードに当てはまらないと判断したら、`#[allow(...)]` で無効にできる。`#![allow(...)]` と書けばクレート全体で無効になる。ただし、偽陽性かどうかを議論するより、[[refactoring|リファクタリング]]に労力を使ったほうがよい。

> コードに対して Clippy の警告が出ないようにしよう

コードを直すにせよ警告を無効にするにせよ、警告が出ない状態を保てば、新しい警告が出たときに気づける。CI でも Clippy を実行する（[[Effective Rust 項目32 CIシステムを設定しよう|項目32]]）。

### Clippy で検出できる他の項目

本書の項目の多くは、Clippy で検出できる。

| 項目                                                                                                                                              | 検出する状況                                                                                                                                                                                                                                                      | lint                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [[Effective Rust 項目1 データ構造を表現するために型システムを用いよう\|項目1]]                                                                    | 引数や構造体のフィールドに `bool` が多い                                                                                                                                                                                                                          | `fn_params_excessive_bools`、`struct_excessive_bools`                                                                        |
| [[Effective Rust 項目3 OptionとResultに対してはmatchを用いずに変換しよう\|項目3]]                                                                 | `Result` から `Option` への不要な変換、`unwrap_or_default` で書けるコード、エラーを呼び出し元に返さないコード                                                                                                                                                     | `ok_expect`、`unwrap_or_default`、`unwrap_in_result`                                                                         |
| [[Effective Rust 項目5 型変換を理解しよう\|項目5]]                                                                                                | `From` ではなく `Into` を実装している                                                                                                                                                                                                                             | `from_over_into`                                                                                                             |
| 項目5                                                                                                                                             | `as` の利用（デフォルトでは無効）。`from` で書ける、値が切り捨てられる、ラップアラウンドする、精度が落ちる、符号が失われる、すべての `as`                                                                                                                         | `cast_lossless`、`cast_possible_truncation`、`cast_possible_wrap`、`cast_precision_loss`、`cast_sign_loss`、`as_conversions` |
| [[Effective Rust 項目8 参照型とポインタ型に慣れよう\|項目8]]                                                                                      | ヒープ上のコレクションを `Box` で持つ、コレクションの要素を `Box` で持つ、`Box` への参照を取る                                                                                                                                                                    | `box_collection`、`vec_box`、`borrowed_box`                                                                                  |
| [[Effective Rust 項目9 明示的なループの代わりにイテレータ変換を使用することを検討しよう\|項目9]]                                                  | `Iterator` のメソッドの組み合わせをもっと簡潔に書ける                                                                                                                                                                                                             | 多数                                                                                                                         |
| [[Effective Rust 項目10 標準トレイトに習熟しよう\|項目10]]                                                                                        | `Ord` と `PartialOrd` の実装が矛盾する、`PartialEq::ne` を実装している（[[Effective Rust 項目13 デフォルト実装を用いて、実装しなければならないトレイトメソッドを最小限にしよう\|項目13]]）、`Hash` と `Eq` の実装が矛盾する、`Copy` と `Clone` の実装が一致しない | `derived_ord_xor_partial_ord`、`partialeq_ne_impl`、`derived_hash_with_manual_eq`、`expl_impl_clone_on_copy`                 |
| [[Effective Rust 項目18 Don't panic\|項目18]]                                                                                                     | `panic!` や `expect` などを使っている                                                                                                                                                                                                                             | 多数                                                                                                                         |
| [[Effective Rust 項目21 セマンティックバージョン（SemVer）を理解しよう\|項目21]]                                                                  | 依存ライブラリのバージョンを `*` で指定している                                                                                                                                                                                                                   | `wildcard_dependencies`                                                                                                      |
| [[Effective Rust 項目23 ワイルドカードインポートを避けよう\|項目23]]                                                                              | ワイルドカードインポートを使っている                                                                                                                                                                                                                              | `wildcard_imports`                                                                                                           |
| [[Effective Rust 項目24 APIに型が登場する依存ライブラリは再エクスポートしよう\|項目24]]、[[Effective Rust 項目25 依存グラフを管理しよう\|項目25]] | 同じクレートの複数のバージョンが依存グラフにある                                                                                                                                                                                                                  | `multiple_crate_versions`                                                                                                    |
| [[Effective Rust 項目26 忍び寄るフィーチャに注意しよう\|項目26]]                                                                                  | 否定形の feature 名（`no_std` など）、クレートを使うことだけを表す feature 名（`use-crate-x` など）                                                                                                                                                               | `negative_feature_names`、`redundant_feature_names`                                                                          |
| [[Effective Rust 項目27 パブリックインターフェイスのドキュメントを書こう\|項目27]]                                                                | ドキュメンテーションコメントに `panic!` や `unsafe` の説明がない                                                                                                                                                                                                  | `missing_panics_doc`、`missing_safety_doc`、`undocumented_unsafe_blocks`                                                     |

## キーワード

- [[clippy|Clippy]]
- [[refactoring|リファクタリング]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
