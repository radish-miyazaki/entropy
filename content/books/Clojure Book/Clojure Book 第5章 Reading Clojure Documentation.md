---
title: Clojure Book 第5章 Reading Clojure Documentation
description: REPL 上で doc、find-doc、apropos を使って Clojure のドキュメントを調べる方法と、clojuredocs.org を扱う章
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 5
---

## TL;DR

- [[clojure|Clojure]] には、[[repl-driven-development|REPL 駆動開発]]をしやすいように、REPL 上でドキュメントを確かめる仕組みがある。
- `doc` で関数のドキュメントを出力し、`find-doc` でドキュメント全体を、`apropos` で関数名を検索する。

## 内容

Clojure は REPL 駆動開発を円滑に行えるように、**REPL 上でドキュメントを確認**できる仕組みが整っている。

### `doc`

`doc` という関数に関数名を渡すと、そのドキュメントが出力される。

```clojure
(doc +)
;; -------------------------
;; clojure.core/+
;; ([] [x] [x y] [x y & more])
;;   Returns the sum of nums. (+) returns 0. Does not auto-promote
;;   longs, will throw on overflow. See also: +'
```

### `find-doc`

ドキュメント全体を検索したいときは、`find-doc` を使うとよい。

```clojure
(find-doc "sum of nums")
;; -------------------------
;; clojure.core/+
;; ([] [x] [x y] [x y & more])
;;   Returns the sum of nums. (+) returns 0. Does not auto-promote
;;   longs, will throw on overflow. See also: +'
;; -------------------------
;; clojure.core/+'
;; ([] [x] [x y] [x y & more])
;;   Returns the sum of nums. (+') returns 0. Supports arbitrary precision.
;;   See also: +
```

### `apropos`

ある文字列を名前に含む関数を検索したいときは、`apropos` を使うとよい。

```clojure
(apropos "replace")
;; (clojure.core/replace clojure.string/re-quote-replacement \
;; clojure.string/replace clojure.string/replace-first \
;; clojure.walk/postwalk-replace clojure.walk/prewalk-replace)
```

試しに、上で出てきた `replace` のドキュメントを出力する。

```clojure
(doc replace)
;; -------------------------
;; clojure.core/replace
;; ([smap] [smap coll])
;;   Given a map of replacement pairs and a vector/collection, returns a
;;   vector/seq with any elements = a key in smap replaced with the
;;   corresponding val in smap.  Returns a transducer when no collection
;;   is provided.
```

### clojuredocs.org

[clojuredocs.org](https://clojuredocs.org/) から、ブラウザでドキュメントを見ることもできる。

## キーワード

- [[clojure|Clojure]]
- [[repl-driven-development|REPL 駆動開発]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
