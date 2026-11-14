---
title: Lynx
aliases: []
description: Web の書き方で iOS、Android、HarmonyOS、Web 向けにネイティブ描画する UI を作れるクロスプラットフォームの UI フレームワーク
tags: [word]
date: 2025-04-04
---

## TL;DR

Web と同じ書き方で、iOS、Android、HarmonyOS、Web 向けの UI を作れるクロスプラットフォームの UI フレームワーク。「Write Once, Render Anywhere」を掲げている。

## なぜ必要か

Web の開発者が手持ちの CSS と [[javascript|JavaScript]] の知識のまま、複数のプラットフォーム向けにネイティブ描画するアプリケーションを作れる。既存のアプリケーションに埋め込んで使うこともできる。

## 仕組み

Web のプログラミングモデルにならっており、CSS と JavaScript で UI を書く。エンジンとフレームワークはマルチスレッドで動く設計になっている。独自のレンダラを持ち、モバイルとデスクトップで見た目をそろえる。

Lynx 自体は特定のフレームワークに縛られない。公式の [[react|React]] 実装である ReactLynx のほか、[[vue|Vue]] などのフレームワークでも使える。プロジェクトは `npm create rspeedy@latest` で作成する。

## 例

TikTok や CapCut で使われている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react|React]]

## 出典

- [Lynx](https://lynxjs.org/index.html)
