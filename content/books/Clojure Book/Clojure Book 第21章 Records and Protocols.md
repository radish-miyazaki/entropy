---
title: Clojure Book 第21章 Records and Protocols
description: defrecord でレコードを定義してオブジェクトを作り、defprotocol で定義したプロトコルを継承させてメソッドを持たせる。extend-protocol で既存のレコードにもプロトコルを継承させられる
tags: [book-chapter, clojure]
date: 2023-08-22
book: "[[Clojure Book]]"
chapter: 21
---

## TL;DR

- [[clojure|Clojure]] のオブジェクトは装飾された単なるマップで、`defrecord` で定義した[[record-clojure|レコード]]から `->Car` や `map->Car` で作る。
- メソッドを持たせるには、`defprotocol` で[[protocol-clojure|プロトコル]]を定義し、レコードに継承させる。`extend-protocol` を使うと、既存のレコードにも継承させられる。

## 内容

Clojure は[[functional-programming|関数型プログラミング]]の言語だが、[[object-oriented-programming|OOP]] のようにオブジェクトを作ったり操作したりできる。ただし、Clojure のオブジェクトは**装飾された単なるマップ**で、それ以上でもそれ以下でもない。必ずしも使う必要はないが、使うことはできる。

### レコードの定義とオブジェクトの生成

Clojure におけるクラスは、**レコード**（_record_）と呼ばれる。レコードは以下のように `defrecord` で定義する。

```clojure
(defrecord Car [name top-speed])
```

オブジェクトを作るには、`->レコード名` 関数を呼び出す。このとき渡す値はレコードを定義したときと同じ順番にする必要がある。

```clojure
(def tata-nano (->Car "Tata Nano" 120))
```

作ったオブジェクトは装飾された単なるマップなので、マップと同じようにフィールドにアクセスできる。

```clojure
(:name tata-nano)      ; "Tata Nono"
(:top-speed tata-nano) ; 120

(get tata-nano :top-speed) ; 120
```

`map->レコード名` 関数を使うと、マップを元にオブジェクトを作れる。

```clojure
(def ambassador (map->Car {:name "Ambassador"
                           :top-speed 240}))
```

こちらも、マップのようにフィールドにアクセスできる。

```clojure
(:name ambassador)          ; "Ambassador"

(get ambassador :top-speed) ; 240
```

### オブジェクトを関数の引数に渡す

以下のように、**`Car` のオブジェクトを受け取ることを想定**した関数を定義する。

```clojure
(defn describe [vehicle]
  (let [{name :name top-speed :top-speed} vehicle]
    (str name " has a top speed of " top-speed " Km/hr.")))
```

このコードでは `let` の中で引数 `vehicle` の `:name` を変数 `name` に、`:top-speed` を変数 `top-speed` に束縛している。

先ほど定義した `Car` のインスタンスを作ってこの関数に渡すと、想定どおりに動く。

```clojure
(describe tata-nano)
;; "Tata Nano has a top speed of 120 Km/hr."
```

次に、同じフィールド（`:name` と `:top-speed`）を持つ別のレコードを定義する。

```clojure
(defrecord Ship [name top-speed])
```

同じように、`Ship` のオブジェクトを受け取ることを想定した関数を定義し、動作を確かめる。

```clojure
(def arctic-explorer (->Ship "Arctic Explorer" 10))

(defn describe-ship [vehicle]
  (let [{name :name top-speed :top-speed} vehicle]
    (str name " has a top speed of " top-speed " knots.")))

(describe-ship arctic-explorer)
;; "Arctic Explorer has a top speed of 10 knots."
```

### プロトコル

Clojure で OOP のメソッドのようなものを使うには、はじめに**プロトコル（[[interface|インタフェース]]）**を定義する必要がある。そして、レコードを定義するときに**プロトコルを継承**して、はじめてメソッドを定義できる。

ここでは例として、「オブジェクトを関数の引数に渡す」で作った関数をプロトコルに置き換える。プロトコルは **`defprotocol`** で以下のように定義する。

```clojure
(defprotocol Describe
  (describe [this]))
```

そして、`Car` を定義するときにプロトコルを継承することを宣言し、メソッドを定義する。メソッドを定義するときは `defn` は要らない。

```clojure
(defrecord Car [name top-speed]
  Describe
  (describe [this]
    (let [{name :name top-speed :top-speed} this]
      (str name " has a top speed of " top-speed " Km/hr."))))
```

この `this` は Clojure の特別な変数**ではなく**、**単なる変数**である。

同じように、`Ship` も定義する。

```clojure
(defrecord Ship [name top-speed]
  Describe
  (describe [this]
    (let [{name :name top-speed :top-speed} this]
      (str name " has a top speed of " top-speed " knots."))))
```

メソッドは通常の関数と同じように呼び出す。

```clojure
(def tata-nano (->Car "Tata Nano" 120))
(def arctic-explorer (->Ship "Arctic Explorer" 10))

(describe tata-nano)
;; "Tata Nano has a top speed of 120 Km/hr."

(describe arctic-explorer)
;; "Arctic Explorer has a top speed of 10 knots."
```

### 既存のレコードにプロトコルを継承させる

`extend-protocol` を使うと、すでにあるレコードにプロトコルを継承させられる。

以下のような `Rocket` というレコードがすでに定義されているとする。

```clojure
(defrecord Rocket [name orbit])
```

この `Rocket` の定義を変えずに `Describe` プロトコルを継承させるには、以下のように書く。

```clojure
(extend-protocol Describe
  Rocket
  (describe [this] (str (:name this) " reaches " (:orbit this) " orbit.")))
```

実際にオブジェクトを作ってメソッドを呼び出すと、想定した結果が出力される。

```clojure
(def pslv (->Rocket "PSLV" "Low Earth"))
(describe pslv)
;; "PSLV reaches Low Earth orbit."
```

## キーワード

- [[clojure|Clojure]]
- [[record-clojure|レコード]]
- [[protocol-clojure|プロトコル]]
- [[object-oriented-programming|オブジェクト指向プログラミング]]
- [[interface|インタフェース]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
