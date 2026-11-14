---
title: ドメイン固有言語
aliases: [DSL]
description: 汎用のプログラミング言語ではなく、特定の種類の問題を対象にしたコンピュータ言語
tags: [word, プログラミング言語]
date: 2026-11-14
---

## TL;DR

汎用のプログラミング言語ではなく、特定の種類の問題を対象にしたコンピュータ言語。英語では Domain-Specific Language といい、DSL と略す。CSS、正規表現、SQL、make などがその例である。

## なぜ必要か

対象の問題の言葉で直接書けるので、汎用言語で書くよりも意図が伝わりやすい。[[ドメインモデリングにおける抽象の役割、tagless-finalによるDSL構築、そして型安全な最適化]]では、ドメインの意味を DSL で直接表現すると、誤った意味をそもそも書けなくなり、[[accidental-complexity|偶有的複雑性]]を排除できるとしている。

## 仕組み

Martin Fowler は、DSL を内部 DSL と外部 DSL に分けている。

- **内部 DSL**: ホスト言語の書き方を工夫して、特化した言語のように読めるようにしたもの。埋め込み DSL や fluent interface とも呼ばれる。Ruby や Lisp のような記述の少ない言語で作りやすい。
- **外部 DSL**: 独自の構文を持ち、処理するには専用のパーサを書く。

DSL のスクリプトは、実行時に読み込んで解釈するのが最も簡単である。必要に応じて、Java や C などのコードを生成する方法も取られる。

## 例

- [[typespec|TypeSpec]] は、API の仕様を書くための DSL である。
- Rust ではマクロで DSL を作れるが、[[Effective Rust 項目28 マクロのデメリット|Effective Rust]] によると、その DSL を読むにはマクロの実装まで理解する必要がある。
- TypeScript のテンプレートリテラル型を使うと、DSL のパーサを型で表現できる。

## 注意点

テキストではなくグラフィカルな DSL もあるが、扱うには言語ワークベンチのような道具が要る。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[tagless-final|Tagless Final]]
- [[typespec|TypeSpec]]
- [[ubiquitous-language|ユビキタス言語]]

## 出典

- [DomainSpecificLanguage - Martin Fowler](https://martinfowler.com/bliki/DomainSpecificLanguage.html)
- [[ドメインモデリングにおける抽象の役割、tagless-finalによるDSL構築、そして型安全な最適化]]
