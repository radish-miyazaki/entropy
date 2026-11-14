---
title: めだかのclojure.core学校 第1章 clojure.core のセットに関する var
description: セットの生成、判定、ソート済みセットの作成、要素の除外を行う clojure.core の Var をまとめた節
tags: [book-chapter, clojure]
date: 2024-12-02
book: "[[めだかのclojure.core学校]]"
chapter: 1
---

## TL;DR

- [[clojure|Clojure]] のセット（集合）は、順序と重複を持たないコレクションで、`clojure.lang.IPersistentSet` インタフェースを実装している。
- `set` や `hash-set` でハッシュセットを、`sorted-set` や `sorted-set-by` でソート済みのセットを作り、`disj` で要素を除外する。

## 内容

### セットの作成と判定

`set` は、シーケンスやマップ、文字列などのコレクションをセットに変換する。重複した要素は 1 つにまとまる。`set?` は、引数が `IPersistentSet` を実装しているかを判定する。

```clojure
(set [1 2 2 3 3])      ; #{1 3 2}
(set {:a 1 :b 2 :c 3}) ; #{[:c 3] [:b 2] [:a 1]}
(set "hello")          ; #{\e \h \l \o}

(map set? ['() [] #{} {}]) ; (false false true false)
```

`hash-set` は、引数をキーとする新しいハッシュセットを返す。重複するキーは自動で除かれ、引数がなければ空のセットを返す。`set` と同じく `PersistentHashSet` のインスタンスになる。

```clojure
(hash-set 1 2 3)             ; #{1 3 2}
(hash-set [1 2] [2 3] [1 2]) ; #{[2 3] [1 2]}
(hash-set)                   ; #{}

(map type [(set [1]) (hash-set 1)])
;; (clojure.lang.PersistentHashSet clojure.lang.PersistentHashSet)
```

### ソート済みのセット

`sorted-set` は、引数からソート済みのセット（`PersistentTreeSet`）を作る。`conj` で要素を足しても順序は保たれる。

```clojure
(sorted-set 1 3 2 1)         ; #{1 2 3}
(sorted-set "b" "a" "c" "a") ; #{"a" "b" "c"}

(def s (sorted-set 1 2 3))
(conj s 4) ; #{1 2 3 4}
```

`sorted-set-by` は、比較関数を指定してソート済みのセットを作る。比較関数は 2 つの引数を受け取り、負の値を返せば左の引数が、正の値を返せば右の引数が小さいとみなされる。比較関数が等しいと判定した要素は重複として扱われるので、次の最後の例では `"hello"` と同じ長さの `"world"` が残らない。

```clojure
(sorted-set-by > 3 1 4 1 5 9 2 6 5)                ; #{9 6 5 4 3 2 1}
(sorted-set-by #(compare %2 %1) 3 1 4 1 5 9 2 6 5) ; #{9 6 5 4 3 2 1}

(sorted-set-by #(compare (count %2) (count %1)) "hello" "world" "clojure" "java")
;; #{"clojure" "hello" "java"}
```

### 要素の除外

`disj` は、指定した要素を除いた新しいセットを返す。除く要素が見つからなくてもエラーにならない。

```clojure
(disj #{1 2 3} 2)        ; #{1 3}
(disj #{:a :b :c} :b :c) ; #{:a}
(disj #{} 1)             ; #{}
```

## キーワード

- [[clojure|Clojure]]
- [[clojure-var|Var]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
