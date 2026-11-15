---
title: Clojure Book 第4章 ベクタ
description: Clojure のベクタの定義、first、rest、nth による要素の取得、conj と cons による要素の追加を扱う節
tags: [book-chapter, clojure]
date: 2023-08-16
book: "[[Clojure Book]]"
chapter: 4
---

## TL;DR

- [[clojure|Clojure]] のベクタは `[ ]` か `vector` で定義し、どんな型の値でも格納できる。
- `first`、`rest`、`nth` で要素を取得し、`conj` で末尾に、`cons` で先頭に要素を追加する。元のベクタは変わらない。

## 内容

### 定義

Clojure では次のように定義する。

```clojure
[1, 2, 3, 4]
```

`vector` を使って、次のようにも書ける。

```clojure
(vector 1 2 3) ;; [1, 2, 3]
```

ベクタにはどんな型の値でも格納できる。

```clojure
[1 true "Radish"]
```

### 要素の取得

`first` を使うと、ベクタの先頭の要素を取得できる。

```clojure
(def friends
	["Ram", "Bashir", "Antony", "Buddha"]) ;; #'user/friends

(first friends) ;; "Ram"
```

`rest` を使うと、先頭の要素**以外の要素**を取得できる。

```clojure
(rest friends) // ("Bashir" "Antony" "Buddha")
```

型を確かめると、`friends` と `(rest friends)` はどちらも `PersistentVector` であることが分かる。

```clojure
(type friends) ;; clojure.lang.PersistentVector
(type (rest friends)) ;; clojure.lang.PersistentVector$ChunkedSeq
```

`nth` を使うと、任意の要素を取得できる。

```clojure
(nth friends 3) ;; "Buddha"
```

範囲外の値を指定すると、例外が発生する。

```clojure
(nth friends 42)
;; Execution error (IndexOutOfBoundsException)
```

ベクタを関数として扱い、インデックス番号を渡して要素を取得することもできる。

```clojure
(friends 3) ;; "Buddha"
```

### 要素の追加

`conj` を使うと、末尾に要素を追加できる。

```clojure
(conj friends "Periyaar")
;; ["Ram" "Bashir" "Antony" "Buddha" "Periyaar"]
```

ただし、**元のベクタは影響を受けない**（**イミュータブル**）。

```clojure
friends ;; ["Ram" "Bashir" "Antony" "Buddha"]
```

`cons` を使うと、先頭に要素を追加できる。

```clojure
(cons "Periyaar" friends)
;; ("Periyaar" "Ram" "Bashir" "Antony" "Buddha")
```

## キーワード

- [[clojure|Clojure]]
- [[immutability|イミュータビリティ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
