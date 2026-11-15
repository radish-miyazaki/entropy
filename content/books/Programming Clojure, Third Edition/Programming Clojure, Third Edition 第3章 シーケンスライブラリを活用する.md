---
title: Programming Clojure, Third Edition 第3章 シーケンスライブラリを活用する
description: シーケンスを生成する range や iterate、フィルタする filter や take-while、述語の every? や some、変換する map や reduce、sort と、for によるシーケンス内包表記を見る
tags: [book-chapter, clojure]
date: 2023-08-25
book: "[[Programming Clojure, Third Edition]]"
chapter: 3
---

## TL;DR

- シーケンスライブラリには、シーケンスを生成する関数（`range`、`repeat`、`iterate`、`cycle`、`interleave` など）、フィルタする関数（`filter`、`take-while`、`split-with` など）、述語（`every?`、`some` など）、変換する関数（`map`、`reduce`、`sort` など）がある。
- `for` マクロによるシーケンス内包表記は `map` や `filter` より汎用的で、複数の束縛式を使うと真価を発揮する。
- ここで紹介する関数のほとんどは遅延シーケンスを返す。

## 内容

ここで紹介するシーケンス関数のほとんどは、要素が実際に使われるときまでシーケンスを走査しない（**[[lazy-evaluation|遅延評価]]**）。

### シーケンスを生成する関数群

シーケンスリテラル以外に、Clojure はシーケンスを生成する関数をいくつも用意している。

#### `range` 関数

`start` から `step` ごとに値を加算しながら、`end` までの値のシーケンスを作る関数である。

```clojure
(range start? end step?)
```

`start` はシーケンスに含まれるが、**`end` は含まれない**。`start` を省略すると 0、`step` を省略すると 1 とみなされる。

```clojure
(range 10)     ; (0 1 2 3 4 5 6 7 8 9)
(range 10 20)  ; (10 11 12 13 14 15 16 17 18 19)
(range 1 25 2) ; (1 3 5 7 9 11 13 15 17 19 21 23)
```

#### `repeat` 関数

要素 `x` を `n` 回繰り返したシーケンスを作る。`x` を省略すると、無限長の[[lazy-sequence|遅延シーケンス]]を生成できる。

```clojure
(repeat n x)
```

```clojure
(repeat 5 1)    ; (1 1 1 1 1)
(repeat 10 "x") ; ("x" "x" "x" "x" "x" "x" "x" "x" "x" "x")
```

#### `iterate` 関数

`x` を初期値とし、現在の値に関数 `f` を適用して次の値を計算することを繰り返し、無限長の遅延シーケンスを生成する。

```clojure
(iterate f x)
```

次は自然数の無限シーケンスである。

```clojure
(def whole-numbers (iterate inc 1))
```

REPL で値を確認するには、`take` 関数を使う必要がある。

```clojure
(take 10 whole-numbers) ; (1 2 3 4 5 6 7 8 9 10)
```

#### `take` 関数

コレクションの先頭から `n` 個までを要素とする遅延シーケンスを返す。

```clojure
(take n sequence)
```

#### `cycle` 関数

コレクションを取り、その要素を無限に繰り返すシーケンスを作る。

```clojure
(cycle coll)
```

```clojure
(take 10 (cycle (range 3)))
; (0 1 2 0 1 2 0 1 2 0)
```

#### `interleave` 関数

複数のコレクションを取り、各コレクションから 1 要素ずつ順に取ってきて並べたシーケンスを返す。

```clojure
(interleave & colls)
```

`interleave` 関数は、**どれか 1 つでもコレクションの要素を使い切れば処理を終える**。これにより、**有限と無限のコレクションを組み合わせ**られる。

```clojure
(interleave whole-numbers ["A" "B" "C" "D" "E"])
; (1 "A" 2 "B" 3 "C" 4 "D" 5 "E")
```

#### `interpose` 関数

コレクションの各要素の間に `separator` を挟み込んだシーケンスを返す。

```clojure
(interpose separator coll)
```

この関数と `apply` 関数を組み合わせると、コンマ区切りの文字列を生成できる。

```clojure
(interpose "," ["apples" "bananas" "grapes"])
; ("apples" "," "bananas" "," "grapes")

(apply str (interpose "," ["apples" "bananas" "grapes"]))
; "apples,bananas,grapes"
```

この `(apply str …)` というパターンは多用するので、Clojure は `clojure.string/join` という関数を用意している。

```clojure
(join separator sequence)
```

```clojure
(join \, ["apples" "bananas" "grapes"])
; "apples,bananas,grapes"
```

#### `list`, `vector`, `hash-set`, `hash-map` 関数

コレクションの各型について、任意の個数の引数を取り、その型のコレクションを作る関数が用意されている。

```clojure
(list & elements)
(vector & elements)
(hash-set & elements)
(hash-map & elements)
```

#### `set` 関数

`hash-set` には、引数の取り方が異なる `set` という似た関数がある。`set` は 1 つのコレクションを引数に取る。

