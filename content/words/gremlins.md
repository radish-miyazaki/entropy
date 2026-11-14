---
title: Gremlins
aliases: []
description: 小〜中規模の Go モジュール向けのミューテーションテストツール
tags: [word, go]
date: 2026-05-19
---

## TL;DR

[[go|Go]] 向けの[[mutation-testing|ミューテーションテスト]]ツール。[[microservices|マイクロサービス]]程度の小〜中規模の Go モジュールを対象にしている。

## なぜ必要か

コードを意図的に書き換え、テストがその変更を検出できるかを確かめることで、[[test-coverage|テストカバレッジ]]だけでは分からないテストの質を測れる。テストスイートの検証、[[test-driven-development|TDD]] の支援、[[continuous-integration|CI]] での品質ゲートとしての利用が想定されている。

## 仕組み

変異を入れられる箇所を探し、テストでカバーされている箇所だけを変異させてテストを実行する。プルリクエストで変更した部分だけを対象にすることもできる。設定は YAML で書く。

## 注意点

非常に大きな Go モジュールには向かず、実行に数時間かかることがある。0.x.x のリリースなので、マイナーバージョンの間でも設定のフラグやファイルが変わることがある。

## 関連

- [[mutation-testing|ミューテーションテスト]]

## 出典

- [Gremlins](https://gremlins.dev/latest/)
