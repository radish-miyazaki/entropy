---
title: JetZig CLI のインストール
description: macOS（aarch64）向けのビルドを展開し、PATH を通して JetZig CLI をインストールした
tags: [blog, zig, jetzig]
date: 2026-02-25
draft: false
---

## TL;DR

- [[jetzig|JetZig]] の CLI を、macOS（aarch64）向けのビルドを展開して PATH を通すことでインストールした。

## 環境

- macOS（aarch64）

## 検証

1. 配布されているビルドのうち、`build-macos-aarch64.zip` をダウンロードする。
2. 展開し、任意の場所に置く。自分は `~/zig/jetzig` に置いた。
3. PATH を通す。

   ```sh
   # .zshrc
   export PATH="$HOME/zig/jetzig/bin:$PATH"
   ```

4. 動作を確認する。

   ```sh
   $ jetzig -h
   ```

## キーワード

- [[jetzig|JetZig]]
- [[zig|Zig]]
