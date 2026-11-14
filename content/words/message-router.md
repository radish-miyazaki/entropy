---
title: Message Router
aliases: []
description: 条件に応じて、受け取ったメッセージを複数の出力チャネルのどれかに振り分ける、Enterprise Integration Patterns のパターン
tags: [word, アーキテクチャ, メッセージング]
date: 2024-07-12
---

## TL;DR

1 つの入力チャネルからメッセージを受け取り、条件に応じて複数の出力チャネルのどれかに送り直すフィルタ。書籍『Enterprise Integration Patterns』で紹介されているメッセージングのパターンの 1 つである。

## なぜ必要か

Pipes and Filters の構成では、処理の各ステップがメッセージチャネルでつながれる。条件によって次のステップを変えたいとき、各ステップに送り先の判断を持たせると、ステップどうしが密に結合してしまう。Message Router を間に挟むと、送り先の判断を 1 か所にまとめ、各ステップを切り離せる。

## 仕組み

Message Router は、受け取ったメッセージごとにルーティングのルールを評価し、合致する出力チャネルへ送る。関心を持つのはメッセージの送り先だけで、メッセージの中身は変更しない。周りのコンポーネントは、Message Router の存在を意識しない。

ルーティングのロジックが 1 か所にあるので、メッセージの種類や処理先が増えたり、ルールが変わったりしても、変更は Message Router の中で済む。

## 注意点

すべてのメッセージが 1 つの Message Router を通るため、メッセージは 1 件ずつ順番に処理される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

派生したパターンとして、メッセージの中身で振り分ける Content-Based Router、実行時にルールを変えられる Dynamic Router、条件に合わないメッセージを捨てる Message Filter がある。

## 出典

- [Message Router - Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageRouter.html)
