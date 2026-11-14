---
title: Douglas-Peucker アルゴリズム
aliases: [Ramer-Douglas-Peucker]
description: 折れ線を、形を保ったまま、より少ない点の折れ線に単純化するアルゴリズム
tags: [word, アルゴリズム]
date: 2025-05-27
---

## TL;DR

線分をつないだ曲線（折れ線）を、形を保ったまま、より少ない点の折れ線に単純化するアルゴリズム。Urs Ramer が 1972 年に、David Douglas と Thomas Peucker が 1973 年に発表した。

## なぜ必要か

地図の線や GPS の軌跡などは点の数が多く、そのままでは描画や保存の負担が大きい。Wikipedia によると、このアルゴリズムは地図の線を単純化する（地図の総描）手法として初期に成功したものの 1 つで、最も正確な結果が得られる代わりに時間がかかる。

## 仕組み

利用者が許容誤差 ε を決めて、次の手順で点を間引く。

1. 始点と終点は残し、その間の点を削除の候補にする
2. 始点と終点を結ぶ線分から最も遠い点を探す
3. その距離が ε 以下なら、間の点をすべて捨てる。捨てても、結果の誤差は ε を超えない
4. ε より遠ければ、その点を残し、「始点からその点まで」と「その点から終点まで」の 2 つの区間で同じ処理を再帰的に繰り返す

計算量は、分割が常に端に偏る最悪の場合で O(n²)、ほぼ均等に分かれる場合で Ω(n log n) である。

## 注意点

単純化が粗すぎると、結果の線が自分自身と交差することがある。この問題を避けるための変種のアルゴリズムが作られている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Ramer–Douglas–Peucker algorithm - Wikipedia](https://en.wikipedia.org/wiki/Ramer–Douglas–Peucker_algorithm)
- [線の間引き処理 - trail-note](https://www.trail-note.net/tech/thinout/)
- [Ramer-Douglas-Peucker algorithm - siguniang](https://siguniang.wordpress.com/2012/07/16/ramer-douglas-peucker-algorithm/)
- [Douglas-Peucker algorithm - Cartography Playground](https://cartography-playground.gitlab.io/playgrounds/douglas-peucker-algorithm/)
