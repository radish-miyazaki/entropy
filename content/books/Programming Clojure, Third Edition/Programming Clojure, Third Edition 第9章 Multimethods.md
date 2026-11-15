---
title: Programming Clojure, Third Edition › Multimethods
description: 引数すべてに基づいて実装を選べるマルチメソッドを defmulti と defmethod で定義し、prefer-method で衝突を解消し、derive でアドホックな分類を導入する章
tags: [book-chapter, clojure]
date: 2023-09-19
book: "[[Programming Clojure, Third Edition]]"
chapter: 9
---

## TL;DR

- [[clojure|Clojure]] のマルチメソッドでは、引数すべてに基づいて、どの実装を選ぶかを決める任意の関数をプログラマが指定できる。
- ディスパッチは Java の継承や `derive` で作った親子関係を考慮し、衝突は `prefer-method` で解消する。
- 実際のプロジェクトでマルチメソッドが使われることはめったにない。関数が型で分岐していたら検討し、迷ったら両方書いて読みやすいほうを選ぶ。

## 内容

マルチメソッドの定義、衝突の解消、アドホックな分類の導入、使いどころを扱う。マルチメソッドは、OOP のポリモーフィズムほど使用頻度は高くない。各節のまとめは次のページにある。

- [[Programming Clojure, Third Edition 第9章 マルチメソッドを定義]]
- [[Programming Clojure, Third Edition 第9章 単純なディスパッチの先に]]
- [[Programming Clojure, Third Edition 第9章 アドホックに分類を導入する]]
- [[Programming Clojure, Third Edition 第9章 マルチメソッドはいつ使うべきか]]

## キーワード

- [[multimethod|マルチメソッド]]
- [[dynamic-dispatch|動的ディスパッチ]]
- [[polymorphism|ポリモーフィズム]]
- [[inheritance|継承]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
