---
title: Scroll snap
aliases: []
description: スクロール操作が終わったときに、特定の位置へ吸い寄せられるように移動する CSS の機能
tags: [word, css]
date: 2026-07-03
---

## TL;DR

スクロール操作が終わったときに、特定の位置へ「吸い寄せられる」ように移動する機能。

## なぜ必要か

カルーセルやスライドを Web ブラウザで見せるときに役に立つ。

## 仕組み

スクロールコンテナに `scroll-snap-type` を指定して、スナップする軸（`x`、`y`、`block`、`inline`、`both`）と厳しさを決める。`mandatory` では、スクロールしていないときは必ずスナップ位置に合わせる。`proximity` では、スナップするかどうかをブラウザがスクロールの状況から決める。軸だけを指定したときは `proximity` になる。子要素には `scroll-snap-align` で、どの端を揃えるかを指定する。

## 例

`scroll-snap-type` プロパティの MDN のページにあるサンプルが分かりやすい。

```css
#example-element {
  overflow-x: scroll;
  display: flex;
  scroll-snap-type: x mandatory;
}

#example-element > div {
  flex: 0 0 250px;
  scroll-snap-align: start;
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Scroll snap - MDN](https://developer.mozilla.org/ja/docs/Glossary/Scroll_snap)
- [scroll-snap-type - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Reference/Properties/scroll-snap-type)
