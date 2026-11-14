---
title: SLI
aliases: [Service Level Indicator]
description: サービスのパフォーマンスを定量的に測ったもの
tags: [word, sre]
date: 2024-11-06
---

## TL;DR

Service Level Indicator（サービスレベル指標）の略。サービスのパフォーマンスを定量的に測ったものである。

## 仕組み

Google の SRE 本の定義では、SLI は提供しているサービスレベルのある側面を、注意深く定義して定量的に測ったものである。よく使われるのは、リクエストのレイテンシ、全リクエストに対するエラー率、1 秒あたりのリクエスト数で測るスループット、正しい形のリクエストのうち成功したものの割合で表す可用性である。データを保存するシステムでは、耐久性も重要な SLI になる。

## 例

- サービスの稼働率
- エラー率
- 99.9 % の稼働時間
- 100 ms 以内のレスポンスタイム

## 注意点

SRE 本は SLI を測りやすいものから決めるのではなく、利用者が気にすることから決めるよう勧めている。また、平均値ではなくパーセンタイルで見ることも勧めている。平均だけを見ると、遅いリクエスト（テールレイテンシ）が隠れてしまう。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[slo|SLO]]
- [[sla|SLA]]
- [[sre|SRE]]

## 出典

- [Service Level Objectives - Site Reliability Engineering](https://sre.google/sre-book/service-level-objectives/)
