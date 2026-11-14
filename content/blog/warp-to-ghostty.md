---
title: Warp から Ghostty に移行するメモ
description: ターミナルを Warp から Ghostty に移し、zsh のプラグインを sheldon で管理するようにした
tags: [blog, terminal]
date: 2025-04-07
draft: false
---

## TL;DR

- ターミナルを [[warp|Warp]] から Ghostty に移行した。
- Warp に任せていた補完やハイライトを取り戻すため、zsh のプラグインマネージャ sheldon を入れてプラグインを入れ直した。

## 背景

新しいツールを使ってみたかったのに加えて、Ghostty のお化けのアイコンが可愛く、macOS ネイティブのアプリである点にも惹かれた。Warp はいつまで待ってもマルチバイト文字を認識しないうえ、AI 関連など使わない機能も多すぎた。

ゆくゆくはターミナルを [[cursor|Cursor]] のようなバイブコーディング向けの IDE に統合したいので、zsh そのものの使い勝手を上げておく必要がある。Warp 以前は iTerm2 で Oh My Zsh を使い、プラグインでカスタマイズしていた。しかし Warp の機能とコンフリクトしたこともあったので、すべて削除してしまっていた。そのため、zsh を一から育て直すことにした。面倒ではあるが、いつかは戻りたいと思っていたのでちょうどよい。ただし `.zshrc` が膨らむのは嫌なので、最初は最小限にとどめる。

## 環境

- [[macos|macOS]]
- Ghostty
- zsh
- sheldon

## 検証

### Ghostty のインストール

[公式のドキュメント](https://ghostty.org/docs/install/binary#macos)にあるように、[[homebrew|Homebrew]] でインストールした。

```sh
$ brew install --cask ghostty
```

設定ファイルは次のようにした。

```ini
theme = synthwave
font-size = 16
font-family = Moralerspace Krypton NF

macos-titlebar-style = tabs
macos-titlebar-proxy-icon= hidden

window-padding-x = 20
window-padding-y = 5
window-padding-balance = true
window-theme = ghostty

background-opacity = 0.85
background-blur-radius = 15

quick-terminal-position = "top"
quick-terminal-screen = "mouse"

keybind = "global:ctrl+`=toggle_quick_terminal"
```

### sheldon の導入

zsh のプラグインマネージャとして [sheldon](https://github.com/rossmacarthur/sheldon) を入れた。手順は公式の README に沿った。まず Homebrew でインストールし、設定ファイルを初期化する。

```sh
$ brew install sheldon
$ sheldon init --shell zsh

Initialize new config file `~/.config/sheldon/plugins.toml`? [y/N] y
Initialized ~/.config/sheldon/plugins.toml
```

`.zshrc` に次の行を足して、プラグインを読み込む。

```zsh
eval "$(sheldon source)"
```

プラグインを足すには、`~/.config/sheldon/plugins.toml` を編集するか、[`sheldon add` コマンド](https://github.com/rossmacarthur/sheldon?tab=readme-ov-file#add)を使う（[Adding a plugin](https://github.com/rossmacarthur/sheldon?tab=readme-ov-file#adding-a-plugin)）。いくつかプラグインを足した後の設定ファイルは次のとおりである。`defer` のテンプレートは [sheldon の Examples](https://sheldon.cli.rs/Examples.html) から借りたので省略する。

```toml
shell = "zsh"

[templates]
defer = "...https://sheldon.cli.rs/Examples.html から拝借しただけなので省略..."

[plugins]

[plugins.zsh-defer]
github = "romkatv/zsh-defer"

[plugins.compinit]
inline = """
autoload -Uz compinit
zsh-defer -a -t0.01 compinit -d "$XDG_STATE_HOME/zsh/zcompdump"
"""

[plugins.fzf-tab]
github = "Aloxaf/fzf-tab"
apply = ["defer"]

[plugins.fast-syntax-highlighting]
github = "zdharma-continuum/fast-syntax-highlighting"
apply = ["defer"]

[plugins.zsh-autosuggestions]
github = "zsh-users/zsh-autosuggestions"
apply = ["defer"]
hooks.post = """
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=242'
"""

[plugins.zsh-history-substring-search]
github = "zsh-users/zsh-history-substring-search"
hooks.post = """
bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down
"""
apply = ["defer"]

[plugins.zsh-completions]
github = "zsh-users/zsh-completions"
dir = "src"
apply = ["defer", "fpath"]

[plugins.zsh-autopair]
github = "hlissner/zsh-autopair"
apply = ["defer"]
```

## キーワード

- [[warp|Warp]]
- [[cursor|Cursor]]
- [[homebrew|Homebrew]]
- [[macos|macOS]]

## 参考

- https://ghostty.org/docs/install/binary#macos
- https://github.com/rossmacarthur/sheldon
- https://sheldon.cli.rs/Examples.html
- https://zenn.dev/yanskun/articles/zsh-plugin-manager#plugin
- https://zenn.dev/ganta/articles/e1e0746136ce67
- https://zenn.dev/bonty/scraps/03fb1aed571016
