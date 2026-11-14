---
title: めだかのclojure.core学校 第1章 clojure.core の数値に関する var
description: Clojure の数値リテラルと型、型変換、数値の判定、比較、四則演算を行う clojure.core の Var をまとめた節
tags: [book-chapter, clojure]
date: 2024-11-28
book: "[[めだかのclojure.core学校]]"
chapter: 1
---

## TL;DR

- [[clojure|Clojure]] の整数は `java.lang.Long`、小数は `java.lang.Double` で生成される。リテラルの書き方で `BigInt` や `BigDecimal` も作れる。
- clojure.core には、型変換、数値の判定、比較、四則演算の関数がそろっている。`+` などは[[integer-overflow|オーバーフロー]]するとエラーになり、`+'` などを使うと自動で `BigInt` に昇格する。

## 内容

### 数値リテラル

整数は `java.lang.Long`、小数は `java.lang.Double` で生成される。末尾に `N` を付けると `clojure.lang.BigInt`、`M` を付けると `java.math.BigDecimal` になる。`long` の最大値を超える整数を書くと、自動で `BigInt` になる。

```clojure
(type 1)                   ; java.lang.Long
(type 1.0)                 ; java.lang.Double
(type 1N)                  ; clojure.lang.BigInt
(type 1M)                  ; java.math.BigDecimal
(type 9223372036854775808) ; clojure.lang.BigInt
```

非数（NaN）と正負の無限大は `##NaN`、`##Inf`、`##-Inf` と書き、どれも `java.lang.Double` になる。整数のリテラルでは基数を指定できる。2 進数は `2r`、8 進数は先頭の `0`、16 進数は `0x` で、`36r` のように 36 進数まで指定できる。基数を指定しつつ末尾に `N` を付けて `BigInt` を作ることもできる。

```clojure
[2r101 017 0x1f 36rCRAZY] ; [5 15 31 21429358]
(type 0x1fN)              ; clojure.lang.BigInt
```

### 型変換

型ごとに変換用の関数がある。`byte`、`short`、`int`、`long`、`bigint`、`biginteger`、`float`、`double`、`bigdec` は、それぞれ対応する型に変換する。`bigint` が返す `clojure.lang.BigInt` は、末尾 `N` のリテラルと同じ型で、`java.math.BigInteger` よりパフォーマンスが高い。`num` は `java.lang.Number` に変換し、主に型チェックに使う。

```clojure
(map #(-> 42 % type) [byte short int long bigint biginteger float double bigdec])
;; (java.lang.Byte java.lang.Short java.lang.Integer java.lang.Long
;;  clojure.lang.BigInt java.math.BigInteger java.lang.Float
;;  java.lang.Double java.math.BigDecimal)
```

文字列から数値への変換には、`parse-long` と `parse-double` を使う。どちらも変換できない文字列には `nil` を返す。

```clojure
(type (parse-long "42"))   ; java.lang.Long
(type (parse-double "42")) ; java.lang.Double
(parse-long "abc")         ; nil
```

### 数値の判定

型を判定する述語関数として、固定精度の整数（`java.lang.Long` など）かを返す `int?`、整数かを返す `integer?`、浮動小数点数かを返す `float?`、`BigDecimal` かを返す `decimal?`、`java.lang.Number` かを返す `number?` がある。

数直線上の位置を判定する関数として `zero?`、`pos?`、`neg?` があり、`NaN?` と `infinite?` は非数と無限大を判定する。これらに数値以外を渡すと `ClassCastException` になる。

```clojure
(map (juxt neg? zero? pos?) [-1.0 0.0 -0.0 1 1.2])
;; ([true false false] [false true false] [false true false]
;;  [false false true] [false false true])

(map (juxt NaN? infinite?) [1.0 ##NaN ##Inf ##-Inf])
;; ([false false] [true false] [false true] [false true])
```

整数については、偶数かを返す `even?`、奇数かを返す `odd?` がある。`pos-int?`、`neg-int?`、`nat-int?` は、それぞれ正、負、0 以上の固定精度整数かを判定する。

```clojure
(map (juxt even? odd?) [-2 -1 0 1 2])
;; ([true false] [false true] [true false] [false true] [true false])

(map (juxt neg-int? pos-int? nat-int?) [-1 0 1 1.2])
;; ([true false false] [false false true] [false true true] [false false false])
```

### 比較

`<`、`<=`、`==`、`>=`、`>` は、引数を `java.lang.Number` として比較する。数値以外を渡すと `ClassCastException` になる。ただし引数が 1 つだけなら、最適化のため値を見ずに必ず `true` を返す。

```clojure
(< "a" "b") ; ClassCastException
(< "a")     ; true
```

### 四則演算

`+` と `*` は可変長の引数を取る。引数がなければ、それぞれの単位元である `0` と `1` を返す。`-` と `/` は、引数が 1 つなら符号の反転や逆数を返し、2 つ以上なら 1 つ目の引数から順に演算する。

```clojure
(+)        ; 0
(*)        ; 1
(- 2)      ; -2
(/ 2)      ; 1/2
(- 10 2 3) ; 5
(/ 10 2 3) ; 5/3
```

`+`、`*`、`-` は、`Long` の範囲を超えると `ArithmeticException` になる。`+'`、`*'`、`-'` を使うと、自動で `BigInt` に昇格するのでエラーにならない。`inc` と `dec` に対する `inc'` と `dec'` も同じである。

```clojure
(+ Long/MAX_VALUE 1)   ; ArithmeticException
(+' Long/MAX_VALUE 1)  ; 9223372036854775808N
(inc' Long/MAX_VALUE)  ; 9223372036854775808N
```

`quot` は除算の商を返す。余りを返す関数は 2 つあり、`rem` は被除数と同じ符号、`mod` は除数と同じ符号の結果を返す。

```clojure
(quot 10 3) ; 3
(rem -10 3) ; -1
(mod -10 3) ; 2
```

`abs` は絶対値を返す。ただし `Long/MIN_VALUE` を渡すと、そのままの値を返す。

```clojure
(map abs [-1 0 1])   ; (1 0 1)
(abs Long/MIN_VALUE) ; -9223372036854775808
```

## キーワード

- [[clojure|Clojure]]
- [[clojure-var|Var]]
- [[integer-overflow|オーバーフロー]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
