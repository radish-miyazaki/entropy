---
title: サブタイプ
aliases: [サブタイピング]
description: ある型の値を、別の型が期待される場所で安全に使える関係
tags: [word, 型システム]
date: 2026-11-14
---

## TL;DR

型 S の値を、型 T が期待されるどんな文脈でも安全に使えるとき、S は T のサブタイプ（部分型）であるという。`S <: T` と書く。

## なぜ必要か

[Wikipedia](https://en.wikipedia.org/wiki/Subtyping) によると、サブタイピングは多相性の一種で、1 つの値が複数の型に属せるようにする。たとえば整数と実数がどちらも Number のサブタイプなら、Number を受け取る `max` 関数にどちらも渡せる。

## 仕組み

どの型がサブタイプになれるかの決め方には 2 種類ある。名前的なサブタイピングでは、特定の方法で宣言した型だけが互いにサブタイプになれる。構造的なサブタイピングでは、2 つの型の構造でサブタイプかどうかが決まる。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目7 型を値の集合として考える|Effective TypeScript 項目7]] では、型を値の集合と考えると、サブタイプは「部分集合」を意味すると説明している。

## 例

```ts
interface Vector1D {
  x: number
}
interface Vector2D extends Vector1D {
  y: number
}
// Vector2D は Vector1D のサブタイプ
```

## 注意点

Wikipedia によると、サブタイピングは型（インタフェース）どうしの関係で、継承は実装どうしの関係である。両者は一致することもあるが、別のものである。また、関数型では引数の型が反変、戻り値の型が共変になる。[[型推論入門 ― Hindley-Milnerの仕組みと実装の違い|型推論入門]]によると、Hindley-Milner の型推論はそのままでは部分型を推論できない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[liskov-substitution-principle|リスコフの置換原則]]
- [[structural-typing|構造的型付け]]
- [[nominal-typing|名前的型付け]]

## 出典

- [Subtyping - Wikipedia](https://en.wikipedia.org/wiki/Subtyping)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目7 型を値の集合として考える|Effective TypeScript 項目7 型を値の集合として考える]]
