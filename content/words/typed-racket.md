---
title: Typed Racket
aliases: []
description: 型注釈を段階的に足して静的に検査できる、Racket の姉妹言語
tags: [word, racket]
date: 2025-05-24
---

## TL;DR

[[racket|Racket]] の姉妹言語で、段階的に型付けできる（gradually-typed）。型注釈を少しずつ足し、静的に検査できる。

## なぜ必要か

The Typed Racket Guide によると、Typed Racket の目的は、ほとんどの定義を書き換えずに型検査できるようにすることである。型注釈を受け付ける Racket の基本的な構文を用意しているので、型のないプログラムを移すときは、主に既存の定義に型を足すだけでよい。

## 仕組み

Racket のモジュールを Typed Racket にするには、次の 3 つを行う。

1. 言語を `typed/racket` に変える
2. `require` する `mod` を `typed/mod` に変える
3. 構造体の定義とトップレベルの定義に型注釈を付ける

プログラムは実行前に型検査され、型エラーがあれば実行されない。`racket -I typed/racket` で起動すると、REPL でも Typed Racket を使える。

## 例

```racket
#lang typed/racket

(struct pt ([x : Real] [y : Real]))

(: distance (-> pt pt Real))
```

`distance` の本体は、型のない版から変えなくてよい。`(add1 "not a number")` のように型の合わない式は、実行前の型検査で `Number` を期待したのに `String` が渡された、というエラーになる。`leaf?` のような述語で `cond` の分岐ごとに型を絞り込む仕組みもあり、ガイドではこれを occurrence typing と呼んでいる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[racket|Racket]]
- [[typed-racket-repl|Typed Racket を REPL から利用する]]

## 出典

- [The Typed Racket Guide](https://docs.racket-lang.org/ts-guide/index.html)
- [Quick Start - The Typed Racket Guide](https://docs.racket-lang.org/ts-guide/quick.html)
- [Beginning Typed Racket - The Typed Racket Guide](https://docs.racket-lang.org/ts-guide/beginning.html)
