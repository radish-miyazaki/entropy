---
title: Programming Clojure, Third Edition › 遅延シーケンスと無限シーケンス
description: 素数の無限シーケンスを例に遅延シーケンスの利点を見て、基本は遅延シーケンスを使うこと、副作用があるときは doall と dorun で計算を強制することを学ぶ
tags: [book-chapter, clojure]
date: 2023-08-25
book: "[[Programming Clojure, Third Edition]]"
chapter: 3
---

## TL;DR

- 遅延シーケンスは、余分な計算を避け、大きなデータを扱え、I/O を必要になるまで遅らせられる。使う側が特別な配慮をしなくてよいので、基本は遅延シーケンスを使う。
- シーケンスが副作用を持つときは、`doall` や `dorun` でシーケンスの計算を強制する。

## 内容

Clojure のシーケンスの多くは、要素が必要になるときまで評価されない[[lazy-evaluation|遅延評価]]である。こういった[[lazy-sequence|遅延シーケンス]]には、次のメリットがある。

- 要素の計算のコストが高い場合、必要になるまで計算しないことで、余分な計算を避けられる
- 大きなデータを扱える
- I/O を本当に必要になるまで遅らせられる

### 素数の無限シーケンス

次は[clojure.contrib.lazy-seqs/primes](https://clojure.github.io/clojure-contrib/lazy-seqs-api.html) の実装である。新しい値を計算するために、それまでに計算したシーケンスを参照する必要があるので、`primes` を関数として効率的に書くことはできない。一方、`fibs` や `powers-of-2` は 1 つか 2 つの直前の値を保持しているだけでよい。

```clojure
(def primes
  (concat
		;; 最初の4つの素数は手動で挿入
		[2 3 5 7]
    (lazy-seq
     (let [primes-from
           (fn primes-from [n [f & r]]
             (if (some #(zero? (rem n %))
                       (take-while #(<= (* % %) n) primes))
							 ;; 素数でない場合、再帰的に次の数を試行
               (recur (+ n f) r)
								;; 素数の場合、その数を含む新しいシーケンスを作成
               (lazy-seq (cons n (primes-from (+ n f) r)))))
           wheel (cycle [2 4 2 4 6 2 6 4 2 4 6 6 2  6 4  2
		                     6 4 6 8 4 2 4 2 4 8 6 4 6  2 4  6
		                     2 6 6 4 2 4 6 2 6 4 2 4 2 10 2 10])]
			;; 無限に素数を生成するために、遅延評価されたシーケンスを生成
       (primes-from 11 wheel)))))

```

`primes` は次のように使える。

```clojure
(take 10 primes) ; (2 3 5 7 11 13 17 19 23 29)

(def ordinals-and-primes (map vector (iterate inc 1) primes))
; #'user/ordinals-and-primes
```

`ordinals-and-primes` は、順序数と素数をペアにしたもののシーケンスである。たとえば、`[5, 11]`（5 番目の素数は 11）のようなペアを要素とする。

`ordinals-and-primes` は、遅延評価のおかげでメモリにちゃんと収まる。ユーザは必要な分だけを `take` で取り出せばよい。

```clojure
(take 5 (drop 1000 ordinals-and-primes))
; ([1001 7927] [1002 7933] [1003 7937] [1004 7949] [1005 7951])
```

### 遅延シーケンスを使う場面

**基本的には遅延シーケンスを使う**のがよい。多くのシーケンス関数は遅延シーケンスを返すので、使う分だけしかコストがかからない。重要なのは、**使う側が特別な配慮をしなくてよい**という点である。

先ほどの例だと、`iterate` や `primes`、`map` がそれぞれ遅延シーケンスを返すので、`ordinals-and-primes` は**自動的に遅延評価の恩恵を受け**られる。

### シーケンスの計算を強制する

ここまで、巨大なシーケンスを REPL で表示させるときは、`take` を使って、REPL が表示のためにシーケンスの要素をすべて計算するのを防いだ。

しかし、逆に遅延シーケンスをすべて計算（[[eager-evaluation|正格評価]]）したいケースもある。よくあるのは、**シーケンスが副作用を持つ**ケースである。次はシーケンスの中で `println` を使って副作用を起こしている。

```clojure
(def x (for [i (range 1 3)] (do (println i) i)))
```

`x` の定義はシーケンスの要素を使っていないので、Clojure は内包表記の中身を評価しない。

Clojure は**副作用を非推奨**としているので、次の関数が必要になることはほとんどない。

#### `doall` 関数

`doall` を使うと、遅延シーケンスの要素をすべて評価させられる。

```clojure
(doall coll)
```

```clojure
(doall x) ; (1 2)
;; 1
;; 2
```

#### `dorun` 関数

`dorun` 関数を使うこともできる。

```clojure
(dorun coll)
```

`dorun` も同じようにシーケンスのすべての要素を計算するが、**得られた要素は捨てる**。したがって、`dorun` は巨大なコレクションを走査するのにも使える。

```clojure
(dorun x) ; nil
;; 1
;; 2
```

戻り値が `nil` であることが、`dorun` がシーケンス全体への参照を保持していないことを表している。

## キーワード

- [[lazy-sequence|遅延シーケンス]]
- [[lazy-evaluation|遅延評価]]
- [[eager-evaluation|正格評価]]
- [[side-effect|副作用]]

## 自分の理解

clojure.contrib のこのパッケージは、現在非推奨となっている。

`primes` の `wheel` のベクタの要素の意味が分からなかった。どうやら、[この論文](https://www.researchgate.net/publication/259483011_On_small_gaps_among_primes)で紹介されている数列で、ざっくり言えば「ある素数から次の素数までの差は、この数の倍数になる」という列らしい。Gauche の開発者である川合さんの[ブログ](http://blog.practical-scheme.net/shiro/20110929-primes)で見つけた。
