---
title: BIOS
aliases: []
description: x86 のファームウェアの標準規格の 1 つで、現在もほとんどの x86 システムが BIOS による起動をサポートしている
tags: [word, os]
date: 2024-11-09
---

## TL;DR

x86 のファームウェアの標準規格の 1 つ。最近は [[uefi|UEFI]] が採用されるが、ほとんどすべての x86 システムは BIOS による起動もサポートしている。

## 仕組み

コンピュータを起動すると、BIOS は[[bootable-disk|ブータブルディスク]]を探し、見つかったディスクの[[bootloader|ブートローダ]]に制御を移す。UEFI を採用したシステムでも、エミュレートされた BIOS を使って起動できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[uefi|UEFI]]
- [[boot-process|ブートプロセス]]
- [[bootloader|ブートローダ]]
- [[bootable-disk|ブータブルディスク]]

## 出典

- [最小の Rust カーネル | Writing an OS in Rust](https://os.phil-opp.com/ja/minimal-rust-kernel/)
