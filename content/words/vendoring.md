---
title: ベンダリング
aliases: []
description: プロジェクトが使うサードパーティのパッケージのコピーを、プロジェクトの中に置いて管理すること
tags: [word, go]
date: 2025-06-06
---

## TL;DR

プロジェクトで使っているサードパーティのパッケージを、自分でコピーして持っておくこと。英語では vendoring という。

> Vendoring is the act of making your own copy of the 3rd party packages your project is using. Those copies are traditionally placed inside each project and then saved in the project repository.

## 仕組み

コピーしたパッケージは、ふつう各プロジェクトの中に置き、プロジェクトのリポジトリに保存する。

## 例

上の引用は [[go|Go]] についての記事だが、ほかの言語でもベンダリングが使われることがある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[dependency|依存関係]]

## 出典

- [Manage Dependencies With GODEP - Ardan Labs](https://www.ardanlabs.com/blog/2013/10/manage-dependencies-with-godep.html)
- [pyteyon.hatenablog.com](https://pyteyon.hatenablog.com/entry/2020/04/23/230612)
