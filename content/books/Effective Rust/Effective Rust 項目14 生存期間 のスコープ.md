---
title: Effective Rust › 生存期間 のスコープ
description: スタック上の要素の生存期間がいつ始まりいつ終わるかを、名前の有無で分けて説明し、借用チェッカのエラーとノンレキシカル生存期間を紹介する節
tags: [book-chapter, rust]
date: 2025-01-15
book: "[[Effective Rust]]"
chapter: 14
---

## TL;DR

- スタック上の要素の[[lifetime|生存期間]]は、その要素が同じ場所にあることが保証される期間で、参照が有効であることが保証される期間と等しい。
- 生存期間は要素が作られた時点で始まり、ドロップされるかムーブされるまで続く。参照の生存期間には[[non-lexical-lifetimes|ノンレキシカル生存期間]]が適用される。

## 内容

[[Effective Rust 項目14 生存期間を理解しよう|項目14]]の節の 1 つ。

### 生存期間の始まりと終わり

スタック上の要素の生存期間は、その要素が同じ場所に存在することが保証されている期間である。したがって、その要素への参照（ポインタ）が有効であることが保証される期間と等しい。

生存期間は、要素が作られた時点から、ドロップ（デストラクタの実行）されるかムーブされるまで続く。[[rust|Rust]] では、スタックとヒープの間で値が頻繁にムーブする。ドロップされる正確なタイミングは、要素が名前を持つかどうかで変わる。

名前を持つ要素の生存期間は、要素が作られて名前に束縛された時点で始まる。ローカル変数なら `let` で宣言した時点、関数の引数なら関数が呼ばれてスタックフレームが用意された時点である。生存期間は、要素がムーブされるか、名前がスコープから外れるまで続く。

```rust
{
    let item1 = Item { contents: 1 };
    let item2 = Item { contents: 2 };
    consuming_fn(item2); // item2 はここでムーブされる
} // item1 はここでドロップされる
```

名前を持たない一時的な値は、不要になった時点でドロップされる。コンパイラが式をブロックに展開し、一時変数を挿入すると考えると分かりやすい。

```rust
let x = f((a + b) * 2);
// 次のように展開されると考える
let x = {
    let temp1 = a + b;
    {
        let temp2 = temp1 * 2;
        f(temp2)
    } // temp2 はここでドロップされる
}; // temp1 はここでドロップされる
```

### コンパイラが計算する生存期間を見る

コンパイラが生存期間をどう計算しているかを見るには、[[borrow-checker|借用チェッカ]]がエラーを出すコードを意図的に書けばよい。名前を持つ要素なら、次のようなエラーになる。

```rust
let r: &Item;
{
    let item = Item { contents: 42 };
    r = &item;
}
println!("r.contents = {}", r.contents);
```

```text
error[E0597]: `item` does not live long enough
   |
9  |        let item = Item { contents: 42 };
   |            ---- binding `item` declared here
10 |        r = &item;
   |            ^^^^^ borrowed value does not live long enough
11 |    }
   |    - `item` dropped here while still borrowed
12 |    println!("r.contents = {}", r.contents);
   |                                ---------- borrow later used here
```

名前を持たない一時的な値なら、「借用中に一時的な値がドロップされた」というエラーになり、`let` で束縛して長く生きる値を作るよう提案される。

```rust
let r: &Item = fn_returning_ref(&mut Item { contents: 42 });
println!("r.contents = {}", r.contents);
```

```text
error[E0716]: temporary value dropped while borrowed
help: consider using a `let` binding to create a longer lived value
```

### ノンレキシカル生存期間

参照の生存期間には、[[non-lexical-lifetimes|ノンレキシカル生存期間]]が適用される。これにより、[[borrowing-rules|借用ルール]]が少し緩くなる。本来は、同じ生存期間の中で可変参照と不変参照を両方作ることはできない。しかし次のコードでは、可変参照がまだスコープ内にあるのに、不変参照を作れる。

```rust
{
    let mut s: String = "Hello, world".to_string(); // s は String を所有する

    let greeting = &mut s[..5]; // String への可変参照を作る
    greeting.make_ascii_uppercase();
    // これ以降 greeting は使われないので、ここで生存期間が終わる

    let r: &str = &s; // 可変参照はまだスコープ内だが、不変参照を作れる
    println!("s = '{r}'");
} // レキシカルなスコープでは greeting はここまで続くはず
```

## キーワード

- [[lifetime|生存期間]]
- [[borrow-checker|借用チェッカ]]
- [[borrowing-rules|借用ルール]]
- [[non-lexical-lifetimes|ノンレキシカル生存期間]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
