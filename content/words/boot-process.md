---
title: ブートプロセス
aliases: []
description: コンピュータが起動してから OS カーネルを起動するまでの処理の流れ
tags: [word, os]
date: 2024-11-09
---

## TL;DR

コンピュータが起動してから、OS のカーネルを起動するまでの処理の流れ。

## 仕組み

コンピュータが起動すると、まずマザーボードの ROM に保存されたファームウェアのコードを実行する。x86 では、このファームウェアの標準規格として [[bios|BIOS]] と [[uefi|UEFI]] の 2 つがある。

ファームウェアは POST（電源投入時自己診断テスト）を実行し、使える RAM を検出した後、CPU とハードウェアを事前に初期化する。その後、[[bootable-disk|ブータブルディスク]]を探して OS のカーネルを起動する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[bios|BIOS]]
- [[uefi|UEFI]]
- [[bootable-disk|ブータブルディスク]]

## 出典

- [最小のRustカーネル - Writing an OS in Rust](https://os.phil-opp.com/ja/minimal-rust-kernel/)
- https://qiita.com/Ofune/items/1872ae9a936e1353b69d
