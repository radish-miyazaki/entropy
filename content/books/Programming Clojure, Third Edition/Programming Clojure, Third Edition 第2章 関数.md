---
title: Programming Clojure, Third Edition 第2章 関数
description: defn での関数定義、引数の数ごとのオーバーロード、可変長引数、fn と #() による無名関数と、無名関数を使う 3 つの理由を見る
tags: [book-chapter, clojure]
date: 2023-08-25
book: "[[Programming Clojure, Third Edition]]"
chapter: 2
---

## TL;DR

- 関数は `defn` で定義し、引数リストとボディを複数書くとアリティごとに実装を分けられる。`&` で可変長引数を受け取れる。
- 無名関数は `fn` か `#()` で書き、短い処理、関数内だけで使う処理、データを保持するクロージャを作るときに使う。

## 内容

### `defn` マクロ

関数を定義するには、`defn` を使う。

```clojure
(defn name doc-string? attr-map? [params*] prepost-map? body)
```

- `name`: 関数名のシンボル。複数語からなる場合はケバブケースで書く
- `doc-string?`: 関数の説明
- `attr-map?`: 関数が束縛される [[clojure-var|var]] にメタデータを付加する
- `prepost-map?`: 呼び出しのときに自動的にチェックされる事前条件・事後条件

```clojure
(defn greeting
		"Returns a greeting of form 'Hello, username.'"
		[username]
		(str "Hello, " username))
```

### オーバーロード

Clojure の関数呼び出しでは、仮引数の数（**[[arity|アリティ]]（arity）**）と実引数の数がマッチする必要がある。引数の数が不正であれば、Clojure は `ArityException` 例外を投げる。

`greeting` 関数で引数を省略した場合も処理したいなら、**`defn` の別フォームで、複数の引数リストとボディを指定**できる。

```clojure
(defn name doc-string? attr-map? ([params*] body)+)
```

```clojure
(defn greeting
		"Returns a greeting of form 'Hello, username.'
		Default username is 'world'."
				([] (greeting "world"))
				([username] (str "Hello, " username)))
```

```clojure
(greeting) ; "Hello, world"
```

[[multimethod|マルチメソッド]]を使うと、引数の型で実装を選ぶポリモーフィックな関数を実装したり、より柔軟に対応したりできる。

### 可変長引数（`&`）

引数リストに `&` を含めると、可変長引数を定義できる。`&` の後の仮引数には、実引数で束縛されなかったもののシーケンスが束縛される。

```clojure
(defn date [person-1 person-2 & chaperones]
  (println person-1 "and" person-2
           "went out with" (count chaperones) "chaperones."))

(date "Romeo" "Juliet" "Friar Lowrence" "Nurse")
;; Romeo and Juliet went out with 2 chaperones.
```

### 無名関数（`fn`, `#()`）

[[anonymous-function|無名関数]]は `fn` を使って定義する。

```clojure
(fn [params°] body)
```

```clojure
(filter (fn [w]
		(> (count w) 2)) (str/split "A fine day" #"\W+"))
; ("fine" "day")
```

暗黙の引数名を使った、さらに短い無名関数の記法もある。引数には `%1`, `%2`, …, `%&` のようにアクセスでき、最初の引数は `%` でもアクセスできる。

```clojure
#(body)
```

```clojure
(filter #(> (count %) 2) (str/split "A fine day" #"\W+"))
; ("fine" "day")
```

### 無名関数を使う 3 つの理由

名前のある関数ではなく無名関数を使う理由は、少なくとも 3 つある。

- 関数本体が見れば何をするのかすぐに分かるほど短く、**名前を付けると逆に可読性が落ちる**ケース
- ある関数の内部だけで使われるので、**関数内だけに留めたい**ケース。[[lexical-scope|レキシカルスコープ]]を使う

  ```clojure
  (defn indexable-words [text]
    (let [indexable-word? (fn [w] (> (count w) 2))]
      (filter indexable-word? (str/split text #"\W+"))))
  ```

- ある関数内で使われる**データを保持しておく関数を作りたい**ケース。つまり、関数を実行時に動的に作りたいケース。次の `make-greeter` が生成した関数は、`greeting-prefix` 変数を包み込む [[closure|クロージャ]]である

  ```clojure
  (defn make-greeter [greeting-prefix]
    (fn [username] (str greeting-prefix ", " username)))

  (def hello-greeting (make-greeter "Hello"))
  (hello-greeting "world")
  ```

## キーワード

- [[arity|アリティ]]
- [[multimethod|マルチメソッド]]
- [[anonymous-function|無名関数]]
- [[lexical-scope|レキシカルスコープ]]
- [[closure|クロージャ]]
- [[clojure-var|var]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
