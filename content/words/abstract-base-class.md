---
title: 抽象基底クラス
aliases: [ABC]
description: 抽象メソッドを持ち、すべてを実装したサブクラスでないとインスタンス化できない基底クラス。Python では abc モジュールで定義する
tags: [word, python]
date: 2023-12-16
---

## TL;DR

Abstract Base Class（ABC）。抽象メソッドを持ち、それをすべてオーバーライドしたサブクラスでないとインスタンス化できない基底クラスである。[[python|Python]] では標準ライブラリの `abc` モジュールで定義する。

## なぜ必要か

Python には言語レベルのインタフェースがない。そこで、抽象基底クラスをインタフェースの代わりに使い、サブクラスに実装すべきメソッドを強制する。

## 仕組み

`abc` モジュールは、抽象基底クラスを作るための基盤を提供する。`ABC` を継承するか、メタクラスに `ABCMeta` を指定してクラスを作り、抽象メソッドに `@abstractmethod` デコレータを付ける。公式ドキュメントには次のようにある。

> メタクラスが `ABCMeta` から派生しているクラスは、すべての抽象メソッドと抽象プロパティがオーバーライドされるまで、インスタンス化できません。

`ABCMeta.register()` を使うと、継承関係のないクラスを仮想サブクラスとして登録することもできる。

## 例

[[Implementing the Repository pattern]] では、リポジトリのインタフェースを抽象基底クラスで定義し、具体的な実装がそれを継承している。

```python
from abc import ABC, abstractmethod

class C(ABC):
    @abstractmethod
    def my_abstract_method(self, arg1):
        ...
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[python|Python]]
- [[repository-pattern|リポジトリパターン]]

## 出典

- [abc --- 抽象基底クラス — Python ドキュメント](https://docs.python.org/ja/3/library/abc.html)
- [[Implementing the Repository pattern]]
