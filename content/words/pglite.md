---
title: PGlite
aliases: []
description: PostgreSQL を WebAssembly にコンパイルした、組み込み用の軽量なデータベースエンジン
tags: [word, データベース, webassembly]
date: 2025-02-14
---

## TL;DR

[[postgresql|PostgreSQL]] を [[webassembly|WebAssembly]] にコンパイルした、組み込み用の軽量なデータベースエンジン。Electric が開発している。

## 仕組み

PostgreSQL の完全な WebAssembly ビルドを、gzip 圧縮で 3 MB 未満のサイズで提供する。インメモリのデータベースとして使えるほか、ファイルシステム（Node.js、[[bun|Bun]]、[[deno|Deno]]）や IndexedDB に永続化できる。

pgvector や PostGIS などの拡張を動的に読み込める。データの読み込みや同期、ライブクエリの機能も組み込まれている。ライセンスは Apache 2.0 と PostgreSQL License のデュアルライセンスである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[postgresql|PostgreSQL]]
- [[webassembly|WebAssembly]]

## 出典

- [PGlite](https://pglite.dev/)
