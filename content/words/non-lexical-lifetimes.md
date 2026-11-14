---
title: ノンレキシカル生存期間
aliases: [NLL, Non-Lexical Lifetimes]
description: Rust コンパイラが、参照の生存期間をスコープの末尾ではなく最後に使われた時点までとして扱う機能
tags: [word, rust]
date: 2025-01-13
---

## TL;DR

ある参照がコードのある時点以降で使われないことをコンパイラが立証できる場合に、[[rust|Rust]] コンパイラが**スコープの末尾ではなく、参照が最後に使われた時点を[[lifetime|生存期間]]の終端として扱う**機能である。

## なぜ必要か

以前のコンパイラでは、参照が複数の文にまたがると、生存期間がそれらを囲む最も内側のブロックの末尾まで延びていた。そのため、もう使っていない参照があるだけで[[borrowing-rules|借用ルール]]に違反したと判定され、人為的なブロックで囲むなどの回避策が必要だった。NLL は生存期間を字句的なスコープではなく制御フローグラフから推論し、こうしたコードを通せるようにした。

## 例

RFC 2094 に挙げられている例である。`slice` は `capitalize` の呼び出しより後で使われていない。それでも、以前のコンパイラは `slice` の借用がブロックの末尾まで続くとみなし、`data.push` をエラーにしていた。

```rust
let mut data = vec!['a', 'b', 'c'];
let slice = &mut data[..];
capitalize(slice);
data.push('d'); // NLL 以前はエラー
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[lifetime-elision|生存期間省略ルール]]
- [[borrowing-rules|借用ルール]]
- [[Effective Rust 項目14 生存期間を理解しよう]]
- [[Effective Rust 項目15 借用チェッカを理解しよう]]

## 出典

- [RFC 2094: Non-lexical lifetimes](https://rust-lang.github.io/rfcs/2094-nll.html)
