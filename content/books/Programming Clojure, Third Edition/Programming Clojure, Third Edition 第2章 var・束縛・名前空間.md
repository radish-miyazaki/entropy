---
title: Programming Clojure, Third Edition › var・束縛・名前空間
description: def で定義したオブジェクトが格納される var、let と分配束縛によるレキシカルな束縛、in-ns、import、require、ns による名前空間の扱いを見る
tags: [book-chapter, clojure]
date: 2023-08-25
book: "[[Programming Clojure, Third Edition]]"
chapter: 2
---

## TL;DR

- `def` や `defn` で定義したオブジェクトは var に格納される。var は値の格納以外に、別名、メタデータ、スレッドごとの再束縛といった機能を持つ。
- 関数の引数や `let` はレキシカルな束縛を作り、分配束縛でコレクションの必要な部分だけを束縛できる。
- 名前空間は `in-ns` で切り替え、`import`、`require`、`ns` で他のクラスや名前空間の名前を持ち込む。

## 内容

### var

オブジェクトを `def` や `defn` で定義すると、オブジェクトは Clojure の [[clojure-var|var]] に格納される。

```clojure
(def foo 10) ; #'user/foo
```

シンボル `user/foo` は、値 `10` が束縛される var の名前を示している。Clojure が `foo` を評価すると、その名前の var に結び付けられた値が返される。

```clojure
foo ; 10
```

`var` を使うと、var を直接参照することもできる。

```clojure
(var foo) ; #'user/foo
```

リーダマクロ `#'` を使っても同じことができる。

```clojure
#'foo ; #'user/foo
```

var を直接参照することはめったにないので、通常はシンボルと var を区別する必要はない。しかし、**値を格納する以外にも様々な機能を持っている**ことは、覚えておいて損はない。

- 1 つの var は、いくつもの名前空間に別名を持てる。これにより、便利な短い名前が使える
- var はメタデータを持てる。var のメタデータには、ドキュメントや最適化のための型ヒント、単体テストが含まれる
- var はスレッドごとに再束縛できる

### 束縛

var は名前に束縛されているが、他の種類の束縛もある。たとえば、関数を呼び出すと、実引数の値と仮引数の名前が束縛される。

```clojure
(defn triple [number] (* 3 number))
(triple 10) ; 30
```

関数の引数束縛は関数本体の中だけから見える[[lexical-scope|レキシカルスコープ]]を持つ。ただし、レキシカルな束縛を作る手段は関数だけではない。**`let`** を使ってもレキシカルスコープを作れる。

```clojure
(let [bindings*] exprs*)
```

この束縛（`bindings`）は `exprs` の中で有効になる。そして `exprs` の中の最後の式の値が、`let` フォームの値になる。

```clojure
(defn square-corners [bottom left size]
  (let [top (+ bottom size)
        right (+ left size)]
    [[bottom left] [top left] [top right] [bottom right]]))
```

### 分配束縛

多くのプログラミング言語では、コレクションの中身の一部にアクセスしたい場合、まずコレクション全体を束縛する。

```clojure
(defn greet-author-1 [author]
  (println "Hello," (:first-name author)))
(greet-author-1 {:first-name "Vernor" :last-name "Vinge"})
```

Clojure では [[destructuring|分配束縛]]を使って、コレクションの中から必要な部分だけを束縛できる。

```clojure
(defn greet-author-2 [{fname :first-name}]
  (println "Hello," fname))
```

シーケンスもベクタとして分配束縛できる。

```clojure
(let [[x y] [1 2 3]]
	[x y])
```

コレクションの要素をいくつか飛ばして束縛したい場合は、`_` を使う。`_` は普通のシンボルだが、慣習的に値を気にしない束縛を示すのに使う。

```clojure
(let [[_ _ z] [1 2 3]]
	_)
```

コレクション自体と、その要素の両方を同時に束縛することもできる。

```clojure
(let [[x y :as coords] [1 2 3 4 5 6]]
		(str "x: " x " y: " y ", total dimensions " (count coords)))
```

