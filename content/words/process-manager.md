---
title: プロセスマネージャ
aliases: []
description: 受信したメッセージと現在の状態から次に取るべきアクションを判断し、適切なワークフローを起動するコンポーネント
tags: [word, アーキテクチャ, メッセージング]
date: 2024-07-26
---

## TL;DR

受信したメッセージを処理し、現在の状態からどのアクションを取るべきかを判断して、適切な[[workflow|ワークフロー]]を起動するコンポーネント。英語では Process Manager と呼ぶ。Enterprise Integration Patterns のパターンの 1 つである。

## なぜ必要か

処理の手順が設計時に決まっていて、一直線に進むなら、Routing Slip のような固定のルートで足りる。しかし実際には、途中の結果によって次の処理が変わったり、複数の処理を並行して動かしたりする必要がある。プロセスマネージャは、こうした動的な流れを扱う。

## 仕組み

一連の処理の状態を、プロセスマネージャが一か所で持つ。

1. トリガーとなるメッセージを受け取ると、プロセスマネージャが動き出す
2. 最初の処理ユニットにメッセージを送り、終わったら返信を受け取る
3. 自分のルールと途中の結果をもとに次のステップを決め、次のメッセージを送る

AWS Step Functions や GCP Workflows も、プロセスマネージャの実装の例として挙げられている。

## 注意点

すべてのメッセージがプロセスマネージャを経由するハブアンドスポーク型になるので、性能のボトルネックになりうる。柔軟な分だけ複雑になるため、どの連携にも使うのはやりすぎである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[saga|サーガ]]
- [[message-router|Message Router]]

## 出典

- [Process Manager - Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/ProcessManager.html)
- <https://www.infoq.com/jp/news/2017/08/process-managers-event-flows/>
