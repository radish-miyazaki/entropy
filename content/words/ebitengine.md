---
title: Ebitengine
aliases: []
description: Go で書く、OSS の 2D ゲームエンジン
tags: [word, go]
date: 2025-09-27
---

## TL;DR

[[go|Go]] のための、OSS の 2D ゲームエンジン（旧称 Ebiten）。シンプルな API で、手早くゲームを作れるように設計されている。

## 仕組み

「Ebitengine ではすべてが画像である」（everything is an image）という考え方で、描画のほとんどは画像の上に別の画像を描くことで行う。GPU で描画を高速化し、描画の呼び出しはできるかぎり自動でまとめられる。

公式サイトによると、Windows、macOS、Linux、FreeBSD のデスクトップ、[[webassembly|WebAssembly]] を使ったブラウザ、Android と iOS、Nintendo Switch で動く。商用のゲームでも使われている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[Go言語とEbitengineによる ゼロから始めるゲームプログラミング]]

## 出典

- [Ebitengine](https://ebitengine.org/)
