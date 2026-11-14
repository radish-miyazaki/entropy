---
title: Console Ninja
aliases: []
description: console.log の出力や実行時エラーを、エディタのコードの横に直接表示する VS Code の拡張機能
tags: [word]
date: 2025-05-04
---

## TL;DR

`console.log` の出力を、[[visual-studio-code|Visual Studio Code]] などのエディタ上でコードの横に直接表示してくれるツール。[[wallaby|Wallaby]] と同じ会社が開発している。

## 仕組み

ブラウザや Node.js で動いているアプリから、`console.log` の値と実行時エラーを集め、該当する行の横に表示する。カーソルを合わせると詳細が見られる。ほかに、ログの一覧、`fetch` や `XMLHttpRequest` の通信の記録、コードを書き換えずに値を記録する Logpoint などの機能がある。

Vite、webpack、[[nextjs|Next.js]]、Nuxt、Remix、Astro、Jest などに対応している。Express のような素の Node.js のアプリは、起動コマンドの前に `console-ninja` を付けて使う。MCP サーバも提供しており、AI エージェントがログを使ってエラーを調べられる。

## 注意点

公式の Marketplace のページには、有料のサブスクリプションが必要だと書かれている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[wallaby|Wallaby]]

## 出典

- [Console Ninja](https://console-ninja.com/)
- [Console Ninja - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=WallabyJs.console-ninja)
