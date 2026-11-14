---
title: ダックタイピング
aliases: [duck typing]
description: 関数に期待されるプロパティやメソッドをすべて持つ値なら、どのように作られたかを問わず受け入れるという考え方
tags: [word]
date: 2025-04-18
---

## TL;DR

関数に期待されるプロパティやメソッドをすべて持つ値を渡せば、関数はその値がどのように作られたかを気にしない、という考え方。

## なぜ必要か

[[python|Python]] の用語集によると、特定の型ではなく[[interface|インターフェース]]に注目するので、ポリモーフィックな置き換えができ、コードの柔軟性が上がる。

## 仕組み

名前は「アヒル（duck）のように歩き、アヒルのように鳴くなら、それはおそらくアヒルだ」という、ダック・テストと呼ばれるたとえに由来する。

Python の用語集では、オブジェクトの型を見て正しいインターフェースを持つかを判断せず、メソッドや属性を単に呼び出したり使ったりするプログラミングスタイルだと説明している。`type()` や `isinstance()` による型の検査は避け、代わりに `hasattr()` で確かめるか、EAFP のスタイルで書く。EAFP（Easier to Ask for Forgiveness than Permission）は、キーや属性があるものとして処理し、なければ例外を捕まえるスタイルである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[structural-typing|構造的型付け]]
- [[nominal-typing|名前的型付け]]

## 出典

- [Glossary - duck-typing - Python documentation](https://docs.python.org/3/glossary.html#term-duck-typing)
