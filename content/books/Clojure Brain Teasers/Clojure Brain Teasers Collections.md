---
title: Clojure Brain Teasers Collections
description: Clojure のコレクションの等価比較、conj の追加位置、nil の扱い、contains?、レコード、ソート済みコレクションの挙動を問題を通して確かめる章
tags: [book-chapter, clojure]
date: 2025-05-23
book: "[[Clojure Brain Teasers]]"
chapter:
---

## TL;DR

- [[clojure|Clojure]] のコレクションの比較は、シーケンシャル、集合、マップという種類ごとに行われ、種類が違えば中身が同じでも等しくない。
- `conj` はコレクションごとに最も効率の良い位置に要素を追加し、`contains?` は値ではなくキーの有無を調べる。

## 内容

### Six of One, Half Dozen of Another

ベクタ、リスト、シーケンスといったシーケンシャルなコレクションどうしは、要素を順番に比べる。集合どうしは、もう一方の集合に同じ要素が含まれているかを調べる。マップどうしは、もう一方のマップで同じキーが同じ値に対応しているかを調べる。

```clojure
(= [0 1 2 3 4 5] '(0 1 2 3 4 5) (range 6)) ; true
```

この 3 つの種類（パーティション）をまたいだ比較は、中身が同じでも `false` を返す。このルールは入れ子のコレクションにも再帰的に適用され、[[java|Java]] のコレクションと比べる場合にも当てはまる。

```clojure
(= [0 1 2 3 4 5] #{0 1 2 3 4 5}) ; false
```

### When in Rome

`conj` は、コレクションの種類ごとに最も効率の良い方法で要素を追加する。リストやシーケンスでは先頭に追加する。連結リストでは先頭への追加が最も効率が良いからである。ベクタでは末尾に追加する。ベクタが内部で使う [[hash-array-mapped-trie|Hash Array Mapped Trie]] にとって、末尾への追加が最も効率が良いからである。

```clojure
(conj '(:colosseum :vatican) :pantheon :trevi-fountain)
;;=> (:trevi-fountain :pantheon :colosseum :vatican)

(conj [:colosseum :vatican] :pantheon :trevi-fountain)
;;=> [:colosseum :vatican :pantheon :trevi-fountain]
```

シーケンス操作の結果をベクタで受け取りたいときは、`mapv`、`filterv`、`into` などを使う。

```clojure
(map #(* % 3) (range 5))  ; (0 3 6 9 12)
(mapv #(* % 3) (range 5)) ; [0 3 6 9 12]
```

集合に `conj` で追加した要素の順序は保証されない。すでにある要素は追加されない。

```clojure
(conj #{:colosseum :vatican} :pantheon :trevi-fountain)
;;=> #{:vatican :trevi-fountain :colosseum :pantheon}
(conj #{1 2 3} 4 4 4) ; #{1 4 3 2}
```

### From Thin Air

`assoc` に `nil` とキーと値を渡すと、新しいマップができる。`conj` に `nil` と要素を渡すと、新しいリストができる。`count`、`nth`、`contains?`、`get`、`first`、`rest` などの関数にも `nil` を渡せる。

```clojure
(assoc nil :ex :nihilo)   ; {:ex :nihilo}
(conj nil :nihilo)        ; (:nihilo)
(count nil)               ; 0
(nth nil 0)               ; nil
(contains? nil :some-key) ; false
(get nil :some-key)       ; nil
(first nil)               ; nil
(rest nil)                ; ()
```

この振る舞いのおかげで `nil?` による検査が減り、コードが簡潔になる。ただし、`clojure.string` のように Java と連携する関数では、`NullPointerException` が起きることがある。

```clojure
(require '[clojure.string :as str])
(str/capitalize nil)
;; Execution error (NullPointerException) at ...
```

### Needle in a Haystack

`contains?` は値ではなく、キーがあるかどうかを調べる。定数時間か対数時間で動き、線形探索はしない。

```clojure
(def haystack (shuffle (conj (range 100) :needle)))
(contains? haystack :needle) ; false
```

コレクションに特定の値が含まれているかを効率よく調べたいときは、集合やマップのように値をキーとして扱うコレクションを使う。シーケンスのように線形探索が必要なときは、`filter` と `first` を組み合わせる。Clojure では集合を関数として使える。

```clojure
(first (filter #{:needle} haystack)) ; :needle
(first (filter odd? (range 10)))     ; 1
```

`some` を使ってもよい。`some` は述語関数の結果を返すが、集合を述語関数として使うと要素そのものが返る。

```clojure
(some #{:needle} haystack) ; :needle
(some odd? (range 10))     ; true
```

### Off the Record

Clojure のレコードは、具体的な型（レコード名）と必須フィールドを持つマップである。`dissoc` でレコードから必須フィールドを削除すると、ただのマップが返る。レコードの型を保ったままフィールドを消したいときは、`nil` を `assoc` する。

```clojure
(defrecord Album [name artist])
(def news-of-the-world (->Album "News of the World" "Queen"))
(instance? Album news-of-the-world)                  ; true
(instance? Album (dissoc news-of-the-world :artist)) ; false
(assoc news-of-the-world :artist nil)
;;=> #user.Album{:name "News of the World", :artist nil}
```

### Out of Sorts

`sorted-map` と `sorted-set` は、比較関数 `compare` を使ってキーや値を並べ、ソート済みのコレクションを作る。`compare` は数値、Clojure 独自の型、`Comparable` を実装した Java の型などに使えるが、比べる値が同じ型でないと `ClassCastException` を投げる。つまり `compare` はすべての値に順序を定める全順序ではなく、特定の型の値にだけ順序を定める部分順序である。そのため、コレクションの要素と異なる型の値で `contains?` などを呼んでも、同じ例外が起きる。

```clojure
(compare :a 1)
;; Execution error (ClassCastException) at ....
(contains? (sorted-set 1 2 3) :hello)
;; Execution error (ClassCastException) at ....
```

`sorted-map-by` や `sorted-set-by` を使うと、独自の比較関数を渡せる。比較関数は、整数の符号を返す Java スタイルと、最初の値が 2 番目の値より小さいときに `true` を返す Boolean スタイルのどちらでもよい。これで全順序を定義できるが、実装には注意がいる。たとえば文字列に変換して比べると、`"1" < "10" < "2"` という順序になってしまう。

```clojure
(defn total-compare [x y] (compare (str x) (str y)))
(sorted-set-by total-compare :hello 2 "x" 1 10 false)
;;=> #{1 10 2 :hello false "x"}
```

## キーワード

- [[clojure|Clojure]]
- [[hash-array-mapped-trie|Hash Array Mapped Trie]]
- [[computational-complexity|計算量]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
