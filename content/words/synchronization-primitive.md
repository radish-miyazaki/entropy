---
title: 同期プリミティブ
aliases: [synchronization primitive]
description: 複数の処理を適切に制御し、競合やデータの不整合を防ぐための仕組み
tags: [word, 並列処理]
date: 2025-02-23
---

## TL;DR

複数の処理（[[thread|スレッド]]や[[goroutine|ゴルーチン]]など）を適切に制御し、競合やデータの不整合を防ぐための仕組み。

## なぜ必要か

Wikipedia によると、複数のスレッドが[[critical-section|クリティカルセクション]]を同時に実行すると、変数の値はコンテキストスイッチのタイミングで変わり、予測できなくなる（[[race-condition|競合状態]]）。認証してから口座にアクセスするように、処理の順序を守らせたい場面もある。[[fork-join-model|Fork-Join model]] や生産者・消費者のように、処理が互いを待つパターンでも同期が必要になる。

## 例

- [[waitgroup|WaitGroup]]
- [[mutex|ミューテックス]]
- [[condition-variable|条件変数]]
- [[semaphore|セマフォ]]
- [[barrier|バリア]]
- [[spinlock|スピンロック]]

## 注意点

同期の仕方によっては、[[deadlock|デッドロック]]や[[starvation|starvation]]、優先度の逆転が起きる。スピンロックのように条件を繰り返し確かめるビジーウェイトは、他の処理が使える CPU 時間を消費する。バリアでは、先に着いたスレッドが他のスレッドを待つ時間が必ず生じる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[data-race|データ競合]]
- [[race-condition|競合状態]]
- [[deadlock|デッドロック]]

## 出典

- [Synchronization (computer science) - Wikipedia](<https://en.wikipedia.org/wiki/Synchronization_(computer_science)>)
