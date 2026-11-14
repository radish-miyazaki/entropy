---
title: starvation
aliases: [リソーススタベーション, resource starvation]
description: スレッドやプロセスが、必要な共有リソースに長時間（または永久に）アクセスできない状態
tags: [word, 並列処理]
date: 2025-02-21
---

## TL;DR

飢餓を意味する英単語。並列処理の文脈では、リソーススタベーション（resource starvation）を指すことが多い。[[thread|スレッド]]や[[process|プロセス]]が共有リソースを必要としているのに、長時間（または永久に）アクセスできない状態である。

## 例

- [[writer-starvation]]: reader を優先する [[reader-writer-mutex|reader-writer mutex]] で、writer がロックを取れなくなる

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[deadlock|デッドロック]]
- [[writer-starvation]]

## 出典

- [リソーススタベーション - Wikipedia](https://ja.wikipedia.org/wiki/リソーススタベーション)
