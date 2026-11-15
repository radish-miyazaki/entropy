---
title: Clojure Book 第11章 Spec に失敗した理由を出力する
description: s/explain で Spec に失敗した理由を出力する
tags: [book-chapter, clojure]
date: 2023-08-18
book: "[[Clojure Book]]"
chapter: 11
---

## TL;DR

- `s/explain` は Spec に失敗した理由を出力し、成功したときは `Success!` を出力する。
- 失敗した理由が複数あれば、すべてを出力する。

## 内容

Clojure には `explain` という関数があり、Spec に失敗したときにその理由を出力する。

```clojure
(s/explain number? "42") ; nil
;; "42" - failed: number?
```

成功したときは、`Success!` という文字列を出力する。

```clojure
(s/explain number? 42)
;; Success!
```

失敗した理由が複数あるときは、すべての理由を出力する。

```clojure
(s/explain number-or-string? :56)
;; :56 - failed: number? at: [:n]
;; :56 - failed: string? at: [:s]
```

## キーワード

- [[clojure-spec|Spec]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
