---
title: Programming Clojure, Third Edition 第7章 インタフェース
description: definterface で Java のインタフェースを定義できるが、既存のクラスに後からインタフェースを足せないので、クラス作者以外には閉じており Expression Problem が生じる
tags: [book-chapter, clojure]
date: 2023-09-11
book: "[[Programming Clojure, Third Edition]]"
chapter: 7
---

## TL;DR

- [[clojure|Clojure]] は Java のインタフェースをそのまま扱え、`definterface` で定義できる。
- Java のクラスがサポートするインタフェースはクラス定義時に決まるので、`File` や `Socket` に新しいインタフェースを後から実装できない。これは Expression Problem の一種である。

## 内容

Clojure では Java の[[interface|インタフェース]]をそのまま扱える。

### メリットとデメリット

インタフェースには、次のメリットがある。

- データ型は複数のインタフェースを実装できる
- インタフェースは仕様だけを指定し、実装は提供しない。そのため、（多重継承で陥る）複数の実装をどう扱うかといった問題が生じない

デメリットは、**既存のデータ型に新しいインタフェースを追加するには、そのデータ型を書き直す必要がある**点である。

### インタフェースの定義（definterface）

Clojure から Java のインタフェースを作るには、`definterface` を使う。

```clojure
(definterface name & args)
```

たとえば、「入力元や出力先になれるもの」を抽象化するインタフェース `IOFactory` は、次のように定義できる。

```clojure
(definterface IOFactory
	('java.io.BufferedReader make-reader [this])
	('java.io.BufferedWriter make-writer [this]))
```

このインタフェースを実装するクラスは、自身を引数とし、`BufferedReader` と `BufferedWriter` を返す `make-reader` と `make-writer` 関数を実装しなければならない。

### Expression Problem

ただし、クラスがサポートするインタフェースは、クラス定義時に決まる。Java のクラスは一度定義されたら、書き直さない限り新しいインタフェースを追加できないので、**`File` や `Socket`、`URL` に `IOFactory` を実装することは不可能**である。

[[Programming Clojure, Third Edition 第7章 抽象化へ向けたプログラミング|ファイル以外の入出力を扱うようにした]] `make-reader` や `make-writer` のように、インタフェースは**クラス作者以外の第三者に対しては閉じている**。これは、[Expression Problem](https://eli.thegreenplace.net/2016/the-expression-problem-and-its-solutions/) と呼ばれる問題の一種である。Clojure はこの問題を回避するアプローチを用意している（[[Programming Clojure, Third Edition 第7章 プロトコル]]）。

## キーワード

- [[interface|インタフェース]]
- [[expression-problem|Expression Problem]]
- [[inheritance|継承]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