最後に、文字列を取り、最初の 3 つの単語とそれに続く `...` からなる文字列を返す関数 `elipsize` を実装する。

```clojure
(defn elipsize [words]
  (let [[w1 w2 w3] (str/split words #"\s+")]
    (str/join " " [w1 w2 w3 "..."])))

(elipsize "The quick brown fox")
; "The quick brown ..."
```

### 名前空間

**ルート束縛**（最初に与えられる var の値）は[[namespace|名前空間]]の中にある。Clojure の REPL を立ち上げて束縛を作ると、そのことが確認できる。

```clojure
user> (def foo 10)
#'user/foo
```

`user>` プロンプトは、今 `user` 名前空間にいることを示している。このため、`user` 名前空間は、実験的に書き捨てのコードを書くために使ったほうがよい。

#### `resolve`

Clojure が名前 `foo` を解決すると、現在の名前空間 `user` で解決された名前になる。このことは `resolve` を使うと確認できる。`resolve` は、シンボルを現在の名前空間で解決した結果の var かクラスを返す。

```clojure
(resolve 'foo) ; #'user/foo
```

#### `in-ns`

名前空間を変えるには、**`in-ns`** を使う。

```clojure
user> (in-ns 'myapp)
#object[clojure.lang.Namespace 0x631dc369 "myapp"]
myapp>
```

`in-ns` で現在の名前空間が `myapp` になったので、ここで `def` や `defn` したすべての名前は `myapp` に属する。

`in-ns` で新しく作られた名前空間の中では、`java.lang` パッケージが自動的に見えるようになっている。

```clojure
myapp> String
java.lang.String
```

Clojure を学んでいる間は、新しい名前空間を作ったら常に `clojure.core` を `use` して、基本関数を使えるようにしておくとよい。

```clojure
[clojure.core/use 'clojure.core]
```

#### `java.lang` 以外のクラスを指定する

`java.lang` 以外のクラス名は、デフォルトでは名前空間からすべて指定する必要がある。

```clojure
File/separator ;; clojure.lang.Compiler$CompilerException

java.io.File/separator ; "/"
```

クラス名をすべて書くのが手間であれば、`import` を使って Java パッケージから現在の名前空間に持ってこられる。この `import` は Java のクラスに対してだけ使える。

```clojure
(import '(package Class+))
```

```clojure
(import '(java.io File))
(.exists (File. "/tmp")) ; true
```

#### `require`

他の名前空間にある Clojure の var を使いたい場合、完全な名前を指定するか、現在の名前空間に名前を持ってくる必要がある。

```clojure
(require 'clojure.string)

(clojure.string/split "Something,separated,by,commas" #",")
; ["Something" "separated" "by" "commas"]

(split "Something,separated,by,commas" #",")
;; java.lang.RuntimeException:
;;   Unable to resolve symbol: split in this context
```

`split` の別名を現在の名前空間に作るには、`require` で `split` の名前空間を要求するときにエイリアス `str` を指定する。

```clojure
(require '[clojure.string :as str])
(str/split "Something,separated,by,commas" #",")
; ["Something" "separated" "by" "commas"]
```

この `require` は、`clojure.string` 名前空間にある公開された名前すべてを、`str` 付きのエイリアスで参照できるようにしている。ただし、具体的にどの名前を参照するかは示されていないので、分かりづらいこともある。

#### `ns`

ソースの冒頭で Java のクラスを `import` したり、他の名前空間を `use` したりする場合、慣習的に `ns` マクロを使う。

```clojure
(ns name & references)
```

`ns` マクロは現在の名前空間を `name` に設定し、名前空間 `name` がなければ作る。`references` には `:import`、`:require`、`:use` 節を指定でき、それぞれ `import`、`require`、`use` 関数を呼び出すのと同じ動作をする。

```clojure
(ns example.exploring
	(:require [clojure.string :as str])
	(:import (java.io File)))
```

## キーワード

- [[clojure-var|var]]
- [[lexical-scope|レキシカルスコープ]]
- [[destructuring|分配束縛]]
- [[namespace|名前空間]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
