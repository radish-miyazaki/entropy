---
title: Programming Clojure, Third Edition 第9章 マルチメソッドを定義
description: defmulti でディスパッチ関数を指定し、defmethod でディスパッチ値ごとの実装を足すと、実装を選ぶ処理と実装の中身を分離でき、ディスパッチは isa? で Java の継承も考慮する
tags: [book-chapter, clojure]
date: 2023-09-19
book: "[[Programming Clojure, Third Edition]]"
chapter: 9
---

## TL;DR

- `defmulti` でディスパッチ関数を指定し、`defmethod` でディスパッチ値ごとの実装を足す。実装を選ぶ処理と、実装の中身をきれいに分離できる。
- ディスパッチは内部で `isa?` を使うので、Java の継承も考慮する。`:default` で、一致するメソッドがないときのデフォルトメソッドを指定できる。

## 内容

[[clojure|Clojure]] の[[multimethod|マルチメソッド]]では、引数**すべて**に基づいて、どの実装を選ぶかを決める任意の関数をプログラマが指定できる。

### defmulti マクロ

マルチメソッドを定義するには、`defmulti` を使う。

```clojure
(defmulti name dispatch-fn)
```

例として、次のように実装した `my-print` にマルチメソッドを適用する。

```clojure
(defn my-print [ob]
	(cond
	  (nil? ob) (.write *out* "nil")
	  (string? ob) (.write *out* ob)
	  (vector? ob) (my-print-vector ob)))
```

`my-print` は引数を 1 つ取り、その型に応じて出力内容を変える関数である。

`dispatch-fn` には**ディスパッチ関数**を与える。ディスパッチ関数は引数の値を取り、その引数の識別子（ディスパッチ値）を返す。今回のケースだと `class` 関数を使える。

```clojure
(defmulti my-print class)
```

### defmethod マクロ

特定のメソッドの実装を追加するには、`defmethod` を使う。

```clojure
(defmethod name dispatch-val & fn-tail)
```

- `name`: この実装が属するマルチメソッド名
- `dispatch-val`: ディスパッチ値。Clojure は `defmulti` のディスパッチ関数を呼んだ結果をこの値と比べて、呼ぶべきメソッドを選ぶ
- `fn-tail`: 通常の関数と同じ、引数と本体コード

文字列に対する `my-print` の実装は、次のように書ける。

```clojure
(defmethod my-print String [s]
	(.write *out* s))
```

同様に、`nil` に対する実装を書ける。

```clojure
(defmethod my-print nil [s]
	(.write *out* "nil"))
```

これで、実際に呼び出せる。

```clojure
(my-print "str") ;; str
(my-print nil)   ;; nil
```

マルチメソッドを使うと、**特定の実装を選ぶ処理と、その特定の実装の中身をきれいに分離できる。**

### ディスパッチと継承

マルチメソッドのディスパッチは Java の[[inheritance|継承]]も考慮に入れる。たとえば、`my-print` の `Number` に対する実装を書く。

```clojure
(defmethod my-print Number [n]
	(.write *out* (.toString n)))
```

そして、`my-print` に 42 を渡してみる。

```clojure
(my-print 42) ; 42
```

42 は `Integer` であって `Number` ではないが、ディスパッチは `Integer` が `Number` でもあることを考慮して、`Number` のメソッドを呼び出す。ディスパッチャが内部的に `isa?` 関数を使ってマッチしているかを確かめているからである。

```clojure
(isa? child parent)
```

```clojure
(isa? Integer Number) ; true
```

この `isa?` は継承を調べるだけでなく、実行時に動的に機能を拡張することもできる（[[Programming Clojure, Third Edition 第9章 アドホックに分類を導入する]]）。

### デフォルトメソッド

ディスパッチ値に `:default` を指定すると、一致するメソッドが他にない場合に呼び出されるメソッド（デフォルトメソッド）を指定できる。

```clojure
(defmethod my-print :default [s]
  (.write *out* "#<")
  (.write *out* (.toString s))
  (.write *out* ">"))
```

```clojure
(my-print (java.sql.Date. 0))
;; #<1970-01-01>
```

`:default` を別の意味に使いたい場合は、マルチメソッドの定義時に別のデフォルトのディスパッチ値を指定できる。

```clojure
(defmulti name dispatch-fn :default default-value)
```

```clojure
(defmulti my-print class :default :everything-else)
(defmethod my-print String [s]
	(.write *out* s))
(defmethod my-print :everything-else [_]
	(.write *out* "Not implemented yet ..."))
```

このように最初の引数の型でディスパッチするマルチメソッドは、最もよく使われる形である。多くの OOP では、これが**唯一の**[[dynamic-dispatch|動的ディスパッチ]]であり、[[polymorphism|ポリモーフィズム]]と呼ばれている。Clojure のディスパッチメカニズムは、これよりもはるかに柔軟である。

## キーワード

- [[multimethod|マルチメソッド]]
- [[dynamic-dispatch|動的ディスパッチ]]
- [[polymorphism|ポリモーフィズム]]
- [[inheritance|継承]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
