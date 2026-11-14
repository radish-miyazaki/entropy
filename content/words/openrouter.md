---
title: OpenRouter
aliases: []
description: 数百の AI モデルを 1 つの API エンドポイントから使えるゲートウェイ
tags: [word, 生成ai]
date: 2025-01-27
---

## TL;DR

数百の AI モデルを、1 つの API エンドポイントから使えるゲートウェイ。

## 仕組み

あるモデルが使えないときは、自動で別のモデルに切り替える（フォールバック）。リクエストごとに、費用の低い選択肢を選ぶこともできる。

OpenAI 互換の API を提供しているので、OpenAI の SDK のベース URL を `https://openrouter.ai/api/v1` に向けるだけで置き換えられる。公式の TypeScript と Python の SDK もある。

## 例

```sh
curl https://openrouter.ai/api/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -d '{
  "model": "~openai/gpt-sol-latest",
  "input": "What is the meaning of life?"
}'
```

`model` は https://openrouter.ai/models に載っている任意のモデルに変えられる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [OpenRouter](https://openrouter.ai/)
- [Quickstart - OpenRouter](https://openrouter.ai/docs/quickstart)
