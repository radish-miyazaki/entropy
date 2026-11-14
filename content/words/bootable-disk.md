---
title: ブータブルディスク
aliases: []
description: コンピュータの起動時にファームウェアが探して読み込む、先頭にブートローダを持つディスク
tags: [word]
date: 2024-11-09
---

## TL;DR

コンピュータの起動時に、ファームウェアが探して読み込むディスク。先頭に[[bootloader|ブートローダ]]が置かれていて、そこから OS のカーネルが起動される。

## 仕組み

「Writing an OS in Rust」の「最小の Rust カーネル」によると、[[bios|BIOS]] は自己テストとハードウェアの初期化を終えると、ブータブルディスクを探す。見つかると、ディスクの先頭 512 バイトに置かれた実行可能コードであるブートローダに制御が移る。ブートローダは、ディスクの中からカーネルのイメージを探し、メモリに読み込む。

## 例

同じ記事では、bootimage というツールでカーネルとブートローダをコンパイルしてリンクし、ブータブルディスクイメージ `bootimage-blog_os.bin` を作る。このイメージは [[qemu|QEMU]] の仮想マシンで起動できる。

```sh
qemu-system-x86_64 -drive format=raw,file=target/x86_64-blog_os/debug/bootimage-blog_os.bin
```

`dd` で USB メモリに書き込めば、実機でも起動できる。

## 注意点

USB メモリに書き込むと、そのデバイスのデータは上書きされる。デバイス名を取り違えないよう、よく確かめてから書き込む。また、このイメージは CD のイメージではないので、CD には焼けない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[bios|BIOS]]
- [[bootloader|ブートローダ]]
- [[boot-process|ブートプロセス]]

## 出典

- [最小の Rust カーネル | Writing an OS in Rust](https://os.phil-opp.com/ja/minimal-rust-kernel/)
