---
title: 単一責任の原則
aliases: [SRP]
description: 各モジュールが変更される理由は 1 つだけであるべきだという設計の原則
tags: [word, 設計]
date: 2026-11-14
---

## TL;DR

Robert C. Martin による、各ソフトウェアモジュールが変更される理由は 1 つだけであるべきだという原則。

## なぜ必要か

異なる人が関心を持つコードを混ぜると、ある人のための変更が、別の人のための機能を壊す。[[手を動かしてわかるクリーンアーキテクチャ]] では、ドメイン層が永続化の関心事まで扱うと、ドメイン層に影響を与えずに永続化層を変更するのが難しくなるとしている。

## 仕組み

[Martin のブログ](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)によると、この原則は人についての原則である。変更の理由は人、または 1 つの業務機能を代表する密接な人の集まりから生まれる。バグ修正や[[refactoring|リファクタリング]]はプログラマの責任であって、プログラムが変わる理由ではない。

同じ理由で変わるものは集め、違う理由で変わるものは分ける。Martin はこれを凝集度と[[coupling|結合度]]の別の言い方だとしている。Parnas の[[information-hiding|情報隠蔽]]や、Dijkstra の[[separation-of-concerns|関心の分離]]の考え方を受け継いでいる。

## 例

Martin のブログでは、`calculatePay`、`save`、`reportHours` を持つ `Employee` クラスを例にしている。給与計算は CFO、労働時間のレポートは COO、永続化は CTO が責任を持つので、この 3 つは別の理由で変わる。

## 注意点

「1 つの仕事」が何かは人間の直感に頼るので、自動では判断できない。また、[[A Philosophy of Software Design]] はクラスを小さく分けすぎることを[[classitis|Classitis]]として批判しているが、大きすぎるクラスも問題なので、両者は真逆というわけではない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[separation-of-concerns|関心の分離]]
- [[conways-law|コンウェイの法則]]
- [[open-closed-principle|開放閉鎖の原則]]
- [[liskov-substitution-principle|リスコフの置換原則]]
- [[dependency-inversion-principle|依存性逆転の原則]]

## 出典

- [The Single Responsibility Principle - The Clean Code Blog](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)
- [[手を動かしてわかるクリーンアーキテクチャ 第2章 従来の多層アーキテクチャの何が問題なのか？|手を動かしてわかるクリーンアーキテクチャ 第2章]]
- [[Test-Driven React, Second Edition 第5章 Refactoring with Hooks|Test-Driven React, Second Edition 第5章]]
- [[A Philosophy of Software Design 第4章 Modules Should Be Deep|A Philosophy of Software Design 第4章]]
