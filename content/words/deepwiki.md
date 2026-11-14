---
title: DeepWiki
aliases: []
description: GitHub のリポジトリから Wiki を自動で生成するツール。Devin の開発元が提供している
tags: [word, 生成ai]
date: 2025-05-04
---

## TL;DR

[[github|GitHub]] のリポジトリから Wiki を自動で生成するツール。[[devin|Devin]] を開発している Cognition AI が提供している。

## 仕組み

DeepWiki はリポジトリを読み込み、アーキテクチャの図、ドキュメント、ソースコードへのリンク、コードベースの要約を作る。deepwiki.com で公開リポジトリの URL を入力すると、そのリポジトリを解析する。生成された Wiki をもとに、コードについて質問することもできる。

無料で使えるのは公開リポジトリだけである。プライベートリポジトリは、Devin のアプリにリポジトリをつなぐと Wiki が作られる。

リポジトリのルートに `.devin/wiki.json` を置くと、生成するページを自分で指定できる。

有志が作った OSS 版の [deepwiki-open](https://github.com/AsyncFuncAI/deepwiki-open) を使えば、セルフホストもできる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[devin|Devin]]

## 出典

- [DeepWiki](https://deepwiki.com/)
- [DeepWiki - Devin Docs](https://docs.devin.ai/work-with-devin/deepwiki)
- [deepwiki-open のセルフホストの記事](https://zenn.dev/iwatagumi/articles/f1787a1221d010)
- [Zenn の記事（taku_sid）](https://zenn.dev/taku_sid/articles/20250427_deepwiki_docs)
- [Zenn の記事（is0383kk）](https://zenn.dev/is0383kk/articles/bfd815578f3bac)
