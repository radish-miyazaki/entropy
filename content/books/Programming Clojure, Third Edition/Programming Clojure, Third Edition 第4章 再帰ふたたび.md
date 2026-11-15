---
title: Programming Clojure, Third Edition 第4章 再帰ふたたび
description: recur を使えない相互再帰を、自己再帰への書き換え、trampoline、遅延評価への置き換え、メモ化の 4 つのアプローチで解く
tags: [book-chapter, clojure]
date: 2023-08-27
book: "[[Programming Clojure, Third Edition]]"
chapter: 4
---

## TL;DR

- 相互再帰は引数の大きさに比例したスタックを消費し、自己再帰ではないので `recur` も使えない。
- 非再帰的に解くアプローチは 4 つある。複数の概念をまとめる抽象化で自己再帰に書き換える、`trampoline` を使う、再帰呼び出しを `lazy-seq` で包む、メモ化して値をシーケンスとして定義する。

## 内容

### 相互再帰

[[mutual-recursion|相互再帰]]とは、2 つ以上の関数が互いを呼び合う再帰である。簡単な例として、相互再帰を使って `my-odd?` と `my-even?` を定義してみる。

```clojure
(declare my-odd? my-even?)

(defn my-odd? [n]
  (if (zero? n)
    false
    (my-even? (dec n))))

(defn my-even? [n]
  (if (zero? n)
    true
    (my-odd? (dec n))))
```

`my-odd?` と `my-even?` はそれぞれ互いを呼び出しているので、**2 つの var を定義前に作る**必要がある。`def` でもよいが、**`declare`** マクロを使うと、1 行で 2 つの var を初期値なしで作れる。

これらの関数は小さな値に対しては動作する。

```clojure
(map my-even? (range 10))
; (true false true false true false true false true false)

(map my-odd? (range 10))
; (false true false true false true false true false true)
```

しかし、これらは**引数の大きさに比例したスタックを消費**するので、大きな値を与えると動作しない。

```clojure
(my-even? (* 1000 1000 1000))
; java.lang.StackOverflowError
```

この問題は[[Programming Clojure, Third Edition 第4章 怠け者になろう|末尾再帰]]での問題と同じである。しかし、今回は**自己再帰ではないので、`recur` を使えない**。

### 再帰的な問題を非再帰解法で解くための 4 つのアプローチ

一般的に、再帰的な問題に対して、非再帰的な解法は簡単には見つからない。ここでは、次の 4 つのアプローチを考える。

- 自己再帰への書き換え
- トランポリンによる相互再帰
- 再帰を遅延評価で置き換える
- メモ化で再帰を止める

### 1. 自己再帰への書き換え

相互再帰は互いに関係している複数の概念をモデル化するのに役立つ。ここで、**複数の概念を一度に扱える抽象化**が見つけられれば、相互再帰を自己再帰に変換できる。

