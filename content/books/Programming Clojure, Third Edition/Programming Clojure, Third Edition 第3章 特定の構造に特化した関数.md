---
title: Programming Clojure, Third Edition 第3章 特定の構造に特化した関数
description: リスト、ベクタ、マップ、集合に特化した関数と、clojure.set による集合論の操作と関係演算を見る
tags: [book-chapter, clojure]
date: 2023-08-25
book: "[[Programming Clojure, Third Edition]]"
chapter: 3
---

## TL;DR

- 特定の構造に特化した関数は、汎用的なシーケンス関数より性能が良い。シーケンスライブラリと重複する機能があるのは、ほとんどが性能のためである。
- リストとベクタの `peek` と `pop`、ベクタの `get` と `subvec`、マップの `keys`、`get`、`contains?`、`assoc`、`merge-with` などがある。
- `clojure.set` は、和集合や差集合といった集合論の操作と、`rename`、`select`、`project`、`join` による関係演算を提供する。

## 内容

シーケンス関数を使うと、きわめて汎用性の高いコードが書ける。しかし、特定のデータ構造の性質を利用したいケースもある。このニーズに応えるため、Clojure は**各構造に特化した関数**を提供している。一般的に、特定の構造に特化した関数のほうが、汎用的なシーケンス関数よりも**パフォーマンスが良い**。

### リストを扱う関数

#### `peek`, `pop` 関数

リストの最初の要素と残りの要素を取り出すのに、伝統的な `peek` と `pop` という名前も用意してある。

```clojure
(peek coll)
(pop coll)
```

`peek` は `first` と同じだが、`pop` は `rest` と同じ**ではなく**、シーケンスが空だと例外を投げる。

```clojure
(peek '(1 2 3)) ; 1

(pop '(1 2 3)) ; (2 3)
(pop ())
; java.lang.IllegalStateException: Can't pop empty list
```

### ベクタを扱う関数

#### `peek`, `pop` 関数

ベクタも `peek` と `pop` をサポートしているが、先頭ではなく末尾に作用する。

```clojure
(peek [1 2 3]) ; 3
(pop [1 2 3])  ; [1 2]
```

#### `get` 関数

インデックスに対応する値を返す。インデックスがベクタの範囲を超えていたら `nil` を返す。

```clojure
(get [:a :b :c] 1) ; :b
(get [:a :b :c] 5) ; nil
```

#### ベクタ自体を関数として扱う

ベクタはインデックスを取って値を返す関数としても動作する。`get` とは異なり、インデックスが範囲外であれば例外を投げる。

```clojure
([:a :b :c] 1) ; :b
([:a :b :c] 5) ; java.lang.IndexOutOfBoundsException: 5
```

#### `assoc` 関数

特定のインデックスに、新しい値を入れる。

```clojure
(assoc [0 1 2 3 4] 2 :two)
; [0 1 :two 3 4]
```

#### `subvec` 関数

ベクタの一部を抜き出したサブベクタを返す。`end` を省略した場合、ベクタの最後まで取られる。

```clojure
(subvec avec start end?)
```

```clojure
(subvec [1 2 3 4 5] 3) ; [4 5]
(subvec [1 2 3 4 5] 1 3) ; [2 3]
```

`drop` と `take` を使っても、`subvec` と同じことができる。

```clojure
(take 2 (drop 1 [1 2 3 4 5])) ; (2 3)
```

`subvec` との違いは、`take` と `drop` は汎用的でどんなシーケンスにも使える点である。ただし、ベクタに対する処理は **`subvec` のほうが速い**。

このように、シーケンスライブラリにあるのと重複する機能を提供する、特定の構造向けの関数がある場合、それは**性能のため**であることがほとんどである。

### マップを扱う関数

#### `keys`, `vals` 関数

キーと値のシーケンスを返す関数。

```clojure
(keys map)
(vals map)
```

```clojure
(keys {:sundance "spaniel" :darwin "beagle"}) ; (:sundance :darwin)

(vals {:sundance "spaniel" :darwin "beagle"}) ; ("spaniel" "beagle")
```

#### `get` 関数

与えたキーに対応する値を返す関数。存在しない場合は `nil` を返す。

```clojure
(get map key value-if-not-found?)
```

```clojure
(get {:sundance "spaniel" :darwin "beagle"} :darwin) ; "beagle"

(get {:sundance "spaniel" :darwin "beagle"} :snoopy) ; nil
```

