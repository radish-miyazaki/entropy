---
title: Test-Time Diffusion Deep Researcher
aliases: [TTD-DR]
description: 回答の下書きを先に作り、Web 検索の結果で繰り返し改良することで Deep Research の精度を上げる手法
tags: [word, google, deep-research]
date: 2025-08-01
---

## TL;DR

Google のメンバーが 2025 年 7 月に発表した、[[deep-research|Deep Research]] の精度を上げるための手法。ユーザの質問に対してまず回答の下書きを作り、それを最大 20 回ブラッシュアップする。この改良の過程を Diffusion（拡散）と呼んでいる。

## なぜ必要か

従来の Deep Research の実装（[GPT Researcher](https://github.com/assafelovic/gpt-researcher)、[Open Deep Research](https://github.com/langchain-ai/open_deep_research) など）は、アルゴリズムが直線的で柔軟性がなかった。検索中に重要な事実に気付いても、その後の調査は最初の計画どおりに進む。その結果、想定とは異なる方向に調査が進み、精度が低くなっていた。

## 仕組み

人間が文章を書くときの、下書きを書いては直すプロセスに着想を得ている。手順は次のとおりである。

1. 下書きと調査の計画を作る。
2. 現在の下書きと計画を基に Web 検索を行い、その結果を踏まえて下書き全体をブラッシュアップする。これをノイズ除去と呼ぶ。
3. 2 の検索を繰り返す間に、計画など各要素そのものも変えていく。これを自己進化（Self-Evolution）と呼ぶ。
4. ノイズ除去を最大 20 回繰り返したら、最終的な成果物を生成する。

ポイントは、検索のたびに一部を書き足すのではなく、下書き全体を直すことである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[deep-research|Deep Research]]
- [[llm|LLM]]

## 出典

- [Deep Researcher with Test-Time Diffusion（arXiv）](https://www.arxiv.org/pdf/2507.16075)
- https://zenn.dev/knowledgesense/articles/5a341158c2c9ab
- https://note.com/rami_engineer/n/n94a918fc0b4b
