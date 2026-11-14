---
title: グッドハートの法則と開発メトリクスの落とし穴
aliases: []
description: 開発生産性を Effort や Output で測るとグッドハートの法則に陥るので、Outcome と Impact を測るべきという考え
tags: [word, 組織, 開発生産性]
date: 2025-07-03
---

## TL;DR

プログラマの生産性を、計測しやすい Effort や Output で測ると[[goodharts-law|グッドハートの法則]]に陥る。測るべきは Outcome や Impact である。

## なぜ必要か

グッドハートの法則は、観測された統計的な規則性は、管理のために圧力をかけられると崩れやすいという法則である。開発の指標を選ぶときにこれを意識しないと、数値だけが良くなり、生産性は上がらない。

## 仕組み

プログラマの生産性を測る指標は、次の 4 段階に分けられる。

- Effort: 工数など
- Output: 成果物。PR の数やソースコードの行数など
- Outcome: ユーザの振る舞いが変わること
- Impact: 売り上げや顧客満足度が増えること

Effort や Output は計測しやすく、Outcome や Impact は計測しづらい（時間がかかる）。それでも Kent Beck は、後者を[[developer-productivity|開発生産性]]の測定値にすべきだとしている。

生成 AI によって Effort は減り、Output は増えた。そのため、もはや Output を指標にする意味はない。プログラマの成長という観点でも、ジュニアプログラマには Output の増加ではなく、学び（Outcome や Impact）の増加を求めるほうが、長期的に開発生産性が上がる。

## 例

ソフトウェア開発の生産性を上げる方法として、次のものがある。

- 観察を後にする: Effort や Output の評価は後から分かるので、Output の時点で観測や評価をしなくてよい
- 気づきを促す: 学びも Outcome や Impact である
- プレッシャーを避ける: Effort は気にしない
- 目的意識を植え付ける: 最終的な Outcome や Impact を意識してもらう

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[goodharts-law|グッドハートの法則]]
- [[developer-productivity|開発生産性]]
- [[four-keys|Four Keys]]
