---
title: OpenUI
aliases: []
description: AI モデルにチャートやフォームなどのインタフェースを生成させるための、Generative UI のオープンな標準
tags: [word, generative-ui]
date: 2026-07-03
---

## TL;DR

[[generative-ui|Generative UI]] のためのオープンな標準。AI モデルに、チャート、テーブル、フォーム、ダッシュボードなどのインタフェースを生成させる。Thesys が開発・保守している。

## 仕組み

LLM は、OpenUI Lang という言語で、自分のコンポーネントを使ったインタフェースを書く。OpenUI Lang は JSON ではなく、1 行で 1 つのコンポーネントを定義するので、レスポンスのストリーミング中から描画を始められる。

描画先は React、Vue、Svelte、Angular、Lynx などに対応している。複数の AI モデルやエージェントのフレームワーク、shadcn/ui や Material UI などのデザインシステムとも組み合わせられる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[generative-ui|Generative UI]]

## 出典

- [OpenUI](https://www.openui.com/)
