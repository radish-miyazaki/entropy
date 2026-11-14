---
title: 情報漏洩
aliases: [Information Leakage]
description: 同じ知識が複数のモジュールに現れ、モジュール間に依存関係が生じている状態
tags: [word, 設計]
date: 2023-12-19
---

## TL;DR

[[module|モジュール]]間に[[dependency|依存関係]]が生じている状態。あるモジュールを変更すると、関係するモジュールすべてに変更が必要になる。

## 仕組み

情報漏洩は、情報の一部が[[interface|インタフェース]]に反映されていると起きる。インタフェースがシンプルであるほど、[[information-hiding|情報隠蔽]]はうまくいく。

**情報漏洩は、クラスを少し大きくすることで改善できることが多い。**

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[information-hiding|情報隠蔽]]: 情報漏洩の反対の状態
- [[temporal-decomposition|時間的分解]]
- [[overexposure|Overexposure]]
- [[red-flag|レッドフラグ]]

## 出典

- [[A Philosophy of Software Design 第5章 Information Hiding (and Leakage)|A Philosophy of Software Design 第5章]]
