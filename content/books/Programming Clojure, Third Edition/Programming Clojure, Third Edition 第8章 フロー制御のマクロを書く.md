---
title: Programming Clojure, Third Edition › フロー制御のマクロを書く
description: 関数では引数が先に評価されるので unless を defmacro で書き、特殊形式がパターンのカプセル化を邪魔すること、macroexpand でマクロ展開を確かめる方法、when と when-not を学ぶ
tags: [book-chapter, clojure]
date: 2023-09-16
book: "[[Programming Clojure, Third Edition]]"
chapter: 8
---

## TL;DR

- 関数は呼び出す前に引数をすべて評価するので、`unless` は関数では書けない。マクロは引数をすぐに評価しないので、`defmacro` で書ける。
- Java のような言語では、`if` や `new` などの特殊形式がパターンのカプセル化を邪魔し、デザインパターンが生まれる。マクロは何度も現れるパターンを括りだす間接的な層を提供する。
- `macroexpand-1` と `macroexpand` でマクロの展開を確かめられる。`when-not` は複数フォームを受け取れる改良版の `unless` である。

## 内容

### when-not マクロ（unless）

Ruby などの言語には、`if` とほぼ反対の動作をする `unless` というフォームがある。`unless` はテスト式を評価し、それが偽になったときに限り body を実行する。

[[clojure|Clojure]] には `unless` はないが、`when-not` というマクロがある。今回は簡単のために、`when-not` がないものとして `unless` を実装する。

### まずは関数で実装する

[[Programming Clojure, Third Edition 第8章 いつマクロを使うべきか|いつマクロを使うべきか]]に従って、関数で `unless` を書いてみる。

```clojure
(defn unless [expr form]
  (if expr nil form))
```

`expr` が `false` のときに、`unless` が正しく body を評価していることを確かめる。

```clojure
(unless false (println "this should print"))
;; this should print
```

これは動作するが、`true` を渡すとうまく動作しない。

```clojure
(unless true (println "this should not print"))
;; this should not print
```

Clojure が、**関数を呼び出す前に引数をすべて評価してしまう**ことが原因である。このことを確かめるために、`unless` の中に `println` を入れてみる。

```clojure
(unless false (println "this should print"))
;; this should print
;; About to test...

(unless true (println "this should not print"))
;; this should not print
;; About to test...
```

マクロを使うと、この問題を解決できる。マクロは引数をすぐに評価せず、マクロを書くプログラマが、引数が評価されるタイミングと条件を指定する。

### Clojure におけるマクロの処理

Clojure はマクロを 2 つのステップで処理する。

- **マクロ展開時処理**: マクロが展開（実行）され、その結果がプログラム中にあった位置に置き換えられる
- **コンパイル時処理**（通常のコード処理）

`unless` を書くということは、マクロ展開時に次のような変換を行う Clojure のコードを書くということである。

```clojure
(unless expr form) -> (if expr nil form)
```

次に、このコードがマクロであることを `defmacro` で Clojure に教える。

```clojure
(defmacro name doc-string? attr-map? [params*] body)
```

`defmacro` を使うと、`unless` は次のように書ける。

```clojure
(defmacro unless [expr form]
  (list 'if expr nil form))
```

REPL で動作を確かめると、期待した挙動が返ってくる。

```clojure
(unless false (println "this should print"))
;; this should print

(unless true (println "this should print"))
```

こういったことは、マクロが存在しない言語では不可能である。このような言語では、特殊形式が抽象化の邪魔をする。

### 特殊形式、デザインパターン、マクロ

Clojure では、コードはデータ構造で作られている。普通の関数呼び出しだけでなく、[[special-form|特殊形式]]やマクロもそうである。

#### さまざまな特殊形式を持つ言語 — Java

もっと構文をいろいろ持つ言語として、[[java|Java]] を考えてみる。Java では、コードを書くのに一番柔軟性の高いメカニズムはインスタンスメソッドである。Java のプログラムを書いていて、いくつかのインスタンスメソッドに共通して現れるパターンに気がついたとする。この場合、Java のすべての言語機能を使って、そういったパターンをカプセル化しようと試みる。

しかし、Java にはインスタンスメソッド以外にもたくさんの**特殊形式**（Special forms: 通常このようには呼ばれない）がある。たとえば、`if` は Java の特殊形式である。そして、**`if` が使われるパターンが何度も出てきた場合、それをカプセル化する方法はない。** `unless` を作る手段もないので、`if` の特定の使い方を決まり文句のように扱って `unless` をシミュレートするしかない。

```java
if (!something) ...
```

これは大した問題に見えないかもしれないし、`if (!foo)` を見て頭の中で `unless (foo)` に変換して理解することは、簡単にできるようになる。問題は、これが `if` だけの話ではない点である。言語の中の各特殊形式すべてがその形式に何度も現れるパターンをカプセル化するのを邪魔する。

#### デザインパターン

別の例を挙げる。`new` は Java の特殊形式である。しかし、`new` 自身はポリモーフィズムをサポートしない。したがって、ポリモーフィズムが必要な場面では、何らかの形でシミュレートする必要がある。たとえば、クラスメソッドを使った次のようなパターンである。

```java
Widget w = WidgetFactory.makeWidth(...);
```

