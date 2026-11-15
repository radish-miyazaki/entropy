---
title: Clojure Book › マルチメソッド
description: defmulti と defmethod でマルチメソッドを定義し、ディスパッチ関数が返すディスパッチ値によって実装を切り替える方法を扱う節
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 9
---

## TL;DR

- [[clojure|Clojure]] の[[multimethod|マルチメソッド]]は、引数の値に基づいて呼び出す関数を決める仕組みである。`defmulti` にディスパッチ関数を渡し、`defmethod` でディスパッチ値ごとの処理を書く。
- 引数をそのままディスパッチ値にするときは `identity` を、型などで切り替えるときは自分で定義したディスパッチ関数を渡す。

## 内容

引数の値に基づいて、どの関数・メソッドを呼び出すかを決めることを**マルチメソッド**と呼ぶ。

### ディスパッチ関数を定義しないケース（引数をそのままディスパッチ値とする）

```clojure
(defmulti factorial identity)
(defmethod factorial 0 [_] 1)
(defmethod factorial :default [num]
  (* num (factorial (dec num))))

(factorial 0) ; 1
(factorial 1) ; 1
(factorial 3) ; 6
(factorial 7) ; 5040
```

定義を 1 行ずつ見ていく。まず次のコードで、Clojure に `factorial` というマルチメソッドを定義することを伝える。

```clojure
(defmulti factorial identity)
```

`defmulti` の第 2 引数には**ディスパッチ関数**をセットする必要がある。ディスパッチ関数は、マルチメソッドの異なる実装を切り替えるための基準（**ディスパッチ値**）を返す関数である。今回は**与えられた引数そのものをディスパッチ値とする**ので、`identity`（**何もしない**）関数をセットしている。

次に、`defmethod` を使ってディスパッチ値ごとの処理を実装する。次は、ディスパッチ値（引数）が `0` の場合の処理である。引数の値は使わないので、`_` を使っている。

```clojure
(defmethod factorial 0 [_] 1)
```

ディスパッチ値がどのメソッドにも合わない場合（デフォルト）の挙動は、次のように書く。

```clojure
(defmethod factorical :default [num]
	;; ...
	)
```

### ディスパッチ関数を定義するケース

別の例として、渡された引数の型に応じて処理を切り替える関数を考える。

```clojure
(defn print-welcome-message [person]
  (cond
    (string? person) (println "Welcome" person)
    (vector? person) (println "Welcome" (first person) "from" (last person))
    (map? person) (println "Welcome" (person :name) "from" (person :from))))

(print-welcome-message "Radish from Miyazaki")
(print-welcome-message ["Radish" "Miyazaki"])
(print-welcome-message {:name "Radish" :from "Miyazaki"})
```

これをマルチメソッドに[[refactoring|リファクタリング]]すると、次のように書ける。

```clojure
(defn welcome-person [person]
  (cond
    (string? person) :welcome-person-string
    (vector? person) :welcome-person-vector
    (map? person) :welcome-person-map))

(defmulti print-welcome-message welcome-person)

(defmethod print-welcome-message :welcome-person-string [person]
  (println "Welcome" person))
(defmethod print-welcome-message :welcome-person-vector [person]
  (println "Welcome" (first person) "from" (last person)))
(defmethod print-welcome-message :welcome-person-map [person]
  (println "Welcome" (person :name) "from" (person :from)))
```

`welcome-person` が**ディスパッチ関数**にあたり、どのメソッドを実行するかを決める**ディスパッチ値**（`:welcome-person-string`、`:welcome-person-vector`、`:welcome-person-map`）を返す。各メソッドはこのディスパッチ値ごとに定義する。

マルチメソッドでは**異なる実行を異なる関数として区別**するので、コードがシンプルで管理しやすくなる。

## キーワード

- [[clojure|Clojure]]
- [[multimethod|マルチメソッド]]
- [[refactoring|リファクタリング]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
