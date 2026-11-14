---
title: Scala
aliases: []
description: オブジェクト指向と関数型のスタイルを組み合わせられる、静的型付けのプログラミング言語
tags: [word, oop, fp, プログラミング言語]
date: 2024-07-30
---

## TL;DR

[[object-oriented-programming|オブジェクト指向]]と[[functional-programming|関数型プログラミング]]のスタイルを組み合わせてプログラムを組み立てられる、[[static-typing|静的型付け]]のプログラミング言語。

## なぜ必要か

静的な型によって、安全なシステムを最初から作りやすい。高速で並行・分散処理を行うシステムの構築に向いている。

## 仕組み

実行環境は 3 つある。[[jvm|JVM]] 上で動かすほか、[[javascript|JavaScript]] に変換してブラウザで動かしたり、[[llvm|LLVM]] を使ってネイティブにコンパイルしたりできる。

言語は、EPFL の Scala Center と VirtusLab が保守している。Java や JavaScript のエコシステムのライブラリも使える。

## 例

公式サイトでは、Scala.js でフロントエンドを書く、Akka のアクターでノードをまたいで計算する、Spark でクラスタ上のデータを分析する、Scala CLI で簡単なスクリプトを書く、といった使い方を紹介している。最も短いプログラムは次のとおりである。

```scala
@main def run() = println("Hello, World!")
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[kotlin|Kotlin]]
- [[ruby|Ruby]]

## 出典

- [The Scala Programming Language](https://www.scala-lang.org/)
