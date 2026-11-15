---
title: Clojure Book 第4章 リスト
description: Clojure のリストの定義、ベクタと共通する要素の取得方法、cons と conj がどちらも先頭に要素を追加することを扱う節
tags: [book-chapter, clojure]
date: 2023-08-16
book: "[[Clojure Book]]"
chapter: 4
---

## TL;DR

- [[clojure|Clojure]] のリストは `'( … )` か `list` で定義する。Clojure のプログラムはすべてリストで構成されている。
- ベクタと同じく `count`、`first`、`rest`、`nth`、`cons`、`conj` が使えるが、関数として呼び出すことはできず、要素はどちらの方法でも先頭に追加される。

## 内容

ベクタと似ているが、ベクタは `[ ]` で囲むのに対して、リストは `( )` で囲む。Clojure のプログラムは**すべてリストで構成**されている。

### 定義

リストを定義するには、`'( … )` を使う。

```clojure
'(1 2 3 4) ;; (1 2 3 4)
```

もし `'` がないと、Clojure は `1` を関数、`2 3 4` を引数と捉えるので、エラーになる。

```clojure
(1 2 3 4)
;; Execution error (ClassCastException)
```

`list` を使って定義することもできる。

```clojure
(list 1 2 3) ;; (1 2 3)
```

### 要素の取得

ベクタと同じく、`count`、`first`、`rest`、`nth` がそれぞれ使える。

```clojure
(def friends-list
	'("Ram", "Bashir", "Antony", "Buddha"))

(count friends-list) ;; 4
(first friends-list) ;; "Ram"
(rest friends-list)  ;; ("Bashir" "Antony" "Buddha")
(nth friends-list 3) ;; "Buddha"
```

ただし、ベクタのようにリストを関数として扱い、インデックス番号を渡すことはできない。

```clojure
(friends-list 3)
```

### 要素の追加

要素を追加する `cons` と `conj` も使える。リストは内部的には単純な[[linked-list|連結リスト]]なので、どちらも新しい要素が先頭に付く。

```clojure
(cons "Pariyaar" friends-list)
;; ("Pariyaar" "Ram" "Bashir" "Antony" "Buddha")
(conj friends-list "Pariyaar")
;; ("Pariyaar" "Ram" "Bashir" "Antony" "Buddha")
```

どちらの操作もイミュータブルなので、元のリストは影響を受けない。

```clojure
friends-list ;; ("Ram" "Bashir" "Antony" "Buddha")
```

## キーワード

- [[clojure|Clojure]]
- [[linked-list|連結リスト]]
- [[immutability|イミュータビリティ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
