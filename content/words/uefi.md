---
title: UEFI
aliases: [Unified Extensible Firmware Interface]
description: OS より先に動くファームウェアのアーキテクチャを定めた仕様で、BIOS の後継にあたる
tags: [word, os]
date: 2026-11-14
---

## TL;DR

Unified Extensible Firmware Interface の略。コンピュータの電源を入れたとき、OS より先に動くファームウェアのアーキテクチャを定めた仕様で、[[bios|BIOS]] の後継にあたる。

## なぜ必要か

Wikipedia によると、UEFI はブートセクタに頼らずに起動できる。BIOS で使われていた MBR の制限を受けない GPT のディスクにも対応している。

## 仕組み

Wikipedia によると、UEFI のブートマネージャは NVRAM に保存された設定を読み、EFI システムパーティションから OS のローダを起動する。Secure Boot を有効にすると、許可された鍵で署名されていない部品の読み込みを防げる。ネットワーク経由の起動にも対応している。

もともとは Intel が EFI（Extensible Firmware Interface）として始め、その後のバージョンは UEFI Forum が UEFI として策定している。

## 注意点

UEFI は CSM（Compatibility Support Module）を使えば BIOS との互換性を保てる。ただし Wikipedia によると、Intel は CSM のサポートを段階的に終える計画を立てている。[[bootloader|ブートローダ]]を作るツールには BIOS にしか対応していないものもあるので、どちらで起動するかを確かめる必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[bios|BIOS]]
- [[boot-process|ブートプロセス]]
- [[bootloader|ブートローダ]]

## 出典

- [UEFI - Wikipedia](https://en.wikipedia.org/wiki/UEFI)
