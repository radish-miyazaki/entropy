---
title: プロパティベーステスト
aliases: [Property-based testing, PBT]
description: 関数が常に満たすべき性質（プロパティ）を定義し、ランダムに生成した多数の入力でチェックするテスト手法
tags: [word, テスト]
date: 2025-03-14
---

## TL;DR

関数が持つ一般的な性質（プロパティ）を定義し、ランダムに生成した多数の入力に対してチェックするテスト手法。Property-based testing（PBT）とも呼ぶ。

## なぜ必要か

従来のテスト（Example-based testing、EBT）では、開発者がプログラムへの入力値と、期待する出力値の組（Example）を定義する。テストケースを作るのは開発者なので、無意識にパスするケースばかりになりやすい。また、テストの責任を開発者が負うので、テストの管理や修正に手間を取られる。

PBT では、開発者はどんな入力を与えても常に成り立つべきルール（[[invariant|不変条件]]を満たすプロパティ）を定義する。EBT もこの不変条件を示そうとするが、個々の例を通した間接的な表現なので限界がある。

## 仕組み

PBT では、一般にフレームワークを使う。多くのフレームワークは次の機能を持つ。

- **ジェネレータ（Generator）**: テストの入力データをランダムに生成する。独自のジェネレータも作れる
- **収縮（Shrinking）**: テストが失敗する入力のうち、最小限の（最も単純な）ものを探し出す。通常はゼロ値（数値なら 0、リストなら空リスト）に向かって収縮するが、カスタマイズもできる（PropEr の `?SHRINK` / `?LETSHRINK` など）
- **標的型プロパティ（Targeted Properties）**: 通常のプロパティでは、各テストケースのデータ生成は独立している。標的型プロパティでは、前の結果が後続のデータ生成に影響を与える。そのため、ジェネレータを調整しなくても、単純なジェネレータで狙ったデータを生成できる

プロパティには、状態を持たないステートレスプロパティと、状態を持つステートフルプロパティの 2 種類がある。

## 例

各言語の主なフレームワーク。

- [[haskell|Haskell]]: QuickCheck
- [[erlang|Erlang]]: PropEr
- [[elixir|Elixir]]: PropCheck
- [[clojure|Clojure]]: [test.check](https://clojure.org/guides/test_check_beginner)
- [[typescript|TypeScript]]: [fast-check](https://fast-check.dev/)
- [[go|Go]]: [Rapid](https://github.com/flyingmutant/rapid) / [GOPTER](https://github.com/leanovate/gopter)
- [[rust|Rust]]: [Proptest](https://github.com/proptest-rs/proptest)
- [[ruby|Ruby]]: [pbt](https://github.com/ohbarye/pbt) / [Rantly](https://github.com/rantly-rb/rantly)
- [[python|Python]]: [Hypothesis](https://github.com/HypothesisWorks/hypothesis)

## 注意点

EBT と PBT は相反するものではなく、補い合う関係にある。

EBT は、既知のことを既知のまま確かめる（Known known → Known known）。コードが想定どおりに動くかをチェックするのに役立ち、リグレッションの検知にも使える。

PBT は、既知の未知を既知にする（Known unknown → Known known）。プログラムの振る舞いを探り、何ができて何ができないのか、自分たちの想定が正しいかを確かめるのに役立つ。そのため PBT が失敗しても、理由はすぐには分からない。「本当にバグなのか」「そもそもプロパティが正しいのか」をよく判断することになる。その結果、本当に満たすべき仕様は何かを考え直す機会が増える。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fuzz-testing|ファズテスト]]
- [[mutation-testing|ミューテーションテスト]]
- [[invariant|不変条件]]

## 出典

- [[実践プロパティベーステスト ― PropErとErlang／Elixirではじめよう|実践プロパティベーステスト ― PropErとErlang/Elixirではじめよう]]
- [t_wada によるプロパティベーステストの入門スライド](https://speakerdeck.com/twada/intro-to-property-based-testing)
