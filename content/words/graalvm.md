---
title: GraalVM
aliases: []
description: Java アプリケーションをネイティブ実行ファイルに AOT コンパイルでき、ほかの言語も組み込める JDK
tags: [word, java]
date: 2025-05-31
---

## TL;DR

速く、小さく、軽いアプリケーションを作るための JDK。[[java|Java]] のアプリケーションを、事前にネイティブの実行ファイルへコンパイルできる。

## なぜ必要か

ネイティブ実行ファイルはすぐに起動し、最高性能に達するまでのウォームアップがいらない。[[jvm|JVM]] で動かす場合に比べて、メモリと CPU の使用量もわずかで済む。

## 仕組み

Native Image は、アプリケーションを[[aot-compilation|AOT]] コンパイルしてネイティブ実行ファイルにする。実行ファイルにはアプリケーションが使うクラス、メソッド、フィールドだけが含まれるので、小さく、攻撃対象になる部分も減る。静的リンクした実行ファイルは、空のコンテナイメージ（scratch）でも動く。

GraalVM の JDK には、最適化を行う Graal [[jit-compilation|JIT]] コンパイラも入っている。また、Java のアプリケーションに [[python|Python]]（GraalPy）、[[javascript|JavaScript]]（GraalJS）、[[webassembly|WebAssembly]]（GraalWasm）などを組み込める。

## 例

Spring Boot、Micronaut、Helidon、Quarkus といったフレームワークが GraalVM に対応している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [GraalVM](https://www.graalvm.org/)
- [GraalVM とは - Oracle](https://www.oracle.com/jp/java/graalvm/what-is-graalvm/)
