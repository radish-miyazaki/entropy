---
title: React DevTools
aliases: []
description: React のコンポーネントツリーを可視化し、各コンポーネントの Props や state を確かめられるブラウザ拡張機能
tags: [word, react]
date: 2024-09-06
---

## TL;DR

ブラウザでコンポーネントツリーを可視化し、[[react|React]] の各コンポーネントの [[props|Props]] や state を確かめられるブラウザ拡張機能。

## 仕組み

検索バーから目的のコンポーネントを探せる。コンポーネントをクリックすると、そのコンポーネントの Props と [[react-hooks|Hook]] が表示される。Props や state の値を書き換えて、変更の影響を確かめることもできる。

Chrome や Chromium では、[Chrome ウェブストア](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)から追加する。Firefox と Edge にも拡張機能がある。拡張機能を入れて React で作られたサイトを開くと、開発者ツールに Components と Profiler のパネルが現れる。

Safari などの拡張機能がないブラウザでは、npm の `react-devtools` パッケージを使う。ターミナルで `react-devtools` を起動し、サイトの `<head>` の先頭に `<script src="http://localhost:8097"></script>` を足して再読み込みすると、開発者ツールにつながる。React Native では、React Developer Tools を組み込んだ React Native DevTools を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react|React]]
- [[react-hooks|React Hooks]]

## 出典

- [React Developer Tools](https://ja.react.dev/learn/react-developer-tools)
