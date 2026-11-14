---
title: Tamagui
aliases: []
description: Web と React Native の両方で使えるスタイルライブラリと UI コンポーネント群
tags: [word, react, react-native]
date: 2025-04-07
---

## TL;DR

Web と [[react-native|React Native]] の両方で使える、スタイルライブラリと UI コンポーネントのセット。

## 仕組み

スタイルは型付きの書き方か、[[tailwind-css|Tailwind CSS]] のクラスで書く。[[rust|Rust]] で書かれた最適化コンパイラがコンポーネントのツリーを平坦にし、描画を速くする。

公式ドキュメントによると、Tamagui は 3 つの部分からなる。基礎のスタイルライブラリ `@tamagui/core` は、SSR に対応し、型付きのトークンを持つ。任意で使う静的コンパイラ `@tamagui/static` は、ビルド時にスタイルのプロパティやメディアクエリ、テーマの値をアトミック CSS に取り出し、styled コンポーネントを素の div や View に平坦にする。実際のアプリケーションでは、コンポーネントの 3 分の 1 から半分ほどが平坦になる。3 つ目の Tamagui Components は、Web とネイティブで使えるアクセシブルな UI コンポーネント群である。

## 注意点

コンパイラは任意で、最適化できないコンポーネントは通常どおり描画される。Next.js、[[expo|Expo]]、Vite、Webpack、Metro などのバンドラごとに導入手順がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react|React]]
- [[nativewind|NativeWind]]

## 出典

- [Tamagui](https://tamagui.dev/)
- [Introduction - Tamagui](https://tamagui.dev/docs/intro/introduction)