このパターンはコードを必要以上に肥大させる。`WidgetFactory` という新しいクラスを作る必要もある。このクラスは解決したいドメインとはなんの関係もなく、単にコンストラクタの特殊形式の制限を回避するためだけに作られたコードである。

`unless` とは異なり、ポリモーフィズムなコンストラクタのパターンはかなり複雑で、複数の実装方法が考えられる。こういったパターンの総称を[[design-pattern|デザインパターン]]と呼ぶ。

デザインパターンは Wikipedia で「ソフトウェア設計において何度も経験される問題の、一般的で再利用可能な解決策である」、さらに「**直接**コードへ落とせるような完成した設計ではない」とある。

#### デザインパターンとマクロ

ここがマクロの活躍するところである。マクロは何度も現れるパターンなら**何でも**、その共通部分を括りだすための**間接的な層**を提供する。マクロとコードがデータでもあることは、互いに助け合って、パターンをカプセル化しながら言語を再構築することを可能にする。

特殊形式を多く備えることはプログラミング言語を学びやすく、読みやすくすると主張する人もたくさんいる。しかし、強力なマクロシステムと引き換えならば、豊富な構文を諦めることを厭わない。「コードがデータである」という概念に慣れれば、デザインパターンを自動化できることはとてつもない利点である。

### マクロの展開

#### マクロ定義内のクォート（'）

`unless` マクロではシンボル `if` にクォート（`'`）を付けていた。

```clojure
(defmacro unless [expr form]
  (list 'if expr nil form))
```

しかし、他のシンボルにはクォートが付いていない。これを理解するには、マクロ展開時に何が起きているかを考える必要がある。

- `'if` とすると、マクロ展開時に Clojure が `if` を評価するのを防ぐ。そして、コンパイル時にはクォートを外し、`if` そのものをコンパイラに渡す
- `expr` や `form` はマクロ引数なので、クォートを付けていない。Clojure はマクロ展開時に、それらの引数を渡された式に（評価せずに）置き換える
- `nil` は何度評価しても `nil` なので、クォートする必要はない

#### macroexpand-1

Clojure には、マクロ展開を REPL 上でテストできる `macroexpand-1` という関数がある。

```clojure
(macroexpand-1 form)
```

`unless` が想定どおり展開されるかを確かめる。

```clojure
(macroexpand-1 '(unless false (println "this should print")))
; (if false nil (println "this should print"))
```

#### 再帰的なマクロと macroexpand

マクロの展開結果が他のマクロを呼び出していることもある。Clojure は普通のコードだけになるまで、すべてのマクロを繰り返し展開する。

たとえば `..` マクロは、与えられた引数の最初のシンボルに対するドット演算子を展開する、というのを繰り返す。

```clojure
(macroexpand-1 '(.. arm getHand getFinger))
; (.. (. arm getHand) getFinger)
```

`..` をすべて展開したい場合は、`macroexpand` を使える。

```clojure
(macroexpand '(.. arm getHand getFinger))
; (. (. arm getHand) getFinger)
```

#### and マクロ

`and` も再帰的なマクロの 1 つである。`and` に 2 つ以上の引数を渡すと、展開結果には引数が 1 つ少ない `and` の呼び出しが含まれる。

```clojure
(macroexpand '(and 1 2 3))
; (let* [and__5579__auto__ 1]
;   (if and__5579__auto__ (clojure.core/and 2 3)
;   and__5579__auto__))
```

注意点として、`macroexpand` はすべてを展開するわけではなく、一番外側のフォームだけを展開する。したがって、`and` の展開で作られる `and` はネストしたフォームの内側にあるので、展開されない。

### when と when-not

実装した `unless` が複数フォームを受け取れるようにすると便利である。現状、複数フォームを渡すとエラーを返す。

```clojure
(unless false (println "this") (println "and also this"))
;; java.lang.ArityException:\
;; Wrong number of args (3) passed
```

これを解決するには、可変長引数リストを取り、その先頭に `do` を付けたフォームを作って、リストがすべて実行されるようにする必要がある。Clojure の `when` と `when-not` は、まさにそのように動作する。

```clojure
(when test & body)
(when-not test & body)
```

#### when-not マクロ

この `when-not` が、実装したい改良版の `unless` である。

```clojure
(when-not false (println "this") (println "and also this"))
;; this
;; and also this
```

`when-not` の実装は次のようになっている。

```clojure
(defmacro when-not
  "Evaluates test. If logical false, evaluates body in an implicit do."
  {:added "1.0"}
  [test & body]
    (list 'if test nil (cons 'do body)))
```

もちろん、`macroexpand-1` を使って `when-not` がどのように展開されるかを確かめることもできる。

```clojure
(macroexpand-1 '(when-not false (println "this") (println "and also this")))
; (if false nil (do (println "this") (println "and also this")))
```

#### when マクロと if の違い

`when` は `when-not` の反対で、`test` が真になったときだけ残りのフォームを実行する。`when` は `if` と次の 2 点が異なる。

- `if` は `else` 節を取るが、`when` は取らない
- `when` は 2 番目の引数を `else` 節に使う必要がないので、任意個の引数を取って、それを `do` の中で実行できる

## キーワード

- [[macro|マクロ]]
- [[special-form|特殊形式]]
- [[design-pattern|デザインパターン]]
- [[polymorphism|ポリモーフィズム]]
- [[java|Java]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
