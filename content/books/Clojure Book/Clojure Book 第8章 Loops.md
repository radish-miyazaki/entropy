---
title: Clojure Book 第8章 Loops
description: リスト内包表記としての for、副作用のある繰り返しに使う doseq、recur で次のループに入る loop を扱う章
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 8
---

## TL;DR

- [[clojure|Clojure]] の `for` はループではなく[[list-comprehension|リスト内包表記]]で、結果を返す。`doseq` は[[side-effect|副作用]]のある繰り返しに使い、何も返さない。
- 単にループさせるときは `loop` を使い、`recur` で次のループに入る。

## 内容

### `for`

Clojure の `for` は、他の言語の _for_ ループではなく、**リスト内包表記**である。

```clojure
(let [nums [1 2 3 4]]
  (for [num nums]
    (* num 10)))
;; [10 20 30 40]
```

複数のシーケンスを渡すと、次のように**すべての組み合わせが実行**される。

```clojure
(def colors ["red", "blue", "green", "yellow"])
(def shapes ["square", "circle", "triangle", "rectangle"])
(for [color colors
      shape shapes]
  (str color " " shape))
```

```clojure
;; 実行結果
;; ("red square" "red circle" "red triangle" "red rectangle"
;;  "blue square" "blue circle" "blue triangle" "blue rectangle"
;;  "green square" "green circle" "green triangle" "green rectangle"
;;  "yellow square" "yellow circle" "yellow triangle" "yellow rectangle")
```

### `doseq`

`doseq` は、標準出力やファイルへの書き込み、メール送信、DB への書き込みなど、**副作用のある繰り返し操作**に使う。

`for` と似ているが、`for` が実行結果を返すのに対し、`doseq` は何も返さない。

```clojure
(let [nums [1 2 3 4]]
  (doseq [num nums]
    (* num 10)))
;; nil
```

次のように書くと、処理が実行されているのを確かめられる。

```clojure
(let [nums [1 2 3 4]]
  (doseq [num nums]
    (println (* num 10))))
;; 10
;; 20
;; 30
;; 40
;; nil
```

### `loop`

単にループさせるときは、`loop` を使う。

```clojure
(loop [x 1]
  (when (<= x 5)
    (println x)
    (recur (inc x))))
```

```clojure
;; 出力結果
;; 1
;; 2
;; 3
;; 4
;; 5
```

`[x 1]` は、変数 `x` を `1` で初期化することを表す。`(recur …)` は次のループを**再帰的**に呼び出すための構文で、`(inc x)` で変数 `x` に 1 を足してから、次のループに入る。

## キーワード

- [[clojure|Clojure]]
- [[list-comprehension|リスト内包表記]]
- [[side-effect|副作用]]
- [[recursion|再帰]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
