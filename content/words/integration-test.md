---
title: 統合テスト
aliases: [インテグレーションテスト]
description: 複数の部品を組み合わせたときに正しく動くかを、公開されたインタフェースだけを使って確かめるテスト
tags: [word, テスト]
date: 2026-11-14
---

## TL;DR

ライブラリなどの複数の部品が、組み合わせたときに正しく動くかを確かめるテストである。外部のコードと同じように、公開されたインタフェースだけを使ってテストする。

## なぜ必要か

The Rust Programming Language によると、単体では正しく動くコードも、組み合わせると問題が起きることがあるので、組み合わせたコードもテストで確かめる必要がある。[[unit-test|単体テスト]]は小さく焦点が絞られており、1 つのモジュールを切り離して、private なインタフェースもテストできる。統合テストは、1 つのテストで複数のモジュールを動かすことがある。

## 仕組み

[[rust|Rust]] では、プロジェクトの最上位の `tests/` ディレクトリに統合テストを置く。Cargo は `tests/` の各ファイルを別々のクレートとしてコンパイルするので、テストするライブラリを `use` でスコープに入れる必要がある。テストからは、ライブラリの public な API しか呼べない。

## 例

```rust
use adder::add_two;

#[test]
fn it_adds_two() {
    let result = add_two(2);
    assert_eq!(result, 4);
}
```

## 注意点

`src/main.rs` だけを持つバイナリクレートは、他のクレートに関数を公開しないので、`tests/` から統合テストを書けない。ロジックを `src/lib.rs` に置き、`src/main.rs` は薄いラッパーにしておくと、ライブラリとして統合テストできる。

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] によると、型チェックは単体テストや統合テストより早く結果が出るので、できるだけ型チェックに任せたほうがよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[unit-test|単体テスト]]
- [[test-sizes|テストサイズ]]

## 出典

- [Test Organization - The Rust Programming Language](https://doc.rust-lang.org/book/ch11-03-test-organization.html)
- [[Effective Rust 項目30 ユニットテスト以上のものを書こう|Effective Rust 項目30]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目77 型チェックとユニットテストの関係を理解する|Effective TypeScript 第2版 項目77]]
