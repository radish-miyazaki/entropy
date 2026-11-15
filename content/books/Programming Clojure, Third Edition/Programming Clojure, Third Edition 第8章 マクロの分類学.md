---
title: Programming Clojure, Third Edition › マクロの分類学
description: 特殊形式は第一級市民ではないのでカプセル化できないパターンを生み、マクロは条件的な評価、var の定義、Java の呼び出し、評価の遅延、評価を包む、lambda を避けるの 6 つのカテゴリに分類できる
tags: [book-chapter, clojure]
date: 2023-09-16
book: "[[Programming Clojure, Third Edition]]"
chapter: 8
---

## TL;DR

- カプセル化できないパターンは、言語の特異点である特殊形式のまわりに起きる。特殊形式は関数ではなく、第一級市民ではない。
- マクロにする理由は特殊形式（条件的な評価、var の定義、Java の呼び出し）と、呼び出し側の便利さ（評価の遅延、評価を包む、lambda を避ける）に分類できる。

## 内容

**カプセル化できないパターンは、特殊形式のまわりに起きる。** 特殊形式は言語における特異点だからである。

### 特殊形式の機能

[[special-form|特殊形式]]は、次のような特別な力を持っている。

- `if` や `recur` といった、最も根本的なフロー制御の仕組みを提供している。何かしらの形でフロー制御を行うマクロは、最終的にこれらの特殊形式の呼び出しへと変換される必要がある
- Java への直接のアクセスを提供している。[[clojure|Clojure]] から Java を呼び出すには、少なくとも 1 つの特殊形式（ドットや `new` など）を経由する必要がある
- 名前を作って束縛できる。var を定義する `def`、レキシカルな束縛を作る `let`、動的な束縛を作る `binding` である

### 特殊形式は関数ではない

特殊形式は強力だが、関数ではない。たとえば、特殊形式を `apply` することはできないし、var に保存しておくことも、シーケンスライブラリのフィルタに使うこともできない。つまり、**特殊形式は言語の第一級市民ではない。**

### 特殊形式の問題点と解決法

特殊形式の特殊性はコードの繰り返しを多くし、保守を難しくする原因となる。この問題は[[macro|マクロ]]を使うと解決できる。すべての言語機能はマクロ展開時における第一級の機能であると言える。

特殊形式を生成するマクロは書くのが難しいが、その効果も大きい。そのようなマクロは言語に新しい機能を追加してくれるようにも見える。

### マクロの分類

Clojure と contrib ライブラリにあるマクロは、ほとんどすべてが[[Programming Clojure, Third Edition 第8章 いつマクロを使うべきか|いつマクロを使うべきか]]のルールに従っている。また、それらのマクロは次の分類表の 1 つ以上のカテゴリに当てはまる。

| マクロにしている理由 | カテゴリ        | 例                                                      |
| -------------------- | --------------- | ------------------------------------------------------- |
| 特殊形式             | 条件的な評価    | `when`, `when-not`, `and`, `or`, `comment`              |
| 特殊形式             | var の定義      | `defn`, `defmacro`, `defmulti`, `defstruct`, `declare`  |
| 特殊形式             | Java の呼び出し | `..`, `doto`, `import-static`                           |
| 呼び出し側の便利さ   | 評価の遅延      | `lazy-cat`, `lazy-seq`, `delay`                         |
| 呼び出し側の便利さ   | 評価を包む      | `with-open`, `dosync`, `with-out-str`, `time`, `assert` |
| 呼び出し側の便利さ   | lambda の省略   | （「評価を包む」と同じ）                                |

このカテゴリを 1 つずつ見ていく。

### 1. 条件的な評価

マクロは引数をすぐに評価しないので、新しい制御構造を作るのに使える。条件的な評価を行うためのマクロは、読むのも書くのも比較的簡単であることが多い。共通するフローは次のとおりである。

- まず、ある引数（条件）を評価する
- その結果に応じて、必要であれば評価すべき引数を選ぶ

`and` マクロはこのよい例である。

#### and マクロ

```clojure
(and & exprs)
```

