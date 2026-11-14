---
title: Rune (Svelte)
aliases: [Svelte Runes]
description: Svelte 5 で導入された、リアクティブな状態や振る舞いを明示的に書くための構文
tags: [word, svelte]
date: 2025-02-01
---

## TL;DR

[[svelte|Svelte]] 5 で導入された、リアクティブな状態や振る舞いを明示的に書くための構文。`$state` のように `$` で始まる、関数呼び出しに似た形をしている。

## なぜ必要か

リアクティブな変数やロジックを明示的に書けるので、コードの意図が分かりやすくなる。保守性の向上も期待できる。

## 仕組み

Rune は Svelte コンパイラに指示を出すための記号で、言語の構文の一部としてキーワードのように働く。import は不要である。値ではないので、変数に代入したり引数として渡したりはできない。使える場所が決まっていて、誤った使い方はコンパイラが報告する。

主な Rune には、`$state`、`$derived`、`$effect`、`$props`、`$bindable`、`$inspect`、`$host` がある。

Rune は `.svelte` ファイルだけでなく、`.svelte.js` や `.svelte.ts` ファイルでも使える。そのため、[[react|React]] の[[custom-hook|カスタムフック]]や [[vue|Vue]] の [[composables|Composable]] のように、ビジネスロジックをコンポーネントから切り離せるようになった。

## 例

```js
let count = $state(0)
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[svelte|Svelte]]
- [[sveltekit|SvelteKit]]
- [[svelte5-container-presentational|Svelte5 で Container/Presentational パターン]]

## 出典

- [Runes - Svelte Blog](https://svelte.jp/blog/runes)
- [What are runes? - Svelte Docs](https://svelte.dev/docs/svelte/what-are-runes)
