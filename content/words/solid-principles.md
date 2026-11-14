---
title: SOLID 原則
aliases: [SOLID]
description: オブジェクト指向設計の 5 つの原則の頭文字を並べたもの
tags: [word, 設計]
date: 2026-11-14
---

## TL;DR

オブジェクト指向設計の 5 つの原則の頭文字を並べたもの。Robert C. Martin が 2000 年の論文「Design Principles and Design Patterns」で原則を示し、2004 年ごろに Michael Feathers が SOLID という頭字語を作った。

## なぜ必要か

[Wikipedia](https://en.wikipedia.org/wiki/SOLID) によると、SOLID 原則はソースコードを理解しやすく、柔軟で、保守しやすくすることを目指している。結合を減らし、要件が変わったときにシステムを拡張しやすくする。

## 仕組み

5 つの原則は次のとおりである。

- **S**: 単一責任の原則（SRP）。クラスを変更する理由は 1 つより多くあってはならない
- **O**: [[open-closed-principle|オープン・クローズドの原則]]（OCP）。ソフトウェアの構成要素は拡張に対して開かれ、修正に対して閉じているべきである
- **L**: [[liskov-substitution-principle|リスコフの置換原則]]（LSP）。基底クラスが期待される場所で、サブクラスを使ってもプログラムが壊れないようにする
- **I**: インタフェース分離の原則（ISP）。クライアントに、使わないメソッドへの依存を強制してはならない
- **D**: [[dependency-inversion-principle|依存関係逆転の原則]]（DIP）。具象ではなく抽象に依存すべきである

## 注意点

[[手を動かしてわかるクリーンアーキテクチャ 第3章 依存関係の逆転|手を動かしてわかるクリーンアーキテクチャ 第3章]] によると、単一責任の原則は「1 つのことだけを行う」と解釈されがちだが、大事なのは変更する理由が 1 つしかない点である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[open-closed-principle|オープン・クローズドの原則]]
- [[liskov-substitution-principle|リスコフの置換原則]]
- [[dependency-inversion-principle|依存関係逆転の原則]]
- [[clean-architecture|クリーンアーキテクチャ]]

## 出典

- [SOLID - Wikipedia](https://en.wikipedia.org/wiki/SOLID)
- [[手を動かしてわかるクリーンアーキテクチャ 第3章 依存関係の逆転|手を動かしてわかるクリーンアーキテクチャ 第3章]]
