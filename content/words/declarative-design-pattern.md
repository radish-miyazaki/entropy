---
title: declarative design pattern
aliases: []
description: Ash Framework の中心にある、構成を設定として宣言し、そこから振る舞いを導く設計の考え方
tags: [word, zach-daniel]
date: 2025-04-25
---

## TL;DR

[[ash-framework|Ash Framework]] の中心にある設計の考え方。[[Design Principles（Ash Framework）|Ash Design Principles]] によれば、すべての構成を設定として明示的に定義し、コードはその設定に従って動く。

## 仕組み

Zach Daniel は「Incremental Declarative Design」で、宣言的な設計を、命令的なスタイルで[[abstraction|抽象化]]するときに起きる問題を避ける方法として説明している。その要点は「コードを抽象化するのではなく、データを抜き出す」ことである。振る舞いの記述をデータとして抜き出すと、それが[[domain-specific-language|ドメイン固有言語]]（DSL）になる。

こうして抜き出した記述は読みやすく、記述を変えることはドメインを変えることに対応する。記述を残したまま、それを解釈するエンジンだけを書き直すこともできる。記述は静的なので、別の用途に使い回せる。

## 注意点

Zach Daniel は、早すぎる抽象化を避けるという通説に従い、最初は素直なコードを書くことを勧めている。ただし、早すぎる抽象化と同じく、抽象化が遅すぎることも深刻な問題になりうる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[Design Principles（Ash Framework）|Ash Design Principles]]
- [[ash-framework|Ash Framework]]

## 出典

- [Incremental Declarative Design - Zach Daniel](https://www.zachdaniel.dev/p/incremental-declarative-design)
