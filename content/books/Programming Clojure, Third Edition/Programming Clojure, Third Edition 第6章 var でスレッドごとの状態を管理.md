---
title: Programming Clojure, Third Edition › var でスレッドごとの状態を管理
description: var は binding でダイナミックスコープを持つスレッドローカルな束縛を作れ、離れた関数の動作を変えられるが、関数が純粋でなくなるので基本的には使わない
tags: [book-chapter, clojure]
date: 2023-09-05
book: "[[Programming Clojure, Third Edition]]"
chapter: 6
---

## TL;DR

- var は統一的な更新モデルに従わず、スレッドローカルな状態を管理する。`^:dynamic` を付けた var は `binding` でダイナミックスコープを持つスレッドローカルな束縛を作れる。
- 動的束縛は離れたところから関数の動作を変えられる（e.g. メモ化した関数に差し替える）が、関数が純粋でなくなるので、基本的には使わない。
- シングルスレッドで動く Java のコールバック API では、動的束縛と `set!` を使う。

## 内容

[[clojure-var|var]] は統一的な更新モデルに従わず、スレッドローカルな状態を管理するのに使う。

### var の生成

`def` や `defn` で var を作れる。

```clojure
(def foo 10) ; #'user/foo
```

`foo` の束縛はすべてのスレッドで共有されるので、もちろん自分のスレッドから参照できる。

```clojure
foo ; 10
```

`foo` の値を別のスレッドから調べることもできる。新しいスレッドを作り、`foo` の値を表示する関数を実行して確かめる。

```clojure
(.start (Thread. (fn [] (println foo)))) ; nil
;; 10
```

これを実行すると、`start()` の呼び出しが `nil` を返し、`foo` の値が新しいスレッドによって表示される。

### [動的な var](http://akasingo.com/531)

通常の var はダイナミックスコープで束縛できないが、メタデータ `:dynamic` を付けると、`binding` を使ったダイナミックスコープでの束縛を使える。

```clojure
(def ^:dynamic foo 10)
```

### binding マクロ

ほとんどの場合、var はルート束縛を永遠に持ち続ける。しかし、`binding` マクロを使うと、var に**スレッドローカルな束縛**を作れる。

```clojure
(binding (bindings) & body)
```

`binding` による束縛は[[dynamic-scope|ダイナミックスコープ]]を持つ。つまり、実行したスレッドが `binding` の本体の実行を抜けるまでの間、そのスレッドのあらゆる箇所から参照できる。他のスレッドからは、この束縛は見えない。構造は `let` とよく似ている。

```clojure
(binding [foo 42] foo) ; 42
```

### binding と let の違い

違いを見るために、まず `foo` の値を出力する簡単な関数を定義する。

```clojure
(defn print-foo [] (println foo))
```

そして、`let` と `binding` でそれぞれ束縛を作り、関数を呼び出す。

```clojure
(let [foo "let foo"] (print-foo))
;; 10
```

```clojure
(binding [foo "binding foo"] (print-foo))
;; binding foo
```

`let` は自分のフォームの外側には影響を及ぼさないので、`print-foo` はルート束縛である 10 を表示する。一方、`binding` の束縛はそのボディから呼び出されるすべてのコードに及ぶので、束縛した値が表示される。

### 離れたところから影響を及ぼす

動的束縛は強力である反面、関数が純粋でなくなるという大きなデメリットを持っているので、基本的には使わない。

#### スペシャル変数と動的束縛

動的束縛を持たせるための var は**スペシャル変数**と呼ばれる。慣習的に、スペシャル変数は変数名の最初と最後にアスタリスク（`*`）を付ける。たとえば Clojure は標準入出力ストリーム `*in*`、`*out*`、`*err*` をスレッドごとに設定するのに動的束縛を使っている。

動的束縛は離れたところから影響を及ぼすことを可能にする。動的束縛を変更すると、遠くの関数の動作を、引数を変えることなく変えられる。

#### アスペクト指向プログラミング

離れたところから及ぼしたい影響の例として、一時的に関数に機能を付け加えるケースがある。いくつかの言語はそのための特別な機能を備えており、[[aspect-oriented-programming|アスペクト指向プログラミング]]（AOP）と呼ばれたりする。Clojure におけるそういった機能は、単に動的束縛の副産物にすぎない。

#### サンプルコード（コストの高い計算）

例として、非常にコストの高い計算をする関数があるとする。これをシミュレートするために、次の関数を実装する。

```clojure
(defn ^:dynamic slow-double [n]
  (Thread/sleep 100)
  (* n 2))
```

