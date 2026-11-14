---
title: browsh
aliases: []
description: ヘッドレス Firefox を裏で動かし、Web ページをテキストにしてターミナルに表示するブラウザ
tags: [word, go]
date: 2025-08-15
---

## TL;DR

ターミナル（や別のブラウザ）に描画する、テキストベースの[[web-browser|ブラウザ]]。裏で本物のブラウザを動かすので、モダンな Web サイトも表示できる。

> A fully interactive, real-time, and modern text-based browser rendered to TTYs and browsers.

## なぜ必要か

elinks のような従来のテキストブラウザは、JavaScript や HTML5 に対応していない。browsh は本物のブラウザエンジンを使うので、これらを扱える。また、重いブラウザを別のマシンで動かしてテキストだけを送れば、遅い回線でも使えて、手元の端末のバッテリーも節約できる。ターミナル版は Mosh と組み合わせて、さらに通信量を減らし、接続を安定させられる。

## 仕組み

ヘッドレスの Firefox を裏で動かし、Web ページを純粋なテキストの形に変換する。ページ内で必要な JavaScript を動かし、browsh が扱える形で描画させるために、Firefox の Web 拡張機能を使う。そのため、バイナリを使うには Firefox のインストールが必要になる。Docker イメージで動かすこともできる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[web-browser|ブラウザ]]
- [[tui|TUI]]

## 出典

- [browsh-org/browsh](https://github.com/browsh-org/browsh)
