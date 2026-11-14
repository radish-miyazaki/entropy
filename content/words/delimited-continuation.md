---
title: 限定継続
aliases: [delimited continuations]
description: 現在の計算のうち、最も近い区切り（プロンプト）までの部分だけを切り取った継続
tags: [word]
date: 2025-06-14
---

## TL;DR

[[continuation|継続]]のうち、現在の計算位置から、最も近くにある区切り（プロンプト）までの部分だけを切り取ったもの。

## 仕組み

[[racket|Racket]] のリファレンスでは、限定継続をプロンプトを使って説明している。プロンプトは、特定のプロンプトタグが付いた特別な継続フレームである。限定継続を捕まえる操作は、現在の評価位置から、最も近くにある同じタグのプロンプトまでのフレームを切り取る。

捕まえた限定継続（composable continuation）は、現在の継続に付け足す形で呼び出せる。Racket の `call-with-composable-continuation` で得た継続を適用しても、現在の継続のどの部分も捨てられない。

Racket の `racket/control` ライブラリは、Danvy と Filinski による `reset` と `shift` を提供している。`reset` が区切りを置き、`shift` がそこまでの限定継続を捕まえる。Racket の `reset` は `prompt` と置き換えて使える。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[continuation|継続]]
- [[continuation-passing-style|継続渡しスタイル]]

## 出典

- [限定継続 (delimited continuation) の動作を理解する](https://miyakawataku.hatenablog.com/entry/20170323/1490281499)
- [The Racket Reference: 1.1 Evaluation Model](https://docs.racket-lang.org/reference/eval-model.html)
- [The Racket Reference: 10.4 Continuations](https://docs.racket-lang.org/reference/cont.html)
