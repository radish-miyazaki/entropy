---
title: Ping-Pong Pairing
aliases: []
description: ペアプログラミングの進め方の 1 つ
tags: [word, ペアプログラミング]
date: 2025-01-22
---

## TL;DR

[[pair-programming|ペアプログラミング]]の進め方の 1 つ。

## なぜ必要か

Open Practice Library によると、ペアプログラミングに[[test-driven-development|テスト駆動開発]]を組み込める。交代のリズムに乗りやすいので、ペアを組み替えたときもすぐに息が合う。1 回に扱う範囲が小さいので、知識の差が大きいペアでも片方だけが進めてしまうことが起きにくい。ゲームのような形なので、やる気も出やすい。

## 仕組み

Open Practice Library では、2 人（A と B）で次のように進める。

1. A が失敗するテストを書く
2. B がそのテストを通す最小限のコードを書く
3. B が次の失敗するテストを書く
4. A がそのテストを通す最小限のコードを書く
5. 今の単位にこれ以上テストが要らないと 2 人が合意するまで繰り返す

[[refactoring|リファクタリング]]はどちらがしてもよいが、すべてのテストが通っているときに限る。

## 例

1 台のコンピュータに 2 組のキーボードとマウスをつなぎ、並んで座るのが理想とされる。Live Share などのツールを使えば、リモートでもできる。グループに広げた Ping-Pong Mob Programming という形もある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[pair-programming|ペアプログラミング]]
- [[test-driven-development|テスト駆動開発]]

## 出典

- https://spikes.sobes.co/p/ping-pong-pairing
- https://twop.agile.esm.co.jp/pair-ping-pong-kyowa-cb5369ed3b72
- https://openpracticelibrary.com/practice/ping-pong-programming/
