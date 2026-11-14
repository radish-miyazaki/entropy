---
title: Chrome DevTools
aliases: []
description: Google Chrome に組み込まれた Web 開発者向けのツール群
tags: [word, ブラウザ, デバッグ]
date: 2026-11-14
---

## TL;DR

Google Chrome に組み込まれた、Web 開発者向けのツール群。ページの DOM や CSS の確認、JavaScript のデバッグ、ネットワークや性能の分析などができる。

## 仕組み

公式ドキュメントによると、要素を右クリックして「検証」を選ぶか、Mac なら Cmd+Option+C で Elements パネルが開く。Cmd+Option+J では Console パネルが開く。主なパネルは次のとおりである。

- Elements: DOM と CSS を確認、編集する
- Console: ログを見る、JavaScript を実行する
- Sources: ブレークポイントを置いて JavaScript をデバッグする
- Network: 通信とページのリソースを調べる
- Performance: 読み込みと実行時の性能の問題を見つける
- Memory: メモリリークなどを見つける
- Application: IndexedDB、ローカルストレージ、Cookie などのストレージを調べる

ほかに、モバイル端末を再現する Device Mode や、ユーザ操作を記録して再生する Recorder もある。

## 例

[[time-to-first-byte|TTFB]] は、Network タブでリクエストを選び、「タイミング」タブを開くと確認できる。[[android-emulator-chrome-devtools|Android エミュレータの Chrome を PC の Chrome DevTools で確認する]]こともできる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[chrome-devtools-mcp|Chrome DevTools MCP]]
- [[react-devtools|React DevTools]]
- [[largest-contentful-paint|LCP]]
- [[time-to-first-byte|TTFB]]

## 出典

- [Chrome DevTools - Chrome for Developers](https://developer.chrome.com/docs/devtools/overview)
- [[time-to-first-byte|Time to First Byte]]
