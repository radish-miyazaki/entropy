---
title: Four Keys
aliases: []
description: DORA がソフトウェア開発チームのパフォーマンスを測るために示した 4 つの指標
tags: [word, devops, google]
date: 2026-02-12
---

## TL;DR

DORA（DevOps Research and Assessment）が 6 年間の研究から導いた、ソフトウェア開発チームのパフォーマンスを測る 4 つの指標。同じ名前で、これらの指標を自動で集計するオープンソースのプロジェクトも Google Cloud から公開されている。

## 仕組み

4 つの指標は次のとおり。前の 2 つが開発の速さを、後の 2 つが安定性を表す。

- デプロイの頻度（Deployment Frequency）: 本番環境へのリリースに成功する頻度
- 変更のリードタイム（Lead Time for Changes）: コミットが本番環境に入るまでの時間
- 変更障害率（Change Failure Rate）: 本番環境で障害を起こしたデプロイの割合
- サービス復元時間（Time to Restore Service）: 本番環境の障害から復旧するまでの時間

DORA はこれらの指標で、チームを Elite、High、Medium、Low の 4 段階に分類していた。ただし 2021 年に 5 つ目の指標として信頼性（reliability）が加わり、2022 年の State of DevOps Report では High、Medium、Low の 3 段階になっている。

プロジェクトの Four Keys は、GitHub や GitLab のイベントを Webhook で受け取って BigQuery に入れ、SQL で変更、デプロイ、インシデントに分類して 4 つの指標を計算する。結果はダッシュボードに表示される。

## 関連

- [[LeanとDevOpsの科学［Accelerate］ テクノロジーの戦略的活用が組織変革を加速する]]
- [[goodharts-law-and-developer-metrics|グッドハートの法則と開発メトリクスの落とし穴]]

## 出典

- [Using the Four Keys to measure your DevOps performance - Google Cloud Blog](https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance)
