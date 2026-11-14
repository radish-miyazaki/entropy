---
title: 本質的複雑性
aliases: [Essential Complexity]
description: 解こうとしている問題そのものに由来し、取り除けない複雑さ
tags: [word, 複雑さ]
date: 2026-11-14
---

## TL;DR

解こうとしている問題そのものに由来し、どうやっても取り除けない[[complexity|複雑さ]]。Fred Brooks が論文「No Silver Bullet」で、エンジニアが生み出して取り除ける[[accidental-complexity|偶有的複雑性]]と区別した。

## なぜ必要か

Brooks は、技術でも管理手法でも、10 年以内に生産性や信頼性、単純さを 10 倍にする単一の進歩はないと主張した。高水準言語などによって偶有的複雑性はすでに大きく減っているので、残りをゼロにしても同じ桁の改善は得られない。今後の進歩は、本質的複雑性に取り組む積み重ねから生まれるとした。

複雑さをこの 2 つに分けておくと、どちらに向き合っているかに応じて取り組み方を変えられる。

## 例

[[ドメインモデリングにおける抽象の役割、tagless-finalによるDSL構築、そして型安全な最適化]]では、『人月の神話』のこの区別を引いている。[[domain-specific-language|DSL]] でドメインの言葉を使って問題を直接記述すれば、ビジネスの本質をそのままコードに落とし込め、偶有的複雑性を排除できるとしている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[accidental-complexity|偶有的複雑性]]
- [[complexity|複雑さ]]

## 出典

- [No Silver Bullet - Wikipedia](https://en.wikipedia.org/wiki/No_Silver_Bullet)
- [[ドメインモデリングにおける抽象の役割、tagless-finalによるDSL構築、そして型安全な最適化]]
