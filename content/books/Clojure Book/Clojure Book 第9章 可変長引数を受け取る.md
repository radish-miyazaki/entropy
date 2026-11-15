---
title: Clojure Book › 可変長引数を受け取る
description: 引数名の前に & を付けて可変長引数を受け取る関数と、1 つ以上・2 つ以上の引数を必須にする書き方を扱う節
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 9
---

## TL;DR

- [[clojure|Clojure]] の関数は、引数名の前に `&` を付けると[[variadic-function|可変長引数]]を受け取れる。
- `&` の前に引数を並べると、その数だけ引数を必須にできる。

## 内容

Clojure の関数は可変長引数を受け取れる。たとえば `+` は、渡された数をすべて足し合わせた結果を返す。

```clojure
(+ 1 2 3 4 5) ; 15
```

定義するには、引数名の前に `&` を付ける。

```clojure
(defn unlimited-arguments [& args]
  (println "Arguments: " args)
  (println "Type of args: " (type args)))

(unlimited-arguments 1)
;; Arguments:  (1)
;; Type of args:  clojure.lang.ArraySeq

(unlimited-arguments 1 17 true "Radish" :clojure)
;; Arguments:  (1 17 true Radish :clojure)
;; Type of args:  clojure.lang.ArraySeq
```

引数を渡さなくても実行できる。

```clojure
(unlimited-arguments) ; 1
```

1 つ以上の引数を受け取るようにするには、次のように書く。

```clojure
(defn unlimited-arguments [first-arg & args]
  (println "First arg: " first-arg)
  (println "Other args: " (type args)))

(unlimited-arguments 1)
;; First arg:  1
;; Other args:  nil

(unlimited-arguments 1 17 true "Radish" :clojure)
;; First arg:  1
;; Other args:  clojure.lang.ArraySeq
```

同じように、2 つ以上の引数を受け取るようにもできる。

```clojure
(defn unlimited-arguments [first-arg second-arg & args]
  (println "First arg: " first-arg)
  (println "Second arg: " second-arg)
  (println "Other args: " (type args)))

(unlimited-arguments 1 2)
;; First arg:  1
;; Second arg:  2
;; Other args:  nil

(unlimited-arguments 1 17 true "Radish" :clojure)
;; First arg:  1
;; Second arg:  17
;; Other args:  clojure.lang.ArraySeq
```

## キーワード

- [[clojure|Clojure]]
- [[variadic-function|可変長引数]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
