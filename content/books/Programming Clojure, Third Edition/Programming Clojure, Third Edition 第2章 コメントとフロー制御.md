---
title: Programming Clojure, Third Edition 第2章 コメントとフロー制御
description: ;、comment、#_ によるコメントと、if、do、loop と recur によるフロー制御を見る
tags: [book-chapter, clojure]
date: 2023-08-25
book: "[[Programming Clojure, Third Edition]]"
chapter: 2
---

## TL;DR

- コメントは `;`、`comment` マクロ、次のフォームを無視させる `#_` の 3 つの書き方がある。
- `if` は分岐ごとに 1 つの式しか書けず、複数のフォームを実行するときは副作用を明示する `do` を使う。
- `loop` と `recur` で再帰点を設定でき、`recur` の呼び出しは最適化される。

## 内容

### コメント

Clojure でコメントを書く方法はいくつかある。

最もよく使われるのは `;` で、行末までをコメントにする。慣習的に、`;;` と 2 つ並べて使われることが多い。

```clojure
;; this is a comment
```

Clojure には、本文を無視して `nil` を返す `comment` マクロもある。既存のコードのブロックを囲むのに便利である。ただし、Clojure のリーダが読み込むので、正しい構文である必要がある。

```clojure
(comment
	(defn ignore-me []
	  ;; not done yet
	  ))
```

リーダに次のフォームを読むが無視するように指示する `#_` マクロもある。

```clojure
(defn triple [number]
	#_(println "debug triple number")
	(* 3 number))

(triple 3) ; 9
```

### `if` による分岐

`if` は最初の引数を評価し、それが真であれば 2 つ目の引数を評価した結果を返す。

```clojure
(defn is-small? [number]
  (if (< number 100) "yes"))

(is-small? 50) ; "yes"
```

この場合、偽であれば `nil` を返す。

```clojure
(is-small? 50000) ; nil
```

偽だった場合の結果も定義したいなら、式を第 3 引数として与える。

```clojure
(defn is-small? [number]
		(if (< number 100) "yes" "no"))

(is-small? 50000) ; "no"
```

### `do` による副作用の導入

Clojure の `if` は、それぞれの分岐先に 1 つの式しか書けない。このとき `do` を使うと、複数のフォームをすべて評価して最後の結果を返せる。

```clojure
(defn is-small? [number]
  (if (< number 100)
    "yes"
    (do
      (println "Saw a bing number" number)
      "no")))
(is-small? 50000) ; "no"
;; Saw a bing number 50000
```

これは[[side-effect|副作用]]の例である。多くの言語では、純粋な関数と副作用をごちゃ混ぜに使う。しかし、Clojure では**副作用は明示しなければならず、それほど多く使うものでもない**。`do` は「これから副作用がある」ことを明示する方法の 1 つである。

### `loop` と `recur` による再帰

Clojure の `loop` は、万能ナイフのように扱える制御構文である。

```clojure
(loop [bindings *] exprs+)
```

`loop` は `let` のように動作し、束縛をした後に `exprs` を実行する。違いは`loop` が **`recur` を使って再帰点を設定**する点である。Clojure は[[tail-call-optimization|末尾呼び出し最適化]]（TCO）を行わないが、この **`recur` の呼び出しは最適化される**。

```clojure
(loop [result [] x 5]
  (if (zero? x)
    result
    (recur (conj result x) (dec x))))
; [5 4 3 2 1]
```

最初の処理では、`loop` は `result` に `[]` を、`x` に `5` を束縛する。`x` は `0` ではないので、`recur` は `result` と `x` を次の値で再束縛する。

- `result`: 直前の `x` と `result` を結合した値
- `x`: 直前の `x` をデクリメントした値

その後、処理は `loop` のブロックの先頭に戻る。これを `x` が `0` になるまで繰り返し、最終的に `result` を返す。

`loop` を使う代わりに、関数の先頭に再帰的に戻ることもできる。これを使うと、再帰関数を実装できる。

```clojure
(defn countdown [result x]
  (if (zero? x)
    result
    (recur (conj result x) (dec x))))

(countdown [] 5) ; [5 4 3 2 1]
```

再帰は強力だが、その多くは **Clojure のシーケンスライブラリで提供**されているので、あまり使わないかもしれない。たとえば、`countdown` は次のように実現できる。

```clojure
(into [] (take 5 (iterate dec 5)))
(into [] (drop-last (reverse (range 6))))
(vec (reverse (rest (range 6))))
```

## キーワード

- [[side-effect|副作用]]
- [[tail-call-optimization|末尾呼び出し最適化]]
- [[clojure-sequence|シーケンス]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
