---
title: Decorator パターン
aliases: []
description: 同じインタフェースを持つオブジェクトで包み、個々のオブジェクトに実行時に振る舞いを足すデザインパターン
tags: [word, 設計]
date: 2026-11-14
---

## TL;DR

既存のオブジェクトを、同じインタフェースを持つ別のオブジェクトで包み、そのオブジェクトだけに実行時に振る舞いを足す[[design-pattern|デザインパターン]]。Gamma らの書籍『Design Patterns』に載る、GoF の 23 のパターンの 1 つである。

## なぜ必要か

Wikipedia によると、サブクラス化による拡張はコンパイル時に決まり、そのクラスのすべてのインスタンスに効く。Decorator は実行時に作るオブジェクトなので、必要なオブジェクトにだけ、必要な組み合わせで機能を足せる。独立した拡張がいくつもあるとき、組み合わせごとにクラスを作らずに済む。

## 仕組み

Decorator は、包む対象と同じインタフェースを実装するので、対象の代わりに使える。受け取った要求を包んだオブジェクトに転送し、その前後に処理を足す。Decorator はさらに別の Decorator で包めるので、層を重ねて振る舞いを積み上げられる。

## 例

Java と .NET の I/O ストリームの実装は、Decorator パターンを取り入れている。[[A Philosophy of Software Design]] の第 7 章も、`FileInputStream` を `BufferedInputStream` で包み、さらに `ObjectInputStream` で包む Java の例を挙げている。[[rust|Rust]] の [[tower|tower]] では、`Service` を包むレイヤを重ねて処理の基盤を作る。

## 注意点

[[A Philosophy of Software Design]] の第 7 章によると、Decorator は[[shallow-module|浅いモジュール]]を生みやすい。メソッドの多くが元のオブジェクトを呼ぶだけになり、少しの機能のために多くの定型コードが要る。新しい Decorator を作る前に、元のクラスに機能を直接足せないか、ユースケースのコードに統合できないか、既存の Decorator に足せないか、独立したクラスにできないかを検討する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[design-pattern|デザインパターン]]
- [[shallow-module|浅いモジュール]]
- [[tower|tower]]

## 出典

- [Decorator pattern - Wikipedia](https://en.wikipedia.org/wiki/Decorator_pattern)
- [[A Philosophy of Software Design 第7章 Different Layer, Different Abstraction|A Philosophy of Software Design 第7章]]
