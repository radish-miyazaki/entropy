---
title: Classitis
aliases: []
description: 小さく細分化されたクラスが過剰に多くなり、システム全体が複雑になっている状態
tags: [word, 設計]
date: 2023-12-19
---

## TL;DR

プログラムやシステムが、小さく細分化されたクラスを過剰に多く持っている状態。直訳すると「クラス炎（炎症）」である。

## なぜ必要か

「クラスは小さくあるべき」という考え方は広く根付いているが、行き過ぎると逆に[[complexity|複雑さ]]を増やす。Classitis という名前を知っていると、この行き過ぎに気づける。

## 仕組み

小さなクラスは、1 つあたりの機能への貢献が小さい。そのため、機能を実現するのに大量のクラスが必要になり、それぞれが独自の[[interface|インタフェース]]を持つ。個々のクラスはシンプルになっても、インタフェースの数だけシステム全体の複雑さが増し、ボイラープレートで記述も冗長になる。Classitis に陥ったクラスは、[[shallow-module|浅いモジュール]]である。

## 例

Java のファイル I/O では、バッファリング付きでオブジェクトを読むために 3 つのクラスを組み合わせる必要がある。

```java
FileInputStream fileStream = new FileInputStream(fileName);
BufferedInputStream bufferedStream = new BufferedInputStream(fileStream);
ObjectInputStream objectStream = new ObjectInputStream(bufferedStream);
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[shallow-module|浅いモジュール]]
- [[deep-module|深いモジュール]]

## 出典

- [[A Philosophy of Software Design 第4章 Modules Should Be Deep|A Philosophy of Software Design 第4章]]
- https://goodpatch-tech.hatenablog.com/entry/2021/12/21/100739
