---
title: ユビキタス言語
aliases: []
description: ドメインに関する概念と語彙の集合で、チームメンバーとソースコードの両方で共有されるもの
tags: [word, ddd]
date: 2024-07-02
---

## TL;DR

[[domain-driven-design|ドメイン駆動設計]]で、ドメインエキスパート、ユーザ、開発者が共有する共通の言語。[[Domain Modeling Made Functional]] の定義では、[[domain|ドメイン]]に関する概念と語彙の集合。チームメンバーとソースコードの両方で共有される。

## なぜ必要か

英語版 Wikipedia の「Domain-driven design」によると、[[domain-driven-design|ドメイン駆動設計]]は、[[domain-expert|ドメインエキスパート]]、ユーザ、開発者が共有する共通の言語を育てることを目指しており、ユビキタス言語はその柱の 1 つである。役割の違う人どうしが同じ概念について話せるように、共通の語彙を作る。

## 仕組み

同じ記事によると、ユビキタス言語は[[domain-model|ドメインモデル]]と、システムの要求の記述に使われる。また、クラス名、メソッド名、変数名など、ソースコードの構造と言葉もビジネスのドメインに合わせる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[bounded-context|境界づけられたコンテキスト]]: コンテキストごとに、ユビキタス言語の独自の方言を持つ
- [[japanese-domain-names|ドメインに日本語を使う]]
- [[domain-driven-design|ドメイン駆動設計]]

## 出典

- [[Domain Modeling Made Functional 第1章 ユビキタス言語の創造|Domain Modeling Made Functional 第1章 ユビキタス言語の創造]]
- [Domain-driven design - Wikipedia](https://en.wikipedia.org/wiki/Domain-driven_design)
