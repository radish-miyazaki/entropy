---
title: めだかのclojure.core学校 › clojure.core のリストに関する var
description: リストの生成と判定を行う clojure.core の list、list*、list? をまとめた節
tags: [book-chapter, clojure]
date: 2024-11-29
book: "[[めだかのclojure.core学校]]"
chapter: 1
---

## TL;DR

- [[clojure|Clojure]] のリストは、`clojure.lang.IPersistentList` を実装したインスタンスである。
- `list` でリストを作り、`list*` で最後の引数を連結した[[clojure-sequence|シーケンス]]を作り、`list?` でリストかを判定する。

## 内容

`list` は、引数の要素から新しいリストを作る。引数がなければ空のリストになる。要素の型は問わず、リストを入れ子にすることもできる。

```clojure
(list 1 2 3)                 ; (1 2 3)
(list)                       ; ()
(list "a" "b" "c")           ; ("a" "b" "c")
(list (list 1 2) (list 3 4)) ; ((1 2) (3 4))
```

`list*` は、最後の引数以外を並べ、その後ろに最後の引数の要素を連結したシーケンスを返す。連結されるのは最後の引数だけなので、途中にあるベクタはそのまま 1 つの要素になる。最後の引数が連結できない型だと、`IllegalArgumentException` になる。

```clojure
(list* 1 2 3 [4 5])       ; (1 2 3 4 5)
(list* 1 2 3 [4 5] [6 7]) ; (1 2 3 [4 5] 6 7)
(list* 1 2 3 4 5)         ; IllegalArgumentException
```

`list?` は、引数が `IPersistentList` を実装しているかを判定する。

```clojure
(map list? ['() [] #{} {}])           ; (true false false false)
(map list? [1 :keyword nil "string"]) ; (false false false false)
```

## キーワード

- [[clojure|Clojure]]
- [[clojure-var|Var]]
- [[clojure-sequence|シーケンス]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
