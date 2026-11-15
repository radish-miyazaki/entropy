---
title: Programming Clojure, Third Edition › Clojure で Java のオブジェクトを作る
description: Clojure のオブジェクトは Java の型や主要なインタフェースを実装しているのでそのまま Java の API に渡せ、reify や defrecord でインタフェースを実装し、proxy でクラスを継承する
tags: [book-chapter, clojure]
date: 2023-09-20
book: "[[Programming Clojure, Third Edition]]"
chapter: 10
---

## TL;DR

- [[clojure|Clojure]] は Java の具象型を再利用し、関数は `Runnable` や `Callable` を、データ構造は Java Collection API のインタフェースを実装しているので、そのまま Java の API に渡せる。
- そのメソッドのためだけにインスタンスを作るなら `reify` を、データフィールドや具体的な型が要るなら `defrecord` や `deftype` を使って Java のインタフェースを実装する。
- ベースクラスを継承するには `proxy` を使う。

## 内容

Java のライブラリを呼び出すときは、インタフェースを実装したり、特定のクラスを拡張したりした Java オブジェクトを渡す必要がある。Clojure では Java の型やインタフェースを直接使ったり、`reify` で無名インタフェースを実装したり、`proxy` でクラスを拡張したりして、この問題に対処する。

### Java の型を直接使う

Clojure は Java の具象型（`String`、`Character`、`Boolean`、数値クラス、`Date` など）を再利用している。これらの Clojure オブジェクトは実際には Java オブジェクトなので、ラッピングや変更なしに直接 Java の API に渡せる。

#### 並行処理を行う API を呼び出す

加えて、多くの Clojure オブジェクトは主要な Java のインタフェースを実装しており、追加の対応なしに既存の API と直接連携できる。

たとえば、**Clojure の関数は `Runnable` や `Callable` といったインタフェースを実装している**ので、並行処理などの API を直接使える。`Thread` は `Runnable` を受け取るので、どのような Clojure の関数にも使える。

```clojure
(defn say-hi []
	(println "Hello from thread " (.getName (Thread/currentThread))))

(dotimes [_, 3]
	(.start (Thread. say-hi)))
;; Hello from thread. Thread-1
;; Hello from thread  Thread-2
;; Hello from thread  Thread-3
```

#### コレクションを操作する API を呼び出す

さらに、Clojure のデータ構造は Java Collection API の主要なインタフェース（`Collection`、`List`、`Map`、`Set` など）を実装している。これにより、コレクションを受け取る任意の Java インタフェースに、Clojure で作ったコレクションを直接渡せる。

たとえば、`java.util.Collections` クラスは Java コレクションのための便利メソッドを提供している。その 1 つが `binarySearch` である。このメソッドはソートされたリストを受け取り、リストに含まれるかどうかを [[binary-search|二分探索]]でチェックする。`RandomAccess` インタフェースを実装している場合、$O(log \, n)$ の要素比較で実行できる。Clojure のリストやベクタは、このインタフェースを実装している。

```clojure
(java.util.Collections/binarySearch [1 13 42 1000] 42) ; 2
```

戻り値は、その要素が存在するインデックス番号である。

### Java のインタフェースを実装する

Java のインタフェースを実装したインスタンスを受け取るメソッドを呼び出す場合、次のどちらに当てはまるかを考えることが重要である。

- そのメソッドのためだけにインスタンスを作るか
- そのインスタンスを他の場所で再利用する必要があるか

#### reify マクロ

最初のケースでは、使う場所で `reify` を使って無名インスタンスを作るのが最も簡単である。

たとえば、`java.io.File` の `list` メソッドは、渡したフィルタを満たすディレクトリ内のファイルのリストを取得する。ディレクトリと接尾辞を受け取り、そのディレクトリ内の接尾辞を持つすべてのファイルのシーケンスを返す関数を考える。

