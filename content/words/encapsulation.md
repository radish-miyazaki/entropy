---
title: カプセル化
aliases: []
description: 互いに関連するデータと処理を 1 つのモジュールにまとめ、内部の詳細を外から隠すこと
tags: [word, 設計]
date: 2026-11-14
---

## TL;DR

互いに関連するデータと処理を 1 つの[[module|モジュール]]にまとめること。広い意味では、まとめたモジュールの内部の詳細を外から隠すことも含む。

## なぜ必要か

Wikipedia によると、アルゴリズムとデータ構造は密接に結びついているので、後から変更すると修正箇所が多くのコードに散らばる。関連するものを 1 つのモジュールにまとめておけば、変更箇所がモジュールの内部に限られ、保守しやすくなる。

## 仕組み

カプセル化は、David Parnas が提唱した[[information-hiding|情報隠蔽]]とほぼ同じ意味で使われる。Parnas は、公開すべきものはモジュールの仕様であり、その実現方法ではないと主張した。外からは公開されたインタフェースを通じて機能を呼び出す。多くの言語では、`public` / `private` のように公開と非公開を区別する仕組みで実現する。

カプセル化はオブジェクト指向に限った考え方ではなく、抽象データ型やモジュールにも当てはまる。

## 例

- [[A Philosophy of Software Design 第5章 Information Hiding (and Leakage)|A Philosophy of Software Design]] では、データ構造やアルゴリズム、TCP の実装方法や JSON の解析方法など、実装の知識をモジュールの中にカプセル化することを、深いモジュールを作る技法として挙げている。
- Rust で C のライブラリを使うときは、unsafe な [[ffi|FFI]] の呼び出しを safe な Rust のコードにカプセル化する。

## 注意点

[[テスト駆動開発（書籍） 第6章 テスト不足に気づいたら|テスト駆動開発]] によると、言語によってはサブクラスが親クラスの `protected` や `private` のフィールドにアクセスでき、カプセル化が壊れる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[information-hiding|情報隠蔽]]
- [[abstraction|抽象化]]
- [[module|モジュール]]

## 出典

- [カプセル化 - Wikipedia](https://ja.wikipedia.org/wiki/カプセル化)
- [[A Philosophy of Software Design 第5章 Information Hiding (and Leakage)]]
- [[Effective Rust 項目34 Rust と C の FFI で生じるメモリ安全性の問題]]
