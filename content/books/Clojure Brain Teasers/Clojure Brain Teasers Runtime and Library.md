---
title: Clojure Brain Teasers › Runtime and Library
description: case、concat、clojure.string/split、with-open、for、partial、分割束縛の :or、型ヒントなど、Clojure のランタイムと標準ライブラリのつまずきやすい挙動を扱う章
tags: [book-chapter, clojure]
date: 2025-05-23
book: "[[Clojure Brain Teasers]]"
chapter:
---

## TL;DR

- [[clojure|Clojure]] のランタイムと標準ライブラリにある、直感に反する挙動をパズル形式で紹介する章である。
- 多くは[[lazy-sequence|遅延シーケンス]]と評価のタイミング、[[clojure-var|Var]] の扱いに関わる。

## 内容

### A Case of Mistaken Identity

`case` は式がどのケースに一致するかを定数時間で判定し、対応する式を評価する。ケースは評価されないので、シンボル（Var）をケースに書くと、そのシンボル自体と一致するかを調べてしまう。

```clojure
(def photo1 :hero)
(def photo2 :villain)
(defn identify [photo]
  (case photo
    photo1 "Our hero!"
    photo2 "The dastardly villain"
    "Unknown"))

(identify photo1) ; "Unknown"
```

Var の値と比べたいときは、ケースにキーワードを直接書くか、`cond` などほかの条件分岐を使う。

```clojure
(defn identify [photo]
  (cond
    (= photo photo1) "Our hero!"
    (= photo photo2) "The dastardly villain"
    :else "Unknown"))
```

### Boom Goes the Dynamite

`concat` は `lazy-seq` マクロで実装されており、遅延シーケンスを返す。そのため、`loop` と `recur` の中で `concat` を繰り返すと、前の計算を包む遅延計算（サンク）が積み重なり、深い連鎖ができる。最初の要素が必要になったとき（REPL で表示するときなど）に、Clojure はこの連鎖全体を評価しようとして `StackOverflowError` を起こす。

```clojure
(defn doubled [n]
  (loop [i 0
         output ()]
    (if (< i n)
      (recur (inc i) (concat output [i i]))
      output)))
(= 0 (first (doubled 50000)))
```

これを避けるには、各反復で正格に評価すればよい。たとえば、`conj` でベクタに要素を追加する。

```clojure
(defn doubled-take2 [n]
  (loop [i 0
         output []]
    (if (< i n)
      (recur (inc i) (conj output i i))
      output)))
```

### Banana Splits

`clojure.string/split`（以下 `str` は `clojure.string` の別名）は、分割結果の末尾にある空文字列を省く。`(str/split "banana" #"na")` は `["ba"]` を返す。

`split` は省略可能な `limit` 引数を取る。`limit` が正の値 N のとき、パターンは最大 N - 1 回だけ適用される（`(str/split "banana" #"na" 2)` は `["ba" "na"]`）。0（既定値）のときは何回でも一致するが、末尾の空文字列は省かれる。負の値のときは何回でも一致し、末尾の空文字列も残る（`(str/split "banana" #"na" -1)` は `["ba" "" ""]`）。

`clojure.string/split-lines` は文字列を行に分ける関数で、`split` をもとにしているため末尾の空行を削る（`(str/split-lines "a\nb\nc\n\n")` は `["a" "b" "c"]`）。`split-lines` には `limit` 引数がないので、末尾の空行が必要なら `split` に負の `limit` を渡す関数を自分で書く。

```clojure
(defn split-lines-trailing [s] (str/split s #"\n" -1))
```

### Hanging Around

`with-open` は、リソースを開いて本体を実行した後、リソースを必ず閉じるマクロである。次のように `with-open` から遅延シーケンスを返すと、評価する時点ではリソースが閉じているため、例外が発生する。

