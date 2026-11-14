---
title: SolidStart
aliases: []
description: SolidJS の上に作られたフルスタックフレームワーク
tags: [word, solidjs]
date: 2025-01-28
---

## TL;DR

SolidJS の上に作られたフルスタックフレームワーク。[[vite|Vite]] を使ってクライアント向けとサーバ向けのビルドを分けて生成する。

## 仕組み

公式ドキュメントによると、SolidStart はルーターに依存しない作りになっており、Solid Router と TanStack Solid Router のどちらとも組み合わせられる。ビルドには Vite の Environment API を使い、クライアントとサーバのビルドを別々に作る。デプロイ先に合わせて、Nitro や Cloudflare、Netlify 向けの Vite プラグインを使える。

バージョン 2 は主にツール周りの更新と安定性の向上を目的としたリリースで、バージョン 1 からの移行ガイドも用意されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- SolidJS
- [[vite|Vite]]

## 出典

- [SolidStart](https://start.solidjs.com/)
- [SolidStart - Solid Docs](https://docs.solidjs.com/solid-start)
