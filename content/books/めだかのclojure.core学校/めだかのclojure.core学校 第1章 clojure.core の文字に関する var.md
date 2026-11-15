---
title: めだかのclojure.core学校 › clojure.core の文字に関する var
description: 文字の生成、判定、文字名やエスケープ文字列の取得を行う clojure.core の Var をまとめた節
tags: [book-chapter, clojure]
date: 2024-11-28
book: "[[めだかのclojure.core学校]]"
chapter: 1
---

## TL;DR

- [[clojure|Clojure]] の文字は `java.lang.Character` で、リテラルは `\` から始める。
- clojure.core には、文字への変換、文字かどうかの判定、文字の名前やエスケープ文字列を返す関数がある。

## 内容

文字のリテラルは `\a` のように `\` から始め、`java.lang.Character` として生成される。

```clojure
(type \a) ; java.lang.Character
```

`char` は、数値などを文字に変換する。`char?` は、引数が文字かを判定する。文字列の `"a"` は文字ではないので `false` になる。`unchecked-char` は、範囲の検査をせずに `Character` へ変換する。

```clojure
(char 65) ; \A
(char 97) ; \a

(char? \a)  ; true
(char? "a") ; false
```

`char-name-string` は、文字の名前を文字列で返す。`char-escape-string` は、文字のエスケープ文字列を返す。どちらも、該当するものがない文字には `nil` を返す。

```clojure
(char-name-string \backspace) ; "backspace"
(char-name-string \a)         ; nil

(char-escape-string \backspace) ; "\\b"
(char-escape-string \a)         ; nil
```

## キーワード

- [[clojure|Clojure]]
- [[clojure-var|Var]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
