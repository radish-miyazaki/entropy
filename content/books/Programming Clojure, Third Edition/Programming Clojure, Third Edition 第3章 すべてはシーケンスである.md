---
title: Programming Clojure, Third Edition › すべてはシーケンスである
description: シーケンスの核となる first、rest、cons と、seq、next の違い、マップと集合のシーケンス化、conj と into、遅延評価と不変性を見る
tags: [book-chapter, clojure]
date: 2023-08-25
book: "[[Programming Clojure, Third Edition]]"
chapter: 3
---

## TL;DR

- シーケンスの核となる機能は `first`、`rest`、`cons` の 3 つで、リスト以外のベクタ、マップ、集合にも同じ関数を使える。返り値は元の型ではなくシーケンスになる。
- `conj` と `into` は、コレクションに効率的に追加できる位置に要素を追加する。
- Clojure のシーケンスの多くは遅延評価され、不変である。

## 内容

Clojure では、すべての集合型のデータをシーケンスとみなせる。

### シーケンスの 3 つの主要な機能（`first`, `rest`, `cons`）

[[clojure-sequence|シーケンス]]は 3 つの核となる機能を持つ。

- **`first`** でシーケンスの最初の要素を取得できる。空か `nil` が渡された場合、`nil` を返す

  ```clojure
  (first aseq)
  ```

- **`rest`** でシーケンスの先頭要素以外のすべてを取り出せる。先頭要素以外が存在しない場合、空のシーケンスを返す（**`nil` ではない**）

  ```clojure
  (rest aseq)
  ```

- **`cons`** でシーケンスの先頭に要素を追加し、新しいシーケンスを生成できる

  ```clojure
  (cons else aseq
  ```

実装レベルでは、この 3 つの機能は Java インタフェース **`clojure.lang.ISeq`** で宣言されている。

### `seq` 関数

`seq` 関数はシーカブルなコレクションを取り、シーケンスを返す。`coll` が空か `nil` の場合、`seq` は `nil` を返す。

```clojure
(seq coll)
```

### `next` 関数と `rest` 関数の違い

`next` 関数は、与えられたシーケンスから最初の要素を取り除いた要素をシーケンスにしたものを返す。`(next aseq)` は `(seq (rest aseq))` と等価である。

```clojure
(next aseq)
```

`next` と `rest` の違いは次のとおり。

| 式               | 結果  |
| ---------------- | ----- |
| `(rest ())`      | `()`  |
| `(next ())`      | `nil` |
| `(seq (rest ())` | `nil` |

### 汎用的なデータ構造に対する操作と戻り値

Lisp に造詣が深いと、シーケンスの基本関数が**リスト**に対して自然に動作することを期待する。

```clojure
(first '(1 2 3))  ; 1
(rest '(1 2 3))   ; (2 3)
(cons 0 '(1 2 3)) ; (0 1 2 3)
```

Clojure では、**同じ関数を他のデータ構造でも使える**。

```clojure
(first [1 2 3])  ; 1
(rest [1 2 3])   ; (2 3)
(cons 0 [1 2 3]) ; (0 1 2 3)
```

ただし、`rest` や `cons` をベクタに適用すると、返される値はベクタではなくシーケンスになる。シーケンスであることを確認するには、`seq?` 関数を使う。

```clojure
(seq? (rest [1 2 3])) ; true
```

### マップと集合

マップはキーと値のペアを要素とするシーケンスとして扱える。

```clojure
(first {:fname "Aran" :lname "Bedra"})
; [:fname "Aran"]

(rest {:fname "Aran" :lname "Bedra"})
; ([:lname "Bedra"])

(cons [:mname "James"] {:fname "Aran" :lname "Bedra"})
; ([:mname "James"] [:fname "Aran"] [:lname "Bedra"])
```

集合も同様にシーケンスとして扱える。

```clojure
(first #{:the :quick :brown :fox}) ; :fox

(rest #{:the :quick :brown :fox})  ; (:the :quick :brown)

(cons :jumped #{:the :quick :brown :fox})
; (:jumped :fox :the :quick :brown)
```

### ソートされたマップと集合

マップと集合の走査順序は走査するたびに変わることはないが、厳密にどういう順序になるかは実装の詳細に依存するので、**順序を当てにしてはいけない**。順序を保証したい場合は、`sorted-map` と `sorted-set` を使うのがよい。

```clojure
(sorted-set :the :quick :brown :fox)
; #{:brown :fox :quick :the}

(sorted-map :c 3 :b 2 :a 1)
; {:a 1, :b 2, :c 3}
```

### `conj` 関数と `into` 関数

`conj` は1 つ以上の要素をコレクションに追加する関数である。

```clojure
(conj coll element & elements)
```

`into` は1 つのコレクションのすべての要素を、もう 1 つのコレクションに追加する関数である。

```clojure
(into to-coll from-coll)
```

どちらの関数も、与えられたコレクションに対して**効率的に追加できる位置に要素を追加**する。たとえば、リストは先頭に要素を追加する。

```clojure
(conj '(1 2 3) :a)          ; (:a 1 2 3)
(into '(1 2 3) '(:a :b :c)) ; (:c :b :a 1 2 3)
```

一方、ベクタは末尾に要素を追加する。

```clojure
(conj [1 2 3] :a)         ; [1 2 3 :a]
(into [1 2 3] [:a :b :c]) ; [1 2 3 :a :b :c]
```

### シーケンスライブラリにおける評価戦略（遅延評価）

ほとんどの Clojure のシーケンスは、要素が本当に**必要とされたときに初めてそれを生成**する[[lazy-evaluation|遅延評価]]である。そのため、Clojure のシーケンスライブラリは、極めて大きい（あるいは無限長の）シーケンスの扱いに適している。

### シーケンスは不変

Clojure のシーケンスは[[immutability|不変性]]を持つ。この性質により、プログラムの動作を解析しやすくなり、並行アクセスに対しても安全になる。

## キーワード

- [[clojure-sequence|シーケンス]]
- [[lazy-evaluation|遅延評価]]
- [[immutability|不変性]]
- [[lisp|Lisp]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
