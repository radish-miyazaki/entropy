---
title: z から zoxide に乗り換える
description: ディレクトリ移動のツールを z から zoxide に移し、z の履歴を取り込んだ手順
tags: [blog, z, zoxide]
date: 2025-03-20
draft: false
---

## TL;DR

ディレクトリ移動のツールを z から zoxide に乗り換えた。README の Installation どおりに入れ、z の履歴を `zoxide import` で取り込めば、z と同じように使える。

## 検証

[zoxide の README](https://github.com/ajeetdsouza/zoxide) の Installation をそのまま実行した。

1. [[homebrew|Homebrew]] からインストールする

   ```sh
   brew install zoxide
   ```

2. `.zshrc` に次を追加する

   ```sh
   eval "$(zoxide init zsh)"
   ```

3. （任意）fzf も入れる

   ```sh
   brew install fzf
   ```

4. z の履歴を取り込む

   ```sh
   zoxide import --from=z "$HOME/.z"
   ```

## 結果

あとは z と同じように使える。fzf を入れていれば、`zi` コマンドで履歴を確認することもできる。

## キーワード

- zoxide
- [[homebrew|Homebrew]]

## 参考

- https://github.com/ajeetdsouza/zoxide
