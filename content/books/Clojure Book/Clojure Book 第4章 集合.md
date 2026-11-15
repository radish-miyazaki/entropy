---
title: Clojure Book 第4章 集合
description: Clojure の集合の定義、set? と contains? による検証、キーワードを関数として使う書き方、conj と disj による要素の追加と削除を扱う節
tags: [book-chapter, clojure]
date: 2023-08-16
book: "[[Clojure Book]]"
chapter: 4
---

## TL;DR

- [[clojure|Clojure]] の集合は `#{ }` で定義し、要素はユニークでなければならない。
- `contains?` のほか、集合を関数として呼び出しても要素を確かめられる。キーワードの集合なら、キーワードを関数として呼び出すこともできる。

## 内容

### 定義

Clojure では次のように定義する。

```clojure
#{1 2 3 4}
```

`type` で確かめると、`PersistentHashSet` であることが分かる。

```clojure
(type #{1 2 3 4})
;; clojure.lang.PersistentHashSet
```

集合は、**要素がユニーク**でなければならない。

```clojure
#{1 2 3 4 4}
;; Syntax error reading source at (REPL:X:XX).
;; Duplicate key: 4
```

### 集合であることの検証

ある値が集合であるかを確かめるには、`set?` を使う。

```clojure
(set? #{1 2 3 4}) ;; true
```

### 要素の検証

`contains?` を使うと、指定した要素が含まれるかを確かめられる。

```clojure
(def fruits #{"Apple" "Orange" "Mango" "Banana"})

(contains? fruits "Banana")     ;; true
(contains? fruits "Jack Fruit") ;; false
```

次のように確かめることもできる。含まれる場合はその要素自身が、含まれない場合は `nil` が返ってくる。

```clojure
(fruits "Banana")     ;; "Banana"
(fruits "Jack Fruit") ;; nil
```

これを逆にすると、**文字列は関数ではないので例外が発生**する。

```clojure
("Banana" fruits) ;; Execution error (ClassCastException)
```

### キーワードの場合

Clojure には[[clojure-keyword|**キーワード**]]というものがあり、`:ruby` のように書く。

```clojure
(def programming-languages #{:ruby :python :clojure})
```

キーワードの集合に対しても、`contains?` は使える。

```clojure
(contains? programming-languages :ruby) ;; true
(contains? programming-languages :java) ;; false
```

`contains?` を使わずに確かめることもできる。

```clojure
(programming-languages :ruby) ;; :ruby
```

ただし、キーワードには**文字列と比べて特別な性質**があり、次のコードも動く。**キーワード `:ruby` を関数として扱い**、集合を渡して値を取得している。

```clojure
(:ruby programming-languages) ;; :ruby
```

### 要素の追加・削除

`conj` を使うと、要素を追加できる。ベクタやリストと違い、**`cons` は存在しない**。

```clojure
(conj programming-languages :perl) ;; #{:clojure :python :perl :ruby}
```

`disj` を使うと、要素を削除できる。

```clojure
(disj programming-languages :ruby) ;; #{:clojure :python}
```

どちらの操作をしても、元の集合は変わらない（**イミュータブル**）。

```clojure
programming-languages ;; #{:clojure :python :ruby}
```

## キーワード

- [[clojure|Clojure]]
- [[clojure-keyword|キーワード]]
- [[immutability|イミュータビリティ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
