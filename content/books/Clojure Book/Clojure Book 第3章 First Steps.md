---
title: Clojure Book 第3章 First Steps
description: Clojure の算術計算、数値型と文字列型、def と let による変数の定義、.clj ファイルの実行方法を扱う章
tags: [book-chapter, clojure]
date: 2023-08-16
book: "[[Clojure Book]]"
chapter: 3
---

## TL;DR

- [[clojure|Clojure]] の算術計算と、`Long`、`Double`、`Ratio`、`String` などの基本的な型を扱う。
- `def` でグローバル変数を、`let` でローカル変数を定義する。`.clj` ファイルは `clj` コマンドで実行できる。

## 内容

### 算術計算

`/` に整数値を渡すと、`Long` か `Ratio` 型の値が返ってくる。

```clojure
(/ 1 2)   ;; 1/2
(/ 210 3) ;; 70
```

浮動小数点数を渡すと、戻り値も浮動小数点数（`Double`）になる。

```clojure
(/ 1 2.0) ;; 0.5
(/ 210 3) ;; 70.0
```

商と余りを求めるには、`quot` と `rem` を使う。

```clojure
(quot 14 5) ;; 2
(rem 14 5)  ;; 4
```

次の式を評価すると、N の付いた整数（`BigInt`）が返ってくる。

```clojure
(* (/ 22 7) (* 7 7)) ;; 154N
```

ただし、どれか 1 つを浮動小数点数にすると、戻り値も浮動小数点数になる。

```clojure
(* (/ 22 7) (* 7 7.0)) ;; 154.0
```

円周率や累乗など、数学に関する処理は `Math` ライブラリにまとまっている。

```clojure
(* Math/PI (* 7 7))        ;; 153.93804002589985
(* Math/PI (Math/pow 7 2)) ;; 153.93804002589985
```

### 数値型

Clojure の整数は `Long` 型である。型を確かめるには `type` を使う。

```clojure
(type 147) ;; java.lang.Long
```

浮動小数点数は `Double` 型である。

```clojure
(type 147.56) ;; java.lang.Double
(type Math/PI) ;; java.lang.Double
```

算術計算で出てきた `1/2` のような分数は、`Ratio` 型である。

```clojure
(type (/ 1 2)) ;; clojure.lang.Ratio
```

`double` を使うと、渡した整数を `Double` に変換できる。

```clojure
(double 32) ;; 32.0
(type (double 32)) ;; java.lang.Double
```

`long` を使うと、渡した浮動小数点数を `Long` に変換できる。

```clojure
(long 147.56) ;; 147
(type (long 147.56)) ;; java.lang.Long
```

### 文字列型

文字列は `String` 型である。

```clojure
(type "Hello") ;; java.lang.String
```

`str` を使うと、文字列以外の値と結合できる。

```clojure
(str "1 + 2 is " (+ 1 2)) ;; "1 + 2 is 3"
```

`count` を使うと、文字数を取得できる。

```clojure
(count "Hello") ;; 5
```

Clojure は組み込みの [String ライブラリ](https://clojuredocs.org/clojure.string)を持っている。このライブラリには、`reverse` や `upper-case` といった便利な関数がある。

```clojure
(clojure.string/reverse "Hello") ;; "olleH"
```

```clojure
(clojure.string/upper-case "Hello") ;; "HELLO"
```

### 変数

`def` を使うと、プログラム中のどこでも使えるグローバル変数を定義できる。

```clojure
(def my-name "Radish") ;; #'user/my-name
```

```clojure
(println "Hello " my-name)
```

グローバル変数を使って、別のグローバル変数を定義することもできる。

```clojure
(def greeting (str "Hello " my-name "!"))
(println greeting)
```

あるコードブロック `()` の中だけで使うローカル変数を定義するには、`let` を使う。

```clojure
(let [local-variable "something"]
	(println local-variable))
```

こうして定義した変数は `(let …)` の外側では使えない。

```clojure
(println local-variable)
;; Syntax error compiling at (REPL:1:1).
;; Unable to resolve symbol: local-variable in this context
```

### ファイル内の Clojure を実行する

次のような `.clj` ファイルを作る。

```clojure
;; hello_world.clj
(println "Hello World")
```

保存して次のコマンドを実行すると、プログラムが動く。

```shell
$ clj hello_world.clj
> WARNING: Implicit use of clojure.main with options is deprecated, use -M
> Hello, World
```

## キーワード

- [[clojure|Clojure]]

## 自分の理解

[[common-lisp|Common Lisp]] と被っているところも多いので、知らなかったところだけピックアップした。
