---
title: Effective Rust 項目15 借用チェッカを念頭に置いてデータ構造を設計しよう
description: 1 つのデータを複数のデータ構造から引きたいときに、クローン、インデックスによる間接参照、Rc と RefCell の 3 つの方法を比べる
tags: [book-chapter, rust]
date: 2025-01-30
book: "[[Effective Rust]]"
chapter: 15
---

## TL;DR

- データ構造が木より複雑なグラフを作ると、単一の[[ownership|所有者]]だけでは表せない。
- 回避策にはクローンやインデックスによる間接参照があるが、どちらも 2 つのデータ構造を整合させ続ける必要がある。`Rc` と `RefCell` を組み合わせると、この問題を避けられる。

## 内容

[[Effective Rust 項目15 借用チェッカを理解しよう|項目15 借用チェッカを理解しよう]]のうち、データ構造の設計についての話である。

### 問題

極端に言えば、すべてのデータを所有すれば、[[lifetime|生存期間]]パラメータが型に広がっていくのを防げる。しかし、データ構造の内部で木構造より複雑なグラフ構造を作る場合は、所有者が 1 つだけの単純なモデルでは表せない。

例として、ゲストを登録し、到着順と名前の辞書順の両方で効率よく検索できるシステムを考える。線形探索を避けるには 2 つのデータ構造が必要だが、ゲストを所有できるのはどちらか一方だけである。

### 回避策 1: クローンする

データがイミュータブルで小さいなら、クローンして両方に持たせればよい。

```rust
/// ゲストの登録を管理する
pub struct GuestRegister {
    by_arrival: Vec<Guest>,                             // 到着順
    by_name: std::collections::BTreeMap<String, Guest>, // 名前の辞書順
}

impl GuestRegister {
    fn register(&mut self, guest: Guest) {
        self.by_arrival.push(guest.clone());
        self.by_name.insert(guest.name.clone(), guest);
    }

    pub fn named(&self, name: &str) -> Option<&Guest> {
        self.by_name.get(name)
    }

    pub fn nth(&self, idx: usize) -> Option<&Guest> {
        self.by_arrival.get(idx)
    }
}
```

この方法では、データを更新するときに両方のデータ構造から探し、整合するように更新しなければならない。

### 回避策 2: 間接参照の層を足す

`Vec<Guest>` を所有者にし、名前での検索にはベクタのインデックスを使う。

```rust
pub struct GuestRegister {
    by_arrival: Vec<Guest>,
    by_name: std::collections::BTreeMap<String, usize>,
}

impl GuestRegister {
    pub fn register(&mut self, guest: Guest) {
        self.by_name.insert(guest.name.clone(), self.by_arrival.len());
        self.by_arrival.push(guest)
    }

    pub fn named(&self, name: &str) -> Option<&Guest> {
        let idx = *self.by_name.get(name)?;
        self.nth(idx)
    }

    pub fn named_mut(&mut self, name: &str) -> Option<&mut Guest> {
        let idx = *self.by_name.get(name)?;
        self.nth_mut(idx)
    }

    pub fn nth(&self, idx: usize) -> Option<&Guest> {
        self.by_arrival.get(idx)
    }

    pub fn nth_mut(&mut self, idx: usize) -> Option<&mut Guest> {
        self.by_arrival.get_mut(idx)
    }
}
```

`by_arrival` と `by_name` が同じ値を指すので、可変参照を通して `Guest` のフィールドを書き換えられる。

```rust
let new_address = "123 Bigger House St";
ledger.named_mut("Bob").unwrap().address = new_address.to_string();
assert_eq!(ledger.named("Bob").unwrap().address, new_address);
```

ただし、データを削除するときに、うっかり不整合を起こす危険がある。

```rust
pub fn deregister(&mut self, idx: usize) -> Result<(), Error> {
    if idx >= self.by_arrival.len() {
        return Err(Error::new("out of bounds"));
    }
    self.by_arrival.remove(idx);
    // self.by_name の更新を忘れた
    Ok(())
}
```

Alice を削除すると、`by_name` のインデックスがずれ、名前で引くと別のゲストが返ってくる。

```text
Register starts as: {
  by_arrival: [{n: 'Alice', ...}, {n: 'Bob', ...}, {n: 'Charlie', ...}]
  by_name: {"Alice": 0, "Bob": 1, "Charlie": 2}
}
Register after deregister(0): {
  by_arrival: [{n: 'Bob', ...}, {n: 'Charlie', ...}]
  by_name: {"Alice": 0, "Bob": 1, "Charlie": 2}
}
Alice is Some(Guest { name: "Bob", address: "234 Bobton" })
Bob is Some(Guest { name: "Charlie", address: "345 Charlieland" })
Charlie is None
```

`deregister` を直しても、呼び出し側がインデックスを持ったまま `nth` を呼ぶと、別のデータを取得してしまうことがある。

```rust
register.register(alice);
register.register(bob);
register.register(charlie);

let idx = 1;
let guest_before = register.nth(idx); // Bob を取得
register.deregister(0); // Alice を削除
let guest_after = register.nth(idx); // Charlie を取得してしまう
```

### 回避策 3: Rc と RefCell を組み合わせる

問題の中心は、`by_arrival` と `by_name` の 2 つのデータが整合し続けなければならない点にある。これは `Rc` と `RefCell` を組み合わせた[[smart-pointer|スマートポインタ]]で避けられる（[[Effective Rust 項目15 スマートポインタを活用しよう|スマートポインタを活用しよう]]）。

```rust
pub struct GuestRegister {
    by_arrival: Vec<Rc<RefCell<Guest>>>,
    by_name: std::collections::BTreeMap<String, Rc<RefCell<Guest>>>,
}

impl GuestRegister {
    pub fn register(&mut self, guest: Guest) {
        let name = guest.name.clone();
        let guest = Rc::new(RefCell::new(guest));
        self.by_arrival.push(guest.clone());
        self.by_name.insert(name, guest);
    }

    pub fn deregister(&mut self, idx: usize) -> Result<(), Error> {
        if idx >= self.by_arrival.len() {
            return Err(Error::new("out of bounds"));
        }
        self.by_arrival.remove(idx);
        // また self.by_name の更新を忘れた
        Ok(())
    }
}
```

同じように `by_name` の更新を忘れても、Alice が `by_name` に残るだけで、名前で引いたときに別のゲストが返ることはない。

```text
Register after deregister(0): {
  by_arrival: [{n: 'Bob', ...}, {n: 'Charlie', ...}]
  by_name: [("Alice", {n: 'Alice', ...}), ("Bob", {n: 'Bob', ...}),
            ("Charlie", {n: 'Charlie', ...})]
}
Alice is Some(RefCell { value: Guest { name: "Alice", address: "123 Aliceville" } })
Bob is Some(RefCell { value: Guest { name: "Bob", address: "234 Bobton" } })
Charlie is Some(RefCell { value: Guest { name: "Charlie", address: "345 Charlieland" } })
```

## キーワード

- [[borrow-checker|借用チェッカ]]
- [[ownership|所有権]]
- [[lifetime|生存期間]]
- [[smart-pointer|スマートポインタ]]
- [[rust|Rust]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
