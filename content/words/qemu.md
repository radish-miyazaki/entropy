---
title: QEMU
aliases: []
description: オープンソースの汎用マシンエミュレータ・仮想化ソフトウェア
tags: [word, 仮想化]
date: 2024-11-15
---

## TL;DR

オープンソースの[[emulator|エミュレータ]]である。公式サイトでは「A generic and open source machine emulator and virtualizer」と説明している。

## 仕組み

公式サイトによると、QEMU には次の使い方がある。

- フルシステムエミュレーション: 別のマシン向けに作られた OS を丸ごと動かす
- ユーザモードエミュレーション: 別の Linux や BSD 向けにビルドされたプログラムを単体で動かす
- 仮想化: KVM や Xen の仮想マシンを、ネイティブに近い性能で動かす

## 例

macOS では Homebrew でインストールできる。

```sh
brew install qemu
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[emulator|エミュレータ]]

## 出典

- [QEMU](https://www.qemu.org/)
