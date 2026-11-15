---
title: Programming Clojure, Third Edition › 抽象化へ向けたプログラミング
description: spit と slurp の代わりに gulp と expectorate を実装し、入出力の型で処理を切り分ける方法は新しい入出力を足すたびに書き換えが要る閉じたコードになることを確かめる
tags: [book-chapter, clojure]
date: 2023-09-11
book: "[[Programming Clojure, Third Edition]]"
chapter: 7
---

## TL;DR

- `spit` と `slurp` は「読み込み」と「書き出し」の抽象化の上に実装されているので、ファイルや URL、ソケットなどを入出力に指定できる。
- 練習として代替関数 `gulp` と `expectorate` を実装し、`condp` で入出力の型ごとに処理を切り分けると、新しい入出力を足すたびに書き換えが要る「閉じた」コードになる。

## 内容

### spit と slurp

[[clojure|Clojure]] の `spit` と `slurp` は、「読み込み」と「書き出し」の 2 つの[[abstraction|抽象化]]の上に実装された入出力関数である。抽象化されているので、さまざまな入力元や出力先（ファイルや URL、ソケットなど）を指定できる。

- `slurp`: 入力元を受け取り、中身をすべて読み込んで文字列として返す
- `spit`: 出力先と値を受け取り、値を文字列に変換して出力先へ送る

### gulp と expectorate

練習として、`slurp` と `spit` の基本的な代替関数（`gulp`、`expectorate`）を実装する。

#### ファイルだけを対象とする基本的な実装

まずは、ファイル（`java.io.File`）だけを対象とする。

```clojure
(ns programming-clojure.gulp
  (:import
   (java.io BufferedReader FileInputStream InputStreamReader)))

(defn gulp [src]
  (let [sb (StringBuilder.)]
    (with-open [reader (-> src
													 FileInputStream.
													 InputStreamReader.
													 BufferedReader.)]
      (loop [c (.read reader)]
        (if (neg? c)
          (str sb)
          (do
            (.append sb (char c))
            (recur (.read reader))))))))
```

`gulp` 関数は受け取った `File` オブジェクトから `BufferedReader` を作り、`loop` 〜 `recur` で 1 文字ずつ読み込んで `StringBuilder` に格納していく。そして入力が最後まで達したら、文字列を返す。

`expectorate` 関数はより簡単に書ける。

```clojure
(ns programming-clojure.expectorate
  (:import
   (java.io BufferedWriter FileOutputStream OutputStreamWriter)))

(defn expectorate [dst content]
  (with-open [writer (-> dst
												 FileOutputStream.
												 OutputStreamWriter.
												 BufferedWriter.)]
    (.write writer (str content))))
```

`BufferedWriter` を作り、`content` 引数の値を文字列に直して書き出す。

#### リーダとライタの作成を関数に切り出す

ファイル以外にも対応できるように、まずはリーダとライタの作成部分を関数に切り出しておく。

- `make-reader`: 与えられた入力元から `BufferedReader` を作る
- `make-writer`: 与えられた出力先から `BufferedWriter` を作る

```clojure
(defn make-reader [src]
	(-> src FileInputStream. InputStreamReader. BufferedReader.))

(defn make-writer [dst]
	(-> dst FileOutputStream. OutputStreamWriter. BufferedWriter.))
```

`gulp` と `expectorate` 関数で、これらの関数を使うように変える。

```clojure
(defn gulp [src]
  (let [sb (StringBuilder.)]
    (with-open [reader (make-reader src)]
      (loop [c (.read reader)]
        (if (neg? c)
          (str sb)
          (do
            (.append sb (char c))
            (recur (.read reader))))))))

(defn expectorate [dst content]
  (with-open [writer (make-writer dst)]
    (.write writer (str content))))
```

#### ファイル以外の入出力を扱うようにする

`gulp` と `expectorate` でファイル以外の入出力を扱うには、`make-reader` と `make-writer` を変えればよい。その中でも最も簡単なのは、`cond` や `condp` を使い、入出力の型に応じて処理を切り分ける方法である。

```clojure
(defn make-reader [src]
  (-> (condp = (type src)
        java.io.InputStream src
        java.lang.String (FileInputStream. src)
        java.io.File (FileInputStream. src)
        java.net.Socket (.getInputStream src)
        java.net.URL (if (= "file" (.getProtocol src))
                       (-> src .getPath FileInputStream)
                       (.openStream src)))
      InputStreamReader.
      BufferedReader.))

(defn make-writer [dst]
  (-> (condp = (type dst)
      java.io.OutputStream dst
      java.lang.String (FileOutputStream. dst)
      java.io.File (FileOutputStream. dst)
      java.net.Socket (.getOutputStream dst)
      java.net.URL (if (= "file" (.getProtocol dst))
                     (-> dst .getPath FileOutputStream.)
                     (throw (IllegalArgumentException.
                             "Can't write to non-file URL"))))
      OutputStreamWriter.
      BufferedWriter.))
```

このアプローチの問題は、コードが「閉じている」ことである。つまり、新しい入出力を足したい場合、`make-reader` と `make-writer` を必ず書き換える必要がある。

求めるのは、後から簡単に入出力を追加できる「開いた」アプローチである。そのためには、読み込みと書き出しのそれぞれについて抽象化が必要である（[[Programming Clojure, Third Edition 第7章 インタフェース]]）。

## キーワード

- [[abstraction|抽象化]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