たとえば奇数と偶数は、[パリティ](https://ja.wikipedia.org/wiki/%E5%81%B6%E5%A5%87%E6%80%A7)の概念を導入すれば 1 つにまとめられる。`recur` を使って、偶数に対しては `0`、奇数に対しては `1` を返す関数 `parity` を定義する。

```clojure
(defn parity [n]
  (loop [n n par 0]
    (if (= n 0)
      par
      (recur (dec n) (- 1 par)))))
```

これを使えば、`my-odd?` と `my-even?` を定義するのは簡単である。

```clojure
(defn my-even? [n] (= 0 (parity n)))
(defn my-odd? [n] (= 1 (parity n)))
```

今回は単純だったが、多くの相互再帰では、自己再帰への変換を見つけるのは容易ではない。相互再帰を自己再帰に変換しようとして、たくさんの条件判断が入ってきて定義が複雑になったら、このアプローチは避けたほうがよい。

### 2. トランポリンによる相互再帰（`trampoline`）

[トランポリン](https://zehnpaard.hatenablog.com/entry/2020/05/20/192645)は相互再帰を最適化するテクニックで、**事後的な `recur`** のようなものである。つまり、関数の実装者ではなく、関数を呼び出す側が適用する。呼び出す側はトランポリン上で複数の関数を呼び出せるので、これによって相互再帰を最適化できる。Clojure では、**`trampoline`** 関数でこれを実現する。

#### `trampoline` 関数

```clojure
(trampoline f & partial-args)
```

返り値が関数でなければ、`trampoline` は普通の関数呼び出しと同じである。

```clojure
(trampoline list)  ; ()
(trampoline + 1 2) ; 3
```

しかし、戻り値が関数であると、`trampoline` はその関数が**再帰的に呼び出されることを意図しているとみなし、改めてその関数を呼び出す**。`trampoline` はその中で `recur` しており、返り値として関数以外のものが返ってくるまで呼び出しを繰り返す。

#### 自己再帰での利用例

たとえば、末尾再帰の節で実装した `tail-fibo` を改変して、関数を返すようにする。

```clojure
(defn trampoline-fibo [n]
  (let [fib (fn fib [f-2 f-1 current]
        (let [f (+ f-2 f-1)]
          (if (= n current)
            f
            #(fib f-1 f (inc current)))))]
    (cond
      (= n 0) 0
      (= n 1) 1
      :else (fib 0N 1 2))))
```

この関数を `trampoline` を使って呼び出す。

```clojure
(trampoline trampoline-fibo 9) ; 34N
```

大きな値であっても、内部で `recur` を使っているので、`StackOverflowError` になることはない。

```clojure
(rem (trampoline trampoline-fibo 1000000) 1000) ; 875N
```

#### 相互再帰での利用例

自己再帰の場合は `trampoline` を使う利点はまったくないが、相互再帰では真価を発揮する。例として、相互再帰の節で実装した `my-even?` と `my-odd?` に適用する。

```clojure
(declare my-odd? my-even?)

(defn my-odd? [n]
  (if (= n 0)
    false
    #(my-even? (dec n))))
(defn my-even? [n]
  (if (= n 0)
    true
    #(my-odd? (dec n))))

(trampoline my-even? 1000000) ; true
```

トランポリンでは、元のコードに手を加えて、再帰する必要があることを呼び出し側に伝える必要がある。他の方法で解決できるに越したことはないが、`trampoline` を使う方法もあることを覚えておくとよい。

### 3. 再帰を遅延評価で置き換える

再帰を消したり最適化したりする手段として最もよく使われるのが、[[lazy-evaluation|遅延評価]]である。

#### Eugene Wallingford の `replace` 関数

例として、相互再帰を示すために [Eugene Wallingford が作った `replace` 関数](http://www.cs.uni.edu/~wallingf/patterns/recursion.html)を実装してみる。

`replace` は s-list と呼ばれる構造を使う。s-list はシンボルとシンボルのリストの両方を要素にできるリストである。`replace` は s-list、oldsym、newsym を引数に取り、s-list の中の oldsym をすべて newsym に置き換える。

```clojure
(replace '((a b) (((b g r) (f r)) c (d e)) b) 'b 'a)
; ((a a) (((a g r) (f r)) c (d e)) a)
```

#### Clojure で実装する

次はEugene Wallingford の論文の Scheme のコードを、そのまま Clojure へと書き換えたコードである。

```clojure
(declare replace-symbol replace-symbol-expression)
(defn replace-symbol [coll oldsym newsym]
  (if (empty? coll)
    ()
    (cons (replace-symbol-expression
           (first coll) oldsym newsym)
          (replace-symbol
           (rest coll) oldsym newsym))))
(defn replace-symbol-expression [symbol-expr oldsym newsym]
  (if (symbol? symbol-expr)
    (if (= symbol-expr oldsym)
      newsym
      symbol-expr)
    (replace-symbol symbol-expr oldsym newsym)))
```

2 つの関数 `replace-symbol` と `replace-symbol-expression` は相互再帰していて、深くネストした構造を与えると、スタックオーバーフローを起こす可能性がある。

問題を示すために、末尾に 1 つだけ `bottom` というシンボルを持つ、深くネストしたリストを作る関数を定義する。

```clojure
(defn deeply-nested [n]
  (loop [n n result '(bottom)]
    (if (zero? n)
      result
      (recur (dec n) (list result)))))
```

小さな `n` に対して、動作を確認してみる。

```clojure
(deeply-nested 5)
; ((((((bottom))))))

(deeply-nested 25)
; ((((((((((((((((((((((((((bottom))))))))))))))))))))))))))
```

#### `*print-level*` でネストした構造を表示する深さを指定する

Clojure には、ネストした構造をどの深さまで表示するかを指定できる `*print-level*` という変数が用意されている。ネストが指定した深さよりも深いと、`print` は `#` で要素を省略して表示する。

```clojure
(deeply-nested 5)
; ((((((bottom))))))

(deeply-nested 25)
; (((((((((((((((((((((((((#)))))))))))))))))))))))))
```

#### スタックオーバーフローが起こるのを確認する

`replace-symbol` を使って、色々な深さにネストしたリストの `bottom` を `deepest` に置き換えてみる。

```clojure
(replace-symbol (deeply-nested 5) 'bottom 'deepest)
; ((((((deepest))))))

(replace-symbol (deeply-nested 10000) 'bottom 'deepest)
; java.lang.StackOverflowError
```

#### 問題を解消する

`replace-symbol` の再帰呼び出しは、すべて `cons` の中にある。したがって、**再帰を止めるには `lazy-seq` で包み込むだけ**でよい。次はClojure らしい書き方になるようにリファクタリングしたコードである。

```clojure
(defn- coll-or-scalar [x & _] (if (coll? x) :collection :scalar))
(defmulti replace-symbol coll-or-scalar)
(defmethod replace-symbol :collection [coll oldsym newsym]
  (lazy-seq
   (when (seq coll)
     (cons (replace-symbol (first coll) oldsym newsym)
           (replace-symbol (rest coll) oldsym newsym)))))
(defmethod replace-symbol :scalar [obj oldsym newsym]
  (if (= obj oldsym) newsym obj))
```

**`lazy-seq` で再帰を止めて**、深くネストした構造に対するスタックオーバーフローを防ぐ。

また、シンボルとリストをそれぞれ扱う 2 つの関数を定義する代わりに、**[[multimethod|マルチメソッド]]** `replace-symbol` を定義して、1 つのメソッドでリストを、もう 1 つでシンボルを扱うようにしている。これにより、`if` もなくなって読みやすくなる。

実際に深いネストも処理できることを確認する。

```clojure
(replace-symbol (deeply-nested 10000) 'bottom 'deepest)
; (((((((((((((((((((((((((#)))))))))))))))))))))))))
```

### 4. メモ化で再帰を止める

より複雑な相互再帰の例として、Douglas Richard Hofstadter の著書『Gödel, Escher, Bach: an Eternal Golden Braid』に登場する [Male-Female Sequence](https://mathworld.wolfram.com/HofstadterMale-FemaleSequences.html) について考える。

#### Male-Female Sequence

このシーケンスは次のように定義される。

$$
F(0) = 1; M(0) = 0 \\
F(n) = n - M(F(n-1)), \space n > 0 \\
M(n) = n - F(M(n-1)), \space n > 0
$$

この定義をそのまま Clojure に落とし込むと、次のように書ける。

```clojure
(declare m f)
(defn m [n]
  (if (zero? n)
    0
    (- n (f (m (dec n))))))
(defn f [n]
  (if (zero? n)
    1
    (- n (m (f (dec n))))))
```

この定義は数学的な定義とよく対応しているが、大きな `n` を計算させようとすると膨大な時間がかかる。

```clojure
(time (m 250))
; "Elapsed time: 35622.997667 msecs"
; 155
```

シーケンス中の 1 つの値を計算するために 2 つの値を最初から計算する必要があり、そのそれぞれについても 2 つずつの値を最初から計算することになるので、時間がかかる。

#### メモ化（`memoize`）

この問題を解決するために、[[memoization|メモ化]]を使う。

メモ化とは、**過去の計算結果をキャッシュ**して、**空間効率と引き換えに時間効率を得る**手法である。メモ化された関数は**過去に受け取った入力と、その計算結果としての出力とのマップを保持**している。呼ばれるとまず与えられた引数でマップを探し、対応する出力が見つかれば直ちに結果を返す。

Clojure では、**`memoize`** 関数を使ってこれを実現する。

```clojure
(def m (memoize m))
(def n (memoize n))
```

これにより、Clojure は F と M の値を各 `n` について一度ずつ計算すればよいので、性能は飛躍的に向上する。

```clojure
(time (m 250))
; "Elapsed time: 9.674834 msecs"
; 155
```

さらに、一度メモ化のキャッシュが作られれば、その値を「計算」するのは一瞬である。

```clojure
(time (m 250))
; "Elapsed time: 0.041458 msecs"
; 155
```

#### メモ化の問題点

ただし、メモ化だけでは十分でない。メモ化はキャッシュがすでに作られていれば再帰を途中で止められるが、キャッシュが空の状態で大きな数に対する `m` や `f` を計算しようとすると、**キャッシュが作られる前にスタックオーバーフローが起きる**。

```clojure
(m 10000) ; java.lang.StackOverflowError
```

これを回避するには、関数ではなく**シーケンスを定義し、キャッシュが頭から作られるのを保証**すればよい。

```clojure
(def m-seq (map m (iterate inc 0)))
(def n-seq (map m (iterate inc 1)))
```

こうすると、呼び出し側はシーケンスの `n` 番目の値を `nth` で取り出して、$M(n)$ や $F(n)$ を得られる。

```clojure
(nth m-seq 250) ; 155
```

このアプローチは`n` が巨大でもかなり速い。

```clojure
(time (nth m-seq 10000))
; "Elapsed time: 6462.4185 msecs"
; 6180
```

この節で行ったことを整理する。

- 相互再帰関数を数学的な定義から自然に定義した
- メモ化を使って、すでに計算した分については再帰しないようにした
- シーケンスとして定義して、計算に必要な値が先にキャッシュされるようにした

このアプローチは一度現れた値をすべてキャッシュするので、**ヒープ領域を消費**する。これが問題になるのであれば、より複雑なキャッシュ方針を選ぶことで解決できることもある。

## キーワード

- [[mutual-recursion|相互再帰]]
- [[trampoline|トランポリン]]
- [[lazy-evaluation|遅延評価]]
- [[multimethod|マルチメソッド]]
- [[memoization|メモ化]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
