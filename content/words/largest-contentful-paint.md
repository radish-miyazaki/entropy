---
title: Largest Contentful Paint
aliases: [LCP]
description: ページの読み込み開始から、ビューポート内で最も大きな画像やテキストブロックが描画されるまでの時間を表す指標
tags: [word, パフォーマンス]
date: 2024-09-18
---

## TL;DR

ページの読み込みが始まってから、ビューポート内に見えている最も大きな画像やテキストブロックが描画されるまでの時間。つまり、メインコンテンツが表示されるまでの時間を表す。[[core-web-vitals|Core Web Vitals]] の 1 つである。

## 仕組み

LCP の候補になるのは、`<img>` 要素、`<svg>` 内の `<image>` 要素、`<video>` 要素、`url()` で読み込んだ背景画像を持つ要素、テキストを含むブロックレベルの要素である。web.dev では、ページ読み込みの 75 パーセンタイルで 2.5 秒以下を良好、4.0 秒を超えると不良としている。

## 例

[[time-to-first-byte|Time to First Byte]] と同じく、各ブラウザの開発者ツールで確認できる。[[lighthouse|Lighthouse]] でも測定でき、LCP はパフォーマンスのスコアに反映される。

[[nextjs|Next.js]] の [[nextjs-image|next/image]] では、LCP 要素になる画像に `priority` を付けると優先して読み込まれ、LCP の改善が期待できる。

## 注意点

[[chrome-devtools|Chrome DevTools]] の「パフォーマンス分析情報」パネルはサポートが終了し、2024 年に削除される予定とされている。今後は「パフォーマンス」パネルに Lighthouse の分析が統合される。

## 自分の理解

パフォーマンス分析情報パネルが削除される予定なので、LCP は Lighthouse で測定したほうが良さそうだ。

## 関連

- [[core-web-vitals|Core Web Vitals]]
- [[cumulative-layout-shift|Cumulative Layout Shift]]
- [[time-to-first-byte|Time to First Byte]]
- [[nextjs-image|next/image]]

## 出典

- [Largest Contentful Paint - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Glossary/Largest_contentful_paint)
- [Largest Contentful Paint (LCP) - web.dev](https://web.dev/articles/lcp)
- [Optimize LCP - web.dev](https://web.dev/articles/optimize-lcp?hl=ja)
- [Performance insights - Chrome for Developers](https://developer.chrome.com/docs/devtools/performance-insights?hl=ja)
- [Performance tooling in 2024 and beyond - Chrome for Developers](https://developer.chrome.com/blog/perf-tooling-2024?hl=ja#performance_tooling_in_2024_and_beyond)
