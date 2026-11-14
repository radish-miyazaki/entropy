---
title: ブートローダ
aliases: []
description: BIOS から呼び出され、OS カーネルをメモリに読み込んで起動の準備をするプログラム
tags: [word, os]
date: 2024-11-09
---

## TL;DR

[[bios|BIOS]] が[[bootable-disk|ブータブルディスク]]を見つけたときに実行されるコード。OS カーネルをメモリに読み込み、カーネルを動かせる状態に CPU を整えてから制御を渡す。

## 仕組み

BIOS はディスクを見つけると、その先頭 512 バイトに保存された実行可能コード、つまりブートローダに制御を移す。しかし、多くのブートローダは 512 バイトより大きい。そのため、512 バイトに収まる一次ブートローダと、それが読み込む二次ブートローダの 2 段階に分けることが多い。

ブートローダが行うことは、大きく次の 3 つである。

1. ディスクから OS カーネルを見つけ出し、メモリに読み込む。
2. [[cpu|CPU]] を 16 bit のリアルモードから 32 bit のプロテクトモードへ、さらに 64 bit のロングモードへ切り替える。16 bit 時代の古い OS にも対応するので、最初はリアルモードで動く。
3. メモリマップなどの情報を BIOS から聞き出し、OS カーネルに渡す。

## 例

ブートローダの実装にはアセンブリが必要になる。そのため、[[rust|Rust]] には、カーネルの前に自動でブートローダを置いてくれる [bootimage](https://github.com/rust-osdev/bootimage) のようなツールがある。ただし、bootimage は BIOS にしか対応しておらず、[[uefi|UEFI]] には対応していない。後述の Multiboot にも準拠していない。

1995 年には、Multiboot というブートローダの公開標準規格が策定された。Multiboot はブートローダと OS のインタフェースを定めており、Multiboot に準拠したブートローダは、準拠したすべての OS を読み込める。リファレンス実装は、Linux のブートローダのデファクトスタンダードである GNU GRUB である。OS カーネルを Multiboot に準拠させるには、カーネルファイルの先頭に Multiboot header を挿入するだけでよい。

## 注意点

Multiboot と GNU GRUB には、次の問題がある。

- 32 bit のプロテクトモードしかサポートしていない。64 bit のロングモードに切り替えるための CPU の設定は、カーネル側で行う必要がある。
- カーネルではなくブートローダがシンプルになるように設計されている。たとえば、カーネルを通常とは異なるデフォルトページサイズでリンクしないと、GNU GRUB は Multiboot header を見つけられない。また、カーネルに渡されるブート情報は抽象化されておらず、アーキテクチャに依存する構造を多く含む。
- どちらもドキュメントが充実していない。
- カーネルファイルからブータブルディスクのイメージを作るには、ホストシステムに GRUB がインストールされている必要がある。そのため、Mac や Windows 上で OS を開発するのが難しくなる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[boot-process|ブートプロセス]]
- [[bios|BIOS]]
- [[uefi|UEFI]]
- [[bootable-disk|ブータブルディスク]]
- Multiboot
- GNU GRUB

## 出典

- [最小の Rust カーネル | Writing an OS in Rust](https://os.phil-opp.com/ja/minimal-rust-kernel/)
- [Multiboot - OSDev Wiki](https://wiki.osdev.org/Multiboot)
- [Multiboot 準拠の OS カーネルを Rust で実装する | Writing an OS in Rust](https://os.phil-opp.com/multiboot-kernel/)
