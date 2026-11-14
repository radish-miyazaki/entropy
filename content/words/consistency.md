---
title: 一貫性
aliases: []
description: 同じようなことは同じ方法で、異なることは異なる方法で行われている状態
tags: [word, 設計]
date: 2023-12-28
---

## TL;DR

一般には、始めから終わりまで同じ 1 つの方針や考えに従っていること。[[A Philosophy of Software Design]] の定義では、システムの中で、同じようなことは同じような方法で行われ、異なることは異なる方法で行われている状態である。

> If a system is consistent, it means that similar things are done in similar ways, and dissimilar things are done in different ways.
>
> （システムが一貫しているならば、同じようなことは同じような方法で行われ、異なることは異なる方法で行われるということである。）

## なぜ必要か

[[A Philosophy of Software Design 第17章 Consistency|A Philosophy of Software Design 第17章]]によると、システムに一貫性があれば、開発者はある場所で覚えたパターンを別の場所にも当てはめて正しく推論できるので、ミスが減る。一貫性は、名前、コーディングスタイル、[[interface|インタフェース]]、[[design-pattern|デザインパターン]]、[[invariant|不変条件]]などさまざまなレベルに当てはまる。

## 注意点

無理に一貫性を当てはめると、かえって[[complexity|複雑さ]]や混乱を生む。たとえば、本当は異なるものに同じ変数名を付けたり、合わないデザインパターンを無理に使ったりすることである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[A Philosophy of Software Design 第17章 Consistency]]

## 出典

- [[A Philosophy of Software Design]]
- [一貫性 - コトバンク（デジタル大辞泉）](https://kotobank.jp/word/一貫性)
