---
title: ADR
aliases: [Architecture Decision Record]
description: アーキテクチャ上の決定 1 つと、その根拠を記録したもの
tags: [word, アーキテクチャ]
date: 2025-01-17
---

## TL;DR

Architecture Decision Record の略で、アーキテクチャ上の決定（AD）1 つと、その根拠を記録したものである。

## なぜ必要か

ADR を残しておくと、ある選択をした理由、そのトレードオフ、影響を後から理解できる。

## 仕組み

アーキテクチャ上の決定（Architectural Decision）とは、アーキテクチャ上重要な機能要件や非機能要件に対処するための、根拠のある設計上の選択である。プロジェクトで作成・維持する ADR の集まりは、Decision log と呼ばれる。ADR の使い方はアーキテクチャ以外の設計の決定を記録することにも広げられる。

## 例

Michael Nygard は 2011 年のブログ記事「Documenting Architecture Decisions」で、プロジェクトの中で最も追いにくいものの 1 つは、ある決定の動機だとして、ADR の形式を示した。1 つの ADR は次の節でできている。

- タイトル: 短い名詞句（例: 「ADR 9: LDAP for Multitenant Integration」）
- コンテキスト: 技術、政治、社会、プロジェクト固有の事情など、決定に働く力。価値判断を入れずに書く
- 決定: それらの力への対応。「We will …」で始まる能動態の文で書く
- ステータス: 提案中、承認済みなど。後の決定で覆されたら、非推奨や置き換え済みにして、置き換えた ADR を参照する
- 結果: 決定によって起きることを、良いものも悪いものも中立のものもすべて書く

ADR はプロジェクトのリポジトリの `doc/arch/adr-NNN.md` に置く。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[意思決定のプロセスを残す|意思決定のプロセスを残す]]
- [[alloy|Alloy]]: ADR に Alloy で書いた仕様を含める活用事例がある

## 出典

- [Architectural Decision Records (ADRs)](https://adr.github.io/)
- [Documenting Architecture Decisions - Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
