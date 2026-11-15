---
title: めだかのclojure.core学校 › clojure.core のマップに関する var
description: マップの生成、要素の追加・更新・削除・取得、マージ、マップエントリ、構造体を扱う clojure.core の Var をまとめた節
tags: [book-chapter, clojure]
date: 2024-12-02
book: "[[めだかのclojure.core学校]]"
chapter: 1
---

## TL;DR

- [[clojure|Clojure]] のマップは、`clojure.lang.IPersistentMap` インタフェースを実装したインスタンスである。
- clojure.core には、マップを作る関数、要素を追加・更新・削除・取得する関数、マップをマージする関数がそろっている。ネストしたマップには `assoc-in`、`get-in`、`update-in` を使う。

## 内容

### マップの種類と作成

マップには、配列マップ（`PersistentArrayMap`）、ハッシュマップ（`PersistentHashMap`）、ソート済みマップ（`PersistentTreeMap`）がある。`{...}` のリテラルと `array-map` は配列マップを作る。`hash-map` はキーと値のペアからハッシュマップを作り、キーが重複すると最後の値が使われる。

```clojure
(type {:a 1 :b 2})         ; clojure.lang.PersistentArrayMap
(array-map :a 1 :b 2 :c 3) ; {:a 1, :b 2, :c 3}
(hash-map :a 1 :b 2 :a 3)  ; {:b 2, :a 3}
```

`sorted-map` はキーの昇順でソートしたマップを作り、`sorted-map-by` は比較関数でソートしたマップを作る。`map?` は、引数が `IPersistentMap` を実装しているかを判定する。

```clojure
(sorted-map :a 1 :c 3 :b 2)                 ; {:a 1, :b 2, :c 3}
(sorted-map-by > 3 "three" 1 "one" 2 "two") ; {3 "three", 2 "two", 1 "one"}

(map map? ['() [] #{} {}]) ; (false false false true)
```

### 追加・更新・削除

`assoc` は、マップでは指定したキーの値を置き換えた新しいマップを返す。ベクタにも使え、指定したインデックスに値を入れた新しいベクタを返す。範囲外のインデックスを指定すると `IndexOutOfBoundsException` になる。`dissoc` は、指定したキーを削除した新しいマップを返し、キーがなければ何もしない。

```clojure
(assoc {:a 1 :b 2} :a 3 :c 4) ; {:a 3, :b 2, :c 4}
(assoc [1 2 3] 1 4)           ; [1 4 3]
(assoc [1 2 3] 3 4)           ; [1 2 3 4]

(dissoc {:a 1 :b 2 :c 3} :b) ; {:a 1, :c 3}
(dissoc {} :a)               ; {}
```

`update` は、キーの値に関数を適用した結果を新しい値とするマップを返す。キーがなければ、関数には `nil` が渡される。`update-vals` はすべての値に、`update-keys` はすべてのキーに関数を適用する。

```clojure
(update {:a 1 :b 2} :b inc)               ; {:a 1, :b 3}
(update {:a 1 :b 2} :a + 10)              ; {:a 11, :b 2}
(update {:a 1 :b 2} :c (constantly 42))   ; {:a 1, :b 2, :c 42}

(update-vals {:a 1 :b 2 :c 3} inc)        ; {:a 2, :b 3, :c 4}
(update-keys {:one 1 :two 2 :three 3} name)
;; {"one" 1, "two" 2, "three" 3}
```

### ネストしたマップ

`assoc-in` と `update-in` は、`assoc` と `update` のネスト対応版である。キーのパスに沿って値を更新し、途中のキーがなければ作る。`get-in` はキーのパスに沿って値を取り出し、見つからなければ `nil` か第 3 引数の値を返す。

```clojure
(assoc-in {:a {:b 2}} [:a :b] 3) ; {:a {:b 3}}
(assoc-in {} [:a :b :c] 1)       ; {:a {:b {:c 1}}}

(def m {:a {:b 1 :c 2} :x 5})
(update-in m [:a] assoc :b 3 :d 4)
;; {:a {:b 3, :c 2, :d 4}, :x 5}
(update-in m [:y :z] (fn [x] (if x (inc x) 1)))
;; {:a {:b 1, :c 2}, :x 5, :y {:z 1}}

(get-in {:a {:b 1 :c 2}} [:a :b])             ; 1
(get-in {:a {:b 1 :c 2}} [:a :d] "not-found") ; "not-found"
```

### 取り出しとマージ

`select-keys` は、指定したキーとその値だけを持つ新しいマップを返す。存在しないキーは無視される。

```clojure
(select-keys {:a 1 :b 2 :c 3} [:a :c :d]) ; {:a 1, :c 3}
```

`merge` は複数のマップを 1 つにまとめる。同じキーがあれば、後ろのマップの値が使われる。引数がなければ `nil` を返す。`merge-with` は、同じキーの値を指定した関数で結合する。

```clojure
(merge {:a 1 :b 2} {:b 3 :c 4})            ; {:a 1, :b 3, :c 4}
(merge)                                     ; nil
(merge-with + {:a 1 :b 2} {:a 3 :c 4})      ; {:a 4, :b 2, :c 4}
(merge-with str {:a "A"} {:a "a" :b "B"})   ; {:a "Aa", :b "B"}
```

### マップエントリ

`find` は、キーに対応するマップエントリ（キーと値のペア、`clojure.lang.MapEntry`）を返し、見つからなければ `nil` を返す。`map-entry?` はマップエントリかを判定する。`key` と `val` は、マップエントリのキーと値を返す。

```clojure
(find {:a 1 :b 2 :c 3} :a)       ; [:a 1]
(map-entry? (first {:a 1 :b 2})) ; true
(map key {:a 1 :b 2 :c 3})       ; (:a :b :c)
(map val {:a 1 :b 2 :c 3})       ; (1 2 3)
```

### 構造体

`defstruct` マクロは構造体の定義を作り、Var に束縛する。`create-struct` は定義を作るだけで、Var には束縛しない。`struct` は定義の順に値を渡してインスタンス（`clojure.lang.PersistentStructMap`）を作り、`struct-map` はキーを指定して値を渡す。

```clojure
(defstruct person :name :age)
(struct person "Bob" 20)                ; {:name "Bob", :age 20}
(struct-map person :age 20 :name "Bob") ; {:name "Bob", :age 20}
```

## キーワード

- [[clojure|Clojure]]
- [[clojure-var|Var]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
