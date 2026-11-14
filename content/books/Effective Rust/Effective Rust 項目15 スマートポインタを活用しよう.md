---
title: Effective Rust 項目15 スマートポインタを活用しよう
description: 相互に関連するデータ構造はスマートポインタで管理する。Rc と RefCell を中心に、実行時 panic! や循環参照といった注意点を整理する
tags: [book-chapter, rust]
date: 2025-01-31
book: "[[Effective Rust]]"
chapter: 15
---

## TL;DR

- 相互に関連するデータ構造を管理するには、[[smart-pointer|スマートポインタ]]を使う。
- `Rc<RefCell<T>>` は[[borrow-checker|借用チェッカ]]の制約を避けられる代わりに、借用違反が実行時の panic! になり、使い方によっては[[reference-cycle|循環参照]]を生む。

## 内容

[[Effective Rust 項目15 借用チェッカを理解しよう|項目15 借用チェッカを理解しよう]]のうち、スマートポインタについての話である。[[Effective Rust 項目15 借用チェッカを念頭に置いてデータ構造を設計しよう|借用チェッカを念頭に置いてデータ構造を設計しよう]]で `Rc` と `RefCell` を使った方法は、「相互に関連するデータ構造を管理するにはスマートポインタを使う」という一般的なアドバイスの一例である。

### Rust の主なスマートポインタ

Rust のスマートポインタには、主に次のものがある（[[Effective Rust 項目8 参照型とポインタ型に慣れよう|項目8]]）。

- `Rc<T>`: 複数の所有者を持てるので、同じアイテムを複数の場所から参照できる。`RefCell<T>` と組み合わせることが多い。
- `RefCell<T>`: 可変参照なしで内部の状態を変更できる（[[interior-mutability|内部可変性]]）。ただし、借用のチェックがコンパイル時ではなく実行時に行われるコストがかかる。
- `Arc<T>`: `Rc<T>` のスレッドセーフ版で、[[thread|スレッド]]間で共有できる。
- `Mutex<T>` / `RwLock<T>`: スレッドセーフな内部可変性を提供する。`RefCell<T>` に相当し、複数のスレッドでデータを安全に共有できる。ただし注意点がある（[[Effective Rust 項目17 状態共有並列実行には気を付けよう|項目17]]）。
- `Cell<T>`: `Copy` 型に対して内部可変性を実現する、`RefCell<T>` の簡易版である。

### Rc<RefCell<T>> の注意点

`Rc<RefCell<T>>` を使うと借用チェッカの制約を避けられるが、Rust の安全性の一部を受けられなくなる。たとえば、他に参照があるときに `borrow_mut` を呼ぶと、コンパイルエラーではなく実行時に panic! が起きる。

また、子ノードが親ノードへの参照を持つ木構造で `Rc<RefCell<T>>` を使うと、循環参照が生まれる（[[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側 第4章 HTMLを解析する──HTMLからDOMツリーへの変換|［作って学ぶ］ブラウザのしくみ 第4章]]でも同じ構造が出てくる）。これを避けるには、親への参照に、強い参照である `Rc<T>` ではなく弱い参照の `Weak<T>` を使う。

```rust
use std::{
    cell::RefCell,
    rc::{Rc, Weak},
};

struct TreeId(String);
struct BranchId(String);
struct LeafId(String);

struct Tree {
    id: TreeId,
    branches: Vec<Rc<RefCell<Branch>>>,
}

struct Branch {
    id: BranchId,
    leaves: Vec<Rc<RefCell<Leaf>>>,
    owner: Option<Weak<RefCell<Tree>>>,
}

struct Leaf {
    id: LeafId,
    owner: Option<Weak<RefCell<Branch>>>,
}
```

`Weak` は強い参照のカウントを増やさないので、使う前に、アイテムがまだドロップされていないかを明示的に確かめる必要がある。

```rust
impl Branch {
    fn add_leaf(branch: Rc<RefCell<Branch>>, mut leaf: Leaf) {
        leaf.owner = Some(Rc::downgrade(&branch));
        branch.borrow_mut().leaves.push(Rc::new(RefCell::new(leaf)));
    }

    fn location(&self) -> String {
        match &self.owner {
            None => format!("<unowned>.{}", self.id.0),
            Some(owner) => {
                let tree = owner.upgrade().expect("owner gone!");
                format!("{}.{}", tree.borrow().id.0, self.id.0)
            }
        }
    }
}
```

### 最後の手段

スマートポインタでも表せない場合は、最後の手段として、`unsafe` で[[raw-pointer|生ポインタ]]を扱うことができる（[[Effective Rust 項目16 unsafeコードを書かないようにしよう|項目16]]）。ただし、できるだけ crates.io で既存のクレートを探したほうがよい。

## キーワード

- [[smart-pointer|スマートポインタ]]
- [[interior-mutability|内部可変性]]
- [[borrow-checker|借用チェッカ]]
- [[reference-cycle|循環参照]]
- 弱い参照
- [[raw-pointer|生ポインタ]]
- [[thread|スレッド]]
- [[rust|Rust]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
