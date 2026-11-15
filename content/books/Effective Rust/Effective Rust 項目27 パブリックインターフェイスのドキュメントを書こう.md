---
title: Effective Rust › パブリックインターフェイスのドキュメントを書こう
description: パブリック API にはドキュメントコメントを書き、前提条件や不変条件、panic の条件、設計判断などコードから分からないことだけを書くべきだと説く項目
tags: [book-chapter, rust]
date: 2025-01-07
book: "[[Effective Rust]]"
chapter: 27
---

## TL;DR

- パブリック API にはドキュメントを書き、コードから分からないことを書く。たとえば前提条件、[[invariant|不変条件]]、panic が起きる条件（`# Panics`）、unsafe なコードが必要とする条件（`# Safety`）、設計判断の理由である。
- コメントはコードの近くに置き、識別子にはクロスリファレンスを付けて読みやすくする。

## 内容

ある[[crate|クレート]]を別のプログラマが使うのであれば、パブリック API のドキュメントを用意する。そのプログラマには未来の自分も含まれる。

### ドキュメンテーションコメント

[[rust|Rust]] では `///` または `//!` で、[[markdown|Markdown]] 形式のドキュメンテーションコメントを書ける（[The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/ch14-02-publishing-to-crates-io.html)）。

```rust
/// 2 つの [`BoundingBox`] を正確に包含する [`BoundingBox`] を計算する
pub fn union(a: &BoundingBox, b: &BoundingBox) -> BoundingBox {
    // ...
}
```

書くときは次の点に気を付ける。

- コードはコードフォント（バッククォート）で書く
- 識別子には ``[`Something`]`` の形でクロスリファレンスを書く。`Something` がスコープ内にあれば、ドキュメントにリンクが付く
- `# Examples` の節にサンプルコードを書く。このコードは `cargo test` のときにコンパイルされ、実行される（[[Effective Rust 項目30 ユニットテスト以上のものを書こう|項目30]]）
- `# Panics` の節に panic を起こさないための前提条件を、`# Safety` の節に unsafe なコードが必要とする前提条件を書く

書き方に迷ったら、標準ライブラリを参考にするとよい。

### ドキュメントの生成と lint

`cargo doc` を実行すると、ドキュメンテーションコメントからドキュメントを生成できる。ドキュメントを書いたら、レンダリングされたものを読む。`--open`、または現在のクレートに限る `--no-deps --open` を付けるとすぐに開ける。

関連する lint が 2 つある。[broken_intra_doc_links](https://doc.rust-lang.org/rustdoc/lints.html#broken_intra_doc_links) は、生成されたリンクがすべて有効かを確かめる。たとえば ``[`Polygon`]`` と書いたのに `Polygon` がスコープにないと、`unresolved link to Polygon` という警告が出る。[missing_docs](https://doc.rust-lang.org/rustdoc/lints.html#missing_docs) はドキュメントがあるかを確かめるが、数を満たすためだけの質の低いドキュメントが増える危険がある。これらの lint は CI で動かすとよい（[[Effective Rust 項目32 CIシステムを設定しよう|項目32]]）。

### ドキュメントを置く場所

`cargo doc` の出力先は `target/doc` だが、ドキュメントは他の場所に置いてもよい。たとえば `examples/` ディレクトリには、クレートを使うプログラムを置くことが多い。これらは[[integration-test|統合テスト]]と同じようにビルドされて実行され（`cargo run --example <name>`）、API の正しい使い方を示すサンプルになる。`tests/` の統合テストも同じ役割を持つ。

クレートを [[crates-io|crates.io]] に公開すると、ドキュメントは [docs.rs](https://docs.rs) にも公開される。docs.rs のトップページは `src/lib.rs` の先頭にある `//!` コメントから作られ、crates.io にはリポジトリのトップにある `README.md` が表示される。

### 書くべきでないこと

コードから分かることはドキュメントに書かない。関数のシグネチャや型から明らかなことを書くと、コードとコメントが食い違いやすくなる。たとえば、引数 `a` を「`BoundingBox` に対する不変参照」と書いておくと、後で `a` を `&mut BoundingBox` に変えたときにコメントだけが古いまま残る。[[refactoring|リファクタリング]]でコメントを直し忘れても、IDE は指摘してくれない。言い換えると、コードから明らかでないこと（前提条件、不変条件、panic、エラーの条件など）をすべて書く。コードのほうは[[principle-of-least-astonishment|驚き最小の原則]]に従うようにする。

そのメソッドを使う他のコードについても書かない。「`hits.rs` の衝突判定が、ピクセル単位のチェックの前にこのメソッドを使う」と書くと、`hits.rs` を変えたときに食い違う。代わりに「重なりがあることは衝突の必要条件だが十分条件ではないので、重なった部分にはピクセル単位のチェックが要る」のように、メソッド自身の性質として書く。これは [[A Philosophy of Software Design 第16章 Modifying Existing Code|A Philosophy of Software Design 第16章]]の「コメントはコードの近くに置く」「コメントは抽象的にする」という考え方と同じである。

コードを書くときの「未来形でプログラミングしよう」という助言は、ドキュメントにも当てはまる。そのため、コメントは設計判断（なぜそうしたか、なぜそうしなかったか）に焦点を当てて書く。

## キーワード

- [[invariant|不変条件]]
- [[markdown|Markdown]]
- [[crates-io|crates.io]]
- [[integration-test|統合テスト]]
- [[refactoring|リファクタリング]]
- [[principle-of-least-astonishment|驚き最小の原則]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
