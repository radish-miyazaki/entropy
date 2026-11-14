---
title: JVM
aliases: [Java Virtual Machine]
description: 命令セットとメモリ領域を持つ抽象的な計算機で、class ファイルを実行する Java プラットフォームの土台
tags: [word, java, 実行環境]
date: 2026-11-14
---

## TL;DR

Java Virtual Machine の略。命令セットを持ち、実行時にメモリ領域を操作する抽象的な計算機である。Java プラットフォームの土台で、ハードウェアや OS に依存しない実行を担う。

## なぜ必要か

JVM 仕様によると、Java はネットワーク越しに届いたコードを任意のクライアントで安全に動かすために作られた。JVM があれば、プログラムを一度書けば、Java の実行環境があるどのマシンでも動く。

## 仕組み

JVM は Java 言語のことを知らず、`class` ファイルという特定のバイナリ形式だけを知っている。`class` ファイルには JVM の命令（バイトコード）とシンボルテーブルが入っている。安全のため、JVM は `class` ファイルのコードに強い構文上・構造上の制約を課す。

仕様は実装の方法を決めていない。インタプリタで実装する必要はなく、命令セットを実際の CPU の命令にコンパイルしてもよい。

## 例

`class` ファイルで表せる機能を持つ言語なら、どれでも JVM 上で動かせる。[[clojure|Clojure]]、[[kotlin|Kotlin]]、[[scala|Scala]] はその例である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[graalvm|GraalVM]]
- [[jit-compilation|JIT コンパイル]]
- [[clojure|Clojure]]
- [[kotlin|Kotlin]]
- [[scala|Scala]]

## 出典

- [The Java Virtual Machine Specification, Java SE 21 Edition - Chapter 1. Introduction](https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-1.html)