```clojure
(defmacro and
  ([] true)
  ([x] x)
  ([x & next]
   `(let [and# ~x]
      (if and# (and ~@next) and#))))
```

`and` は再帰的に定義されている。引数がない場合と 1 個の場合が基底を作る。

- 引数がなければ `true` を返す

  ```clojure
  ([] true)
  ```

- 引数が 1 つなら、それをそのまま返す

  ```clojure
  ([x] x)
  ```

2 つ以上の引数が渡された場合、`and` は最初の引数を条件として使い、評価を行う。

```clojure
([x & next]
   `(let [and# ~x]
      (if and# (and ~@next) and#)))
```

条件が真ならば、`rest` に対して `and` を再帰的に適用し、残りの引数を処理する。`and` は最初に真でない値を見つけたら残りの引数の評価をキャンセルする必要があるので、マクロでなければならない。

#### or マクロ

`and` があるならば、その対になる `or` マクロもある。

```clojure
(or & exprs)
```

違いは、`and` が最初に論理的に偽であったところで評価を止めるのに対し、`or` は真であったところで評価を止める点である。

```clojure
(and 1 0 nil false) ; nil
(or 1 0 nil false)  ; 1
```

#### comment マクロ

```clojure
(comment & exprs)
```

`comment` は引数のどれも評価しない。ソースファイルの末尾に置かれて、API の用途を示すのに使われる。たとえば、inspector ライブラリでは、次のように `comment` マクロが使われている。

```clojure
(comment

(load-file "src/inspector.clj")
(refer 'inspector)
(inspect-tree {:a 1 :b 2 :c [1 2 3 {:d 4 :e 5 :f [6 7 8]}]})
(inspect-table [[1 2 3][4 5 6][7 8 9][10 11 12]])

)
```

### 2. var を作る

var は `def` 特殊形式で作られる。他の var を作るフォームは、最終的に `def` を呼ぶ形に展開される必要がある。したがって、`defn`、`defmacro`、`defmulti` はすべてマクロとして実装されている。

var を作るマクロの例として、`defstruct` と `declare` を見ていく。

#### create-struct 関数と defstruct マクロ

`defstruct` は `defrecord` の前身にあたるマクロで、現在は obsoleted とされており、使われることはない。

Clojure は構造体を作り出す低レベルの関数 `create-struct` を持っている。

```clojure
(create-struct & key-symbols)
```

`create-struct` を使って、`person` 構造体を作る。

```clojure
(def person (create-struct :first-name :last-name))
```

`create-struct` は正常に動作するが、見た目が無駄に複雑になる。ほとんどの場合、新しい構造体は即座に `def` で名前が付けられるので、`def` と `create-struct` を一度にできる `defstruct` を呼ぶほうが一般的である。

```clojure
(defstruct name & key-symbols)
```

`defstruct` は簡単なマクロで、次のように定義されている。

```clojure
(defmacro defstruct
  [name & keys]
  `(def ~name (create-struct ~@keys)))
```

#### declare マクロ

このマクロを使うと、複数の var の名前を定義できる。

```clojure
(declare & names)
```

たとえば、次のコードを、

```clojure
(def a)
(def b)
(def c)
(def d)
```

1 行で書ける。

```clojure
(declare a b c d)
```

`declare` は次のように定義されている。

```clojure
(defmacro declare
  [& names]
	`(do ~@(map #(list 'def (vary-meta % assoc :declared true)) names)))
```

### 3. Java の呼び出し

Clojure が Java を呼び出すには、`.`（ドット）、`new`、`set!` の特殊形式を経由する。この `set!` は Java オブジェクトのフィールドの値を変えるもので、[[Programming Clojure, Third Edition 第6章 var でスレッドごとの状態を管理|var を変更する set!]] とは別物である。

しかし、通常の Clojure コードは、これらを直接呼ぶ代わりに `..`（メンバアクセスのチェイン）や `doto` マクロを使ったほうが簡単になる。そして、マクロを使えば誰でも、Clojure から Java への呼び出し方を拡張できる。

#### import-static マクロ

たとえば、次のようなシナリオを考える。`java.lang.Math` の定数やスタティックメソッドを頻繁に使うコードを書いているとする。

```clojure
Math/PI ; 3.141592653589793
(Math/pow 10 3) ; 1000.0
```

この調子でコードを書くと、接頭辞の `Math/` が邪魔に思えてくるので、`PI` や `pow` と書ければよいと思う。Clojure には直接そうする手段はないが、必要な var を手で定義することはできる。

```clojure
(def PI Math/PI)
(defn pow [b e] (Math/pow b e))
```

Stuart Sierra による `import-static` マクロを使うと、このパターンを自動化できる。実装コードは次のとおり。

```clojure
(ns ^{:author "Stuart Sierra",
      :doc "Import static Java methods/fields into Clojure"}
  examples.import-static
  (:use clojure.set))

(defmacro import-static
  "Imports the named static fields and/or static methods of the class
  as (private) symbols in the current namespace.

  Example:
      user=> (import-static java.lang.Math PI sqrt)
      nil
      user=> PI
      3.141592653589793
      user=> (sqrt 16)
      4.0

  Note: The class name must be fully qualified, even if it has already
  been imported.  Static methods are defined as MACROS, not
  first-class fns."
  [class & fields-and-methods]
  (let [only (set (map str fields-and-methods))
        the-class (. Class forName (str class))
        static? (fn [x]
                    (. java.lang.reflect.Modifier
                       (isStatic (. x (getModifiers)))))
        statics (fn [array]
                    (set (map (memfn getName)
                              (filter static? array))))
        all-fields (statics (. the-class (getFields)))
        all-methods (statics (. the-class (getMethods)))
        fields-to-do (intersection all-fields only)
        methods-to-do (intersection all-methods only)
        make-sym (fn [string]
                     (with-meta (symbol string) {:private true}))
        import-field (fn [name]
                         (list 'def (make-sym name)
                               (list '. class (symbol name))))
        import-method (fn [name]
                          (list 'defmacro (make-sym name)
                                '[& args]
                                (list 'list ''. (list 'quote class)
                                      (list 'apply 'list
                                            (list 'quote (symbol name))
                                            'args))))]
    `(do ~@(map import-field fields-to-do)
         ~@(map import-method methods-to-do))))
```

```clojure
(import-static class & members)
```

このマクロは Java クラス `class` から、`members` に与えられた名前を持つ静的メンバをローカルな名前空間にインポートする。これにより、`Math` から必要なメンバをインポートできる。

```clojure
(import-static java.lang.Math PI pow)

PI ; 3.141592653589793
(pow 10 3) ; 1000.0
```

### 4. 評価の遅延

Clojure のシーケンスの多くは[[lazy-sequence|遅延シーケンス]]である。遅延シーケンスを組み立てるとき、シーケンスが実際に評価されるときまで、いくつかの式の実行を遅らせたいケースがある。すぐに評価しないためにはマクロが必要になる。

[[Programming Clojure, Third Edition 第4章 Functional Programming|第4章]]で出てきた `lazy-seq` マクロは、そういったマクロの一つである。もう一つの例は `delay` である。

#### delay マクロと force 関数

```clojure
(delay & exprs)
```

このマクロを呼ぶと、`exprs` を内部で保持した delay オブジェクトが返される。`exprs` の実行は、それが要求されるときまで遅延される。実際の例を見てみる。

```clojure
(def slow-calc (delay (Thread/sleep 5000) "done!"))
```

delay オブジェクトを実行するには、`force` を使う。

```clojure
(force x)
```

何度か `slow-calc` に適用してみる。

```clojure
(force slow-calc) ; "done!"
(force slow-calc) ; "done!"
```

最初に delay を `force` すると、delay の中の式が評価され、**結果がキャッシュされる**。2 度目以降の `force` は、単にそのキャッシュ値を返す。

### 5. 評価を包む

与えられたいくつかのフォームの前後に新しい意味を追加して、評価を「**包む**」マクロはたくさんある。

- `time` マクロ: タイマーをスタートし、フォームを実行し、最後にどれだけ時間がかかったかを報告する
- `let`、`binding` マクロ: 束縛を作り、フォームを実行し、最終的に束縛を破棄する
- `with-open` マクロ: ファイルや他のリソースを取り、フォームを実行し、その後 finally ブロックでリソースがクローズされるようにする
- `dosync` マクロ: フォームをトランザクション中（STM）で実行する

他の例として、`with-out-str` というマクロもある。

#### with-out-str マクロ

```clojure
(with-out-str & exprs)
```

このマクロは `*out*` を一時的に新しい `StringWriter` に束縛し、`exprs` を評価して、評価中に `*out*` へ出力されたものを文字列にして返す。これを使うと、`print` と `println` で文字列を組み立てられる。

```clojure
(with-out-str (print "hello, ") (print "world"))
; "hello, world"
```

`with-out-str` の実装は簡単な構造に従っており、似たようなマクロを書くときのテンプレートとして使える。

```clojure
(defmacro with-out-str
  [& body]
  `(let [s# (new java.io.StringWriter)]
     (binding [*out* s#]
       ~@body
       (str s#))))
```

#### ラッパーマクロの基本構造

ラッパーマクロは評価するフォームを可変長引数で受け取る。

```clojure
  [& body]
```

その後、次の 3 つのステップを実行するコードを作る。

1. **準備**: 評価に必要な環境を作る。必要に応じて、`let` や `binding` で束縛を導入することも含まれる

   ```clojure
     `(let [s# (new java.io.StringWriter)]
        (binding [*out* s#]
   				; ...
   ```

2. **評価**: 渡されたフォームを評価する。通常は複数フォームが渡ってくるので、スプライシングアンクォート（`~@`）でフォームを挿入する

   ```clojure
   ~@body
   ```

3. **後処理**: 1 の環境を元に戻し、適切な値を返す

   ```clojure
   (str s#))))
   ```

#### ラッパーマクロ実装時の注意事項

ラッパーマクロを書くときは、後処理のために `finally` ブロックが必要かを検討すべきである。

`with-out-str` では後処理を行っていないが、`let` や `binding` はフォームを抜けるときに束縛を無効にしてくれるので、それで済んでいる。しかし場合によっては（グローバルやスレッドローカルな状態を Java API を通して変更した場合など）、`finally` でその状態を確実に元に戻す必要がある。

#### ラッパーマクロ内で動作が変わるコード

`print` や `println` のように、ラッパーマクロ中で実行されると動作が変わるコードは、明らかに純粋ではない。`with-out-str` のように `binding` を使うマクロは、他の場所で定義された純粋でない関数の振る舞いを変えることを目的としている。

ただし、すべてのラッパーマクロが、包み込むコードの振る舞いを変えるわけではない。たとえば `time` マクロは、単に関数の実行時間を測定するだけである。`assert` マクロもこれに該当する。

#### assert マクロ

```clojure
(assert expr)
```

`assert` は式を実行し、論理的に真でなければ例外を投げる。

```clojure
(assert (= 1 1)) ; nil

(assert (= 1 2))
;; java.lang.AssertionError: Assert failed: (= 1 2)
```

この `assert` や `time` は、[[Programming Clojure, Third Edition 第8章 いつマクロを使うべきか|いつマクロを使うべきか]]の第 1 のルール「マクロを書くな」を破っている。これは、lambda を避けるために書いている。

### 6. lambda を避ける

[歴史的な理由](https://ja.wikipedia.org/wiki/%E7%84%A1%E5%90%8D%E9%96%A2%E6%95%B0)から、[[anonymous-function|無名関数]]は lambda と呼ばれる。マクロを使うと、引数を lambda に包んで渡さなければならない関数呼び出しを置き換えられる。

たとえば、[[Programming Clojure, Third Edition 第8章 マクロを簡単にする|マクロの中で名前を作る]]で作った `bench` マクロは、関数でも書ける。

```clojure
(defn bench-fn [f]
  (let [start (System/nanoTime)
        result (f)]
    {:result result :elapsed (- (System/nanoTime) start)}))
```

しかし、`bench-fn` を呼び出すときには、実行したいフォームを関数で包む必要がある。

```clojure
(bench-fn (fn [] (+ 1 2)))
; {:result 3, :elapsed 38125}

(bench (+ 1 2))
; {:result 3, :elapsed 29333}
```

このように関数で実装すると、**呼び出し側に無名関数を使うことを強いる**ことになる。また、無名関数には呼び出しのオーバーヘッドがかかる。`bench` の目的は時間計測なので、オーバーヘッドはできるだけ避けるのが望ましい。

## キーワード

- [[macro|マクロ]]
- [[special-form|特殊形式]]
- [[first-class-citizen|第一級オブジェクト]]
- [[lazy-sequence|遅延シーケンス]]
- [[lazy-evaluation|遅延評価]]
- [[anonymous-function|無名関数]]
- [[pure-function|純粋関数]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
