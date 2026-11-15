---
title: Programming Clojure, Third Edition › Java Interop
description: Clojure から Java のオブジェクトを作る方法、Java から Clojure を呼ぶ方法、例外処理、型ヒントやプリミティブ型によるパフォーマンスの最適化、Java の配列の扱いを学ぶ章
tags: [book-chapter, clojure]
date: 2023-09-20
book: "[[Programming Clojure, Third Edition]]"
chapter: 10
---

## TL;DR

- [[clojure|Clojure]] の Java サポートは、Lisp の表現力に Java 呼び出しのための構文上の工夫を加えているので強力で、下層の Java を直接呼び出せるので軽量である。
- Java の型をそのまま使い、`reify`、`defrecord`、`proxy` でインタフェースの実装やクラスの継承を行い、Java からは `clojure.java.api.Clojure` で Clojure を呼べる。
- 検査例外を処理しなくてよく、`ex-info` と `with-open` で例外処理を簡単に書ける。パフォーマンスは、測定してから型ヒントやプリミティブ型で必要な部分だけを最適化する。

## 内容

Clojure の Java サポートは強力かつ軽量である。強力というのは、Lisp の表現力に、Java 呼び出しのための構文上の工夫を加えているからである。軽量というのは、下層にある Java を直接呼び出せるということである。各節のまとめは次のページにある。

- [[Programming Clojure, Third Edition 第10章 Clojure で Java のオブジェクトを作る]]
- [[Programming Clojure, Third Edition 第10章 Java から Clojure を呼び出す]]
- [[Programming Clojure, Third Edition 第10章 例外処理]]
- [[Programming Clojure, Third Edition 第10章 パフォーマンスのための最適化]]
- [[Programming Clojure, Third Edition 第10章 Java の配列を扱う]]

## キーワード

- [[clojure|Clojure]]
- [[java|Java]]
- [[java-interop|Java 相互運用]]
- [[checked-exception|検査例外]]
- [[type-hint|型ヒント]]
- [[reflection|リフレクション]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
