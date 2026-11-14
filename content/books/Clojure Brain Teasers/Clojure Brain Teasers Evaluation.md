---
title: Clojure Brain Teasers Evaluation
description: 読み取り時と評価時の違いに関わる Clojure のつまずきやすい挙動を、#_ や comment、集合リテラル、クォート、-> マクロなどの例で示す章
tags: [book-chapter, clojure]
date: 2025-05-23
book: "[[Clojure Brain Teasers]]"
chapter:
---

## TL;DR

- [[clojure|Clojure]] の式がいつ、どう評価されるかに関わるパズルを集めた章である。
- `#_` と `comment` の違い、集合リテラルの重複チェック、ベクタを関数として呼ぶときの落とし穴、クォートの種類、`->` に無名関数を渡すときの注意を扱う。

## 内容

### Stay Focused, Reader

`#_` は、それに続く式を評価せずに読み飛ばす。複数重ねると、重ねた数だけ式を読み飛ばす。コードの一部を一時的に無効にするのに便利である。

### Nil Comment

`comment` は `;;` や `#_` と違い、式として評価され、常に `nil` を返す。そのため、`nil` が周りの式に影響しない場所でだけ使うべきである。たとえば、[[namespace|名前空間]]のトップレベルや関数定義の下などである。

```clojure
(defn my-function [x] x)

(comment
  ;; test my-function
  (my-function 100))
```

### Roll the Dice

集合の要素の重複は、読み取り時と評価時の両方で検査される。読み取り時に同じ式が並んでいると、[[clojure-reader|リーダー]]がシンタックスエラーを出す。

```clojure
#{(rand-int 6) (rand-int 6)}
;; Syntax error reading source at (...).
;; Duplicate key: (rand-int 6)
```

一方、`(conj #{} (rand-int 6) (rand-int 6))` のように評価時に同じ値が追加される場合は、エラーにならず追加が読み飛ばされる。

### Paren-tal Advisory

Clojure のベクタは、インデックスを受け取ってその位置の要素を返す関数としても使える（`([:hi :there] 0)` は `:hi` を返す）。そのため、次のコードは無名関数の中でベクタを引数なしで呼び出すことになり、`ArityException` が発生する。

```clojure
(def names ["Scarlet" "Dandelion" "Cerulean"])
(def codes ["FD0E35" "FED85D" "02A4D3"])
(map #([%1 %2]) names codes)
;; Wrong number of args (0) passed to: clojure.lang.PersistentVector
```

この場合は、代わりに `vector` を使う。

```clojure
(map vector names codes)
;; (["Scarlet" "FD0E35"] ["Dandelion" "FED85D"] ["Cerulean" "02A4D3"])
```

### Quoth the Raven

シンボルの書き方によって、評価されるかどうかと、名前空間が付くかどうかが変わる。

```clojure
(def raven "nevermore")
(= raven "nevermore")
;; raven は評価され、値の "nevermore" になるので true

(= 'raven (symbol "raven"))
;; raven は評価されずシンボルのまま扱われるので true
;; 式をデータとして扱いたいときに使う

(= `raven (symbol "user/raven"))
;; シンボルのまま扱われるが、名前空間（ここでは user）が付くので true
;; マクロの中で、シンボルの解決をマクロ展開後に行いたいときに使う
```

### Loose Threads

`->` は、最初の式の評価結果を、次の式の最初の引数に入るように並べ替える[[macro|マクロ]]である。マクロなので、`(-> 10 #(+ % 1))` のように無名関数を渡すと、無名関数は呼び出されず、`(fn* 10 [p1__181#] (+ p1__181# 1))` のように展開されてエラーになる。

これを避けるには、`(-> 10 (#(+ % 1)))` のように無名関数を括弧で囲んで呼び出す。または、`(as-> 10 $ (+ $ 1))` のように `as->` を使い、値を渡す位置を明示する。

## キーワード

- [[clojure|Clojure]]
- [[clojure-reader|リーダー（Clojure）]]
- [[macro|マクロ]]
- [[namespace|名前空間]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
