---
title: Composable
aliases: []
description: Vue の Composition API を使い、状態を持つロジックをカプセル化して再利用するための関数
tags: [word, vue]
date: 2026-11-14
---

## TL;DR

Vue の Composition API を使って、状態を持つロジックをカプセル化し、再利用できるようにした関数。`useMouse` のように、`use` で始まるキャメルケースの名前を付けるのが慣習である。

## なぜ必要か

Vue の公式ドキュメントによると、日付の整形のように入力から出力を返すだけの状態を持たないロジックは、普通の関数で再利用できる。一方、マウスの位置のように時間とともに変わる状態を管理するロジックは、Composable にまとめるとコンポーネントの間で再利用できる。[[container-presentational-pattern|Container/Presentational パターン]]を Vue に当てはめるときも、Container の役割に Composable を使う。

## 仕組み

Composable の中で `ref` などのリアクティブな状態とライフサイクルフックを使い、必要な値を返す。公式ドキュメントでは、リアクティブではない普通のオブジェクトに複数の `ref` を入れて返すことを推奨している。こうすると、コンポーネントで分割代入してもリアクティビティを保てる。引数には `ref` やゲッター関数も受け取れるようにし、`toValue()` で値に正規化する。

## 例

```js
// mouse.js
import { ref, onMounted, onUnmounted } from "vue"

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener("mousemove", update))
  onUnmounted(() => window.removeEventListener("mousemove", update))

  return { x, y }
}
```

## 注意点

公式ドキュメントによると、mixin には、プロパティの出どころが分かりにくい、名前が衝突する、mixin どうしが暗黙にやり取りするという欠点がある。Composable はこれらを避けられるので、Vue 3 では mixin は推奨されていない。[[react|React]] の [[react-hooks|Hooks]] と目的は似ているが、Vue のきめ細かいリアクティビティの上に作られているので、React とは動き方が違う。[[svelte-runes|Svelte の Rune]] も、`.svelte.js` ファイルで使えるので、同じようにロジックをコンポーネントから切り離せる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-hooks|React Hooks]]
- [[svelte-runes|Svelte Runes]]
- [[container-presentational-pattern|Container/Presentational パターン]]

## 出典

- [Composables - Vue.js](https://vuejs.org/guide/reusability/composables.html)
- [[Vue Patterns - patterns.dev]]
- [[container-presentational-pattern|Container/Presentational パターン]]
