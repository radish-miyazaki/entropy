---
title: Recursive mutex
aliases: [Reentrant lock]
description: 同じスレッドなら何度でもロックできる mutex
tags: [word, 並行処理]
date: 2025-03-10
---

## TL;DR

再入可能なロック（Reentrant lock）に対応した [[mutex|mutex]]。同じ[[thread|スレッド]]であれば、複数回ロックできる。

## 仕組み

ロックの状態を、所有権の有無ではなく、ロックカウント（ロックした回数）で表す。

## 注意点

Java や C++ には存在するが、[[go|Go]] の `sync.Mutex` は意図的に採用しておらず、再入できない（Non-reentrant lock）。

通常の mutex で十分な場面では、Recursive mutex を使うべきではない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[mutex|mutex]]
- [[reader-writer-mutex|reader-writer mutex]]
- [[deadlock|デッドロック]]

## 出典

- https://zenn.dev/yohhoy/articles/multithreading-toolbox
