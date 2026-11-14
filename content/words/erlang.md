---
title: Erlang
aliases: []
description: 大規模にスケールするソフトリアルタイムシステムを作るための関数型プログラミング言語
tags: [word, プログラミング言語, fp]
date: 2024-08-03
---

## TL;DR

大規模にスケールするソフトリアルタイムシステムを作るための[[functional-programming|関数型プログラミング]]言語。プログラムは [[beam|BEAM]]（Erlang VM）上で動く。

## 仕組み

ランタイムは、多くの処理を同時に動かす[[concurrency|並行処理]]、複数のマシンにまたがる分散、障害からの回復を言語の機能として備えている。[[otp|OTP]] は、こうしたシステムを開発するためのミドルウェアとなる、Erlang のライブラリと設計原則の集まりである。

同じ BEAM 上では、[[elixir|Elixir]]、[[gleam|Gleam]]、[[lfe|LFE]] などの言語も動く。

## 例

入門書には次のものがある。

- [[Learn You Some Erlang for Great Good!]]: Web 版は R13、書籍版は R15 に対応している
- プログラミングErlang: 日本語版はバージョン 5 に対応している。R17 に対応した [2nd edition](https://pragprog.com/titles/jaerlang2/programming-erlang-2nd-edition/) は洋書だけが販売されている

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[elixir|Elixir]]
- [[gleam|Gleam]]
- [[lfe|LFE]]
- [[beam|BEAM]]

## 出典

- [Erlang](https://www.erlang.org/)
- [Erlang のブログ](https://www.erlang.org/blog)
- [Erlang のドキュメント](https://www.erlang.org/doc/readme.html)
- [いつか「実践 Erlang/OTP 時雨堂編」を書くためのメモ](https://zenn.dev/voluntas/scraps/3ae763ab1ba72e)（時雨堂）
- [モダン Erlang/OTP](https://zenn.dev/shiguredo/articles/modern-erlang)（時雨堂）
