---
title: メモリ安全性
aliases: [memory safety]
description: バッファオーバーフローやダングリングポインタなど、メモリアクセスに関するバグや脆弱性から守られている性質
tags: [word, プログラミング言語, セキュリティ]
date: 2026-11-14
---

## TL;DR

バッファオーバーフローやダングリングポインタなど、メモリアクセスに関するバグや脆弱性から守られている性質。C や C++ はメモリ安全ではなく、Java や [[rust|Rust]] はメモリ安全な言語である。

## なぜ必要か

Wikipedia によると、2019 年に Microsoft のセキュリティエンジニアが、すべての脆弱性の 70% がメモリ安全性の問題によるものだと報告した。2020 年には Google のチームも、Chromium の深刻なセキュリティバグの 70% がメモリ安全性の問題によるものだと報告している。

## 仕組み

Wikipedia によると、メモリエラーには、範囲外への書き込みや読み出しといった空間的なものと、解放後の使用（use-after-free）、二重解放、未初期化変数の使用といった時間的なものがある。C、C++ はポインタ演算を境界チェックなしで許すので、メモリ安全ではない。

メモリ安全性を保つ方法は大きく 3 つある。1 つめは[[garbage-collection|ガベージコレクション]]などの自動メモリ管理で、use-after-free などを防げるが、オーバーヘッドがあるので性能が重要な用途には向かない。2 つめは静的解析で、Rust の借用チェッカは安全だと証明できたプログラムだけを通す。3 つめは Valgrind や AddressSanitizer のように実行時にメモリ操作を検査する方法である。

## 例

[[Effective Rust 項目16 unsafeコードを書かないようにしよう|Effective Rust]] によると、Rust のメモリ安全性は実行時のオーバーヘッドなしで保証される。その代わり、[[borrowing-rules|借用ルール]]を満たすコードを書き、使う参照型を正確に指定する必要がある。

## 注意点

Rust でも `unsafe` を使うとチェックを回避できる。[[Effective Rust 項目34 Rust と C の FFI で生じるメモリ安全性の問題|Effective Rust]] によると、Rust の参照を生ポインタにして FFI の境界に渡すと、生存期間の制約が失われてメモリ安全性が保証されなくなる。また、[[Effective Rust 項目14 'static ライフタイム|Effective Rust]] によると、メモリリークは Rust のメモリ安全性には影響しない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[rust|Rust]]
- [[garbage-collection|ガベージコレクション]]
- [[borrowing-rules|借用ルール]]
- [[miri|Miri]]
- [[data-race|データ競合]]

## 出典

- [Memory safety - Wikipedia](https://en.wikipedia.org/wiki/Memory_safety)
- [[Effective Rust 項目16 unsafeコードを書かないようにしよう|Effective Rust 項目16 unsafeコードを書かないようにしよう]]
