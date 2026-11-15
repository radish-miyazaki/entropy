---
title: Clojure Book › Destructuring
description: JavaScript の分割代入に似た分配束縛で、ベクタやマップの要素を let で変数に束縛する章
tags: [book-chapter, clojure]
date: 2023-08-19
book: "[[Clojure Book]]"
chapter: 17
---

## TL;DR

- [[clojure|Clojure]] では、[[javascript|JavaScript]] の分割代入のようなことを、ベクタやマップ、リスト、集合などに対してできる（[[destructuring|分配束縛]]）。
- ベクタでは要素が足りなければ `nil` が入り、余った要素は束縛されない。使わない変数は慣習として `_` で表す。

## 内容

JavaScript の分割代入のようなことを、ベクタやマップ、リスト、集合などのデータ型に対してできる（**分配束縛**）。ここでは、ベクタとマップだけを取り上げる。

### ベクタの分割束縛

次のコードでは `people` の 2 つの要素を `let` で `musician` と `scientist` という変数に束縛している。

```clojure
(def people ["Rahmaan" "Kalaam"])

(let [[musician scientist] people]
  (println "Musician is" musician)
  (println "Scientist is" scientist))
;; Musician is Rahmaan
;; Scientist is Kalaam
```

渡した要素が足りないときは、変数に **`nil` が入る**。

```clojure
(let [[musician scientist artist] people]
  (println "Musician is" musician)
  (println "Scientist is" scientist)
  (println "Artist is" artist))
;; Musician is Rahmaan
;; Scientist is Kalaam
;; Artist is nil
```

渡した要素が多いときは、**余った要素は変数に束縛されない**。

```clojure
(def people ["Rahmaan" "Kalaam" "Hussein" "Madhavan"])
(let [[musician scientist artist] people]
  (println "Musician is" musician)
  (println "Scientist is" scientist)
  (println "Artist is" artist))
;; Musician is Rahmaan
;; Scientist is Kalaam
;; Artist is Hussein
```

使わない変数は慣習として `_` で表す。

```clojure
(let [[_ scientist _ actor] people]
  (println "Scientist is" scientist)
  (println "Actor is" actor))
;; Scientist is Kalaam
;; Actor is Madhavan
```

### マップの分割束縛

ベクタと同じく、マップでもできる。

```clojure
(def people
  {:musician "Rehmaan"
   :scientist "Kalaam"
   :artist "Hussein"
   :actor "Madhavan"})

(let [{scientist :scientist actor :actor} people]
  (println "Scientist is" scientist)
  (println "Actor is" actor))
;; Scientist is Kalaam
;; Actor is Madhavan
```

このコードでは `let` でマップ `people` の `:scientist` の値を変数 `scientist` に、`:actor` の値を `actor` に束縛している。

## キーワード

- [[clojure|Clojure]]
- [[destructuring|分配束縛]]
- [[javascript|JavaScript]]

## 自分の理解

[Qiita の記事](https://qiita.com/hatappo/items/41f9b3c7495095508a76)にあるように、集合は **_sequential_ ではない**（順序がない）ので、書き方が少し特殊である。
