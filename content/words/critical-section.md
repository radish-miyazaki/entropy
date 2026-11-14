---
title: クリティカルセクション
aliases: [critical section]
description: 単一のリソースに同時にアクセスすると不具合が起きるプログラムの部分
tags: [word, 並列処理]
date: 2025-02-16
---

## TL;DR

単一のリソースに同時にアクセスすると、[[race-condition|競合状態]]などの不具合が起きるプログラムの部分。

## なぜ必要か

共有のリソースを複数の[[thread|スレッド]]や[[process|プロセス]]が同時に扱うと、データの整合性が崩れる。Wikipedia ではアクセスカウンタの例を挙げている。値が 100 のときに 2 人が同時に訪問すると、両方が 100 を読んで 1 を足すので、102 になるべき値が 101 になってしまう。

## 仕組み

[[atomic-operation|アトミック操作]]や [[mutex|mutex]] を使うと、クリティカルセクションへの同時アクセスを避けられる。

ロックを使う場合は、1 つのスレッドだけがクリティカルセクションに入れるようにし、他のスレッドは待たせる。Windows API の `CRITICAL_SECTION` や POSIX スレッドの `pthread_mutex_t` のように、OS やライブラリが排他制御の仕組みを用意している。[[java|Java]] などの言語には、構文で排他制御を書く機能がある。

## 注意点

排他制御を使うときは、[[deadlock|デッドロック]]に注意する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[race-condition|競合状態]]
- [[atomic-operation|アトミック操作]]
- [[mutex|mutex]]
- [[reader-writer-mutex|reader-writer mutex]]
- [[deadlock|デッドロック]]

## 出典

- [クリティカルセクションとは - IT用語辞典 e-Words](https://e-words.jp/w/クリティカルセクション.html)
- [クリティカルセクション - Wikipedia](https://ja.wikipedia.org/wiki/クリティカルセクション)
