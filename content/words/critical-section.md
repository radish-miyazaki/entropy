---
title: クリティカルセクション
aliases: [critical section]
description: 単一のリソースに同時にアクセスすると不具合が起きるプログラムの部分
tags: [word, 並列処理]
date: 2025-02-16
---

## TL;DR

単一のリソースに同時にアクセスすると、[[race-condition|競合状態]]などの不具合が起きるプログラムの部分。

## 仕組み

[[atomic-operation|アトミック操作]]や [[mutex|mutex]] を使うと、クリティカルセクションへの同時アクセスを避けられる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[race-condition|競合状態]]
- [[atomic-operation|アトミック操作]]
- [[mutex|mutex]]
- [[reader-writer-mutex|reader-writer mutex]]

## 出典

- [クリティカルセクションとは - IT用語辞典 e-Words](https://e-words.jp/w/クリティカルセクション.html)
- [クリティカルセクション - Wikipedia](https://ja.wikipedia.org/wiki/クリティカルセクション)
