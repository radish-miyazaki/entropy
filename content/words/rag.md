---
title: RAG
aliases: []
description: Retrieval-Augmented Generation または Resource Allocation Graph の略
tags: [word]
date: 2025-03-06
---

## TL;DR

次のどちらかの略。

- Retrieval-Augmented Generation
- [[resource-allocation-graph|Resource Allocation Graph]]

Retrieval-Augmented Generation は、事前学習済みの生成モデルに、外部の文書を検索する仕組みを組み合わせて文章を生成する手法である。

## なぜ必要か

Lewis らの論文によると、事前学習済みの言語モデルはパラメータに知識を蓄えるが、その知識を正確に引き出して扱うこと、答えの根拠を示すこと、知識を新しくすることに限界がある。RAG はこれらの課題に対処するために提案された。

## 仕組み

Lewis らは 2020 年の論文「Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks」で RAG を提案した。事前学習済みの seq2seq モデルを「パラメトリックメモリ」とし、Wikipedia を密ベクトルで索引したものを「ノンパラメトリックメモリ」として、事前学習済みのニューラル検索器で引く。この 2 つを組み合わせて文章を生成する。

論文では、オープンドメインの質問応答の 3 つのタスクで当時の最高性能を出した。文章の生成でも、パラメトリックメモリだけの seq2seq モデルより、具体的で多様で事実に沿った文章を生成した。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[large-language-model|大規模言語モデル]]
- [[resource-allocation-graph|Resource Allocation Graph]]

## 出典

- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks（arXiv）](https://arxiv.org/abs/2005.11401)
