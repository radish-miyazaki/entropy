---
title: LLMに書かせる前提で設計された言語の設計について議論して｡
description: LLM の登場でプログラミング言語を作るハードルが下がった中で、LLM に書かせる前提の言語をどう設計するかを、自作言語 Nexus を題材に話す発表
tags: [talk]
date: 2026-07-10
speakers: [nymphium]
company:
event: "[[関数型まつり 2026]]"
held: 2026-07-12
slide: https://nymphium.github.io/pdf/fp_matsuri_2026.html
video:
---

## TL;DR

- [[large-language-model|LLM]] の登場で、言語の仕様だけ人間が決め、実装や周辺ツールは AI に任せられるようになり、言語を作るハードルが下がった。
- 自作の LLM 向け言語 Nexus などでベンチマークを取りつつ、LLM に書かせる前提の言語の設計を考える。LLM 向けの言語の作り方はまだ open problem とされた。

## 内容

[[large-language-model|LLM]] の登場で、プログラミング言語を作るハードルが下がった。気になるところだけを自分でやり、それ以外は AI に任せられる。たとえば処理系の仕様だけを人間が決め、実装や Formatter、Linter などの周辺ツールは AI に任せる。[agentlanguages.dev](https://agentlanguages.dev/) にも、LLM 向けの言語が多く紹介されている。

発表者は LLM に書かせる前提の言語 [Nexus](https://github.com/nexus-llm-lang/Nexus) を作っている。まとめでは、LLM 向けの言語の作り方は open problem とされ、事後学習、フィードバックの生成、既存のさまざまな手法が挙げられた。

## キーワード

- [[large-language-model|LLM]]

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [プロポーザル](https://fortee.jp/2026fp-matsuri/proposal/bc8c27a9-8dec-4284-9555-7c4816fb1191)
