---
title: めだかのclojure.core学校 第1章 clojure.core の識別子に関する var
description: Clojure のキーワードとシンボルを作る・判定する・名前空間と名前を取り出す clojure.core の Var をまとめた節
tags: [book-chapter, clojure]
date: 2024-11-28
book: "[[めだかのclojure.core学校]]"
chapter: 1
---

## TL;DR

- [[clojure|Clojure]] の識別子（ident）には、シンボルとキーワードの 2 種類がある。
- clojure.core には、識別子を作る関数、種類を判定する関数、[[namespace|名前空間]]や名前を取り出す関数がそろっている。

## 内容

### Ident

シンボル（`clojure.lang.Symbol`）は、`+` や `concat`、`java.lang.String` のように、フォームの中で名前として使うデータ型である。キーワード（`clojure.lang.Keyword`）は `:` で始まり、データの識別子として使うデータ型である。`::` で書くと、現在の名前空間付きのキーワードになる。

```clojure
::a ; :user/a
```

`ident?` は、引数がシンボルかキーワードかを判定する。`simple-ident?` は名前空間のない識別子か、`qualified-ident?` は名前空間を持つ識別子かを判定する。

```clojure
(def x 10)   ; #'user/x
(ident? 'x)  ; true
(ident? :a)  ; true
(ident? "a") ; false

(map (juxt simple-ident? qualified-ident?) ['x 'user/x "x"])
;; ([true false] [false true] [false false])
```

`namespace` はシンボルやキーワードの名前空間を返し、`name` は文字列やシンボル、キーワードの名前を返す。

```clojure
(namespace 'user/x) ; "user"
(name 'x)           ; "x"
```

### Keyword

`keyword` は、指定した名前空間と名前を持つキーワードを返す。`keyword?` は引数がキーワードかを判定する。`simple-keyword?` は名前空間のないキーワードか、`qualified-keyword?` は名前空間を持つキーワードかを判定する。

```clojure
(keyword 'foo)         ; :foo
(keyword "foo")        ; :foo
(keyword "user" "foo") ; :user/foo

(map keyword? ["foo", :foo, 'foo]) ; (false true false)

(map (juxt simple-keyword? qualified-keyword?) [:user/x :x])
;; ([false true] [true false])
```

### Symbol

シンボルにも、キーワードと同じ形の関数がそろっている。`symbol` は指定した名前空間と名前を持つシンボルを返し、`symbol?` は引数がシンボルかを判定する。`simple-symbol?` と `qualified-symbol?` は、名前空間の有無を判定する。

```clojure
(symbol 'foo)         ; foo
(symbol "foo")        ; foo
(symbol "user" "foo") ; user/foo

(map symbol? ["foo", :foo, 'foo]) ; (false false true)

(map (juxt simple-symbol? qualified-symbol?) ['user/x 'x])
;; ([false true] [true false])
```

## キーワード

- [[clojure|Clojure]]
- [[clojure-var|Var]]
- [[namespace|名前空間]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
