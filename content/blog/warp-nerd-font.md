---
title: Warp に Nerd Font を適用する
description: Nerd Fonts をすべてのユーザーにインストールすると、Warp のターミナルフォントに Nerd Font を選べるようになる
tags: [blog]
date: 2024-03-09
draft: false
---

## TL;DR

- [[warp|Warp]] で [[nerd-fonts|Nerd Fonts]] を使うには、Font Book でフォントを「すべてのユーザー」にインストールしておく必要がある。

## 背景

[[rust|Rust]] で書かれた ls である [[lsd|lsd]] で、ファイルのアイコンを表示したかった。アイコンの表示には Nerd Font が必要なので、ターミナルの Warp に Nerd Font を設定した。

## 検証

1. 公式の [README](https://github.com/ryanoasis/nerd-fonts/blob/master/readme_ja.md#%E3%81%9D%E3%81%AE-4-homebrew-fonts) にあるように、[[homebrew|Homebrew]] Cask Fonts で Nerd Fonts をインストールする
2. [こちらの記事](https://zenn.dev/chiyo/articles/92a12b70d6a635)にあるように、Font Book アプリの設定で「インストール」を「すべてのユーザーにインストール」に変える
3. Warp の Settings で「Appearance」→「Text」→「Terminal font」を開き、Hack Nerd Font を選ぶ

## 結果

2 の設定を変えないと、Warp のフォントの選択肢に Nerd Font が出てこなかった。設定を変えた後は、Hack Nerd Font を選べた。

## キーワード

- [[warp|Warp]]
- [[nerd-fonts|Nerd Fonts]]
- [[lsd|lsd]]
- [[homebrew|Homebrew]]

## 参考

- https://github.com/ryanoasis/nerd-fonts/blob/master/readme_ja.md
- https://zenn.dev/chiyo/articles/92a12b70d6a635