```clojure
(set [1 2 3]) ; #{1 3 2}
```

一方、`hash-set` は任意個の引数を取る。

```clojure
(hash-set 1 2 3) ; #{1 3 2}
```

#### `vec` 関数

`vector` にも同様に、任意個の引数の代わりに単一のコレクションを取る `vec` という関数がある。

```clojure
(vec (range 3)) ; [0 1 2]
```

### シーケンスをフィルタする関数群

Clojure は元のシーケンスから要素を選び出して新たなシーケンスを返すフィルタ関数をいくつも持っている。そのうち最も基本となるのが `filter` 関数である。

#### `filter` 関数

述語とコレクションを取り、コレクションの中から述語が真を返す要素をシーケンスにして返す。

```clojure
(filter pred coll)
```

例として、`whole-numbers`（すべての自然数）をフィルタして、偶数や奇数だけのシーケンスを作ってみる。

```clojure
(take 10 (filter even? whole-numbers))
; (2 4 6 8 10 12 14 16 18 20)

(take 10 (filter odd? whole-numbers))
; (1 3 5 7 9 11 13 15 17 19)
```

#### `take-while` 関数

述語が真を返し続ける限り要素を取り出す関数。

```clojure
(take-while pred coll)
```

たとえば、最初の母音を見つけるまで文字列から文字を取り出す処理は、次のように書ける。

```clojure
(def vowel? #{\a\e\i\o\u})
(def consonant? (complement vowel?))

(take-while consonant? "the-quick-brown-fox") ; (\t \h)
```

- **集合は関数のように動作する**ので、`#{\a\e\i\o\u}` は母音の集合であるのと同時に、引数が母音かをチェックする関数とも読める
- `complement` は、関数が渡されると、その**反対の振る舞いをする関数**を返す。上の例では、引数が母音でないかどうかをチェックする関数になる

#### `drop-while` 関数

`take-while` とは逆のことを行う。つまり、述語が真を返し続ける間は要素を捨てて、初めて偽を返したところから残りのシーケンスを返す。

```clojure
(drop-while pred coll)
```

例として、文字列の最初の連続する非母音文字を除いたシーケンスを作る。

```clojure
(drop-while consonant? "the-quick-brown-fox")
; (\e \- \q \u \i \c \k \- \b \r \o \w \n \- \f \o \x
```

#### `split-at`, `split-with` 関数

与えられたコレクションを、2 つのコレクションに分割する。`split-at` はインデックス（`index`）を取り、`split-with` は述語（`pred`）を取る。

```clojure
(split-at index coll)
(split-with pred coll)
```

```clojure
(split-at 5 (range 10))
; [(0 1 2 3 4) (5 6 7 8 9)]

(split-with #(<= % 10) (range 0 20 2))
; [(0 2 4 6 8 10) (12 14 16 18)]
```

ここで紹介した関数は、**すべて遅延シーケンスを返す**。

### シーケンスに対する述語群

シーケンスに関する[[predicate|述語]]は、他の述語がシーケンスの各要素に対してどのような結果を返すかをチェックするものである。

#### `every?` 関数

シーケンスの**すべての要素**に対して、渡された `pred` が真を返せば真となる。

```clojure
(every? pred coll)
```

```clojure
(every? odd? [1 3 5])   ; true

(every? odd? [1 3 5 8]) ; false
```

#### `some` 関数

`pred` が偽でない値を返したら、直ちにその値を返す。すべての要素について偽となった場合は **`nil` を返す**。

```clojure
(some pred coll)
```

```clojure
(some even? [1 2 3]) ; true

(some even? [1 3 5]) ; nil
```

`some` は述語のように扱われることが多いが、常に `true` か `false` を返すわけではないので、関数名に `?` が付いていない。述語が満たされたとき、**`some` は `pred` が返した値をそのまま返す**。たとえば、`some` に `even?` を渡した場合、`even?` は述語なので `true` を返す。そのため、`(some even? …)` が返しうる値は `true` か `nil` となる。一方、`some` に `identity` を渡した場合、`(some identity …)` は `false` 以外のすべてを返しうる。

```clojure
(some identity [nil false 1 nil 2]) ; 1
```

`some` の一般的な使い方は、あるシーケンスがマッチする要素を含むかどうかを線形探索することである。

```clojure
(some #{3} (range 20)) ; 3
```

#### `not-every?`, `not-any?` 関数

`not-every?` は、コレクションのすべての要素に対して述語が真であれば `false` を返し、そうでなければ `true` を返す。

```clojure
(not-every? pred coll)
```

```clojure
(not-every? even? whole-numbers) ; true
```

`not-any?` は、コレクションのある要素に対して述語が真であれば `false` を返し、すべてが偽であれば `true` を返す。

```clojure
(not-any? pred coll)
```

```clojure
(not-any? even? whole-numbers) ; false
```

### シーケンスを変換する関数群

シーケンスの各要素の値を変換する関数群。最も基本となるのは `map` 関数である。

