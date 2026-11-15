---
title: Effective Rust › 借用チェッカのエラーを解消するにはまずエラーメッセージを読もう
description: 借用チェッカのエラーはまずメッセージを読み、複雑な変換では各ステップを型注釈付きのローカル変数に分けて原因を特定する
tags: [book-chapter, rust]
date: 2025-01-30
book: "[[Effective Rust]]"
chapter: 15
---

## TL;DR

- [[borrow-checker|借用チェッカ]]のエラーメッセージは、[[borrowing-rules|借用ルール]]に違反した箇所と理由を示してくれるので、まず読む。
- 複雑な変換でメッセージが分かりにくいときは、各ステップを型注釈付きのローカル変数に分けると、問題の箇所を特定できる。

## 内容

[[Effective Rust 項目15 借用チェッカを理解しよう|項目15 借用チェッカを理解しよう]]のうち、借用チェッカとの戦いに勝つための方法の 1 つである。

### エラーメッセージを読む

次のコードはコンパイルできない。

```rust
let found = find(&format!("{} to search", "Text"), "ex");
if let Some(text) = found {
    println!("Found '{text}'!")
}
```

エラーメッセージは借用ルールに違反した箇所とその理由を示している。

```text
error[E0716]: temporary value dropped while borrowed
 --> src/main.rs:6:23
  |
  |     let found = find(&format!("{} to search", "Text"), "ex");
  |                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^        - temporary value is freed at the end of this statement
  |                       |
  |                       creates a temporary value which is freed while still in use
  |     if let Some(text) = found {
  |                         ----- borrow later used here
  |
  = note: consider using a `let` binding to create a longer lived value
```

一時的な値が使われている途中で文の終わりに解放されてしまう、という内容である。最後の `note` は回避策として、`let` 束縛で生存期間の長い値を作ることを勧めている。同じエラーに何度も出会うと借用チェッカについての直感が身につくので、メッセージを読むことは大事である。

メッセージに従って直すと、次のようになる。

```rust
let haystack = format!("{} to search", "Text");
let found = find(&haystack, "ex");
```

### 借用チェッカを通すための簡単な修正

借用チェッカを通すための簡単な修正には、次の 2 つがある。

1. [[lifetime|生存期間]]を延ばす（上の例）。式の終わりまでしか生きない一時的な値を、新しいローカル変数に `let` で束縛し、生存期間をブロックの終わりまで延ばす。
2. 生存期間を縮める。参照を使う部分を `{ ... }` で囲み、ブロックの終わりで参照の生存期間が終わるようにする。[[non-lexical-lifetimes|ノンレキシカル生存期間]]があるので、この方法を使う場面はあまりない。それでも何度もブロックで囲んでいるなら、メソッドとしてカプセル化するべきかを検討する。

### 複雑な変換では型注釈付きのローカル変数に分ける

コンパイラが提案する修正は、問題が簡単なときには役に立つ。しかし、複雑な変換が絡むと役に立たなくなり、説明も分かりにくくなる。

```rust
let x = Some(Rc::new(RefCell::new(Item { contents: 42 })));
check_item(x.as_ref().map(|r| r.borrow().deref()));
```

```text
error[E0515]: cannot return value referencing temporary value
  --> src/main.rs:16:35
   |
   |     check_item(x.as_ref().map(|r| r.borrow().deref()));
   |                                   ----------^^^^^^^^
   |                                   |
   |                                   returns a value referencing data owned by the current function
   |                                   temporary value created here
```

このような場合は、変換の各ステップをローカル変数に分け、明示的に型注釈を付けるとよい。

```rust
let x1: Option<&Rc<RefCell<Item>>> = x.as_ref();
let x2: Option<std::cell::Ref<Item>> = x1.map(|r| r.borrow());
let x3: Option<&Item> = x2.map(|r| r.deref());
check_item(x3);
```

```text
error[E0515]: cannot return value referencing function parameter `r`
  --> src/main.rs:18:40
   |
   |     let x3: Option<&Item> = x2.map(|r| r.deref());
   |                                        -^^^^^^^^
   |                                        |
   |                                        returns a value referencing data owned by the current function
```

こうすると、コンパイラがどの変換に問題があるかを正確に指摘してくれるので、それに合わせてコードを直せる。

```rust
match x2 {
    None => check_item(None),
    Some(r) => {
        let x3: &Item = r.deref();
        check_item(Some(x3));
    }
}
```

直せたら、ローカル変数をまた 1 つにまとめればよい。

```rust
match x.as_ref().map(|r| r.borrow()) {
    None => check_item(None),
    Some(r) => check_item(Some(r.deref())),
};
```

## キーワード

- [[borrow-checker|借用チェッカ]]
- [[borrowing-rules|借用ルール]]
- [[lifetime|生存期間]]
- [[non-lexical-lifetimes|ノンレキシカル生存期間]]
- [[rust|Rust]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
