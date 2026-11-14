---
title: Radix UI
aliases: []
description: アクセシビリティを重視した、オープンソースの React 向けコンポーネントライブラリ
tags: [word, react, ui]
date: 2024-09-14
---

## TL;DR

開発の速さ、保守のしやすさ、アクセシビリティを重視したオープンソースのコンポーネントライブラリ。設定なしで import するだけで使える。

## 仕組み

Radix UI には Primitives、Themes、Icons、Colors がある。

中心となる Radix Primitives は、低レベルの UI コンポーネント群である。コンポーネントはスタイルなしで提供されるので、見た目は好きなスタイリング手法で自由に決められる。できる限り WAI-ARIA のデザインパターンに従っており、aria や role 属性、フォーカス管理、キーボード操作をライブラリが受け持つ。

デザインシステムの土台にすることも、必要なコンポーネントだけを少しずつ取り入れることもできる。`radix-ui` パッケージを入れて必要な Primitive を import する方法が推奨されているが、Primitive ごとに個別に入れることもできる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react|React]]

## 出典

- [Radix UI](https://www.radix-ui.com/)
- [Introduction - Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)