```clojure
(import [java.io File FilenameFilter])

(defn suffix-filter [suffix]
  (reify FilenameFilter
    (accept [_ _ name]
      (.endsWith name suffix))))
(defn list-files [dir suffix]
  (seq (.list (File. dir) (suffix-filter suffix))))
```

```clojure
(list-files "." ".clj") ; ("project.clj")
```

`reify` はインタフェースを受け取り、その後にインタフェースの各メソッドの実装が続く。**各メソッドの最初の引数は常に匿名インスタンス自身であり、一般的に `this` と呼ばれる。** `reify` は 1 回の呼び出しで、任意の数のインタフェースを実装できる。指定されていないインタフェースメソッドは自動的に追加され、`UnsupportedOperationException` を投げる。

#### defrecord と deftype を使う

データフィールドを持ち、Java インタフェースを実装する型のオブジェクトを作りたい場合は、`defrecord` と `deftype` を使う。

例として、カウントの上限を表す `n` フィールドを持つ `Counter` インスタンスを作る場合を考える。`reify` を使うこともできるが、インスタンス内のデータフィールドを取得、更新することはできず、インスタンスの具体的な型もない。この問題を解決するには、`defrecord` を使って `Runnable` を直接実装する。

```clojure
(defrecord Counter [n]
  Runnable
  (run [_] (println (range n))))

(def c (->Counter 5))

(.start (Thread. c)) ; (0 1 2 3 4)
```

`c` は匿名オブジェクトではないので、具体的な型（`user.Counter`）を持ち、フィールドを取得、更新できる。

```clojure
(:n c) ; 5

(def c2 (assoc c :n 8))
(.start (Thread. c2)) ; (0 1 2 3 4 5 6 7)
```

### プロキシでクラスを継承する

インタフェースだけでなく、多くの Java API は独自インスタンスの実装を容易にするためにベースクラスを提供している。特に、Swing や XML パーサを使う場合は一般的である。ただし、XML 処理だけを行う場合は、`clojure.data.xml` ライブラリを使うほうがよい。次の例はあくまでプロキシの作り方を示すためのものである。

#### Simple API for XML パーサ

例として、Simple API for XML（SAX）パーサを使って [[xml|XML]] を解析する。あらかじめ、必要になるクラスをインポートしておく。

```clojure
(import '[org.xml.sax InputSource]
        '[org.xml.sax.helpers DefaultHandler]
        '[java.io StringReader]
        '[javax.xml.parsers SAXParserFactory])
```

SAX パーサを使うには、コールバックを実装する必要がある。最も簡単な方法は `DefaultHandler` クラスを拡張することである。Clojure では `proxy` を使ってクラスを継承できる。

#### proxy マクロ

```clojure
(proxy class-and-interfaces super-cons-args & fns)
```

簡単な例として、`proxy` を使って、`startElement` が呼ばれたらその詳細を出力するように `DefaultHandler` を継承する。

```clojure
(def print-element-handler
  (proxy [DefaultHandler] []
    (startElement [uri local qname attrs]
      (println (format "Saw element: %s" qname)))))
```

`proxy` はプロキシクラスのインスタンスを作る。`proxy` の最初の引数はスーパークラスやインタフェースのベクタを取る。第 2 引数はベースクラスのコンストラクタへの引数のベクタである。`fns` には、0 個以上のプロキシメソッドの実装を与える。上の例では、`startElement` というメソッドがこれに当たる。

#### パースする

パーサは次のように作る。

```clojure
(defn demo-sax-parser [source handler]
  (.. SAXParserFactory newInstance newSAXParser
      (parse (InputSource. (StringReader. source)) handler)))
```

実際にパースする。

```clojure
(demo-sax-parser "<foo>
<bar>Body of bar</bar>
</foo>" print-element-handler)
;; Saw element: foo
;; Saw element: bar
```

## キーワード

- [[java-interop|Java 相互運用]]
- [[interface|インタフェース]]
- [[inheritance|継承]]
- [[binary-search|二分探索]]
- [[xml|XML]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
