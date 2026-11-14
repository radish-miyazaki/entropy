---
title: Core Web Vitals
aliases: []
description: 読み込み、インタラクティビティ、視覚的安定性の 3 つでユーザー体験を測る、Web Vitals の中核となる指標
tags: [word, web]
date: 2024-09-25
---

## TL;DR

Web Vitals のうち、すべてのウェブページに適用される中核の指標。現在は、ユーザー体験の 3 つの要素である読み込み、インタラクティビティ、視覚的安定性に焦点を当てている。

## 仕組み

Core Web Vitals を構成する指標は、時間とともに変わる。現在は次の 3 つの指標と、良いユーザー体験のためのしきい値が定められている。

| 指標                                                            | 測るもの                 | しきい値                            |
| --------------------------------------------------------------- | ------------------------ | ----------------------------------- |
| [[largest-contentful-paint\|Largest Contentful Paint]]（LCP）   | 読み込みのパフォーマンス | ページの読み込み開始から 2.5 秒以内 |
| [[interaction-to-next-paint\|Interaction to Next Paint]]（INP） | インタラクティビティ     | 200 ミリ秒以下                      |
| [[cumulative-layout-shift\|Cumulative Layout Shift]]（CLS）     | 視覚的安定性             | 0.1 以下                            |

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[largest-contentful-paint|Largest Contentful Paint]]
- [[interaction-to-next-paint|Interaction to Next Paint]]
- [[cumulative-layout-shift|Cumulative Layout Shift]]

## 出典

- [ウェブに関する主な指標（Web Vitals）](https://web.dev/articles/vitals?hl=ja#core-web-vitals)
