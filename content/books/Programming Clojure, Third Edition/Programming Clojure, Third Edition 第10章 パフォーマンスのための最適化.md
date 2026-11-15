---
title: Programming Clojure, Third Edition 第10章 パフォーマンスのための最適化
description: 測定してから型ヒントでリフレクションを避け、無検査、デフォルト、自動格上げの 3 種類の整数演算子とプリミティブ型の型ヒントを使い分けて、必要な部分だけを最適化する
tags: [book-chapter, clojure]
date: 2023-09-20
book: "[[Programming Clojure, Third Edition]]"
chapter: 10
---

## TL;DR

- 最適化は呼び出し側の変更を必要としないので、まず動くコードを書き、問題が出たら測定して、必要最低限の変更を加える。
- 型ヒントを付けると、Clojure は遅いリフレクションを避けてクラスキャストを挿入する。`*warn-on-reflection*` で型を推測できない箇所が分かる。
- 整数演算子には、無検査、デフォルト、自動格上げの 3 種類がある。プリミティブ型の型ヒントで速くなるが、アルゴリズムの改善のほうが効く。

## 内容

[[clojure|Clojure]] では、[[Programming Clojure, Third Edition 第2章 Exploring Clojure|第2章]]で示した方法で Java を呼び出すことはよくある。このように書いたコードのほとんどは、十分なパフォーマンスを発揮する。

しかし、**局所的に変更を加えて、パフォーマンスを向上させる**こともできる。この最適化は呼び出し側の変更を必要としないので、まず動作するコードを書いて、必要な部分だけをチューニングすればよい。

パフォーマンスを向上させるうえで大切なのは、次の流れである。

1. 適切なアルゴリズムを選び、正しく動くコードを書く
2. **パフォーマンスに問題が出た段階で、実際に測定**し、問題を特定する
3. その問題を解決するための**必要最低限の変更**を加える

### 型ヒントを追加する

Clojure の[[type-hint|型ヒント]]は、主にパフォーマンスの向上のために使う。Clojure は関数の仮引数、`let` による束縛、変数名、式に型ヒントを付けられる。型ヒントには 2 つの目的がある。

- 性能上クリティカルなパスの最適化
- 要求されている型のドキュメント化

たとえば、Java のクラスに関する情報を返す次の関数を考える。

```clojure
(defn describe-class [c]
  {:name (.getName c)
   :final (java.lang.reflect.Modifier/isFinal (.getModifiers c))})
```

#### \*warn-on-reflection\*

特殊変数 `*warn-on-reflection*` に `true` をセットすると、Clojure がどのくらい型情報を推測しているかを知ることができる。`set!` については [[Programming Clojure, Third Edition 第6章 var でスレッドごとの状態を管理|set! マクロ]]を参照。

```clojure
(set! *warn-on-reflection* true) ; true
```

これを `true` にした状態で `describe-class` を呼び出すと、コンパイル時に警告が出る。

```clojure
;; Reflection warning: reference to field getName can't be resolved.
;; Reflection warning: reference to field getModifiers can't be resolved.
```

これらの警告は、Clojure では `c` の型が推測できないことを示している。これを解決するには、`c` は `Class` であるという型ヒントを与えればよい。

```clojure
(defn describe-class [^Class c]
  {:name (.getName c)
   :final (java.lang.reflect.Modifier/isFinal (.getModifiers c))})
```

型ヒントにより、警告は表示されなくなった。また、`Class` 以外のものを渡すと、`ClassCastException` が投げられる。

#### クラスキャストが挿入される条件

型ヒントを与えると、Clojure は遅い[[reflection|リフレクション]]メソッドの呼び出しを避けて、必要なクラスキャストを挿入する。ただし、ヒントを付けたオブジェクトに対して Java のメソッド呼び出しを一切行わなければ、Clojure はキャストしない。

例として、次の関数を考える。

```clojure
(defn wants-a-string [^String s] (println s))
```

この関数は文字列以外の値を渡しても普通に動作する。

```clojure
(wants-a-string "foo")
;; foo

user> (wants-a-string 0)
;; 0
```

