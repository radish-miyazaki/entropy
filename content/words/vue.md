---
title: Vue
aliases: [Vue.js]
description: 宣言的でコンポーネントベースの UI を作るための、段階的に導入できる JavaScript フレームワーク
tags: [word, javascript, フロントエンド]
date: 2026-11-14
---

## TL;DR

ユーザインタフェースを作るための [[javascript|JavaScript]] のフレームワーク。標準の HTML、CSS、JavaScript の上に、宣言的でコンポーネントベースのプログラミングモデルを提供する。読み方は「ビュー」。

## なぜ必要か

公式ドキュメントでは、Vue を「プログレッシブフレームワーク」と呼んでいる。静的な HTML に少しずつ機能を足す使い方から、SPA、SSR、SSG まで、必要に応じて段階的に導入できる。

## 仕組み

Vue の中心には 2 つの機能がある。1 つは宣言的レンダリングで、HTML を拡張したテンプレート構文で、JavaScript の状態から HTML の出力を記述する。もう 1 つはリアクティビティで、JavaScript の状態の変化を自動で追跡し、DOM を効率よく更新する。

コンポーネントは、ロジック、テンプレート、スタイルを 1 つの `*.vue` ファイルにまとめた単一ファイルコンポーネント（SFC）で書くのが推奨されている。API の書き方には、`data` や `methods` などのオプションでロジックを書く Options API と、import した関数でロジックを書く Composition API がある。Options API は Composition API の上に実装されている。

## 例

```vue
<script setup>
import { ref } from "vue"
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>
```

## 注意点

公式ドキュメントによると、Options API はリアクティビティの細部を隠すので初心者に向いている。Composition API は自由度が高い分、Vue のリアクティビティを理解していないと使いこなせない。本格的なアプリケーションでは、Composition API と SFC の組み合わせが勧められている。ビジネスロジックをコンポーネントから切り離すには、[[composables|Composable]] を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react|React]]
- [[composables|Composable]]
- [[vite|Vite]]
- [[svelte-runes|Svelte の Rune]]

## 出典

- [Introduction - Vue.js](https://vuejs.org/guide/introduction.html)
