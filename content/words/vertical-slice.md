---
title: Vertical slice
aliases: [縦に切った一部分, バーティカルスライス]
description: データアクセス、ビジネスロジック、UI といった層をまたいで、機能を縦に切り出した一部分
tags: [word, project-management]
date: 2026-11-16
---

## TL;DR

コードベースの層をまたいで、機能を縦に切り出した一部分。すべての層にわたって進み具合を示せる区切りとして使う。

## 仕組み

Wikipedia の説明ではデータアクセス、ビジネスロジック、UI のような層を横に積んだものとして見たとき、それらを縦に貫いて切った断面を指す。作業を機能やストーリーの単位で計画する Scrum の用語として使われることが多い。

## 例

[[shape-up|Shape Up]] では、チームは機能を縦に切った一部分を一つずつ完成させていく（[[Shape Up： Stop Running in Circles and Ship Work that Matters 第1章 Introduction|第 1 章]]）。[[Shape Up： Stop Running in Circles and Ship Work that Matters 第11章 Get One Piece Done|第 11 章]]によると、バックエンドのない画面や UI のないロジックのように一つの層だけを進めても、何も動かない。そこで最初の 1 週間ほどで、層をまたいだ一部分をつないで、誰でも触って確かめられる状態にする。

クライアントをプロジェクトに招く機能では、デザイナが表示の切り替えを最初につなぐ部分に選び、プログラマがその裏のアクセスのモデルを用意した。3 日ほどで動くものを見せられた。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[shape-up-scope|Scope]]
- [[layer-cake|Layer cake]]
- [[shape-up|Shape Up]]

## 出典

- [Vertical slice - Wikipedia](https://en.wikipedia.org/wiki/Vertical_slice)
- [[Shape Up： Stop Running in Circles and Ship Work that Matters 第11章 Get One Piece Done|Shape Up › Get One Piece Done]]
- [Introduction | Shape Up](https://basecamp.com/shapeup/0.3-chapter-01)
- [Get One Piece Done | Shape Up](https://basecamp.com/shapeup/3.2-chapter-11)
