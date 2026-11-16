---
title: Scope（Shape Up）
aliases: []
description: Shape Up で、プロジェクトのうちほかと切り離して作り、つなぎ、終えられる部分のこと
tags: [word, project-management]
date: 2026-11-16
---

## TL;DR

Shape Up で、プロジェクトを分けた一つひとつの部分。フロントエンドとバックエンドをまたいで、ほかの部分を待たずに作り終えられるまとまりを指す。

## なぜ必要か

[[Shape Up： Stop Running in Circles and Ship Work that Matters 第12章 Map the Scopes|第 12 章]]によると、デザイナ用、プログラマ用のように役割でタスクを分けると、プロジェクト全体の姿が見えなくなる。プロダクトの仕事では分け方が前もって決まっていないので、作業しながら構造に沿って分ける必要がある。そのまとまりが Scope である。

Scope に名前が付くと、チームは大きな単位で話せるようになる。進み具合を伝えるときも、残っている細かいタスクを一つずつ説明せずに、終わった部分を指し示せる。

## 仕組み

- 大きさは数日以内に終えられる程度にする
- Scope ごとに、その名前を付けた To-Do リストを作ってタスクを入れる
- 正しい切り方は作業を進めて見えてくる。たいてい 1 週目の終わりか 2 週目の初めに固まる。途中で分け直したり名前を変えたりしてよい
- 進み具合は Scope を点にして[[hill-chart|ヒルチャート]]に置いて示す

切り方がよいかどうかは、次の様子で判断する。

- よい: 全体が見渡せて隠れた心配がない、会話が滞らない、新しいタスクの入れ先がすぐ決まる
- 見直す: 中のタスクがばらばらで終わったか判断しにくい、「バグ」のように何でも入る名前になっている、大きすぎてすぐに終わらない

## 例

メッセージの下書き機能では、最初は分けていないタスクが 10 個あった。まず「新規作成」だけをつないで動かし、残りを「探す」「ゴミ箱」「保存・編集」に分けた。「保存・編集」は後で「送信」「保存」「返信」にさらに分けた。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[shape-up|Shape Up]]
- [[hill-chart|ヒルチャート]]
- [[vertical-slice|Vertical slice]]
- [[layer-cake|Layer cake]]
- [[iceberg-scope|Iceberg]]
- [[scope-hammering|Scope hammering]]

## 出典

- [[Shape Up： Stop Running in Circles and Ship Work that Matters 第12章 Map the Scopes|Shape Up › Map the Scopes]]
- [Map the Scopes | Shape Up](https://basecamp.com/shapeup/3.3-chapter-12)
- [Glossary | Shape Up](https://basecamp.com/shapeup/4.5-appendix-06)
