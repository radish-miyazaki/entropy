---
title: SDL2
aliases: []
description: グラフィック、オーディオ、入力機器などハードウェアへのアクセスを抽象化するライブラリ
tags: [word]
date: 2024-09-14
---

## TL;DR

Simple DirectMedia Layer 2 の略。グラフィック、オーディオ、キーボード、マウスなど、ハードウェアへのアクセスを抽象化するライブラリである。

## なぜ必要か

GUI アプリケーションやゲームの開発に使われる。ハードウェアアクセラレーションを利用して高速に描画でき、クロスプラットフォームで動く。

## 仕組み

公式サイトによると、SDL はオーディオ、キーボード、マウス、ジョイスティック、グラフィックのハードウェアへの低レベルなアクセスを提供するクロスプラットフォームのライブラリで、グラフィックは OpenGL や Direct3D を通して扱う。C で書かれており、C++ からもそのまま使える。C# や Python などのバインディングもある。公式には Windows、macOS、Linux、iOS、Android に対応し、zlib ライセンスで配布されている。

## 例

動画再生ソフト、エミュレータ、Valve のゲームなどで使われている。

## 注意点

公式サイトで配布されている現在の安定版は SDL 3 系である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ncurses]]
- [[lem|Lem]]: SDL2 版が提供されている

## 出典

- [Simple DirectMedia Layer](https://www.libsdl.org/)
- [SDL2 マニュアル 日本語訳](https://maruhiro-ver0.github.io/sdl2manual-ja/index.html)
