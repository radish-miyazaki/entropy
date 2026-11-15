---
title: Programming Clojure, Third Edition › Java をシーカブルとして扱う
description: Java のコレクション、正規表現のマッチ結果、ファイルシステム、ストリーム、XML を、シーケンスとして扱う方法を見る
tags: [book-chapter, clojure]
date: 2023-08-25
book: "[[Programming Clojure, Third Edition]]"
chapter: 3
---

## TL;DR

- `first` と `rest` によるシーケンスの抽象化は「1 つ以上の何か」なら何でも対象にでき、Clojure は Java の API をラップしてシーケンスライブラリを使えるようにしている。
- Java の配列や文字列、`re-seq` による正規表現のマッチ結果、`file-seq` によるディレクトリツリー、`line-seq` によるファイルの各行、`xml-seq` による XML をシーケンスとして扱える。
- リーダは `with-open` で包んで確実に閉じる。

## 内容

`first` と `rest` によるシーケンスの抽象化は、「1 つ以上の何か」を扱うものであれば何でも対象にできる。[[java|Java]] の世界では、次のようなものがシーケンス抽象化の対象となる。

- コレクション API
- 正規表現
- ファイルシステム
- XML 処理
- RDB の結果

Clojure はこれらの Java API をラップして、普段のプログラミングで出会うほとんどのデータについてシーケンスライブラリを使えるようにしている。

### Java のコレクションをシーケンスにする

シーケンス関数に Java のコレクションを渡すと、自動的にシーケンスとして振る舞う（**シーカブル**）。ただし、Java のコレクションはシーカブルだが、Clojure の**組み込みのコレクションを使うのに比べて大きなメリットはない**。したがって、Java のコレクションを扱うのは、Java の API を使う必要がある場合だけに留めるべきである。

#### シーカブルな Java のコレクションの例

たとえば、配列はシーカブルである。

```clojure
(first (.getBytes "hello")) ; 104
(rest (.getBytes "hello")) ; (101 108 108 111)
(cons (int \h) (.getBytes "ello")) ; (104 101 108 108 111)
```

`Hashtable` と `Map` もシーカブルである。

```clojure
(first (System/getProperties))
; #object[java.util.concurrent.ConcurrentHashMap$MapEntry 0x64acc31b
;   ".version=null"]

(rest (System/getProperties))
; (#object[java.util.concurrent.ConcurrentHashMap$MapEntry 0x7972ecaf
;;   "java.specification.version=17"] ... etc ...
```

文字列は文字のシーケンスなので、シーカブルである。

```clojure
(first "Hello") ; \H
(rest "Hello") ; (\e \l \l \o)
```

#### 注意点

Clojure はコレクションを**自動的にシーケンスにラップしてくれる**が、**結果を元のコレクションに戻してくれるわけではない**。ほとんどのコレクション型ではこれが問題になることはないが、文字列については結果を文字列に戻したいことがある。

```clojure
(reverse "hello") ; (\o \l \l \e \h)
```

この場合、`(apply str …)` を使うと文字列に戻せる。

```clojure
(apply str (reverse "hello")) ; "olleh"
```

### 正規表現をシーケンスにする

[[regular-expression|正規表現]]（厳密には、正規表現のマッチ結果）もシーケンスとして扱える。Clojure の正規表現は、`java.util.regex` ライブラリを使っている。

#### `re-matcher` 関数

`re-matcher` を使うと、正規表現と文字列から `java.util.regex.Matcher` を作れる。これと `loop`、`re-find` を使って、マッチする箇所をすべて取り出してみる。

```clojure
(re-matcher regexp string)
```

```clojure
;; このコードは良くないコード
(let [m (re-matcher #"\w+" "the quick brown fox")]
	(loop [match (re-find m)]
	  (when match
	    (println match)
	    (recur (re-find m))))) ; nil
;; the
;; quick
;; brown
;; fox
```

しかし、**`Matcher` は可変**なので、より高レベルの **`re-seq` を使ったほうがよい**。

#### `re-seq` 関数

```clojure
(re-seq regexp string)
```

`re-seq` は、マッチした文字列からなる**イミュータブルなシーケンスを作り出す**。したがって、Clojure のシーケンスライブラリの力をフルに発揮できる。

```clojure
(re-seq #"\w+" "the quick brown fox")
; ("the" "quick" "brown" "fox")

(sort (re-seq #"\w+" "the quick brown fox"))
; ("brown" "fox" "quick" "the")

(drop 2 (re-seq #"\w+" "the quick brown fox"))
; ("brown" "fox")

(map clojure.string/upper-case (re-seq #"\w+" "the quick brown fox"))
; ("THE" "QUICK" "BROWN" "FOX")
```

### ファイルシステムをシーケンスにする

ファイルシステムもシーケンスとして扱える。

#### `java.io.File` を直接呼び出す

まず、`java.io.File` を直接呼び出してみる。

```clojure
(.listFiles (File. "."))
; #object["[Ljava.io.File;" 0x42c72488 "[Ljava.io.File;@42c72488"]
```