Clojure は、`wants-a-string` がその引数を文字列として扱っていないことを解析できる。

### 整数演算

Clojure は整数型に対して 3 種類の演算子を提供している。

- 無検査演算子（Unchecked operators）
- デフォルト演算子（Default operators）
- 自動格上げ演算子（Promoting operators）

これらの例を表にまとめる。

| 無検査               | デフォルト | 自動格上げ |
| -------------------- | ---------- | ---------- |
| `unchecked-add`      | `+`        | `+'`       |
| `unchecked-subtract` | `-`        | `-'`       |
| `unchecked-multiply` | `*`        | `*'`       |
| `unchecked-inc`      | `inc`      | `inc'`     |
| `unchecked-dec`      | `dec`      | `dec'`     |

#### 無検査演算子

無検査演算子は Java のプリミティブな演算にそのまま対応する。高速だが、非常に危険である。オーバーフローしても何も言わず、間違った答えを返す。

Clojure ではオーバーフロー時に溢れた桁を無視したいケースや、パフォーマンス重視でオーバーフローが決して起きないか起きても問題ないケースでのみ使うべきである。

```clojure
(unchecked-add 9223372036854775807 1) ; -9223372036854775808
```

#### デフォルト演算子

デフォルト演算子は可能ならパフォーマンスのために Java のプリミティブな演算を使うが、常にオーバーフロー検査をして例外を投げる。

```clojure
(+ 9223372036854775807 1)
;; java.lang.ArithmeticException: long overflow
```

#### 自動格上げ演算子

自動格上げ演算子はオーバーフロー時に自動的にプリミティブな整数を多倍長整数へと格上げする。

値の範囲を気にせずにコードを書けるが、**性能へのオーバーヘッドは大きい**。また、プリミティブ型と多倍長整数型は共通の型を継承していないので、この演算子の戻り値はプリミティブ型ではない。

```clojure
(+' 9223372036854775807 1)
; 9223372036854775808N
```

Clojure は任意精度の 10 進数に Java の `BigDecimal` クラスを使っている。`BigDecimal` はどの精度でも扱えるが、**演算が Java の浮動小数点プリミティブと比べてはるかに遅い**。

#### Clojure の BigInt クラス

Clojure は `BigInteger` への変換を処理するために、独自の `BigInt` クラスを用意している。`BigInt` は、Java の `BigInteger` を直接使う場合と比べて少しパフォーマンスが高い。また、`BigInteger` の使い勝手が悪い箇所（e.g. `hashCode` の実装）を直している。

#### BigInt の内部

内部的には、Clojure も Java も `BigInteger` を使っている。パフォーマンスの違いは、`BigInt` がどのような値を扱うかで決まる。

`BigInt` は `Long` フィールドと `BigInteger` フィールドを持っていて、`BigInt` の値が `Long` に収まる場合は `Long` フィールドを使う。また、`BigInt` に対する演算の結果が `Long` に収まる場合も、`Long` フィールドを使う。接尾辞 `N` が付いた数値でも、**必要になるまで `BigInteger` は使われず、極力 `Long` が使われる。**

### プリミティブ型を使う

ここまでの章では、関数の引数に型の情報が付いていなかった。Clojure は何も指示しなくても、よしなにやってくれる。しかし、これは強みにも弱みにもなる。

- 強み: コードが簡潔になり、[[duck-typing|ダックタイピング]]の恩恵を受けられる
- 弱み: コードを読む人が引数の型について不安になったり、よしなにやることがパフォーマンスのオーバーヘッドになったりする

#### 1 から n までの和を計算する関数を愚直に書く

```clojure
(defn sum-to [n]
  (loop [i 1 sum 0]
    (if (<= i n)
      (recur (inc i) (+ sum i))
      sum)))
```

小さな数を与えて、動作するかをテストする。

```clojure
(sum-to 10) ; 55
```

#### time と dotimes でパフォーマンスを測定する

時間を測定するには、`time` を使うとよい。

