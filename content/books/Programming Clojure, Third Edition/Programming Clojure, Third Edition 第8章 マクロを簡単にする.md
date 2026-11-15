---
title: Programming Clojure, Third Edition › マクロを簡単にする
description: 構文クォート、アンクォート、スプライシングアンクォートでマクロをテンプレートとして書き、auto-gensym でユニークなローカル名を作ってシンボルの捕捉を防ぐ
tags: [book-chapter, clojure]
date: 2023-09-16
book: "[[Programming Clojure, Third Edition]]"
chapter: 8
---

## TL;DR

- 構文クォート（`` ` ``）、アンクォート（`~`）、スプライシングアンクォート（`~@`）を使うと、マクロをテンプレートとして書けて読みやすくなる。
- 構文クォートはシンボルを名前空間で修飾した完全な名前に解決して、シンボルの捕捉を防ぐ。ローカルな名前が必要なときは、`foo#` の auto-gensym でユニークな名前を作る。

## 内容

先に、[[clojure|Clojure]] のマクロの機能をまとめる。

| フォーム                         | 説明                                                                                                                                                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `foo#`                           | 自動 `gensym`。**構文クォート**されたコード内で、`foo` を接頭辞に持つユニークな名前を生成する                                                                                                                     |
| `(gensym prefix?)`               | ユニークな名前を生成する。接頭辞を与えることもできる                                                                                                                                                              |
| `(macroexpand form)`             | `macroexpand-1` を繰り返し使って、フォームがマクロ呼び出しでなくなるまで展開する                                                                                                                                  |
| `(macroexpand-1 form)`           | Clojure がフォームをどのように展開するかを示す                                                                                                                                                                    |
| `~form`                          | **アンクォート**。構文クォート中で使われると、この部分を `form` の値で置き換える                                                                                                                                  |
| `` `form ``                      | **構文クォート**。クォートと似ているが、`form` の一部をアンクォートでき、`form` をテンプレートとして使える。意図しない変数捕捉を避けるため、`form` 中のシンボルは**名前空間で修飾された完全な名前**へと解決される |
| `(list-frag? ~@form list-frag?)` | **スプライシングアンクォート**。構文クォート中で使われると、`form` の値であるリストを、テンプレートのリストに継ぎ足す形で展開する                                                                                 |

### .. マクロ（chain）

これらの機能を見ていくための練習題材として、`..` マクロを書いてみる。これはメソッド呼び出しを次々とつなげていくマクロなので、`chain` と呼ぶことにする。

`chain` の想定される展開例をいくつか挙げる。

```clojure
(chain arm getHand) -> (. arm getHand)
(chain arm getHand getFinger) -> (. (. arm getHand) getFinger)
```

簡単のために、まずはメソッド呼び出しが 1 つだけの単純なケースを考える。

```clojure
(defmacro chain [x form]
  (list '. x form))
```

`chain` は任意個の引数を取るので、実装の残りの部分は再帰で定義しなければならない。

```clojure
(defmacro chain
  ([x form] (list '. x form))
  ([x form & more] (concat (list 'chain (list '. x form)) more)))
```

`macroexpand` を使って、正しく展開されるかをチェックする。

```clojure
(macroexpand '(chain arm getHand))
; (. arm getHand)

(macroexpand '(chain arm gethand getFinger))
; (. (. arm gethand) getFinger)
```

`chain` は期待どおり動いている。

### テンプレート言語

実装はできたが、複数の引数がある場合の生成コードが読みにくい。

```clojure
([x form & more] (concat (list 'chain (list '. x form)) more))
```

この定義を読むには、マクロのコードそのものと、生成されるコードとの間を行き来する必要がある。この 2 つが入り混じっているのが、可読性が低い原因である。

この種の問題の解決策の一つが**テンプレート言語**である。マクロをテンプレートから作れれば、「穴を埋めていく」ようにマクロを定義できるはずである。

```clojure
; 仮想的なテンプレート言語
(defmacro chain
	([x form] (. ${x} ${form}))
	([x form & more] (chain (. ${x} ${form}) ${more})))
```

このように書ければ、マクロ定義の可読性は上がり、どのように展開されるかも理解しやすくなる。

### 構文クォート、アンクォート、スプライシングアンクォート

Clojure のマクロはテンプレートをサポートしている。

バッククォート（`` ` ``）は、[[syntax-quote|構文クォート]]として動作する。これはほとんど通常のクォート（`'`）と同じだが、構文クォートされたリストの中に[[unquote|アンクォート]]（`~`）があると、それに続くフォームはクォートがオフになる。

```clojure
(defmacro chain [x form]
  `(. ~x ~form))
```

このマクロが期待どおり展開されるかを確かめる。

```clojure
(macroexpand '(chain arm getHand))
; (. arm getHand)
```

ただし、複数引数バージョンをそのまま書いても、うまく動作しない。

```clojure
(defmacro chain
  ([x form] `(. ~x ~form))
  ([x form & more] `(chain (. ~x ~form) ~more)))
```

展開してみると、余計なカッコが付いている。

```clojure
(macroexpand '(chain arm getHand getFinger))
; (. (. arm getHand) (getFinger))
```

`more` は、残りの引数を集めた**リスト**である。これをそのまま挿入すると、カッコが付いた 1 つのリストとして展開される。

これを解決するために、**スプライシングアンクォート**（`~@`）を使える。

```clojure
(defmacro chain
  ([x form] `(. ~x ~form))
  ([x form & more] `(chain (. ~x ~form) ~@more)))
```

展開も期待どおりである。

```clojure
(macroexpand '(chain arm getHand getFinger))
; (. (. arm getHand) getFinger)
```

### マクロの記述パターン

Clojure の多くのマクロは、構文クォートで実装した `chain` と同じパターンで書かれる。

1. マクロ全体を構文クォート（`` ` ``）で書きはじめ、全体を一つのテンプレートとして扱う
2. 各マクロ引数をアンクォート（`~`）で挿入する
3. `more` 引数があれば、スプライシングアンクォート（`~@`）で挿入する

### マクロの中で名前を作る

#### bench マクロ

Clojure には、式の評価にかかる時間を計測して表示する `time` マクロがある。

```clojure
(time (str "a" "b"))
;; "Elapsed time: 0.03475 msecs"
```

これを応用して、何回もの実行結果を後で集めやすくした `bench` というマクロを作ってみる。`bench` は測定結果をコンソールに出力するのではなく、元の式の評価結果と経過時間をマップにして返す。

マクロを書く一番の方法は、**必要な展開結果を実際に書いてみる**ことである。`bench` の場合、展開結果は次のようになるはずである。

```clojure
; (bench (str "a" "b")) は以下のように展開される
(let [start (System/nanoTime)
			result (str "a" "b")]
	{:result result :elapsed (- (System/nanoTime) start)})
; {:result "ab", :elapsed 71583}
```

これをマクロに落とし込んでみる。

```clojure
; これはうまく動作しない
(defmacro bench [expr]
  `(let [start (System/nanoTime)
         result ~expr]
     {:result result :elapsed (- (System/nanoTime) start)}))
```

しかし、これはうまく動作しない。

```clojure
(bench (str "a" "b"))
;; clojure.lang.ExceptionInfo: \
;; Call to clojure.core/let did not conform to spec.
```

#### 構文クォート内のシンボルの処理

`macroexpand-1` を使って、実際に展開してみる。

```clojure
(macroexpand-1 '(bench (str "a" "b")))
; (clojure.core/let
;     [user/start (java.lang.System/nanoTime)
;      user/result (str "a" "b")]
;   {:result user/result,
;    :elapsed (clojure.core/- (java.lang.System/nanoTime) user/start)})
```

構文クォートはシンボルに出くわすと、それを名前空間で修飾された完全な名前へと解決する。ここで欲しいのはローカルな名前（`start`、`result`）なので、一見するとこの処理は不要に思えるが、**シンボルの捕捉**という危険なマクロのバグを防ぐのに役立っている。

#### シンボルの捕捉

強制的にシンボルの捕捉を起こすこともできるが、基本的に使わない。

仮に、マクロ展開が `start` と `result` を修飾せずに挿入したとする。もし、これらの名前がローカルに束縛されているスコープで `bench` が使われていたら、マクロがこれらの名前を捕捉して違う値に束縛し直してしまい、予期せぬ挙動になる。

この問題はほとんどの場合表面化しない。

```clojure
(let [a 1 b 2]
	(bench (+ a b)))
; {:result 3, :elapsed 39000}
```

しかし、`bench` の中で使っている `start` という名前をローカル変数で定義すると顕在化する。

```clojure
(let [start 1 end 2]
	(bench (+ start end)))
; {:result 1228277342451783002, :elapsed 39000}
```

Clojure がマクロ中で名前を完全に解決するのは、このようなシンボルの捕捉を防ぐためである。

#### ユニークな名前を付ける

まとめると、`bench` を動作させるには、`start` と `result` に**ユニークかつローカルな名前**を付ける必要がある。

このようなケースに備えて、Clojure はユニークでローカルな名前を作り出すリーダマクロを用意している。構文クォートの中で、名前空間の修飾のない名前にハッシュ記号（`#`）を付けると、Clojure はアンダースコアとユニークな ID を付けた名前を持つ、自動生成されたシンボル（auto-gensym）を作り出す。

```clojure
`foo#
; foo__2170__auto__
```

これを使うと、`bench` を実装できる。

```clojure
(defmacro bench [expr]
  `(let [start# (System/nanoTime)
         result# ~expr]
     {:result result# :elapsed (- (System/nanoTime) start#)}))
```

```clojure
(bench (str "a" "b"))
; {:result "ab", :elapsed 72500}
```

## キーワード

- [[macro|マクロ]]
- [[syntax-quote|構文クォート]]
- [[unquote|アンクォート]]
- [[gensym|gensym]]
- [[hygienic-macro|衛生的マクロ]]
- [[namespace|名前空間]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
