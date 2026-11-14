---
title: 大規模言語モデル
aliases: [LLM]
description: 大量のテキストで訓練された、テキストの生成や要約、翻訳を行う機械学習モデル
tags: [word, ai]
date: 2026-11-14
---

## TL;DR

大量のテキストで訓練された機械学習モデル（通常はニューラルネットワーク）。LLM と略す。テキストの生成、要約、翻訳、分析ができ、多くのチャットボットの基盤になっている。

## 仕組み

Wikipedia によると、LLM は多くの場合 Transformer というニューラルネットワークのアーキテクチャに基づく。LLM の一種である GPT は、次の単語を予測するように事前学習され、その後、指示に従いアシスタントとして振る舞うようにファインチューニングされる。

## 例

モデルを動かすソフトウェアがメモリやツール（Web 検索など）を与えると、テキストの生成以外のこともできる。外部のデータやツールにつなぐ標準として [[model-context-protocol|Model Context Protocol]] がある。

## 注意点

訓練データに偏りや誤りがあると、出力の信頼性が下がる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[model-context-protocol|Model Context Protocol]]
- [[rag|RAG]]
- [[llm-as-a-judge|LLM-as-a-Judge]]
- [[context7|Context7]]

## 出典

- [Large language model - Wikipedia](https://en.wikipedia.org/wiki/Large_language_model)