通常、ベンチマークを測定するときは、**何度か計算を繰り返して、起動のオーバーヘッドや例外的な値を取り除く**のが普通である。特に JVM 言語や GC を行う言語は、タイミングによっては数値が高く出る場合もあるので、繰り返し実行するのが大切である。Clojure では `dotimes` を使える。

```clojure
(dotimes bindings & body)
```

実際にこれらを使って、`sum-to` を測定する。

```clojure
(dotimes [_ 5] (time (sum-to 1000)))
;; "Elapsed time: 0.124916 msecs"
;; "Elapsed time: 0.094209 msecs"
;; "Elapsed time: 0.089833 msecs"
;; "Elapsed time: 0.089833 msecs"
;; "Elapsed time: 0.089583 msecs"
```

#### 型ヒントを付けてパフォーマンスを上げる

パフォーマンスを上げるために、引数と戻り値に `long` という型ヒントを付けられる。Clojure の型推論はこの型ヒントを関数内の演算や他の関数呼び出しに伝搬させる。

```clojure
(defn integer-sum-to ^long [^long n]
  (loop [i 1 sum 0]
    (if (<= i n)
      (recur (inc i) (+ sum i))
      sum)))
```

実際にパフォーマンスを測定すると、明らかに速くなっている。

```clojure
(dotimes [_ 5] (time (integer-sum-to 1000)))
;; "Elapsed time: 0.091625 msecs"
;; "Elapsed time: 0.052291 msecs"
;; "Elapsed time: 0.047208 msecs"
;; "Elapsed time: 0.047333 msecs"
;; "Elapsed time: 0.049834 msecs"
```

#### Java の無検査演算を使ってみる

Java のプリミティブ演算である無検査演算を使うと、よりパフォーマンスを向上できる。

```clojure
(defn unchecked-sum-to ^long [^long n]
  (loop [i 1 sum 0]
    (if (<= i n)
      (recur (inc i) (unchecked-add sum i))
      sum)))
```

```clojure
(dotimes [_ 5] (time (unchecked-sum-to 1000)))
;; "Elapsed time: 0.114166 msecs"
;; "Elapsed time: 0.036375 msecs"
;; "Elapsed time: 0.03375 msecs"
;; "Elapsed time: 0.032125 msecs"
;; "Elapsed time: 0.032333 msecs"
```

#### 無検査演算を使えるようにしている理由

Clojure が無検査演算を提供しているのは、この動作を期待するライブラリとやり取りする必要があるケースや、最大限パフォーマンスを上げる必要があるケースに対応できるようにするためである。

#### 正確さとパフォーマンスのバランスを取りたい場合

まず `sum-to` のように単純で愚直なコードを書き、**実際に測定**して、ボトルネックが明らかになったらそこだけプリミティブな型を使うようにすればよい。

#### よりよい sum-to の実装

`sum-to` はわざと愚直な方法で書いたが、実際の Clojure プログラムでは `reduce` で表現したほうが分かりやすい。

```clojure
(defn better-sum-to [n]
  (reduce + (range 1 (inc n))))
```

ただし、数列の知識があれば、次のようにも書ける。

```clojure
(defn best-sum-to [n]
  (/ (* n (inc n)) 2))
```

この関数は型ヒントを付けなくても、どのコードよりもパフォーマンスが良い。

```clojure
(dotimes [_ 5] (time (best-sum-to 1000)))
;; "Elapsed time: 0.087458 msecs"
;; "Elapsed time: 0.0045 msecs"
;; "Elapsed time: 0.003208 msecs"
;; "Elapsed time: 0.003417 msecs"
;; "Elapsed time: 0.002583 msecs"
```

## キーワード

- [[type-hint|型ヒント]]
- [[reflection|リフレクション]]
- [[benchmark-test|ベンチマーク]]
- [[duck-typing|ダックタイピング]]
- [[integer-overflow|整数オーバーフロー]]
- [[java-interop|Java 相互運用]]

## 自分の理解

無検査演算でパフォーマンスが上がると言われているが、実際に測定すると、速くはなっているがそこまでではない。無検査演算は速度向上のメリットより、オーバーフローなどでデータを壊しうるデメリットのほうが大きいように思える。
