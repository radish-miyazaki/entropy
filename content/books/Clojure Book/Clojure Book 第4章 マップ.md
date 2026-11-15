---
title: Clojure Book › マップ
description: Clojure のマップの定義、get とキーワードによる値の取得、assoc と dissoc による要素の追加と削除、keys と vals を扱う節
tags: [book-chapter, clojure]
date: 2023-08-16
book: "[[Clojure Book]]"
chapter: 4
---

## TL;DR

- [[clojure|Clojure]] のマップは `{ }` か `hash-map` で定義し、`get` やマップ自身、キーワードのキーを関数として呼び出して値を取得する。
- `assoc` で要素を追加し、`dissoc` で削除する。元のマップは変わらない。

## 内容

### 定義

Clojure では次のように定義する。

```clojure
{ "name" "Bashir" "age" 12 } ;; {"name" "Bashir", "age" 12}
```

`hash-map` を使って定義することもできる。

```clojure
(hash-map "name" "Bashir" "age" 20)
;; {"name" "Bashir", "age" 20}
```

### 要素の取得

キーを指定して値を取得するには、`get` を使う。

```clojure
(def friend { "name" "Bashir" "age" 12 })
(get friend "name") ;; "Bashir"
```

次のような簡潔な書き方でも取得できる。

```clojure
(friend "name") ;; "Bashir"
```

### キーにキーワードを使う

マップのキーには [[clojure-keyword|キーワード]]（`:name`）を使うこともできる。

```clojure
(def wise-friend {:name "Periyaar" :age 90})
```

この場合でも、文字列のときと同じように値を取得できる。

```clojure
(wise-friend :name)    ; "Periyaar"
(get wise-friend :age) ; 90
```

次のように、`print` 関数と合わせて使うこともできる。

```clojure
(print (wise-friend :name) "is very wise") ; Periyaar is very wise
```

[[Clojure Book 第4章 集合|集合]]のキーワードの場合と同じく、次のように書いても要素を取得できる。**キーワード `:name` を関数として扱い**、マップを渡して値を取得している。

```clojure
(:name wise-friend) ; "Periyaar"
```

### 要素の追加

`assoc` を使うと、要素を追加できる。

```clojure
(assoc wise-friend :belief "Rationalism")
;; {:name "Periyaar", :age 90, :belief "Rationalism"}
```

`dissoc` を使うと、要素を削除できる。

```clojure
(dissoc wise-friend :age) ; {:name "Periyaar"}
```

どちらの操作をしても、元のマップは変わらない（**イミュータブル**）。

```clojure
(assoc wise-friend :belief "Rationalism")
(wise-friend :belief) ; nil

(dissoc wise-friend :age)
(wise-friend :age) ; 90
```

### キー / 値だけを取得する

`keys` を使うと、マップのキーのリストを取得できる。

```clojure
(keys wise-friend) ; (:name :age)
```

同じように `vals` を使うと、値のリストを取得できる。

```clojure
(vals wise-friend) ; ("Periyaar" 90)
```

### キーワードと文字列で同じキー名を指定する

キーワードと文字列は別物なので、同じ名前のキーワードと文字列のキーをそれぞれ定義できる。

```clojure
(assoc wise-friend "name" "Ramasamy")
;; {:name "Periyaar", :age 90, "name" "Ramasamy"}
```

できはするが、明瞭さに欠けるので、もちろん**非推奨**である。

## キーワード

- [[clojure|Clojure]]
- [[clojure-keyword|キーワード]]
- [[immutability|イミュータビリティ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
