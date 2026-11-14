---
title: LLM-as-a-Judge
aliases: []
description: 強い LLM を評価者にして、ほかの LLM の回答の良し悪しを判定させる評価手法
tags: [word, llm]
date: 2024-10-08
---

## TL;DR

強い [[large-language-model|LLM]] を評価者（ジャッジ）にして、ほかの LLM の回答の良し悪しを判定させる評価手法。人間の好みを安く、規模を大きくして近似するために使う。

## なぜ必要か

Zheng らの論文「Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena」によると、チャットアシスタントの良さを測るうえで人間の好みは重要だが、既存のベンチマークではそれを十分に測れない。人間の評価を集めるのはコストが高い。論文は LLM-as-a-Judge を、人間の好みを近似するための、規模を広げやすく説明もしやすい方法としている。

## 例

論文では、複数ターンの質問集である MT-Bench と、クラウドソーシングで回答を対戦させる Chatbot Arena の 2 つのベンチマークを作った。GPT-4 のような強いジャッジは、統制した実験でもクラウドソーシングでも人間の好みと 80% 以上一致した。これは人間どうしの一致率と同じ水準である。

## 注意点

同じ論文は LLM のジャッジにある偏りとして、回答の位置による偏り（position bias）、長い回答を好む偏り（verbosity bias）、自分の回答を好む偏り（self-enhancement bias）、推論能力の限界を挙げている。そのうちいくつかには、緩和する方法も提案されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[large-language-model|LLM]]

## 出典

- [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (arXiv:2306.05685)](https://arxiv.org/abs/2306.05685)
