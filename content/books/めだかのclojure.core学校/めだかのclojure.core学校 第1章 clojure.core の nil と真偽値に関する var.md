---
title: めだかのclojure.core学校 第1章 clojure.core の nil と真偽値に関する var
description: 真偽値への変換や判定、nil の判定を行う clojure.core の Var をまとめた節
tags: [book-chapter, clojure]
date: 2024-11-28
book: "[[めだかのclojure.core学校]]"
chapter: 1
---

## TL;DR

- [[clojure|Clojure]] では `nil` と `false` 以外の値はすべて真として扱われる。
- clojure.core には、真偽値への変換、真偽値や `nil` かどうかの判定を行う関数がそろっている。

## 内容

### Boolean

`boolean` は、引数を真偽値（`java.lang.Boolean`）に変換する。`nil` と `false` 以外は、空のコレクションや空文字列も含めてすべて `true` になる。`boolean?` は、引数が真偽値かを判定する。

```clojure
(map boolean [true false nil [] {} '() #{} "" "true" "false"])
;; (true false false true true true true true true true)

(boolean? true)   ; true
(boolean? "true") ; false
```

`parse-boolean` は、文字列を真偽値に変換する。変換できない文字列を渡すと `nil` を返す。

```clojure
(parse-boolean "true")  ; true
(parse-boolean "false") ; false
(parse-boolean "")      ; nil
```

`true?` と `false?` は、引数がそれぞれ `true`、`false` そのものかを判定する。真として扱われる値かどうかではない点に注意する。

```clojure
(map true? [true false ""])  ; (true false false)
(map false? [true false ""]) ; (false true false)
```

`some?` は引数が `nil` でなければ `true` を返す。`false` を渡しても `true` になる。`any?` は、何を渡しても常に `true` を返す。

```clojure
(some? nil)   ; false
(some? false) ; true

(any? nil)   ; true
(any? false) ; true
```

### nil

`nil?` は、引数が `nil` かを判定する。`false` や `0`、空リストは `nil` ではない。

```clojure
(nil? nil)   ; true
(nil? false) ; false
(nil? 0)     ; false
(nil? '())   ; false
```

## キーワード

- [[clojure|Clojure]]
- [[clojure-var|Var]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
