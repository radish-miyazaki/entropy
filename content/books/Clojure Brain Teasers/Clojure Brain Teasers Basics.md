---
title: Clojure Brain Teasers Basics
description: Clojure の等価比較、算術演算のオーバーフロー、NaN、truthy な値、引数なしの and と or の挙動を問題を通して確かめる章
tags: [book-chapter, clojure]
date: 2025-05-23
book: "[[Clojure Brain Teasers]]"
chapter:
---

## TL;DR

- [[clojure|Clojure]] の `=` と `==` の違い、算術演算子のオーバーフローの扱い、`##NaN` の比較など、数値と真偽値まわりの基本的な挙動を扱う。
- 条件式では `false` と `nil` 以外がすべて真とみなされ、`and` や `or` は式の評価結果そのものを返す。

## 内容

### All Things Being Equal

`=` は一般的に使う等価演算子で、異なるクラスの値どうしを比べると `false` を返す。ただし、整数の範囲内の `BigInt` と整数を比べると `true` を返す。

```clojure
(= 1 1N) ; true
```

`==` は数値にだけ使える。比べる前に一方の型を、より大きい型や表現力の高い型に昇格（promote）させるので、異なるクラスの数値どうしでも比べられる。

### You've Been Promoted

`+` や `-` などのデフォルトの算術演算子はオーバーフローを検査し、範囲を超えると `ArithmeticException` を投げる。`+'` や `-'` も検査はするが、範囲を超えると値を `BigInt` に昇格させる。`unchecked-add` などの関数は検査をしないので、オーバーフローが起きる。

```clojure
(def bignum 9223372036854775807)
(unchecked-add bignum 1) ; -9223372036854775808
```

### Be-NaN-a Peel

`##NaN` は IEEE 754 で定義された Not a Number を表し、特定の数ではないので、`##NaN` どうしを比べると常に `false` を返す。そのため、マップや集合のキーに `##NaN` を使うと、決して取り出せない値を格納できてしまう。

```clojure
(def m {##NaN 100})
(count m)     ; 1
(get m ##NaN) ; nil
```

### Truthy or Dare

Clojure では、`false` と `nil` 以外のすべての値が、条件式や `boolean` で真とみなされる。これを覚えておくと、コードを簡潔に書ける。次のどのフォームも同じ文字列を出力する。

```clojure
(def moms-birthday "April 20, 1969")

(when-not (nil? moms-birthday)
  (println "Happy Birthday Mom!!"))
(when (some? moms-birthday)
  (println "Happy Birthday Mom!!"))
(when moms-birthday
  (println "Happy Birthday Mom!!"))
```

一方、`true?` や `false?` といった述語関数は、値が `true` か `false` そのものであるかだけを判定する。

```clojure
(true? true)         ; true
(false? false)       ; true
(true? :sky-is-blue) ; false
(false? nil)         ; false
```

### Vacuums Suck

`and` や `every?` を引数なしで呼ぶと、[[vacuous-truth|空虚な真]]に従って `true` を返す。一方、`or` は引数の中から最初の truthy な値を探し、見つからなければ `nil` を返すので、引数なしで呼ぶと `nil` を返す。`and` も `or` と同じく、式の評価結果そのものを返す。

```clojure
(and 1 2)          ; 最後の truthy な値である 2 を返す
(or nil false 1 2) ; 最初の truthy な値である 1 を返す
```

## キーワード

- [[clojure|Clojure]]
- IEEE 754
- [[vacuous-truth|空虚な真]]

## 自分の理解

`##NaN` どうしの比較が常に偽になるのは、[[javascript|JavaScript]] も同じである。
