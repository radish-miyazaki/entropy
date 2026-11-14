---
title: reader-writer mutex
aliases: [readers-writer lock, RWMutex]
description: 読み取りは複数が同時に、書き込みは 1 つだけが保持できる mutex
tags: [word, mutex]
date: 2025-02-17
---

## TL;DR

読み取りは複数が同時に、書き込みは 1 つだけが保持できる [[mutex|mutex]]。読み取り用のロックと書き込み用のロックを分けて持つ。

## 仕組み

[[go|Go]] の `sync.RWMutex` のドキュメントによると、ロックは任意の数の読み手か、1 つの書き手が保持できる。読み取りには `RLock`、書き込みには `Lock` を使う。`Lock` は、すでに読み取りか書き込みでロックされていれば、ロックが空くまでブロックする。

## 注意点

Go の `sync.RWMutex` では、読み手がロックを保持している間に [[goroutine|ゴルーチン]]が `Lock` を呼ぶと、それ以降の `RLock` は書き手がロックを取って解放するまでブロックする。書き手がいつかロックを取れるようにするための決まりで、そのため再帰的な読み取りロックは禁止されている。また、`RLock` を `Lock` に昇格することも、`Lock` を `RLock` に降格することもできない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[mutex|mutex]]
- [[recursive-mutex|Recursive mutex]]
- [[deadlock|デッドロック]]

## 出典

- [sync package - RWMutex](https://pkg.go.dev/sync#RWMutex)
