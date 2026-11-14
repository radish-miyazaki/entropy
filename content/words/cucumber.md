---
title: Cucumber
aliases: []
description: 平易な文章で書いた実行可能な仕様を読み、ソフトウェアがそのとおりに動くかを確かめる BDD のツール
tags: [word, bdd, テスト]
date: 2024-07-24
---

## TL;DR

[[bdd|BDD]]（振る舞い駆動開発）を支えるツール。平易な文章で書いた実行可能な仕様を読み、ソフトウェアがそのとおりに振る舞うかを確かめる。

## なぜ必要か

仕様を自然な文章で書き、それをそのまま自動テストとして実行できる。仕様書とテストコードを二重に管理せずに済む。

## 仕組み

シナリオは [[gherkin|Gherkin]] という文法で書き、ふつうは `.feature` ファイルに置く。Gherkin は、平易な文章を Cucumber が解釈できるように構造化するための文法規則である。

シナリオの各行（ステップ）は、ステップ定義によってプログラムのコードに結び付けられる。ステップ定義は [[javascript|JavaScript]] など複数の言語で書ける。Cucumber はシナリオごとに、成功か失敗かを報告する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[bdd|BDD]]
- [[gherkin|Gherkin]]
- [[rspec|RSpec]]

## 出典

- [Cucumber](https://cucumber.io/)
- [Cucumber Documentation](https://cucumber.io/docs/)
- [10 Minute Tutorial - Cucumber](https://cucumber.io/docs/guides/10-minute-tutorial/)
- [きゅうりのことはじめ](https://qiita.com/gdate/items/9f0c381141927d727222)
- [仕様書とコードの二重管理を避けるために、自動テストで Cucumber を採用した話](https://techblog.infcurion.com/entry/auto-test-cucumber)
