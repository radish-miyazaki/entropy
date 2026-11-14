---
title: 継承
aliases: []
description: 既存のクラスのフィールドやメソッドを引き継いで、新しいクラスを作るしくみ
tags: [word, オブジェクト指向]
date: 2026-11-14
---

## TL;DR

既存のクラスの属性や振る舞いを新しいクラスに引き継ぎ、機能を追加・変更できるようにするしくみである。引き継ぐ側をサブクラス（子クラス）、引き継がれる側をスーパークラス（親クラス）と呼ぶ。

## なぜ必要か

作りたいクラスのコードの一部を持つクラスがすでにあれば、そこから新しいクラスを派生させて、既存のフィールドやメソッドを書き直さずに再利用できる。クラスの間に階層ができるので、多態性を使って異なるクラスを同じように扱える。

## 仕組み

Java のチュートリアルによると、サブクラスはスーパークラスのメンバ（フィールド、メソッド、ネストしたクラス）をすべて継承する。コンストラクタはメンバではないので継承されないが、サブクラスから `super(...)` で呼び出せる。Java では、`Object` 以外のすべてのクラスは直接のスーパークラスを 1 つだけ持つ（単一継承）。

## 例

```java
public class MountainBike extends Bicycle {
    public int seatHeight;

    public MountainBike(int startHeight, int startCadence,
                        int startSpeed, int startGear) {
        super(startCadence, startSpeed, startGear);
        seatHeight = startHeight;
    }

    public void setHeight(int newValue) {
        seatHeight = newValue;
    }
}
```

`MountainBike` は `Bicycle` のフィールドとメソッドをすべて継承し、`seatHeight` フィールドとそれを設定するメソッドを足している。

## 注意点

複数のスーパークラスを持つ多重継承では、どのメンバが参照されるのかを把握しにくくなる。そのため Java や C# は、クラスの継承を単一継承に限り、インタフェースは複数実装できるようにしている。

差分だけを書く目的で継承を使うと、データとメソッドが階層に散らばって把握しにくくなる。代わりに合成（コンポジション）が重視されるようになっている。[[テスト駆動開発（書籍）]] でも、一般には[[composition-over-inheritance|継承より委譲]]と言われることに触れている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[composition-over-inheritance|継承より委譲]]
- [[interface|インタフェース]]
- [[abstract-base-class|抽象基底クラス]]

## 出典

- [Inheritance (The Java Tutorials)](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html)
- [継承 (プログラミング) - Wikipedia](<https://ja.wikipedia.org/wiki/継承_(プログラミング)>)
- [[テスト駆動開発（書籍） 第6章 テスト不足に気づいたら|テスト駆動開発 第6章]]