第 3 引数に値を渡すと、キーが存在しなかった場合にその値が返される。

```clojure
(get score :stu :score-not-found) ; nil

(get score :aaron :score-not-found) ; :score-not-found
```

#### マップ自体を関数として扱う

マップはキーを引数に取る関数としても使える。

```clojure
({:sundance "spaniel" :darwin "beagle"} :darwin) ; "beagle"

({:sundance "spaniel" :darwin "beagle"} :snoopy) ; nil
```

#### キーワードを関数として扱う

キーワードはコレクションを引数に取り、その中から自分自身を探す関数として動作する。

```clojure
(:darwin {:sundance "spaniel" :darwin "beagle"}) ; "beagle"

(:snoopy {:sundance "spaniel" :darwin "beagle"}) ; nil
```

#### `contains?` 関数

マップからキーを探して `nil` が返ってきた場合、**マップにそのキーがなかったのか、キーが `nil` を値として持っていたのか区別できない**。ただし、`get` 関数の第 3 引数を指定すれば区別できる。

`contains?` 関数を使うと、マップがキーを持っているかを確認できる。

```clojure
(contains? {:sundance "spaniel" :darwin "beagle"} :darwin) ; true

(contains? {:sundance "spaniel" :darwin "beagle"} :snoopy) ; false
```

### 新しいマップを作る関数

Clojure には、新しいマップを作る関数がいくつもある。

#### `assoc`, `dissoc`, `select-keys`, `merge` 関数

- `assoc`: 与えたマップに新しいキーと値のペアを追加したものを返す
- `dissoc`: キーを取り除いたマップを返す
- `select-keys`: 与えたキーだけを含むマップを返す
- `merge`: 複数のマップを結合し、1 つのマップにして返す。同一キーが複数ある場合、そのキーを持つ一番右のマップの値が取られる

これらの関数を確かめるために、次のデータを用意する。

```clojure
(def song {:name "Agnus Dei"
           :artist "Krystztof Penderecki"
           :album "Polish Requiem"
           :genre "Classical"})
```

このマップに関数を適用していく。

```clojure
(assoc song :kind "MPEG Audio File")
; {:name "Agnus Dei", :artist "Krystztof Penderecki",
;  :album "Polish Requiem", :genre "Classical", :kind "MPEG Audio File"}

(dissoc song :genre)
; {:name "Agnus Dei", :artist "Krystztof Penderecki", :album "Polish Requiem"}

(select-keys song [:name :artist])
; {:name "Agnus Dei", :artist "Krystztof Penderecki"}

(merge song {:size 8118166 :time 507245})
; {:name "Agnus Dei", :artist "Krystztof Penderecki",
;  :album "Polish Requiem", :genre "Classical", :size 8118166, :time 507245}
```

`song` そのものは**決して変わらない**。各関数は**新しいコレクションを返す**。

#### `merge-with` 関数

`merge` と似ているが、**複数のマップが同じキーを持っていた場合に、どうやって値を組み合わせるかを指定**できる。

```clojure
(merge-with merge-fn & maps)
```

たとえば次は`concat` を使って同じキーの値をシーケンスにするコードである。

```clojure
(merge-with
		concat
		{:rubble ["Barney"] :flintstone ["Fred"]}
		{:rubble ["Betty"] :flintstone ["Wilma"]}
		{:rubble ["Bam-Bam"] :flintstone ["Pebbles"]})

; {:rubble ("Barney" "Betty" "Bam-Bam"),
;  :flintstone ("Fred" "Wilma" "Pebbles")}
```

### 集合を扱う関数

`clojure` 名前空間にある集合を扱う関数以外に、`clojure.set` 名前空間にも集合を扱う関数が用意されている。いちいち名前空間を指定して呼ぶのは面倒なので、すべての関数を `require` しておく。

```clojure
(require '[clojure.set :refer :all])
```

#### 集合論の操作（`union`, `intersection`, `difference`, `select` 関数）

- `union`: 与えられた集合の和集合を返す
- `intersection`: 与えられた集合の積集合を返す
- `difference`: 与えられた集合の差集合（最初の集合に含まれ、2 番目の集合に含まれない要素の集合）を返す
- `select`: 述語を満たす要素の集合を返す

