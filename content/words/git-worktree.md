---
title: git worktree
aliases: []
description: 1 つのリポジトリで複数の作業ディレクトリ（ワークツリー）を管理し、複数のブランチを同時にチェックアウトできる Git の機能
tags: [word, git]
date: 2025-06-18
---

## TL;DR

1 つのリポジトリで複数の作業ディレクトリ（ワークツリー）を管理できる Git の機能である。複数のブランチを同時にチェックアウトできる。

## なぜ必要か

通常、1 つのリポジトリにワークツリーは 1 つしかない。コードレビューで別のブランチに移るときは、手元の変更を `git stash -u` で一時的に退避してから `git checkout` する必要がある。git worktree を使えば、ブランチごとに別のディレクトリを用意できるので、この手間がなくなる。[[claude-code|Claude Code]] を並列に動かすときにも役に立つ。

## 仕組み

`git init` や `git clone` で作られる元のワークツリーを main worktree、`git worktree add` で追加したものを linked worktree と呼ぶ。linked worktree は、HEAD や index などワークツリー固有のファイル以外をリポジトリ本体と共有する。

## 例

```sh
# ワークツリーを作る
git worktree add <パス> <ブランチ名>

# 一覧を表示する
git worktree list

# ワークツリーを削除する
git worktree remove <パス>
```

## 注意点

同じブランチを複数のワークツリーで同時にチェックアウトすることはできない。また、未コミットの変更や追跡されていないファイルがあるワークツリーは、`--force` を付けない限り `remove` できない。ディレクトリを手で消したときは、`git worktree prune` で管理情報を掃除する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [git-worktree - Git Documentation](https://git-scm.com/docs/git-worktree)
