---
title: 同期プリミティブ
aliases: [synchronization primitive]
description: 複数の処理を適切に制御し、競合やデータの不整合を防ぐための仕組み
tags: [word, 並列処理]
date: 2025-02-23
---

## TL;DR

複数の処理（[[thread|スレッド]]や[[goroutine|ゴルーチン]]など）を適切に制御し、競合やデータの不整合を防ぐための仕組み。

## 例

- [[waitgroup|WaitGroup]]
- [[mutex|ミューテックス]]
- [[condition-variable|条件変数]]
- [[semaphore|セマフォ]]
- [[barrier|バリア]]

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[data-race|データ競合]]