```clojure
(def languages #{"java" "c" "d" "clojure"})
(def beverages #{"java" "chai" "pop"})

(union languages beverages)
; #{"d" "clojure" "pop" "java" "chai" "c"}

(intersection languages beverages)
; #{"java"}

(difference languages beverages)
; #{"d" "clojure" "c"}

(select #(= 1 (.length %)) languages)
; #{"d" "c"}
```

#### 関係演算（`rename`, `select`, `project`, `join` 関数）

和集合や差集合は集合論の一部だが、SQL などの**クエリ言語の基礎となっている[[relational-algebra|関係演算]]**（relational algebra）にも使われる。関係演算は和集合、差集合、属性名変更（rename）、選択（select）、射影（projection）、直積（cross product）の 6 つのプリミティブな操作からなる。

これらの操作は**RDB と対応付ける**とイメージしやすい。

| 関係演算では | RDB では | Clojure の型システム           |
| ------------ | -------- | ------------------------------ |
| 関係         | テーブル | 集合として動作するものすべて   |
| タプル       | 行       | マップとして動作するものすべて |

検証では次のデータを使う。

```clojure
(def compositions
  #{{:name "The Art of the Fugue" :composer "J. S. Bach"}
    {:name "Musical Offering" :composer "J. S. Bach"}
    {:name "Requiem" :composer "W. A. Mozart"}
    {:name "Requiem" :composer "Giuseppe Verdi"}})

(def composers
  #{{:composer "J. S. Bach" :country "Germany"}
    {:composer "W. A. Mozart" :country "Austria"}
    {:composer "Giuseppe Verdi" :country "Italy"}})

(def nations
  #{{:nation "Germany" :language "German"}
    {:nation "Austria" :language "German"}
    {:nation "Italy" :language "Italian"}})
```

各関係演算と、対応する `clojure.set` の関数を 1 つずつ見ていく。

`rename` 関数（属性名変更）は、元の名前から新しい名前へのマップに則り、キーの名前を付け替える。

```clojure
(rename relation rename-map)
```

```clojure
(rename compositions {:name :title})
; #{{:composer "Giuseppe Verdi", :title "Requiem"}
;   {:composer "W. A. Mozart", :title "Requiem"}
;   {:composer "J. S. Bach", :title "The Art of the Fugue"}
;   {:composer "J. S. Bach", :title "Musical Offering"}}
```

`select` 関数（選択）は、述語を満たすマップの集合を返す。

```clojure
(select pred relation)
```

```clojure
(select #(= (:name %) "Requiem") compositions)
; #{{:name "Requiem", :composer "Giuseppe Verdi"}
;   {:name "Requiem", :composer "W. A. Mozart"}}
```

`project` 関数（射影）は、与えたキーだけを含むマップの集合を返す。

```clojure
(project relation keys)
```

```clojure
(project compositions [:name])
; #{{:name "The Art of the Fugue"}
;   {:name "Musical Offering"}
;   {:name "Requiem"}}
```

`join` 関数（直積）は、SQL の `JOIN` 演算のように、異なるマップの集合を同一キーを元に結合する。

```clojure
(join relation-1 relation-2 keymap?)
```

文では分かりづらいので、実際に実行する。

```clojure
(join composers compositions)
; #{{:composer "W. A. Mozart", :country "Austria", :name "Requiem"}
;   {:composer "J. S. Bach", :country "Germany", :name "Musical Offering"}
;   {:composer "Giuseppe Verdi", :country "Italy", :name "Requiem"}
;   {:composer "J. S. Bach", :country "Germany", :name "The Art of the Fugue"}}
```

2 つの関係でキーが一致しない場合、`relation-1` のキーの名前に対応する `relation-2` のキーの名前を結びつける `keymap` を渡せる。

```clojure
(join composers nations {:country :nation})
; #{{:composer "W. A. Mozart", :country "Austria",
;    :nation "Austria", :language "German"}
;   {:composer "J. S. Bach", :country "Germany",
;    :nation "Germany", :language "German"}
;   {:composer "Giuseppe Verdi", :country "Italy",
;    :nation "Italy", :language "Italian"}}
```

これらの関数は組み合わせることもできる。次は`Requiem` の作曲家の母国の集合である。

```clojure
(project
	(join
		(select #(= (:name %) "Requiem") compositions)
		composers)
	[:country])
; #{{:country "Italy"} {:country "Austria"}}
```

## キーワード

- [[clojure-sequence|シーケンス]]
- [[immutability|不変性]]
- [[relational-algebra|関係演算]]
- [[relational-database|リレーショナルデータベース]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
