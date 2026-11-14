---
title: BSDIFF
aliases: []
description: 2 つのバイナリファイルを比べて、差分だけを取り出すアルゴリズム
tags: [word]
date: 2026-02-22
---

## TL;DR

2 つのバイナリファイルを比べて、その差分だけを取り出すアルゴリズム。差分からパッチを作る bsdiff と、パッチを当てる bspatch がある。

## 仕組み

元のアルゴリズムと実装は Colin Percival によるもので、論文「Naïve Differences of Executable Code」で説明されている。mendsley/bsdiff は、これを外部依存のない C のライブラリとして作り直したもので、プロジェクトに組み込んで使える。ファイル I/O の代わりにストリームのコールバックでデータをやり取りする。ただし、このライブラリが作るパッチは、元の bsdiff のツールとは互換性がない。

## 例

[[electrobun|Electrobun]] は、[[zig|Zig]] で [[simd|SIMD]] 最適化した BSDIFF を使い、アプリの更新を KB 単位の差分パッチで配布している。

## 出典

- [mendsley/bsdiff](https://github.com/mendsley/bsdiff)
- https://misohena.jp/blog/2016-01-18-bsdiff-binary-diff-algorithm.html
