---
title: Clojure Book 第25章 Macros
description: defmacro で (2 + 3) を (+ 2 3) に変換するマクロを書き、macroexpand で展開後のコードを確かめる
tags: [book-chapter, clojure]
date: 2023-08-21
book: "[[Clojure Book]]"
chapter: 25
---

## TL;DR

- `defmacro` で、`(2 + 3)` というリストを `(+ 2 3)` に変換して評価する[[macro|マクロ]]を書く。
- `macroexpand` を使うと、マクロが生成し、実際に評価されたコードを確かめられる。

## 内容

[[clojure|Clojure]] で `2` と `3` を足すときは、以下のように書ける。

```clojure
(+ 2 3)
```

これを `(2 + 3)` のように書きたい場合、マクロを使える。具体的には、`(2 + 3)` というリストを `(+ 2 3)` に変換し、評価すればよい。

`'(2 + 3)` を変数 `a-list` に束縛すると、最初の要素と 2 番目の要素を入れ替える必要があるので、以下のようになる。

```clojure
(list
	(second a-list)
	(first a-list)
	(last a-list))
```

これをマクロにするには、**`defmacro`** を使って以下のように書く。

```clojure
(defmacro calculate [a-list]
  (list
   (second a-list)
   (first a-list)
   (last a-list)))
```

これを使うと、`(2 + 3)` を評価できる。

```clojure
(println
	(calculate (2 + 3))
;; 5
```

**`macroexpand`** 関数を使うと、マクロを展開できる。

```clojure
(println
 (macroexpand '(calculate (2 + 3))))
;; (+ 2 3)
```

この出力されたコードがマクロによって生成されたコードで、実際に評価されたコードである。

## キーワード

- [[clojure|Clojure]]
- [[macro|マクロ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
