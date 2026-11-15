---
title: Programming Clojure, Third Edition 第7章 プロトコル
description: defprotocol でプロトコルを定義し、extend、extend-type、extend-protocol で既存の Java の型に元のコードを触らずにプロトコルを追加する
tags: [book-chapter, clojure]
date: 2023-09-11
book: "[[Programming Clojure, Third Edition]]"
chapter: 7
---

## TL;DR

- プロトコルは Expression Problem に対する [[clojure|Clojure]] の解法の 1 つで、インタフェースと同じく仕様だけを指定するが、既にある型に元のコードを触らずに追加できる。
- `defprotocol` で定義し、`extend`、`extend-type`、`extend-protocol` で既存の型に実装を足す。

## 内容

[[expression-problem|Expression Problem]] に対する Clojure の解法の 1 つが、[[protocol-clojure|プロトコル]]である。

プロトコルはインタフェースと同様に、仕様だけを指定し、データ型が複数のプロトコルを実装できる。加えて、**既にある型に対して、元のコードを触ることなくプロトコルを追加できる。**

### プロトコルの定義（defprotocol）

プロトコルは `defprotocol` で定義する。

```clojure
(defprotocol name & opts+sigs)
```

`IOFactory` は次のように定義できる。

```clojure
(defprotocol IOFactory
	"A protocol for things that can be read from and written to."
	(make-reader [this] "Creates BufferedReader.")
	(make-writer [this] "Creates BufferedWriter."))
```

これを使って、`java.io.InputStream` と `OutputStream` が `IOFactory` プロトコルをサポートするように拡張していく。

### extend 関数

`extend` を使うと、既存の型にプロトコルを追加し、必要な関数定義（**メソッド**）を書ける。

```clojure
(extend type & proto+mmaps)
```

引数には拡張する型の名前、プロトコル名、メソッド実装のマップを受け取る。メソッド実装のマップのキーはメソッド名をキーワードにしたものである。

`InputStream` に対する `IOFactory` の実装は次のようになる。

```clojure
(extend InputStream
	IOFactory
	{:make-reader (fn [src] (-> src InputStreamReader. BufferedReader.))
	 :make-writer (fn [dst]
									(throw (IllegalArgumentException.
										"Can't open as a InputStream.")))})
```

同様に、`OutputStream` に対しても `IOFactory` を実装できる。

```clojure
(extend OutputStream
	IOFactory
	{:make-reader (fn [src]
									(throw
										(IllegalArgumentException.
											"Can't open as an OutputStream.")))
	 :make-writer (fn [dst] (-> dst OutputStreamWriter. BufferedWriter.))})
```

`InputStream` に書き込んだり、`OutputStream` から読み込んだりはできないので、これらのケースでは例外を投げるようにしている。

### extend-type マクロ

`java.io.File` にも `IOFactory` プロトコルを追加する。今回は `extend` ではなく、`extend-type` マクロを使う。

```clojure
(extend-type type & specs)
```

引数として、拡張する型と複数の spec を渡す。各 spec はプロトコル名と必要なメソッド実装を並べたものである。

```clojure
(extend-type File
  IOFactory
  (make-reader [src]
    (make-reader (FileInputStream. src)))
  (make-writer [dst]
    (make-writer (FileOutputStream. dst))))
```

この実装では `InputStream`（実際はそのサブクラスである [`FileInputStream`](https://docs.oracle.com/javase/jp/8/docs/api/java/io/FileInputStream.html)）を作った後、`make-reader` を再帰的に呼び出している。この呼び出しは `InputStream` に定義したメソッドへとディスパッチされる。`make-writer` や後述するメソッド定義でも同様である。

### extend-protocol マクロ

複数のデータ型に同じプロトコルを追加するには、`extend-protocol` マクロを使える。

```clojure
(extend-protocol protocol & specs)
```

引数には最初にプロトコルの名前を取り、複数の「型名とメソッド実装」を書く。

```clojure
(extend-protocol IOFactory
  Socket
  (make-reader [src]
    (make-reader (.getInputStream src)))
  (make-writer [dst]
    (make-writer (.getOutputStream dst)))
  URL
  (make-reader [src]
    (if (= "file" (.getProtocol src))
      (-> src .getPath FileInputStream.)
      (.openStream src)))
  (make-writer [dst]
    (make-writer (if (= "file" (.getProtocol dst))
                   (-> dst .getPath FileOutputStream.)
                   (throw (IllegalArgumentException.
                           "Can't write to non-file URL"))))))
```

## キーワード

- [[protocol-clojure|プロトコル]]
- [[expression-problem|Expression Problem]]
- [[interface|インタフェース]]
- [[dynamic-dispatch|動的ディスパッチ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
