---
title: Effective Rust 項目15 借用チェッカを理解しよう
description: Rust の参照は借用なので参照先より長く持てず、借用チェッカは複数の不変参照か単一の可変参照のどちらかしか許さないことを説く項目
tags: [book-chapter, rust]
date: 2025-01-16
book: "[[Effective Rust]]"
chapter: 15
---

## TL;DR

- [[rust|Rust]] の参照は借用なので、参照先のアイテムの[[lifetime|生存期間]]より長く持つことはできない。
- [[borrow-checker|借用チェッカ]]は、あるアイテムへの複数の不変参照か、単一の可変参照のどちらかを許す。両方が同時に存在することは許さない。
- 参照の生存期間は、[[non-lexical-lifetimes|ノンレキシカル生存期間]]によって、スコープの末尾ではなく最後に使われた時点までになる。

## 内容

### 参照とアクセス制御

アイテムにアクセスする方法は 3 つある。`item`（[[ownership|所有]]）では、生成、読み込み、更新、ドロップ、ムーブのすべてができる。`&item`（不変参照）では読み込みだけ、`&mut item`（可変参照）では読み込みと更新ができる。ムーブは「新しい場所での生成」と「古い場所でのドロップ」と考えれば、所有でしかできない理由が分かる。

このアクセス制御があるので、可変参照の中から古い値を取り出し、新しい値で置き換えることはできない。

```rust
pub fn replace(item: &mut Option<Item>, val: Item) -> Option<Item> {
    let previous = *item; // 許可されていないムーブが発生する
    *item = Some(val);
    previous
}
```

しかし、この操作は安全で便利なので、[`std::mem::replace`](https://doc.rust-lang.org/std/mem/fn.replace.html) が用意されている。`Option` ではよく使うので、`replace` メソッドもある。

```rust
pub fn replace(item: &mut Option<Item>, val: Item) -> Option<Item> {
    item.replace(val) // 中身を `val` で置き換え、以前の値を返す
}
```

### 借用ルール

[[borrowing-rules|借用ルール]]があるので、可変参照を 2 つ引数に取る関数に、同じ値への参照を 2 つ渡すことはできない。可変参照と不変参照を引数に取る関数も同じである。

```rust
fn both_zero(left: &mut Item, right: &mut Item) { /* ... */ }

let mut item = Item { contents: 0 };
both_zero(&mut item, &mut item); // コンパイルエラー
```

コンパイラは借用ルールによって、2 つのポインタがメモリ上の同じアイテムを指していないこと（エイリアシング）を判断できる。複数の不変参照が指すメモリが、可変参照によって書き換えられることはない。そのため、値を[[cpu-register|レジスタ]]にキャッシュするような最適化がしやすくなる。また、[[thread|スレッド]]間の非同期なメモリアクセスによる[[data-race|データ競合]]も起こらない。

### 所有者による操作

所有者による操作は裏で参照を作っていると考えると分かりやすい。たとえば、所有者による変更は「短命の可変参照を作り、それを通じて変更する」のと同じである。そのため、他の参照がすでにある間は変更できない。一方、読み出しは不変参照を作るのと同じなので、他の不変参照があってもできる。

```rust
let mut item = Item { contents: 42 };
let r = &item;
item.contents = 0; // (&mut item).contents = 0 と同じなのでコンパイルエラー
println!("reference to item is {:?}", r);
```

また、参照先が無効になる（[[dangling-pointer|ダングリング]]）ので、有効な参照がある間は、所有者はアイテムをムーブもドロップもできない。この場合は、ノンレキシカル生存期間を利用し、参照を使い終わってからムーブすれば回避できる。

```rust
let r = &item;
println!("reference to item is {:?}", r);
let new_item = item; // r はもう使われないのでムーブできる
```

### 借用チェッカとの戦いに勝利する

借用チェッカのエラーに対処する方法は、別のページにまとめた。

- [[Effective Rust 項目15 借用チェッカのエラーを解消するにはまずエラーメッセージを読もう|借用チェッカのエラーを解消するにはまずエラーメッセージを読もう]]
- [[Effective Rust 項目15 借用チェッカを念頭に置いてデータ構造を設計しよう|借用チェッカを念頭に置いてデータ構造を設計しよう]]
- [[Effective Rust 項目15 スマートポインタを活用しよう|スマートポインタを活用しよう]]
- [[Effective Rust 項目15 自己参照データ構造を避けよう|自己参照データ構造を避けよう]]

要点は次のとおりである。ブロック `{ ... }` でスコープを足して生存期間を縮める。名前付きのローカル変数を導入して、生存期間をスコープの末尾まで延ばす。一時的にローカル変数を増やして、借用チェッカが指摘している箇所を特定する。[[smart-pointer|スマートポインタ]]を使うと借用チェッカを回避できることがあり、相互に接続したデータ構造を作るときに役立つ。自己参照データ構造はなるべく避け、必要なら [ouroboros](https://github.com/someguynamedjosh/ouroboros) を検討する。

## キーワード

- [[borrow-checker|借用チェッカ]]
- 借用
- [[borrowing-rules|借用ルール]]
- [[ownership|所有権]]
- [[lifetime|生存期間]]
- [[non-lexical-lifetimes|ノンレキシカル生存期間]]
- [[dangling-pointer|ダングリングポインタ]]
- [[smart-pointer|スマートポインタ]]
- [[data-race|データ競合]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
