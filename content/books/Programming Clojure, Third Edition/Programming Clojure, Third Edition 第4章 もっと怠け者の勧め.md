---
title: Programming Clojure, Third Edition 第4章 もっと怠け者の勧め
description: コイントスで表が 2 回続いた回数を数える問題を、recur、ペアのシーケンス、partition、comp、partial で書き直し、既存のシーケンス関数を組み合わせる利点を見る
tags: [book-chapter, clojure]
date: 2023-08-27
book: "[[Programming Clojure, Third Edition]]"
chapter: 4
---

## TL;DR

- 遅延シーケンスを自分で書くより、既存のシーケンス関数を組み合わせて問題を解くほうが良い。
- 連続した表を数える問題は、ペアのシーケンスに変換すると「両方とも表のペアを数える」とシーケンス関数で書け、`partition`、`comp`、`partial` でより汎用的な `count-runs` にできる。
- 部分適用はカリー化と似ているが同じではなく、Clojure では真のカリー化関数を表現できない。

## 内容

遅延シーケンスは遅延評価を表現するのに良い方法である。しかし、**すでに存在するシーケンス関数の組み合わせ**で問題を解き、**シーケンス処理を書かずに済ませる**ほうがより良い。例として、次の問題をいくつかの方法で実装する。

### 問題: コイントスで表が 2 回続いた回数を数える

与えられるデータは次のようなベクタである。`:h` は表、`:t` は裏を表す。

```clojure
[:h :t :t :h :h :h]
```

このデータで、表が 2 回続いたケースは 2 つである。入力データは非常に大きいかもしれないが、有限であることが分かっている。

### `recur` を使ったサンプルコード

`recur` を使うと、次のように書ける。

```clojure
(defn count-heads-pairs [coll]
  (loop [cnt 0 coll coll]
    (if (empty? coll)
        cnt
        (recur (if (= :h (first coll) (second coll))
                 (inc cnt)
                 cnt)
               (rest coll)))))
```

簡単な入力を渡して、期待どおり動作するかを確認する。

```clojure
(count-heads-pairs [:h :h :h :t :h]) ; 2
(count-heads-pairs [:h :t :h :t :h]) ; 0
```

この関数は期待どおり動作するが、問題で重要な「2 つの連続した要素」というのが、**`loop`/`recur` の構造の中に埋もれてしまっている**ので、改善が必要である。そこで、ガイドラインの 5 と 6 を適用して、問題を分割し、シーケンスライブラリを活用する。

### 次の要素も相手にする（ペアのシーケンス）

シーケンス関数のほとんどは、一度にシーケンスの 1 つの要素だけを処理する。今回のケースでは、隣の要素についても処理する必要がある。

そこで、シーケンスを変換してみる。具体的には、次のようなシーケンスを見たら、

```clojure
[:h :t :t :h :h :h]
```

**各要素に隣の要素をくっつけたシーケンス**を考える。

```clojure
[[:h :t] [:t :t] [:t :h] [:h :h] [:h :h]]
```

この変換を行う `by-pairs` 関数を書いてみる。**出力の大きさは入力の大きさに応じて変わる**ので、ガイドラインの 3 を適用して遅延シーケンスを作る。

```clojure
(defn by-pairs [coll]
  (let [take-pair (fn [c]
                    (when (next c) (take 2 c)))]
    (lazy-seq
     (when-let [pair (seq (take-pair coll))]
       (cons pair (by-pairs (rest coll)))))))
```

`when-let` マクロは、`when` と `let` を同時に処理するものである。`test` 式を評価して真となる結果ならば、`binding-form` に束縛して `body` を処理する。

```clojure
(when-let [binding-form test] & body)
```

実際の動作を確かめる。

```clojure
(by-pairs [:h :t :t :h :h :h])
; ((:h :t) (:t :t) (:t :h) (:h :h) (:h :h))
```

これでコイントスの結果を**ペア**のシーケンスとして扱えるようになったので、`count-heads-pairs` は自然言語で「要素が両方とも表であるようなペアの数を数える」と説明できるようになる。

### シーケンスライブラリで書き換える

この自然言語による説明は、そのままシーケンスライブラリの関数呼び出しへと翻訳できる。

```clojure
(defn count-heads-pairs [coll]
  (count (filter (fn [pair] (every? #(= :h %) pair))
                 (by-pairs coll))))
```

このコードは `recur` を使ったものよりも、「隣り合った表を数える」という処理の本質を表している。

しかし、シーケンスライブラリを活用すると、もっと簡潔に書ける。たとえば、先ほど実装した `by-pairs` は、`partition` という関数で**より汎用的**に提供されている。

```clojure
(partition size step? coll)
```

この関数を使うと、`by-pairs` の処理を実現できる。

