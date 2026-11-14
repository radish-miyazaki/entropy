---
title: レイアウトシフト
aliases: []
description: 画像などが読み込まれたときに、ほかの要素の位置が動いてしまう現象
tags: [word, パフォーマンス]
date: 2024-09-19
---

## TL;DR

画像などが読み込まれたときに、ほかの要素を押し動かしてしまう現象。[[cumulative-layout-shift|Cumulative Layout Shift]] の値を悪くする、パフォーマンスの問題を引き起こす。

## 注意点

画像によるレイアウトシフトを避けるには、画像のサイズを指定する必要がある。[[nextjs-image|next/image]] では、`import` で読み込むか、`width` と `height`、または `fill` を指定してサイズを決める。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cumulative-layout-shift|Cumulative Layout Shift]]
- [[nextjs-image|next/image]]
