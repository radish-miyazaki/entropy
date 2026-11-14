---
title: futex
aliases: [fast userspace mutex]
description: ユーザ空間から使える、アドレスごとの待機キューの基本操作
tags: [word, 並行処理, os]
date: 2025-03-09
---

## TL;DR

[[user-space|ユーザ空間]]から使える、基本的な待機キューの操作。特定のアドレスを対象に、実行を一時停止したり再開したりする機能を提供する。名前に反して [[mutex|mutex]] そのものではない。

## なぜ必要か

[[mutex|mutex]]、[[semaphore|セマフォ]]、[[condition-variable|条件変数]]といった並行処理の基本操作を、効率よく実装するのに使う。たとえば[[spinlock|スピンロック]]は、ロックを待つ間 CPU サイクルを無駄に使うが、futex を使えば改善できる。

## 仕組み

futex を使うときは、[[system-call|システムコール]]などを呼び出す。

### 待機（wait）

Linux では `syscall(SYS_futex, ...)` に `FUTEX_WAIT` を渡し、Windows では `WaitOnAddress()` を呼ぶ。メモリアドレスが指す値が、渡した値と同じなら、呼び出し元の実行は止まり、待機キューの末尾に追加される。値が異なれば、実行はそのまま続く。

待機キューには、同じアドレスを対象に呼び出したすべての[[thread|スレッド]]や[[process|プロセス]]が、待機状態で保留される。[[operating-system|OS]] は、アドレスごとに独立したキューを管理する。

### 再開（wake）

Linux では `syscall(SYS_futex, ...)` に `FUTEX_WAKE` を渡し、Windows では `WakeByAddressAll()` を呼ぶ。指定したメモリアドレスで待っているスレッドやプロセスの実行を、指定した数だけ再開する。数が `0` のときは、すべてを再開する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[mutex|mutex]]
- [[spinlock|スピンロック]]
- [[user-space|ユーザ空間]]
- [[semaphore|セマフォ]]
- [[condition-variable|条件変数]]
