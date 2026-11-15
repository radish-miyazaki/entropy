---
title: Clojure Book › Functions
description: Clojure の関数の定義、引数と可変長引数、戻り値、再帰と recur、マルチメソッド、事前条件・事後条件、ドキュメント化、無名関数、高階関数を扱う章
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 9
---

## TL;DR

- [[clojure|Clojure]] の関数は、ものごとを[[abstraction|抽象化]]する手段である。`defn` で定義し、引数の数による[[function-overloading|オーバーロード]]や[[variadic-function|可変長引数]]も書ける。
- `recur` による[[recursion|再帰]]、[[multimethod|マルチメソッド]]、`:pre` と `:post` による事前条件・事後条件、ドキュメント化、[[anonymous-function|無名関数]]と[[higher-order-function|高階関数]]を扱う。

## 内容

Clojure における関数は、ものごとを**抽象化**する手段である。コードが複雑になるたびに、それを別の関数として切り出して[[refactoring|リファクタリング]]することで、関数を**ビルディングブロック**として使えるようになる。

たとえば `(+ 1 2)` を呼び出すとき、`+` は関数で、`1` と `2` は引数である。このときユーザ（開発者）は、引数の値がどう処理されるかを意識せずに使える。このような抽象化により、開発者はコードをシンプルに保ち、複雑な計算や処理を単純な関数呼び出しとして扱える。

各節のまとめは次のページにある。

- [[Clojure Book 第9章 最も簡単な関数]]
- [[Clojure Book 第9章 引数を受け取る]]
- [[Clojure Book 第9章 複数の引数を受け取る]]
- [[Clojure Book 第9章 可変長引数を受け取る]]
- [[Clojure Book 第9章 戻り値]]
- [[Clojure Book 第9章 再帰]]
- [[Clojure Book 第9章 マルチメソッド]]
- [[Clojure Book 第9章 事前条件・事後条件]]
- [[Clojure Book 第9章 ドキュメント化]]
- [[Clojure Book 第9章 無名関数]]
- [[Clojure Book 第9章 高階関数]]

## キーワード

- [[clojure|Clojure]]
- [[abstraction|抽象化]]
- [[refactoring|リファクタリング]]
- [[function-overloading|オーバーロード]]
- [[variadic-function|可変長引数]]
- [[recursion|再帰]]
- [[tail-recursion|末尾再帰]]
- [[multimethod|マルチメソッド]]
- [[assertion-programming|表明プログラミング]]
- [[first-class-citizen|第一級市民]]
- [[anonymous-function|無名関数]]
- [[higher-order-function|高階関数]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