`[Ljava.io.File …]` というのは、Java の `toString()` による `File` の配列の表示である。シーケンス関数に配列を渡すと `seq` を呼び出すが、REPL は配列のまま表示する。

`seq` 関数を呼んでみる。

```clojure
(seq (.listFiles (File. ".")))
; (#object[java.io.File 0x621cfc78 "./programming_clojure"] ... etc ...)
```

デフォルトのファイルの表示形式が読みづらければ、`getName` を `map` すると、ファイル名の文字列で表示できる。

```clojure
(map #(.getName %) (seq (.listFiles (File. "."))))
; ("programming_clojure" ... etc ...)
```

ただし、**シーケンスライブラリの関数は `seq` を自動で呼び出す**ので、上のコードはもっと簡潔にできる。

```clojure
(map #(.getName %) (.listFiles (File. ".")))
```

#### `file-seq` 関数

ディレクトリツリー全体を再帰的に調べたい場合、**`file-seq`** 関数が使える。この関数はディレクトリを**深さ優先**で辿る。次は実行しているディレクトリにあるファイル数を出力するコードである。

```clojure
(count (file-seq (File. "."))) ; 53
```

最近（過去 30 分の間に）更新されたファイルだけを見たい場合、次のように書ける。

```clojure
(map #(.getName %) (filter recently-modified? (file-seq (File. "."))))
; ("." "programming_clojure" ... etc ...)
```

### ストリームをシーケンスにする

Java の `Reader` が返す各行をシーケンスとして扱うこともできる。

#### `reader` 関数

`Reader` のインスタンスを得るには、Clojure の `clojure.java.io` ライブラリを使う。このライブラリはストリームやファイル、URL、URI のリーダを返す `reader` 関数を提供している。

```clojure
(require '[clojure.java.io :refer [reader]])
(take 2 (line-seq (reader "./programming_clojure/sequences.clj")))
; ("(defn ... etc ...")
```

#### `with-open` マクロ

リーダはメモリの外のリソースを参照していて、**適切にクローズする必要**があるので、`with-open` で包んでおくのがよい。次はファイルの行数を返す処理である。

```clojure
(with-open [rdr (reader "./programming_clojure/exploring.clj")]
	(count (line-seq rdr))) ; 96
```

より実用的な例として、空行を除いた行数を返す処理を示す。

```clojure
(with-open [rdr (reader "./programming_clojure/exploring.clj")]
	(count (filter #(re-find #"\S" %) (line-seq rdr)))) ; 71
```

#### ファイルシステムも各ファイルの中身もシーケンスとして扱う

`with-open` マクロの例のように、ファイルシステムも各ファイルの中身もシーケンスとして扱うと、便利なツールを簡単に作れる。

いくつか述語を定義する。

```clojure
(defn non-blank?
  "空でない行を検出する"
  [line]
  (if (re-find #"\S" line) true false))

(defn non-svn?
  "Subversionのメタデータではないファイルを検出する"
  [file]
  (not (.contains (.toString file) ".svn")))

(defn clojure-source?
  "Clojureのソースファイルを検出する"
  [file]
  (.endsWith (.toString file) ".clj"))
```

これらとシーケンス関数 `reduce`, `for`, `count`, `filter` を組み合わせて、ディレクトリツリーの中の Clojure のコードの行数を数え上げる `clojure-loc` 関数を実装する。

```clojure
(clojure-loc (java.io.File. "./programming_clojure")) ; 95
```

この関数は特定の用途に特化した関数だが、**シーケンス関数と述語の組み合わせ**で実装されているので、簡単に他の用途に適用できる。

### XML をシーケンスにする

XML データもシーケンスとして扱える。対象となる XML データは次のとおり。

```xml
<compositions>
	<composition composer="J.S.Bach">
		<name>The Art of the Fugue</name>
	</composition>
	<composition composer="F.Chopin">
		<name>Fantaisie-Impromptu Op.66</name>
	</composition>
	<composition composer="W.A.Mozart">
		<name>Requiem</name>
	</composition>
</compositions>
```

`clojure.xml/parse` 関数は、XML ファイルやストリーム、URI をパースして、データのツリーを、ネストしたベクタで親子関係を表現した Clojure のマップとして返す。

```clojure
(require '[clojure.xml :refer [parse]])
(parse (java.io.File. "programming_clojure/data/compositions.xml"))
; {:tag :compositions,
;  :attrs nil,
;  :content [{:tag :composition, ... etc ...}]}
```

このマップを直接いじることもできるが、`xml-seq` 関数を使えば、シーケンスとして扱える。

```clojure
(xml-seq root)
```

```clojure
(for [x (xml-seq
	       (parse (java.io.File. "programming_clojure/data/compositions.xml")))
			:when (= :composition (:tag x))]
	(:composer (:attrs x)))
; ("J.S.Bach" "F.Chopin" "W.A.Mozart")
```

## キーワード

- [[clojure-sequence|シーケンス]]
- [[java|Java]]
- [[regular-expression|正規表現]]
- [[immutability|イミュータブル]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
