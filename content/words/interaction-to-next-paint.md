---
title: Interaction to Next Paint
aliases: [INP, Interaction to Next paint]
description: ページ上のクリック、タップ、キーボード操作のレイテンシから、ユーザー操作への応答性を評価する Core Web Vitals の指標
tags: [word, web]
date: 2024-09-25
---

## TL;DR

[[core-web-vitals|Core Web Vitals]] の指標の 1 つで、略して INP。ユーザー操作に対するページの全体的な応答性を評価する。

## なぜ必要か

web.dev によると、INP は First Input Delay（FID）の後継の指標である。FID はページで最初の操作の入力遅延だけを測っていたが、INP はページ上のすべての操作を対象にする。

## 仕組み

> INP は、ユーザーによるページ訪問までに発生したすべてのクリック、タップ、キーボード操作のレイテンシをモニタリングすることで、ユーザー操作に対するページの全体的な応答性を評価する指標です。

良いユーザー体験のためには、INP を 200 ミリ秒以下にする必要がある。web.dev では、フィールドデータの 75 パーセンタイルで、200 ミリ秒以下を「良好」、500 ミリ秒以下を「改善が必要」、それより長いものを「不良」としている。

1 つの操作の時間は、イベントハンドラが動き出すまでの入力遅延、ハンドラの処理時間、処理が終わってから次のフレームが表示されるまでの表示遅延の 3 つからなる。INP の値はページを離れるときに決まり、観測した操作のうち最も長いものを使う。外れ値の影響を抑えるため、操作 50 回ごとに最も遅い 1 回を除く。

## 注意点

計測の対象はクリック、タップ、キー入力だけで、スクロール、ホバー、ズームは含まない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[core-web-vitals|Core Web Vitals]]
- [[largest-contentful-paint|Largest Contentful Paint]]
- [[cumulative-layout-shift|Cumulative Layout Shift]]

## 出典

- [Interaction to Next Paint（INP）](https://web.dev/articles/inp?hl=ja)
- [ウェブに関する主な指標（Web Vitals）](https://web.dev/articles/vitals?hl=ja#core-web-vitals)