```clojure
(require '[clojure.java.io :as jio]
         '[clojure.string :as str])

(defn grep [substring path]
  (with-open [reader (jio/reader path)]
    (->> reader
         (line-seq)
         (filter #(str/includes? % substring)))))
```

解決策は 2 つある。1 つは、本体で `doall` を使い、リソースを閉じる前にシーケンスを実体化することである。

```clojure
(defn grep-eager [substring path]
  (with-open [reader (jio/reader path)]
    (doall
     (->> reader
          (line-seq)
          (filter #(str/includes? % substring))))))
```

もう 1 つは、リソースの管理を呼び出し元に任せることである。リソースの状態をどこで管理するかが明確になるので、こちらがよく推奨される。

```clojure
(defn grep-reader [substring reader]
  (->> reader
       (line-seq)
       (filter #(str/includes? % substring))))
```

### Build a Nest

Clojure の `for` は、他の言語の `for` と違い、1 つの遅延シーケンスを生成する。束縛を並べると結果は平らな 1 つのシーケンスになり、入れ子にしたいときは `for` を入れ子にする。

```clojure
(for [a [0 1 2] b [3 4 5]] (* a b)) ; (0 0 0 3 4 5 6 8 10)
(for [a [0 1 2]] (for [b [3 4 5]] (* a b))) ; ((0 0 0) (3 4 5) (6 8 10))
```

### Partial Recall

`partial` で作った関数は、`partial` を呼び出した時点の Var の値を取り込む。一方、`fn` は Var そのものへの参照を取り込む。そのため、Var を再定義すると結果が変わる。

```clojure
(defn sentence [subject object] (str "Is " subject " a " object "?"))
(def planet "Mars")

(def f1 (partial sentence planet))
(def f2 (fn [object] (sentence planet object)))

(def planet "Earth") ; 再定義

(f1 "dream") ; "Is Mars a dream?"
(f2 "dream") ; "Is Earth a dream?"
```

### Abrac-OR-dabra

[[destructuring|分割束縛]]の `:or` は、キーが見つからなかったときの既定値を与える。既定値の式が同じフォームの別の束縛に依存していると、`:keys` に並べる順序で結果が変わる。

```clojure
(let [empty {}
      left nil, right nil
      {:keys [left right] :or {left :head, right (flip left)}} empty
      right-1 right

      left nil, right nil
      {:keys [right left] :or {left :head, right (flip left)}} empty
      right-2 right]
  (println "Results:" right-1 right-2) ; "Results: :tail nil"
  (= right-1 right-2))                 ; false
```

`:or` の評価順序は保証されていないので、分割束縛の中で他の束縛に依存する書き方は避ける。代わりに、評価順序を明示して書く。

```clojure
(let [empty {}
      left nil
      right nil
      {:keys [left right] :or {left :head}} empty
      right (or right (flip left))]
  right) ; :tail
```

### Take the Hint

Var のシンボルにメタデータとして型ヒントを付けると、そのメタデータは評価される。そのため、`(def ^double PI 3.14159)` と書くと `double` が評価され、`clojure.core/double` という関数オブジェクトになる。これは有効な型ヒントではないので無視される。代わりに `(def ^{:tag 'double} PI 3.14159)` と書く。

ただし、Var は常に [[java|Java]] のオブジェクトを保持するので、型ヒントが正しくても値は[[boxing|ボクシング]]された値（`java.lang.Double` など）になる。プリミティブのまま保持するには、メタデータに `:const true` を足す。こうするとコンパイラがコンパイル時に値をインライン化するので、Var の参照やアンボクシングが不要になり、性能が上がる。ただし値はコンパイル時に確定するので、リテラルの値にだけ使う。

## キーワード

- [[clojure|Clojure]]
- [[clojure-var|Var]]
- [[lazy-sequence|遅延シーケンス]]
- サンク
- [[destructuring|分割束縛]]
- 型ヒント
- [[boxing|ボクシング]]
- [[macro|マクロ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
