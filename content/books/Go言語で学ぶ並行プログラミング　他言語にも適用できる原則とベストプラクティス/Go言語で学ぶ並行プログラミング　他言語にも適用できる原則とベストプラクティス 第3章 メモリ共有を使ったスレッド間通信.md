---
title: Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス 第3章 メモリ共有を使ったスレッド間通信
description: メモリ共有を使ったスレッド間通信を扱う章。go build -gcflags='-m' でエスケープ分析の結果を確認できる
tags: [book-chapter, go, 並行処理]
date: 2025-02-11
book: "[[Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス]]"
chapter: 3
---

## TL;DR

- [[shared-memory|メモリ共有]]を使ったスレッド間通信を扱う章である。
- `go build -gcflags='-m'` を実行すると、[[escape-analysis|エスケープ分析]]の情報を確認できる。

## 内容

次のコマンドを実行すると、コンパイラによる[[escape-analysis|エスケープ分析]]の結果を出力できる。

```sh
go build -gcflags='-m' countdown.go
```

## キーワード

- [[shared-memory|メモリ共有]]
- [[escape-analysis|エスケープ分析]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
