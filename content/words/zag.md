---
title: Zag
aliases: []
description: 有限状態機械で動く、フレームワークに依存しない UI コンポーネントのロジックのライブラリ
tags: [word, javascript, ui]
date: 2025-03-01
---

## TL;DR

有限状態機械で動く、フレームワークに依存しない UI コンポーネントのライブラリ。アコーディオン、メニュー、ダイアログなどのロジックを提供し、デザインシステムを作るために使う。

## なぜ必要か

開発者は Chakra UI の作者と同じである。Chakra UI の [[react|React]] 版では、イベントの連携や状態、副作用の管理にまつわる不具合に何度も悩まされた。その多くは `useEffect`、`useMemo`、`useCallback` などの中での調整に関するものだった。Vue 版でも同じ問題が起き、保守が大変になった。そこで、ウィジェットはどのフレームワークで作っても同じように動くべきだと考えて Zag を作った。

> We believe that most widgets should function the same way regardless of the framework they're built with. That's why we built Zag

## 仕組み

コンポーネントのロジックの大部分は素の JavaScript で書かれた[[state-machine|ステートマシン]]であり、どの JavaScript フレームワークからも使える。React、Vue、Solid.js、Svelte に対応している。ステートマシンの出力を DOM につなぐアダプタは、WAI-ARIA に沿ったアクセシビリティを備える。API はヘッドレスでスタイルを持たないので、自分のデザインシステムに合わせてスタイルを当てる。

## 自分の理解

フレームワークに依存しない形で、コンポーネントの状態を管理するためのライブラリだと認識している。

## 関連

- [[state-machine|ステートマシン]]
- [[xstate|XState]]

## 出典

- [Zag](https://zagjs.com/)
- [Statechart Driven UI Components with Zag.js（開発者によるチュートリアル）](https://egghead.io/courses/statechart-driven-ui-components-with-zag-js-53f85394)
