---
title: Generative UI
aliases: []
description: AI モデルが、テキストだけでなく Web ページやツールなどの対話的な UI そのものをプロンプトごとに生成する機能
tags: [word]
date: 2026-07-03
---

## TL;DR

AI モデルが、テキストなどのコンテンツだけでなく、ユーザ体験そのものを生成する機能。Web ページ、ゲーム、ツール、アプリといった対話的な UI を、プロンプトごとに設計して作る。

## なぜ必要か

Google Research のブログによると、評価では人間の専門家が作った Web サイトが最も好まれ、その次に Generative UI の結果が続いた。検索の上位結果や、LLM がそのまま返すテキストや Markdown よりは大きく好まれている。ただし、この比較では生成にかかる時間は考慮していない。

## 仕組み

Google Research が紹介している実装は、Gemini 3 Pro に 3 つの仕組みを加えたものである。1 つ目はツールで、サーバが画像生成や Web 検索などのツールをモデルに使わせる。ツールの結果はモデルに戻すことも、ユーザのブラウザに直接送ることもできる。2 つ目はシステム指示で、目的、計画、例、技術仕様を含む詳しい指示をモデルに与える。3 つ目は後処理で、モデルの出力によくある問題を直す。

Google はこの機能を、Gemini アプリの dynamic view と visual layout という 2 つの実験と、Google 検索の AI モード（米国の Google AI Pro と Ultra の加入者向け）で提供し始めている。

## 注意点

生成に 1 分以上かかることがあり、出力が不正確なこともある。また、性能は元になるモデルに左右され、新しいモデルほど結果がよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[openui|OpenUI]]

## 出典

- [Generative UI: A rich, custom, visual interactive user experience for any prompt - Google Research](https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/)
