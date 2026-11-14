---
title: 関心の分離
aliases: [SoC]
description: 複雑な問題を別々の関心事に分け、1 つずつ集中して扱えるようにする設計の原則
tags: [word, 設計]
date: 2026-11-14
---

## TL;DR

複雑な問題を別々の関心事に分け、1 つずつ集中して扱えるようにする設計の原則。Edsger W. Dijkstra が 1974 年のエッセイ「On the role of scientific thought」で使った言葉である。

## なぜ必要か

[Wikipedia](https://en.wikipedia.org/wiki/Separation_of_concerns) によると、関心事を分けると一度に 1 つの問題に集中できるので、認知負荷と複雑さを下げられる。

## 仕組み

[Dijkstra のエッセイ](https://www.cs.utexas.edu/~EWD/transcriptions/EWD04xx/EWD447.html)では、知的な思考の特徴として、扱う対象のある側面だけを、それ自体の一貫性のために切り離して深く調べることを挙げている。たとえば、プログラムは正しくなければならないので、正しさの観点だけから調べられる。これは他の側面を無視することではなく、その観点から見れば他の側面は関係ない、ということである。Dijkstra は、完全には不可能でも、これが考えを整理する唯一の有効な手段だとしている。

ソフトウェアでは、モジュールに分割して各モジュールに 1 つの関心事を閉じ込める形で実現することが多い。

## 例

- Wikipedia によると、Web では HTML が内容の構造を、CSS が見た目を、JavaScript が操作を受け持つ
- インターネットのプロトコルは層に分かれている。SMTP は信頼性のある配送を TCP に任せる
- [[layered-architecture|レイヤードアーキテクチャ]]は、レイヤごとに責務を決めてコードを整理する
- [[container-presentational-pattern|Container/Presentational パターン]]は、データを扱うコンポーネントと見せ方を扱うコンポーネントを分ける

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[single-responsibility-principle|単一責任の原則]]
- [[information-hiding|情報隠蔽]]
- [[module|モジュール]]
- [[cognitive-load|認知負荷]]

## 出典

- [On the role of scientific thought (EWD447)](https://www.cs.utexas.edu/~EWD/transcriptions/EWD04xx/EWD447.html)
- [Separation of concerns - Wikipedia](https://en.wikipedia.org/wiki/Separation_of_concerns)
