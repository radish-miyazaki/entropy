---
title: 依存関係
aliases: []
description: あるコードが単独では理解も変更もできず、他のコードを考慮しなければならない関係。複雑さの原因の 1 つ
tags: [word, 設計, 複雑さ]
date: 2023-12-16
---

## TL;DR

依存関係（dependency）とは、あるコードが単独では理解も変更もできない関係のこと。そのコードを変更するときは、関係する他のコードも考慮し、変更する必要がある。[[A Philosophy of Software Design]] では、[[obscurity|不明瞭]]と並ぶ[[complexity|複雑さ]]の原因とされている。

## なぜ必要か

依存関係は、変更差分の増大と[[cognitive-load|認知的負荷]]をもたらす。1 つの変更のために多くの場所を直す必要が生まれ、作業に必要な知識も増える。

英語版 Wikipedia によると、ソフトウェア工学では、[[module|モジュール]]どうしが互いに依存する度合いを[[coupling|結合度]]と呼ぶ。結合が強いと、あるモジュールの変更が他のモジュールに波及しやすい。モジュールどうしの依存が増えるので、組み立てにかかる手間も増え、依存先のモジュールも一緒に必要になるので、再利用やテストもしにくくなる。

## 例

クライアントとサーバの関係がその例である。クライアント（送信側）のコードを変更すると、サーバ（受信側）のコードも変更する必要がある。

## 注意点

依存関係は完全には排除できない。ソフトウェアの[[design|設計]]では、依存関係の数を減らし、残った依存関係をできるだけ単純で明白なものにすることを目標とする。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[obscurity|不明瞭]]
- [[complexity|複雑さ]]
- [[module|モジュール]]
- [[dependency-injection|依存性の注入]]
- [[coupling|結合度]]

## 出典

- [[A Philosophy of Software Design 第2章 The Nature of Complexity|A Philosophy of Software Design 第2章]]
- [Coupling (computer programming) - Wikipedia](<https://en.wikipedia.org/wiki/Coupling_(computer_programming)>)
