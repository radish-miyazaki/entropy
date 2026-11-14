---
title: Homebrew
aliases: []
description: macOS、Linux、WSL 向けのパッケージマネージャ
tags: [word, macos, ツール]
date: 2026-11-14
---

## TL;DR

macOS、Linux、WSL 向けのパッケージマネージャ。コマンドラインツールやアプリケーションをインストールできる。ボランティアが運営する非営利のプロジェクトである。

## 仕組み

インストールしたパッケージは、それぞれ専用の場所（Cellar）にまとめて置かれ、prefix の中にシンボリックリンクが張られる。prefix は、Apple Silicon の Mac では `/opt/homebrew`、Intel の Mac では `/usr/local`、Linux と WSL では `/home/linuxbrew/.linuxbrew` である。

パッケージの定義には 2 種類ある。Formula は上流のソースコードからビルドするパッケージの定義である。Cask はアプリやフォントなど、ビルド済みのバイナリを入れるパッケージの定義である。公式以外の人が管理するパッケージのリポジトリは Tap と呼ぶ。`Brewfile` に入れたいものを書いておけば、Homebrew Bundle でまとめてインストール・更新できる。

Homebrew 自体は公式サイトに載っているシェルスクリプトをターミナルで実行して入れる。macOS では `.pkg` のインストーラも使える。

## 例

- [[racket|Racket]] は Homebrew の Cask で入れられる。
- [[warp-to-ghostty|Warp から Ghostty に移行するメモ]]では、Ghostty を Homebrew でインストールした。

## 注意点

Tap は公式以外の人が管理しているので、使う前に信頼できるかを確かめる必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Homebrew](https://brew.sh/ja/)