次に、ベクタの各要素に `slow-double` を適用する関数を実装する。

```clojure
(defn calls-slow-double []
  (map slow-double [1 2 1 2 1 2]))
```

この関数の実行時間を計測する。そのままだと遅延シーケンスが返ってくるので、`dorun` で現実化する必要がある。

```clojure
(time (dorun (calls-slow-double)))
;; "Elapsed time: 628.584458 msecs"
```

この関数が遅いのは、同じ処理を何度も行っているからである。

#### メモ化（memoize）

このようなケースでは、[[memoization|メモ化]]が真っ先に思いつく選択肢である。関数をメモ化すると、関数は過去の入力とその結果とのマップをキャッシュする。入力がキャッシュにヒットしたら、結果はほぼ瞬時に得られる。Clojure には、関数を受け取ってメモ化したバージョンを返す `memoize` という関数がある。

```clojure
(memoize function)
```

#### サンプルコード（メモ化と動的束縛）

メモ化はよい選択肢だが、`calls-slow-double` は既に遅い（メモ化されていない）関数を呼んでしまっている。このような場合に動的束縛が役立つ。メモ化バージョンの `slow-double` を束縛して、その `binding` の中で `calls-slow-double` を呼び出せばよい。

```clojure
(defn demo-memoize []
  (time
   (dorun
    (binding [slow-double (memoize slow-double)]
      (calls-slow-double)))))
```

動作を確かめると、3 倍近く速くなっている。

```clojure
(demo-memoize)
;; "Elapsed time: 209.873375 msecs"
```

#### 使用上の注意

うまく使えば動的束縛は素晴らしい力を発揮するが、コードの拡張や再利用の主要なメカニズムとして使うべきではない。**動的束縛を使った関数は純粋ではなく、Clojure の関数型スタイルの利点を簡単に失ってしまう。**

### Java のコールバック API を使う

Java の API には、イベントハンドラをコールバックするように設計されているものがある。たとえば、[Swing](https://www.javadrive.jp/tutorial/) のような GUI フレームワークは、ユーザの入力に対応するためにイベントハンドラを呼び出す。

これらのコールバックハンドラのインタフェースは、ミュータブルなオブジェクトであることを前提に設計されている。また、シングルスレッドで動作することも多い。Clojure でこのような API を使う場合は、動的束縛を使うのがよい。以降はミュータブルな変数を使っているように見えるが、シングルスレッドであるという前提があるので、並行プログラミングにおける問題は生じない。

#### set! マクロ

`set!` は、スレッドローカルの束縛を変更するマクロである。

```clojure
(set! var-symbol new-value)
```

**このマクロは極力使うべきではない。** 実際、Clojure のコアのソースではほとんど使われておらず、例外は SAX の `ContentHandler` の実装くらいである。

#### ContentHandler

`ContentHandler` は、パーサが XML のさまざまなコンポーネントに出くわしたときにコールバックを受ける。少し複雑なケースになると、`ContentHandler` は現在 XML 中のどこにいるか（現在パース中の要素のスタック、文字データなど）という情報を管理する必要がある。

Clojure の世界で考えるならば、`ContentHandler` が管理する現在の場所はイミュータブルな XML ストリームの特定の場所を指す変更可能なポインタであると言える。また、すべて 1 つのスレッドで処理されるので、`ref` を使う必要はない。次に実際のコードの一部を示す。

```clojure
(startElement [uri local-name q-name ^Attributes atts]
	 ;; ... 省略 ...
   (set! *stack* (conj *stack* *current*))
   (set! *current* e)
   (set! *state* :element))
 nil)
(endElement [uri local-name q-name]
 (push-chars)
 (set! *current* (push-content (peek *stack*) *current*))
 (set! *stack* (pop *stack*))
 (set! *state* :between)
 nil)
```

SAX パーサは XML の開始タグに出くわすと `startElement` を呼ぶ。このコールバックハンドラは 3 つのスレッドローカル変数を更新する。

- `*stack*`: すべての要素のスタック
- `*current*`: 現在の要素
- `*state*`: 要素の中身がどういう種類かを表す値

`endElement` は `startElement` の処理を巻き戻す。つまり、`*stack*` を pop し、先頭要素を `*current*` に置く。

## キーワード

- [[clojure-var|var]]
- [[dynamic-scope|ダイナミックスコープ]]
- [[thread|スレッド]]
- [[memoization|メモ化]]
- [[aspect-oriented-programming|アスペクト指向プログラミング]]
- [[pure-function|純粋関数]]
- [[xml|XML]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
