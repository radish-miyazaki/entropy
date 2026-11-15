---
title: Clojure Book › Conditions and branching
description: Clojure の条件分岐 if、when、cond、case の書き方と、do で複数の式をまとめる方法を扱う章
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 7
---

## TL;DR

- [[clojure|Clojure]] の条件分岐には `if`、`when`、`cond`、`case` がある。`if` で複数の式を実行するには `do` でまとめる。
- 複数の条件を調べるときは、`if` を入れ子にせず `cond` を使う。`case` は、どの値にも一致しないと例外を投げる。

## 内容

### `if`

Clojure では次のように書く。

```clojure
(let [a 5]
  (if (> a 0)
    (println a "is positive")))
;; 5 is positive
```

`if` の**第 1 引数に条件**を、**第 2 引数に条件を満たすときに実行する式**を渡す。そして、**第 3 引数に条件を満たさないときに実行する式**を渡す。

```clojure
(let [a -5]
  (if (> a 0)
    (println a "is positive")
    (println a "is negative")))
```

他の言語の _else if_ を実現するには、次のように **`if` を入れ子**にする。ただし、可読性が悪いので、この場合は `cond` を使うのがよい。

```clojure
(let [a 0]
  (if (> a 0)
    (println a "is positive")
    (if (< a 0)
      (println a "is negative")
      (println a "is neither positive nor negative"))))
```

条件を満たしたときに**複数の式を実行したいときは、`do` でまとめる**必要がある。

```clojure
(let [a 5]
  (if (> a 0)
    (do
      (println a "is positive")
      (println "There are infinite positive numbers"))

    (do
      (println a "is negative")
      (println "There are infinite negative numbers"))))
```

### `when`

`if` と似ているが、`when` では**条件が `true` のときの挙動だけを指定**できる。`false` のときは `nil` が返る。また、**`do` を使わなくても複数の式を実行**できる。

```clojure
(let [print-something true]
  (when print-something
    (println "I print something.")
    (println "I print other things too.")))

(let [print-something false]
  (when print-something
    (println "I print something.")
    (println "I print other things too.")))
```

### `cond`

複数の条件を調べるときは、`if` を入れ子にするのではなく、`cond` を使うのが一般的である。

```clojure
(let [number 5]
  (cond
    (> number 0) (println number "is positive")
    (< number 0) (println number "is negative")
    :else (println number "is neither positive nor negative")))
```

`:else` にはどの条件も満たさないときに実行する式を指定する。処理が必要なければ**省略できる**。

### `case`

引数を一連の値と比べ、一致した値の式を実行する。

```clojure
(let [num 20]
  (case num
    1 "one"
    2 "two"
    3 "three"
    4 "four"
    5 "five"
    "I don't know that number"))
```

一番最後の式は、どの値にも一致しないときに実行される。`cond` と違い、**どの値にも一致しないときは例外を投げる**。

```clojure
(let [num 20]
  (case num
    1 "one"
    2 "two"
    3 "three"
    4 "four"
    5 "five"))
;; java.lang.IllegalArgumentException: No matching
```

## キーワード

- [[clojure|Clojure]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
