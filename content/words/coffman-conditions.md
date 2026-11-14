---
title: Coffman conditions
aliases: [コフマン条件]
description: デッドロックが起きるための 4 つの必要条件
tags: [word, 並行処理]
date: 2025-03-06
---

## TL;DR

E. Coffman らが 1971 年の論文「System Deadlocks」で示した、[[deadlock|デッドロック]]が起きるための 4 つの必要条件。デッドロックが起きるのは、この 4 つがすべて成り立つときに限られる。

## 仕組み

### Mutual Exclusion（相互排他）

あるリソースは、一度に 1 つの[[thread|スレッド]]（[[process|プロセス]]）しか使えない。

### Hold and Wait（保持と待機）

あるスレッドが、すでにロックを保持したまま、他のリソースを待っている。

### No Preemption（プリエンプションなし）

他のスレッドが保持しているリソースを、強制的に奪えない。

### Circular Wait（循環待機）

複数のスレッドが、循環するようにリソースを待っている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[deadlock|デッドロック]]
- [[resource-allocation-graph|Resource Allocation Graph]]
- [[preemptive|プリエンプティブ]]

## 出典

- [System Deadlocks](https://dl.acm.org/doi/pdf/10.1145/356586.356588)
