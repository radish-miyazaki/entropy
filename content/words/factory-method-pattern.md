---
title: Factory Method パターン
aliases: []
description: インスタンスの生成を、サブクラスで上書きできるメソッドに任せるデザインパターン
tags: [word, デザインパターン]
date: 2026-11-14
---

## TL;DR

インスタンスの生成を、コンストラクタの直接の呼び出しから、サブクラスで上書きできるメソッドに移す[[design-pattern|デザインパターン]]。GoF のデザインパターンの 1 つで、Virtual Constructor パターンとも呼ばれる。

## なぜ必要か

Wikipedia によると、アプリケーションに特化したオブジェクトの生成をサブクラスに任せることで、クラスの再利用性を高められる。利用者は具体的なクラスを知らずにオブジェクトを得られる。

## 仕組み

次の 4 つの役割で構成される。

- **Creator**: Product を生成するファクトリメソッドと、それを使う処理を持つ抽象クラス
- **ConcreteCreator**: Creator を継承し、具体的な Product を生成するメソッドを実装するクラス
- **Product**: 生成されるオブジェクトの抽象クラス
- **ConcreteProduct**: Product の具体的な実装

ファクトリメソッドは、Template Method パターンから呼ばれることが多い。GoF では、Factory Method は親子クラスの関係を扱う「クラスパターン」、Abstract Factory はオブジェクトどうしの関係を扱う「オブジェクトパターン」に分類されている。

## 例

[[テスト駆動開発（書籍） 第8章 実装を隠す|テスト駆動開発]]では、親クラス `Money` に Factory Method を導入し、テストコードからサブクラス `Dollar` と `Franc` の存在を隠した。これによって、既存のコードに影響を与えずに継承の構造を変えられるようになった。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[design-pattern|デザインパターン]]

## 出典

- [Factory Method パターン - Wikipedia](https://ja.wikipedia.org/wiki/Factory_Method_パターン)
- [[テスト駆動開発（書籍） 第8章 実装を隠す]]
