---
title: tmux
aliases: []
description: 1 つの端末の中で複数のウィンドウやペインを扱える、ターミナルマルチプレクサ
tags: [word, linux]
date: 2026-03-01
---

## TL;DR

1 つの端末の中で、複数のウィンドウやペインを作って切り替えられるターミナルマルチプレクサ。

## 仕組み

設定は `~/.tmux.conf` に書く。起動中の tmux に反映するには、`tmux source ~/.tmux.conf` を実行する。

操作は、プレフィックスキー（デフォルトは `C-b`）を押してから、続けてキーを押して行う。よく使うキーバインドは次のとおり。

- ウィンドウ
  - `<prefix> c`: 新しいウィンドウを作る
  - `<prefix> ,`: ウィンドウ名を変える
  - `<prefix> n` / `<prefix> p`: 次 / 前のウィンドウへ移る
  - `<prefix> 0`〜`9`: 番号を指定してウィンドウへ移る
  - `<prefix> &`: 現在のウィンドウを閉じる
- ペイン
  - `<prefix> %`: 左右に分割する
  - `<prefix> "`: 上下に分割する
  - `<prefix> o`: 次のペインへ移る
  - `<prefix> 矢印キー`: 矢印の方向のペインへ移る
  - `<prefix> x`: 現在のペインを閉じる
  - `<prefix> Space`: レイアウトを順に切り替える
  - `<prefix> C-矢印キー` / `<prefix> M-矢印キー`: ペインのサイズを 1 / 5 セル変える
- コピーモード
  - `<prefix> [`: コピーモードに入り、スクロールできるようにする
  - `Space` で選択を始め、`Enter` でコピーし、`q` でコピーモードを抜ける
- `<prefix> ?`: キーバインドの一覧を表示する

## 例

自分の設定では、プレフィックスキーを `C-a` に変え、マウス操作を有効にしている。ペインの分割は `d` と `D` に割り当て、分割やウィンドウ作成のときに現在のパスを引き継ぐようにしている。

```conf
# prefixキーをC-aに変更する
set -g prefix C-a
unbind C-b

# Command Sequence for Nested Tmux Sessions
bind-key a send-prefix

#マウス操作を有効にする
set-option -g mouse on

# スクロールアップするとコピーモードに入る
bind-key -n WheelUpPane if-shell -F -t = "#{mouse_any_flag}" "send-keys -M" "if -Ft= '#{pane_in_mode}' 'send-keys -M' 'select-pane -t=; copy-mode -e; send-keys -M'"

# 最後までスクロールダウンするとコピーモードを抜ける
bind-key -n WheelDownPane select-pane -t= \; send-keys -M

# ウィンドウのインデックスを1から始める
set-option -g base-index 1

# ペイン分割のキーを d, D に変更し、現在のパスを分割元と同じにする
bind d split-window -h -c "#{pane_current_path}"
unbind '"'
bind D split-window -v -c "#{pane_current_path}"
unbind '%'

# ウィンドウ作成時に、現在のパスを元のウィンドウと同じにする
bind c new-window -c "#{pane_current_path}"
```

## 自分の理解

今さらながら入門した。これまでは [[zellij]] を使っていたが、oh-my-claudecode などは tmux の中で [[openai-codex-cli|Codex]] などを起動するので、tmux も使えるようにしておきたかった。

## 関連

- [[zellij]]

## 出典

- https://zenn.dev/daishiro/articles/tmux-cheatsheet-with-mnemonics
- https://ikuoshige.github.io/documentation/main/document/tmux/
