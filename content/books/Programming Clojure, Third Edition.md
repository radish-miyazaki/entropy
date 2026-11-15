---
title: Programming Clojure, Third Edition
aliases: [Programming Clojure]
description: Clojure コアチームのメンバーが書いた Clojure の定番の解説書で、トランスデューサや spec などの新しい機能も扱う第 3 版
tags: [book, clojure]
date: 2024-11-25
book-authors: [Alex Miller, Stuart Halloway, Aaron Bedra]
publisher: The Pragmatic Bookshelf
isbn: 9781680502466
---

## TL;DR

- [[clojure|Clojure]] のコアチームのメンバーが書いた、Clojure の定番の解説書である。
- Clojure は Lisp の伝統にならい、イミュータブルなデータ、関数、マクロ、対話的な REPL という組み合わせ可能な道具で複雑さを断ち切る。第 3 版では、トランスデューサや spec などの新しい機能も扱う。
- 日本で「孔雀本」と呼ばれる本の第 3 版で、日本語には翻訳されていない。

## 対象読者

出版社のページでは、必要なものとして Java 6 以上と Clojure 1.9 を挙げている。

## 目次

1. Getting Started
2. [[Programming Clojure, Third Edition 第2章 Exploring Clojure|第2章 Exploring Clojure]]
   - [[Programming Clojure, Third Edition 第2章 Clojure の基本|Clojure の基本]]
   - [[Programming Clojure, Third Edition 第2章 関数|関数]]
   - [[Programming Clojure, Third Edition 第2章 var・束縛・名前空間|var・束縛・名前空間]]
   - [[Programming Clojure, Third Edition 第2章 メタデータ|メタデータ]]
   - [[Programming Clojure, Third Edition 第2章 Java を呼び出す|Java を呼び出す]]
   - [[Programming Clojure, Third Edition 第2章 コメントとフロー制御|コメントとフロー制御]]
   - [[Programming Clojure, Third Edition 第2章 for ループはどこにある？|for ループはどこにある？]]
3. [[Programming Clojure, Third Edition 第3章 Unifying Data with Sequences|第3章 Unifying Data with Sequences]]
   - [[Programming Clojure, Third Edition 第3章 シーケンスとシーカブル|シーケンスとシーカブル]]
   - [[Programming Clojure, Third Edition 第3章 すべてはシーケンスである|すべてはシーケンスである]]
   - [[Programming Clojure, Third Edition 第3章 シーケンスライブラリを活用する|シーケンスライブラリを活用する]]
   - [[Programming Clojure, Third Edition 第3章 遅延シーケンスと無限シーケンス|遅延シーケンスと無限シーケンス]]
   - [[Programming Clojure, Third Edition 第3章 Java をシーカブルとして扱う|Java をシーカブルとして扱う]]
   - [[Programming Clojure, Third Edition 第3章 特定の構造に特化した関数|特定の構造に特化した関数]]
4. [[Programming Clojure, Third Edition 第4章 Functional Programming|第4章 Functional Programming]]
   - [[Programming Clojure, Third Edition 第4章 関数型プログラミング（FP）の概念|関数型プログラミング（FP）の概念]]
   - [[Programming Clojure, Third Edition 第4章 怠け者になろう|怠け者になろう]]
   - [[Programming Clojure, Third Edition 第4章 もっと怠け者の勧め|もっと怠け者の勧め]]
   - [[Programming Clojure, Third Edition 第4章 再帰ふたたび|再帰ふたたび]]
   - [[Programming Clojure, Third Edition 第4章 即時変換（Eager Transformations）|即時変換（Eager Transformations）]]
   - [[Programming Clojure, Third Edition 第4章 def フォームについて|def フォームについて]]
5. [[Programming Clojure, Third Edition 第5章 Specifications|第5章 Specifications]]
   - [[Programming Clojure, Third Edition 第5章 はじめに|はじめに]]
   - [[Programming Clojure, Third Edition 第5章 spec を定義する|spec を定義する]]
   - [[Programming Clojure, Third Edition 第5章 データを検証する|データを検証する]]
   - [[Programming Clojure, Third Edition 第5章 関数を検証する|関数を検証する]]
   - [[Programming Clojure, Third Edition 第5章 関数の自動生成テスト|関数の自動生成テスト]]
