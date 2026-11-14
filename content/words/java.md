---
title: Java
aliases: []
description: プログラミング言語であり、JVM と Java API から成るプラットフォームでもある技術
tags: [word, プログラミング言語]
date: 2026-11-14
---

## TL;DR

プログラミング言語であり、同時にプラットフォームでもある技術である。ソースコードはバイトコードにコンパイルされ、Java 仮想マシン（JVM）の上で動く。

## なぜ必要か

JVM は多くの OS で動くので、同じ `.class` ファイルを Windows、Linux、macOS などでそのまま実行できる。JVM の上では、[[kotlin|Kotlin]]、[[clojure|Clojure]]、[[scala|Scala]] のような Java 以外の言語も動く。

## 仕組み

ソースコードは拡張子 `.java` のテキストファイルに書き、`javac` コンパイラで `.class` ファイルにコンパイルする。`.class` ファイルには、CPU 固有のコードではなく、JVM の機械語であるバイトコードが入っている。`java` ランチャーが JVM のインスタンスを起動して、アプリケーションを実行する。

Java プラットフォームは、JVM と Java API（Java Application Programming Interface）の 2 つから成る。

## 例

`Main.java` をコンパイルして実行する場合は、次のようになる。

```sh
javac Main.java
java Main
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[kotlin|Kotlin]]
- [[clojure|Clojure]]
- [[scala|Scala]]
- [[graalvm|GraalVM]]
- [[javascript|JavaScript]]

## 出典

- [About the Java Technology (The Java Tutorials)](https://docs.oracle.com/javase/tutorial/getStarted/intro/definition.html)
