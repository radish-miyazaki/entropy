---
title: ボクシング
aliases: []
description: プリミティブ型の値をオブジェクトに包み、参照として扱えるようにする変換
tags: [word, 型システム, java]
date: 2026-11-14
---

## TL;DR

プリミティブ型の値をオブジェクトに包み、参照として扱えるようにする変換。逆に、包まれたオブジェクトからプリミティブ型の値を取り出すことをアンボクシングという。

## なぜ必要か

ジェネリックなコレクションはオブジェクトしか保持できない。たとえば Java の `LinkedList<T>` は `int` を直接保持できないので、値を `Integer` などのラッパークラスに包んで格納する。

## 仕組み

Java では、コンパイラがプリミティブ型と対応するラッパークラス（`int` と `Integer`、`double` と `Double` など）の間の変換を自動で行う。これをオートボクシングという。J2SE 5.0 からは `list.add(3)` のように書くだけで、コンパイラが `Integer` オブジェクトを作る。

## 例

[[clojure|Clojure]] の公式リファレンスによると、Clojure の関数に渡す引数はすべてオブジェクトとして渡される。ただし、ローカルな文脈ではプリミティブ型のまま演算でき、`recur` でプリミティブのローカル変数を束縛し直すときもボクシングは起きない。

[[Clojure Brain Teasers Runtime and Library|Clojure Brain Teasers]] によると、Var は常に Java のオブジェクトを保持するので、型ヒントを付けても値はボクシングされた `java.lang.Double` などになる。プリミティブのまま扱うには、メタデータに `:const true` を付けてコンパイル時にインライン化させる。[[めだかのclojure.core学校 第1章 clojure.core のベクタに関する var|めだかのclojure.core学校]] で紹介されている `vector-of` を使うと、値をボクシングしない基本型のベクタを作れる。

## 注意点

ボクシングのたびにヒープにオブジェクトが割り当てられるので、ボクシングとアンボクシングを繰り返すと性能が大きく落ちることがある。また Java の等価演算子は参照を比べるので、ボクシングされた値どうしは `equals()` で比べる必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]

## 出典

- [Boxing (computer programming) - Wikipedia](<https://en.wikipedia.org/wiki/Boxing_(computer_programming)>)
- [Autoboxing and Unboxing (The Java Tutorials)](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html)
- [Java Interop - Clojure](https://clojure.org/reference/java_interop)
- [[Clojure Brain Teasers Runtime and Library|Clojure Brain Teasers Runtime and Library]]
- [[めだかのclojure.core学校 第1章 clojure.core のベクタに関する var|めだかのclojure.core学校 第1章 clojure.core のベクタに関する var]]