6. [[Programming Clojure, Third Edition 第6章 State and Concurrency|第6章 State and Concurrency]]
   - [[Programming Clojure, Third Edition 第6章 同一実体と値|同一実体と値]]
   - [[Programming Clojure, Third Edition 第6章 並行性・並列性・ロック|並行性・並列性・ロック]]
   - [[Programming Clojure, Third Edition 第6章 ref と STM|ref と STM]]
   - [[Programming Clojure, Third Edition 第6章 atom を用いた非協調的かつ同期的な更新|atom を用いた非協調的かつ同期的な更新]]
   - [[Programming Clojure, Third Edition 第6章 agent を用いた非同期的な更新|agent を用いた非同期的な更新]]
   - [[Programming Clojure, Third Edition 第6章 var でスレッドごとの状態を管理|var でスレッドごとの状態を管理]]
   - [[Programming Clojure, Third Edition 第6章 Clojure におけるモデルのまとめ|Clojure におけるモデルのまとめ]]
7. [[Programming Clojure, Third Edition 第7章 Protocols and Datatypes|第7章 Protocols and Datatypes]]
   - [[Programming Clojure, Third Edition 第7章 抽象化へ向けたプログラミング|抽象化へ向けたプログラミング]]
   - [[Programming Clojure, Third Edition 第7章 インタフェース|インタフェース]]
   - [[Programming Clojure, Third Edition 第7章 プロトコル|プロトコル]]
   - [[Programming Clojure, Third Edition 第7章 データ型|データ型]]
   - [[Programming Clojure, Third Edition 第7章 レコード|レコード]]
   - [[Programming Clojure, Third Edition 第7章 reify|reify]]
8. [[Programming Clojure, Third Edition 第8章 Macros|第8章 Macros]]
   - [[Programming Clojure, Third Edition 第8章 いつマクロを使うべきか|いつマクロを使うべきか]]
   - [[Programming Clojure, Third Edition 第8章 フロー制御のマクロを書く|フロー制御のマクロを書く]]
   - [[Programming Clojure, Third Edition 第8章 マクロを簡単にする|マクロを簡単にする]]
   - [[Programming Clojure, Third Edition 第8章 マクロの分類学|マクロの分類学]]
9. [[Programming Clojure, Third Edition 第9章 Multimethods|第9章 Multimethods]]
   - [[Programming Clojure, Third Edition 第9章 マルチメソッドを定義|マルチメソッドを定義]]
   - [[Programming Clojure, Third Edition 第9章 単純なディスパッチの先に|単純なディスパッチの先に]]
   - [[Programming Clojure, Third Edition 第9章 アドホックに分類を導入する|アドホックに分類を導入する]]
   - [[Programming Clojure, Third Edition 第9章 マルチメソッドはいつ使うべきか|マルチメソッドはいつ使うべきか]]
10. [[Programming Clojure, Third Edition 第10章 Java Interop|第10章 Java Interop]]
    - [[Programming Clojure, Third Edition 第10章 Clojure で Java のオブジェクトを作る|Clojure で Java のオブジェクトを作る]]
    - [[Programming Clojure, Third Edition 第10章 Java から Clojure を呼び出す|Java から Clojure を呼び出す]]
    - [[Programming Clojure, Third Edition 第10章 例外処理|例外処理]]
    - [[Programming Clojure, Third Edition 第10章 パフォーマンスのための最適化|パフォーマンスのための最適化]]
    - [[Programming Clojure, Third Edition 第10章 Java の配列を扱う|Java の配列を扱う]]
11. Building an Application

%%

## 感想

全体を通しての評価や気づき。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]
- [[Programming Clojure, Fourth Edition|Programming Clojure, Fourth Edition]]（2026 年 4 月に出版予定の第 4 版）
- [The Pragmatic Bookshelf の書籍ページ](https://pragprog.com/titles/shcloj3/programming-clojure-third-edition/)
