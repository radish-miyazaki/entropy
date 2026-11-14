---
title: git commit --allow-empty で空コミットを作成してPR作るといい感じ
description: 開発を始める前に git commit --allow-empty で空コミットを作り、差分のない PR に概要と Todo を書いておく
tags: [blog, git]
date: 2024-08-27
draft: false
---

## TL;DR

- 開発を始める前に `git commit --allow-empty` で空のコミットを作って push し、ファイルの差分がない PR を作る。
- その PR の概要にチケットの URL、詳しい説明、実装の Todo を書いてから開発を進める。

## 検証

参考にした記事では、次の流れで開発を進めている。

> ・developブランチをpullして最新の状態にする
> ・git flow feature start チケット名\_簡単な名前　＊ git flow を使用している場合
> ・git commit --allow-empty で空コミットを作成する
> ・git push する
> ・ファイル差分のないPRの概要のところにチケットのURLと詳細説明と実装Todoチェックリストを作成する
> ・いざ開発を進める　（できるだけ細かい粒度のcommitを心がける）

## キーワード

- [[git|Git]]
- [[github|GitHub]]

## 参考

- https://kentarotawara.hatenablog.com/entry/2020/11/05/223639
