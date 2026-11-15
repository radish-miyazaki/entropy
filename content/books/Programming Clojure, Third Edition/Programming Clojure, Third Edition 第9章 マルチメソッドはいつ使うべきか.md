---
title: Programming Clojure, Third Edition 第9章 マルチメソッドはいつ使うべきか
description: マルチメソッドはめったに使われず、clojure.inspector と clojure.test のクラス以外でディスパッチする例と、class 関数という反例から、関数かマルチメソッドかを選ぶルールを導く
tags: [book-chapter, clojure]
date: 2023-09-19
book: "[[Programming Clojure, Third Edition]]"
chapter: 9
---

## TL;DR

- 実際の [[clojure|Clojure]] のプロジェクトでは、マルチメソッドはめったに使われず、使われる場合も多くはクラスでディスパッチしている。
- `clojure.inspector` は既存の型に木構造の型システムを後付けし、`clojure.test` の `is` はテストに使われた関数のシンボルでディスパッチする。一方、`class` 関数は型による分岐を明示的に書いたほうが読みやすい。
- 関数が型で分岐していたらマルチメソッドを検討し、迷ったら両方書いて読みやすいほうを選ぶ。

## 内容

実際の Clojure のプロジェクトでは、[[multimethod|マルチメソッド]]はめったに使われない。そのうち、多くのマルチメソッドは[[Programming Clojure, Third Edition 第9章 マルチメソッドを定義|クラスでディスパッチ]]している。ここでは、クラス**以外**でディスパッチするマルチメソッドを、Clojure のソースから具体例で見ていく。

### clojure.inspector

inspector ライブラリは Swing を使ってデータを表示する簡単なウィンドウを作る。たとえば、次はシステムプロパティを木構造で表示するコードである。

```clojure
(require '[clojure.inspector :refer [inspect inspect-tree]])
(inspect-tree (System/getProperties))
```

#### inspect-tree 関数

この `inspect-tree` は、木構造をしているものなら何であれ JFrame を使って表示し、戻り値としてその JFrame 自身を返す。たとえば、ネストしたマップも `inspect-tree` に渡せる。

```clojure
(inspect-tree {:clojure {:creator "Rich", :runson-jvm true}})
```

#### 木構造の扱いについて

ここでの木構造とは次の 2 つの質問に対する答えを持っているデータ構造である。

- 子供のノードはどれとどれか
- 自分は葉か

木構造のデータの「木」や「ノード」、「葉」といった概念は、OOP だとクラスやインタフェースにするのがよさそうに思える。しかし、inspector ライブラリでは既にある型に**後付けで木構造を表す型システムを追加**している。

#### collection-tag 関数

ディスパッチに使われているのは、`collection-tag` という関数である。

```clojure
(defn collection-tag [x]
  (cond
   (map-entry? x) :entry
   (instance? java.util.Map x) :seqable
   (instance? java.util.Set x) :seqable
   (sequential? x) :seq
   (instance? clojure.lang.Seqable x) :seqable
   :else :atom))
```

この関数は `:entry`、`:seqable`、`:seq`、`:atom` のいずれかを返す。これが、木構造データの世界における型の役割を果たす。`collection-tag` は、3 つのマルチメソッドでディスパッチ関数として使われている。

```clojure
(defmulti is-leaf collection-tag)
(defmulti get-child (fn [parent index] (collection-tag parent)))
(defmulti get-child-count collection-tag)
```

これらのメソッドはいずれも、木構造を表すのに必要な情報である。

この木構造のように、既存のコードの中に新しい型の関係性を見つけたら、元のコードに手を加えることなく、単にその関係を利用すればよい。

### clojure.test

test ライブラリを使うと、何通りかの異なるアサーションを `is` マクロひとつで書ける。

#### is マクロ

```clojure
(require '[clojure.test :refer [is]])

(is (string? 10)) ; false
;;
;; FAIL in () (NO_SOURCE_FILE:142)
;; expected: (string? 10)
;;   actual: (not (string? 10))
```

`is` マクロは渡された関数を認識し、より親切なエラーメッセージを表示する。

```clojure
(is (instance? java.util.Collection "foo")) ; false
;;
;; FAIL in () (NO_SOURCE_FILE:153)
;; expected: (instance? java.util.Collection "foo")
;;   actual: java.lang.String
```

#### assert-expr

`is` マクロは内部的に `assert-expr` というマルチメソッドを使っている。

```clojure
(defmulti assert-expr
  (fn [msg form]
    (cond
      (nil? form) :always-fail
      (seq? form) (first form)
      :else :default)))
```

ディスパッチ関数の引数 `form` は、テストに使われている関数を指すシンボル（`'instance?` など）を指す。

### 反例

[[Programming Clojure, Third Edition 第9章 マルチメソッドを定義|マルチメソッドを定義]]で見たように、マルチメソッドを使うと、型に基づいた分岐を関数本来の制御フローから追い出せる。しかし、Clojure の `class` 関数は、型による分岐を明示的に使っている。

`class` 関数は `nil` も処理できるように、Java の `getClass` をラップしたものである。

```clojure
(defn class [x]
	(if (nil? x) x (. x (getClass))))
```

`identity` を使ってディスパッチするようにすれば、マルチメソッド版の `class` を書くこともできる。

```clojure
(defmulti my-class identity)
(defmethod my-class nil [_] nil)
(defmethod my-class :default [x] (.getClass x))
```

しかし、元の関数定義のほうが可読性が高い。

### マルチメソッドを選ぶときのルール

ここまでを踏まえると、関数かマルチメソッドかを選ぶときは、次のルールに従うとよい。

- 関数が 1 つまたは複数の型によって分岐していたら、マルチメソッドを検討する
  - 型は必ずしも Java のクラスやデータタグで**なくてよい**
- `defmethod` のディスパッチ値は `defmulti` を参照することなく解釈できなければならない
- オプショナル引数や再帰を処理するためだけに、マルチメソッドを使うのは避ける

これでも迷ったら、**両方書いてみて読みやすいほうを選べばよい。**

## キーワード

- [[multimethod|マルチメソッド]]
- [[dynamic-dispatch|動的ディスパッチ]]
- [[clojure-test|clojure.test]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
