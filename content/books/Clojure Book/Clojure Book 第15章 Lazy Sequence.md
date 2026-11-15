---
title: Clojure Book › Lazy Sequence
description: 必要なときだけ評価される遅延シーケンスを、repeat、cycle、iterate で作り、first、take、nth などで要素を取り出す章
tags: [book-chapter, clojure]
date: 2023-08-18
book: "[[Clojure Book]]"
chapter: 15
---

## TL;DR

- 評価する必要があるときだけ評価されるシーケンスを[[lazy-sequence|遅延シーケンス]]と呼び、無限の要素を持つシーケンスも作れる。
- `repeat`、`cycle`、`iterate` で遅延シーケンスを作り、`first`、`take`、`nth` で要素を取り出す。無限のシーケンスに `rest` や `last` を使うと処理が終わらない。

## 内容

評価する必要があるときだけ評価されるシーケンスを、**遅延シーケンス**（_lazy sequence_）と呼ぶ。これを使うと、無限の要素を持つシーケンスを、コンピュータをクラッシュさせずに作れる。

### `repeat`

#### 無限の要素を持つシーケンスを作る

`repeat` 関数を使うと、無限個の要素を持つ遅延シーケンスを作れる。

```clojure
(def multiverse (repeat "universe"))
```

`first` を使うと、最初の要素だけを取り出せる。

```clojure
(first multiverse) ; "universe"
```

`take` を使うと、最初の要素から指定した数の要素を取り出せる。

```clojure
(take 5 multiverse)
; ("universe" "universe" "universe" "universe" "universe")
```

ただし、`rest` を使うと処理が永遠に終わらない。

```clojure
(rest multiverse)
```

`last` で最後の要素を取り出そうとしても同じである。

```clojure
(last multiverse)
```

`nth` で任意の位置の要素を取り出すことはできる。

```clojure
(nth multiverse 100) ; "universe"
(nth multiverse 10000) ; "universe"
```

#### 有限の要素を持つシーケンスを作る

`repeat` に数を指定すると、その数の要素を持つ有限のシーケンスも作れる。

```clojure
(repeat 5 "universe")
```

このシーケンスに対して、`nth` に要素がない位置を渡すと例外を投げる。

```clojure
(nth (repeat 5 "universe") 3) ; "universe"

(nth (repeat 5 "universe") 7)
; java.lang.IndexOutOfBoundsException: null
```

要素の数が有限なので、`rest` や `last` を適用できる。

```clojure
(rest (repeat 5 "universe")) ; ("universe" "universe" "universe" "universe")
(last (repeat 5 "universe")) ; "universe"
```

### `cycle`

`cycle` は、渡したコレクションの要素を「循環的に」持つ、無限個の要素の遅延シーケンスを作る。

```clojure
(def multiverse (cycle ["universe" "multiverse"]))
```

このシーケンスは、奇数番目の要素が `"universe"`、偶数番目の要素が `"multiverse"` である。`first` と `second` 関数を使うと、これを確かめられる。

```clojure
(first multiverse)  ; "universe"
(second multiverse) ; "multiverse"
```

遅延シーケンスなので、任意の位置の要素を取り出せる。

```clojure
(first multiverse)    ; "universe"
(nth multiverse 100)  ; "universe"
(nth multiverse 1783) ; "multiverse"

(take 3 multiverse)   ; ("universe" "multiverse" "universe")
```

### `iterate`

`iterate` は副作用を持たない関数 `f` を引数に取り、`x, (f x), (f (f x)), …` を要素に持つ遅延シーケンスを作る。たとえば次はすべての整数を昇順に持つ遅延シーケンスである。

```clojure
(def all-numbers (iterate inc 1))
```

`take` や `nth` を使うと、任意の位置の要素やシーケンスを取り出せる。

```clojure
(nth all-numbers 24)  ; 25
(take 10 all-numbers) ; (1 2 3 4 5 6 7 8 9 10)
```

次は $5^1, 5^2, 5^3, …$ を持つ遅延シーケンスである。

```clojure
(defn squared [num] (Math/pow num, 2))
(def squares (iterate squared 5))
```

```clojure
(take 3 squares) ; (5 25.0 625.0)
```

## キーワード

- [[clojure|Clojure]]
- [[lazy-sequence|遅延シーケンス]]
- [[lazy-evaluation|遅延評価]]
- [[clojure-sequence|シーケンス]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
