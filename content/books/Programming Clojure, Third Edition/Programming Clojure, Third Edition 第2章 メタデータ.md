---
title: Programming Clojure, Third Edition 第2章 メタデータ
description: オブジェクトの論理的な値と直交するデータであるメタデータを、var のメタデータ、メタデータリーダマクロ、共通のキーの順に見る
tags: [book-chapter, clojure]
date: 2023-08-25
book: "[[Programming Clojure, Third Edition]]"
chapter: 2
---

## TL;DR

- メタデータはオブジェクトの論理的な値とは直交するデータを指す。var はドキュメント、型情報、ソース情報を含むマップをメタデータとして持ち、`meta` で確認できる。
- 独自のメタデータはメタデータリーダマクロ `^` で付ける。よく使う `:tag` には `^Classname` という省略記法がある。

## 内容

Clojure における[[clojure-metadata|メタデータ]]は、**オブジェクトの論理的な値とは直交するデータ**を指す。たとえば、人を表すオブジェクトが XML へシリアライズできるかという情報は、人そのものとは直接関係がない。この「XML へシリアライズできるか」という情報がメタデータである。

### var のメタデータ

Clojure 自身も、メタデータをいくつかの箇所で使っている。たとえば [[clojure-var|var]] は、ドキュメント・型情報・ソース情報を含んだマップをメタデータとして持っている。このメタデータは `meta` 関数で確認できる。

次は関数 `str` のメタデータである。

```clojure
(meta #'str)
; {:added "1.0",
;  :ns #object[clojure.lang.Namespace 0x1a59db39 "clojure.core"],
;  :name str,
;  :file "clojure/core.clj",
;  :static true,
;  :column 1,
;  :line 546,
;  ...}
```

### メタデータリーダマクロ

var に付くメタデータの多くは、Clojure のコンパイラが自動的に付加する。ただし、`:tag` は自動で生成されない。独自のキーと値のペアを var に追加したい場合、メタデータリーダマクロが使える。

```clojure
^metadata form
```

たとえば、引数の文字列をすべて大文字に変換する簡単な関数 `shout` を考え、引数と戻り値がともに文字列であることを `:tag` で書く。

```clojure
(defn ^{:tag String} shout [^{:tag String} s]
	(clojure.string/upper-case s))
```

`shout` のメタデータを確認すると、Clojure が `:tag` を付与していることが分かる。

```clojure
(meta #'shout)
; {:tag java.lang.String,
;  :arglists ([s]),
;  :name shout,
;  ...}
```

`:tag` はとてもよく使われるので、`^Classname` という省略記法が用意されている。

```clojure
(defn ^String shout [^String s] (clojure.string/upper-case s))
```

メタデータが混ざって関数定義が読みにくい場合、メタデータを一番後ろに置くこともできる。

```clojure
(defn shout
  ([s] (clojure.string/upper-case s))
  {:tag String})
```

### 共通のメタデータ

メタデータで共通して使われるキーとその意味は次のとおり。

| キー        | 用途                           |
| ----------- | ------------------------------ |
| `:ns`       | 名前空間                       |
| `:name`     | ローカル名                     |
| `:added`    | 追加されたバージョン           |
| `:file`     | ソースファイル                 |
| `:line`     | ソース行                       |
| `:column`   | ソース列                       |
| `:tag`      | 引数または戻り値の期待する型   |
| `:arglists` | `doc` で表示される引数の情報   |
| `:doc`      | `doc` で表示されるドキュメント |
| `:macro`    | マクロの場合に `true`          |

## キーワード

- [[clojure-metadata|メタデータ]]
- [[clojure-var|var]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
