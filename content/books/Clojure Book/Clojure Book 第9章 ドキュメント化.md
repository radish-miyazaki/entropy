---
title: Clojure Book › ドキュメント化
description: 関数名と引数の間に Markdown 形式でドキュメントを書き、doc 関数や IDE で確かめる方法を扱う節
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 9
---

## TL;DR

- [[clojure|Clojure]] では、関数のドキュメントを関数名と引数の間に Markdown 形式で書く。書いたドキュメントは `doc` 関数や IDE で確かめられる。

## 内容

Clojure は関数（この言語の[[first-class-citizen|**第一級市民**]]）をドキュメント化する方法を提供している。

````clojure
(defn sum
  "Adds two numbers passed as arguments.
   The arguments hould be numbers.

   **Usage**
   ```clojure
   (sum 4 5) ;; returns 9
   ```
  "
  [a b]
  {:pre [(number? a) (number? b)]
   :post [(number? %)]}
  (+ a b))
````

関数のドキュメントは**関数名と引数の間**に書く。ドキュメントは **Markdown** 形式で書く。

書いたドキュメントは `doc` 関数や IDE で確かめられる。

````clojure
(doc sum)
;; #'user/sum-------------------------
;; user/sum
;; ([a b])
;;   Adds two numbers passed as arguments.
;;    The arguments hould be numbers.
;;
;;    **Usage**
;;    ```clojure
;;    (sum 4 5) ;; returns 9
;;    ```
````

## キーワード

- [[clojure|Clojure]]
- [[first-class-citizen|第一級市民]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
