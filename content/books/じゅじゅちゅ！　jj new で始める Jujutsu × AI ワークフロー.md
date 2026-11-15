---
title: じゅじゅちゅ！　jj new で始める Jujutsu × AI ワークフロー
aliases: []
description: AI エージェントとの協働と相性の良い VCS である Jujutsu を、Git とのメンタルモデルの違いから AI ワークフローまで段階的に学ぶ本
tags: [book, jujutsu, jj]
date: 2026-05-25
book-authors: []
publisher:
isbn:
---

## TL;DR

- AI エージェントと協働するときに [[git|Git]] で起きる問題を、Jujutsu で解決する方法を学ぶ本である。
- Jujutsu を軽く体験し、Git との[[mental-model|メンタルモデル]]の違いを理解してから、コマンドの詳細、AI との協働ワークフロー、よくある問題への対処へと進む。

## 対象読者

AI エージェントにコードを書かせていて、Git の操作に困っている人向けの本である。たとえば、コミットし忘れたまま AI に次の指示を出して変更を上書きされる、AI が `git restore` や `git reset --hard` で直近の変更を消してしまう、AI が複数ファイルにまたがる変更を一度に行い履歴を分けられない、といった問題を扱う。本書は、これらを Git の設計と AI 時代の作業スタイルとの構造的なミスマッチだと説明している。

Jujutsu は変更を自動でコミットし、どの操作も取り消せる。Git と互換性があるので、チームで自分だけが使い始めることもできる。ただし Git とメンタルモデルが大きく異なるため、初心者がつまずきやすい。本書はそこを順を追って説明している。

## 目次

1. Jujutsu ってどんなツール？
2. 使ってみよう Jujutsu
3. 実践 Jujutsu × AI ワークフロー
4. Jujutsu の高度な術式
5. Jujutsu 問題解決ガイド

## 感想

[[git-worktree|git worktree]] での作業があまりにもしんどくなってきたので、重い腰を上げて、Jujutsu をキャッチアップするために購入した。Worktrunk があるとはいえ、つらい。

## 関連

- Jujutsu
- [[git|Git]]
- [[git-worktree|git worktree]]
- [技術書典の頒布ページ](https://techbookfest.org/product/nCUm1fLEJi5AywW1pyYWMW?productVariantID=8ag2Dv9pup0RWxJHtu6ZMh)