```clojure
(partition 2 1 [:h :t :t :h :h :h])
; ((:h :t) (:t :t) (:t :h) (:h :h) (:h :h))

(by-pairs [:h :t :t :h :h :h])
; ((:h :t) (:t :t) (:t :h) (:h :h) (:h :h))
```

`step` を省略すると `size` と同じだとみなされるので、ここでは `1` を指定している。

### 関数合成（`comp`）

`count` と `filter` の組み合わせは頻繁に出てくるので、`count-if` という関数にまとめてみる。

```clojure
(def ^{:doc "Count items matching a filter"}
  count-if (comp count filter))
```

`comp` は2 つ以上の関数を合成（compose）する関数である。`comp` は渡された関数のうち一番右の関数を引数に適用し、その結果に次の関数を適用し、という動作をする新しい関数を作って返す。

```clojure
(comp f & fs)
```

したがって、`count-if` は、最初に `filter` を行い、その結果を `count` する関数となる。

```clojure
(count-if odd? [1 2 3 4 5]) ; 3
```

### より汎用的な関数へ

最後に、`count-if` と `partition` を使って、`count-heads-pairs` より汎用性の高い `count-runs` を実装する。

```clojure
(defn count-runs
  "Count runs of length n where pred is true is coll"
  [n pred coll]
  (count-if #(every? pred %) (partition n 1 coll)))
```

この関数を使うと、表のペアを数えられる。

```clojure
(count-runs 2 #(= % :h) [:h :t :t :h :h :h]) ; 2
```

同様に、裏のペアも数えられる。

```clojure
(count-runs 2 #(= % :t) [:h :t :t :h :h :h]) ; 1
```

ペアではなく、3 回連続する部分を数えることもできる。

```clojure
(count-runs 3 #(= % :h) [:h :t :t :h :h :h]) ; 1
```

### 部分適用（`partial`）

もし `count-heads-pairs` という専用の関数が必要ならば、`count-runs` を使って次のように定義できる。

```clojure
(def ^{:doc "Count rows of length two that are both heads"}
  count-heads-pairs (partial count-runs 2 #(= % :h)))
```

ここで使っている **`partial`** は[[partial-application|部分適用]]を行う関数である。`partial` には、関数 `f` と引数リストの一部を与える。**残りの引数は`partial` が返す関数を呼び出すときに与えればよい**。

```clojure
(partial f & partial-args)
```

たとえば次の式は

```clojure
(partial count-runs 1 #(= % :h))
```

次の式よりも分かりやすい。

```clojure
(fn [coll] (count-runs 1 %(= % :h) coll))
```

部分適用は[[currying|カリー化]]とよく似ているが、同じではない。

### カリー化と部分適用

**真のカリー化された関数は、Clojure では表現できない**。しかし、カリー化の主な用途である部分適用は `partial` で実現できるので、大した問題ではない。

カリー化とは、1 つの引数を受け取り、元の関数の呼び出しにおいて、**その引数が固定された新しい関数を返す**ことである。

#### Clojure でカリー化関数を定義してみる

Clojure でカリー化された関数を用意するとしたら、次のようになる。

```clojure
; 厳密にはカリー化関数ではない（後述）
(defn faux-curry [& args] (apply partial partial args))
```

**カリー化の用途の 1 つは、部分適用**である。次は Clojure における部分適用で、

```clojure
(def add-3 (partial + 3))
(add-3 7) ; 10
```

次が `faux-curry` を使った部分適用である。

```clojure
(def add-3 ((faux-curry +) 3))
(add-3 7) ; 10
```

#### `faux-curry` は真のカリー化関数ではない

この `faux-curry` は**真のカリー化ではない**。真のカリー化関数は**すべての引数が固定されると、無引数の関数ではなく結果の値を返す**。これは1 つの引数を取る関数 `true?` を使うと確認できる。

```clojure
((faux-curry true? (= 1 1))
; #object[clojure.core$partial$fn__5910 ... etc ...]

; 真にカリー化されていれば、以下のように値を返す。
(curry true? (= 1 1)) ; true
```

Clojure では可変長引数の関数が許されているので、Clojure 自身は**ある関数にすべての引数が提供されたかどうかを知ることができない**。しかし、関数呼び出しを書いているプログラマは、引数をすべて与えたか分かるはずである。引数をすべて与えたら、**結果として返ってきた関数を無引数で呼び出せばよい**。

```clojure
(((faux-curry true? (= 1 1)))) ; true
```

## キーワード

- [[clojure-sequence|シーケンス]]
- [[lazy-sequence|遅延シーケンス]]
- [[function-composition|関数合成]]
- [[partial-application|部分適用]]
- [[currying|カリー化]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
