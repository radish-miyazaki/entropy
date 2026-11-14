---
title: writer-starvation
aliases: []
description: reader を優先する reader-writer mutex で、reader が続くために writer が長くロックを取れなくなる問題
tags: [word, 並列処理]
date: 2025-02-21
---

## TL;DR

[[starvation]] の一種。reader を優先する [[reader-writer-mutex|reader-writer mutex]] で、reader が共有データにアクセスし続けるために、writer のアクセスが長時間ブロックされる問題である。

## 仕組み

reader-writer mutex では、複数の reader が同時に読み取りのロックを持てる。reader が優先される実装では、すでに reader がロックを持っている間も新しい reader がロックを取得できる。そのため reader が途切れなく来ると、ロックが空かず、writer はいつまでも書き込めない。

回避策は writer を優先することである。writer がロックを取ろうとしている間は、新しい reader に読み取りのロックを取らせずに待たせる。

## 例

[[go|Go]] の [`sync.RWMutex`](https://pkg.go.dev/sync#RWMutex) は writer を優先している。ドキュメントには次のように書かれている。

> If any goroutine calls RWMutex.Lock while the lock is already held by one or more readers, concurrent calls to RWMutex.RLock will block until the writer has acquired (and released) the lock, to ensure that the lock eventually becomes available to the writer. Note that this prohibits recursive read-locking.

複数の reader がすでにロックを持っている状態で、ある[[goroutine|ゴルーチン]]が `RWMutex.Lock` を呼ぶと、その後の `RWMutex.RLock` の呼び出しは、writer がロックを取得して解放するまでブロックされる。これで writer は最終的にロックを取得できる。

## 注意点

writer を優先するこの仕組みのため、`RWMutex` では読み取りのロックを再帰的に取れない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[starvation]]
- [[reader-writer-mutex|reader-writer mutex]]
- [[recursive-mutex|Recursive mutex]]

## 出典

- [[Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス]]
- [sync package - Go Packages](https://pkg.go.dev/sync#RWMutex)
