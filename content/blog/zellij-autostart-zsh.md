---
title: zellij を zsh 立ち上げ時に自動的に起動させる
description: 公式ドキュメントの zellij setup --generate-auto-start zsh ではパネル追加時にセッションが無限に作られたので、ZELLIJ 変数を見て main セッションにアタッチする処理を .zshrc に書いた
tags: [blog, zellij, zsh]
date: 2025-07-25
draft: false
---

## TL;DR

- 公式ドキュメントの方法で [[zellij]] を自動起動させると、パネルを追加するたびにセッションが無限に作られた。
- `$ZELLIJ` が空のときだけ、`main` セッションにアタッチするか新しく作る処理を `.zshrc` に書けば解決した。

## 背景

zsh を立ち上げたときに、zellij を自動で起動させたかった。

## 検証

### 公式ドキュメントの方法

[zellij の公式ドキュメント](https://zellij.dev/documentation/integration.html?highlight=--generate-auto-start#zsh)には、次の 1 行を `.zshrc` に書けばよいとある。

```sh
eval "$(zellij setup --generate-auto-start zsh)"
```

### 回避策

代わりに、次の処理を `.zshrc` に書いた。`$ZELLIJ` が空のときだけ zellij を起動する。`main` という名前のセッションがあればアタッチし、なければ作成する。

```sh
if [[ -z "$ZELLIJ" ]]; then
    if zellij list-sessions | grep -q "main"; then
        zellij attach main
    else
        zellij -s main
    fi
fi
```

## 結果

公式ドキュメントの方法では、`M-p n` でパネルを追加しようとすると、セッションが無限に作られてしまった。回避策の書き方では、この問題は起きなかった。

## キーワード

- [[zellij]]

## 参考

- [Integration - Zellij User Guide](https://zellij.dev/documentation/integration.html?highlight=--generate-auto-start#zsh)