#### `map` 関数

元となるコレクション `coll` と関数 `f` を取り、`f` を `coll` の各要素に適用して、得られた結果をシーケンスにして返す。

```clojure
(map f coll)
```

次はコレクションの要素をそれぞれ HTML タグで囲むコードである。

```clojure
(map #(format "<p>%s</p>" %) ["the" "quick" "brown" "fox"])
; ("<p>the</p>" "<p>quick</p>" "<p>brown</p>" "<p>fox</p>")
```

`map` は複数のコレクションを引数に取れる。この場合、`f` は**コレクションの数と同じだけの引数を取る関数**でなければならない。`map` は各コレクションから 1 つずつ要素を取って `f` に渡し、**いずれかのコレクションの要素を使い切ったら終了**する。

```clojure
(map #(format "<%s>%s</%s>" %1 %2 %1)
	["h1" "h2" "h3" "h1"] ["the" "quick" "brown" "fox"])
; ("<h1>the</h1>" "<h2>quick</h2>" "<h3>brown</h3>" "<h1>fox</h1>")
```

#### `reduce` 関数

`f` は 2 つの引数を取る関数である。`reduce` は、まず `f` を `coll` の最初の 2 つの要素に適用する。そして、得られた結果と 3 番目の要素に再び `f` を適用し、というのを繰り返していく。

```clojure
(reduce f coll)
```

`reduce` は、シーケンスの要素を**何らかの形でまとめる**ときに便利である。次は合計と積を求めるコードである。

```clojure
(reduce + (range 1 11)) ; 55
(reduce * (range 1 11)) ; 3628800
```

#### `sort`, `sort-by` 関数

`sort` はコレクションを要素間の自然な順序でソートする。`sort-by` は、各要素に `a-fn` を適用して得られる結果を元にソートする。

```clojure
(sort comp? coll)
(sort-by a-fn comp? coll)
```

```clojure
(sort [42 1 7 11]) ; (1 7 11 42)
(sort-by #(.toString %) [42 1 7 11]) ; (1 11 42 7)
```

ソートの順序を変えたい場合、`sort` にも `sort-by` にも比較関数 `comp` を渡せる。

```clojure
(sort > [42 1 7 11]) ; (42 11 7 1)

(sort-by :grade > [{:grade 83} {:grade 90} {:grade 77}])
; ({:grade 90} {:grade 83} {:grade 77})
```

#### シーケンス内包表記（`for` マクロ）

すべてのフィルタと変換を包含するのが、[[list-comprehension|リスト内包表記]]である。リスト内包表記を使うと、既存のリストと集合表記から新しいリストを作り出せる。リスト内包表記は一般的に次の要素からなる。

- 入力となるリスト（複数可）
- 入力リストの各要素に束縛される、プレースホルダとなる変数
- 要素に適用する述語
- 述語を満たす入力リストの要素から、出力リストの要素を作り出すための式

Clojure では、リスト内包表記を**シーケンス内包表記**として一般化している。この内包表記は `for` マクロで書く。

```clojure
(for [binding-form coll-expr filter-expr? ...] expr)
```

`for` は `binding-form` や `coll-expr`、省略可能な `filter-expr` を並べたベクタを取り、`expr` の結果を要素とするシーケンスを返す。内包表記は **`map` や `filter` より汎用性が高く**、これらの関数をシミュレートできる。

次は`map` 関数の節で使ったコードを `for` マクロで置き換えたものである。

```clojure
(for [word ["the" "qucik" "brown" "fox"]]
	(format "<p>%s</p>" word))
; ("<p>the</p>" "<p>qucik</p>" "<p>brown</p>" "<p>fox</p>")
```

`filter` 関数は、`:when` 節を使ってシミュレートできる。次は全整数のうち偶数だけを抽出するコードである。

```clojure
(take 10 (for [n whole-numbers :when (even? n)] n))
; (2 4 6 8 10 12 14 16 18 20)
```

`:when` 以外に `:while` 節もあり、与えた式が真である間だけ評価し続ける。

```clojure
(for [n whole-numbers :while (even? n)] n) ; ()
```

`for` は複数の束縛式を使ったときに真価を発揮する。たとえば、チェス盤上のすべてのマスを A〜H の列記号と 1〜8 の行番号で並べる式は、次のように書ける。

```clojure
(for [file "ABCDEFG" rank (range 1 9)] (format "%c%d" file rank))
; ("A1" "A2" "A3" "A4" "A5" "A6" "A7" "A8" "B1" ...)
```

Clojure は一番右側の束縛（`rank`）を最初に繰り返す。すべての要素を走査し終えると、左側（`file`）の要素を 1 つ進めて、再び右側の束縛を繰り返す。

## キーワード

- [[clojure-sequence|シーケンス]]
- [[lazy-sequence|遅延シーケンス]]
- [[lazy-evaluation|遅延評価]]
- [[predicate|述語]]
- [[higher-order-function|高階関数]]
- [[list-comprehension|シーケンス内包表記]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
