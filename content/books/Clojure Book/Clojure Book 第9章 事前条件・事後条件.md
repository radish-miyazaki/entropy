---
title: Clojure Book › 事前条件・事後条件
description: 関数の引数と戻り値を :pre と :post で検査し、表明プログラミングを実現する方法を扱う節
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 9
---

## TL;DR

- [[clojure|Clojure]] には、引数と戻り値を検査するフック `:pre` と `:post` があり、[[assertion-programming|表明プログラミング]]ができる。
- 条件を満たさないと `AssertionError` を投げる。`:post` の中では `%` が戻り値を表す。

## 内容

Clojure には**引数と戻り値をチェックするフック**（`:pre`、`:post`）があり、[**表明プログラミング**](https://speakerdeck.com/dnskimo/scaladeshi-merubiao-ming-puroguramingu)ができる。

次は事前条件をセットした例である。

```clojure
(defn sum [a b]
  {:pre [(number? a) (number? b)]}
  (+ a b))

(sum 4 5) ; 9
```

関数本体の処理（`(+ 4 5)`）は、`:pre` で指定した**条件をすべて満たす場合だけ実行**される。条件を満たさないときは、例外を投げる。

```clojure
(sum "4" 5)
;; java.lang.AssertionError: Assert failed: (number? a)
```

次は事後条件をセットした例である。`%` は戻り値を表す。

```clojure
(defn sum [a b]
  {:post [(number? %)]}
  "45")
```

`:post` は、関数の実行が終わり、戻り値を返す直前に呼び出される。上のコードは戻り値が文字列型で条件を満たさないので、呼び出すと例外を投げる。

```clojure
(sum 4 5)
;; java.lang.AssertionError: Assert failed: (number? %)
```

事前条件と事後条件を組み合わせると、次のようになる。

```clojure
(defn sum [a b]
  {:pre [(number? a) (number? b)]
   :post [(number? %)]}
  (+ a b))
```

次を実行すると事前条件に引っかかり、例外を投げる。

```clojure
(sum "4" 5)
;; java.lang.AssertionError: Assert failed: (number? a)
```

## キーワード

- [[clojure|Clojure]]
- [[assertion-programming|表明プログラミング]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
