---
title: Var
aliases: []
description: Clojure で def により名前空間に登録される、スレッドごとに束縛し直せる変更可能な格納場所
tags: [word, clojure]
date: 2026-11-14
---

## TL;DR

[[clojure|Clojure]] で、変更可能な格納場所を参照するための仕組み。`def` で作られて名前空間に登録され、スレッドごとに束縛し直すこともできる。

## なぜ必要か

Clojure の名前空間はグローバルな環境になっていて、コンパイラは自由なシンボルをすべて Var として解決しようとする。そのため、関数や定数を名前で参照するときは、名前空間に登録された Var を通すことになる。[[めだかのclojure.core学校]] は、標準ライブラリ clojure.core にある 662 個の Var を分類して解説している。

## 仕組み

公式リファレンスによると、Var はルート束縛を持てる（持たなくてもよい）。ルート束縛は、自分の束縛を持たないすべてのスレッドで共有される。Var の値は、そのスレッドでの束縛があればその値、なければルート束縛の値である。

`def` は、名前空間に同じ名前の Var がなければ新しく作り、あれば既存の Var を使う（intern）。Var の値ではなく Var そのものを得るには、`var` 特殊形式か `#'` リーダーマクロを使う。

Var はデフォルトでは静的で、メタデータに `:dynamic` を付けると、`binding` でスレッドごとに束縛し直せる。`binding` で作った束縛は、ほかのスレッドからは見えない。`:const` を付けると、コンパイル時の定数としてコンパイラが値をインライン化できる。

## 例

```clojure
(def ^:dynamic *x* 1)
(binding [*x* 2] *x*) ;; => 2
#'*x*                 ;; Var そのもの
```

Var のメタデータには、docstring を入れる `:doc` や、引数の形を入れる `:arglists` がある。

## 注意点

[[Clojure Brain Teasers Runtime and Library|Clojure Brain Teasers]] によると、Var は常に Java のオブジェクトを保持するので、数値を入れると[[boxing|ボクシング]]された値になる。プリミティブのまま扱いたいリテラルには `:const true` を付ける。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]
- [[clojure-sequence|シーケンス]]
- [[boxing|ボクシング]]

## 出典

- [Vars and the Global Environment - Clojure](https://clojure.org/reference/vars)
- [[めだかのclojure.core学校]]
- [[Clojure Brain Teasers Runtime and Library|Clojure Brain Teasers Runtime and Library]]
