---
title: Basic Svelte (Svelte Tutorial)
description: Svelte 公式チュートリアルの Basic Svelte。Svelte 5 の Rune、Props、イベント、Action、Transition の書き方
tags: [article, svelte]
date: 2025-02-02
article-authors: []
site: Svelte
published:
url: https://svelte.jp/tutorial/svelte/welcome-to-svelte
---

## TL;DR

- Svelte 公式チュートリアルの Basic Svelte。[[svelte|Svelte]] 5 での状態、[[props|Props]]、イベント、スタイル、Action、Transition の書き方を扱う。
- 状態は `$state`、導出は `$derived`、副作用は `$effect`、Props は `$props` のように [[svelte-runes|Rune]] で書く。`$:` や `export let`、`on:click` は使わなくなった。

## 内容

### State

リアクティブな状態は `$state` で宣言する。再代入だけでなく、配列の `push` のような変更にもリアクティブになる（Deep reactivity）。Deep reactivity は [Proxy](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Proxy) で実装されており、`Proxy` への変更は元のオブジェクトに影響しない。

```ts
let numbers = $state([1, 2, 3, 4])
let total = $derived(numbers.reduce((t, n) => t + n))
```

ほかの状態から導出する状態は `$derived` で宣言し、`$:` は不要になった。関数で書きたいときは `$derived.by` を使う。リアクティブな値はそのまま `console.log` に渡しても出力できないので、`$state.snapshot` でスナップショットを作るか、`$inspect` で変化のたびに出力させる。`$inspect` は本番ビルドでは削除される。

[[side-effect|副作用]]は `$effect` で書き、`beforeUpdate` や `afterUpdate` は不要になった。破棄時の処理は `return` で返す関数に書く。ただし `$effect` はエスケープハッチで、できればイベントハンドラの中で処理する。[[server-side-rendering|SSR]] 中には実行されない。

```ts
$effect(() => {
  const id = setInterval(() => (elapsed += 1), interval)
  return () => clearInterval(id)
})
```

Rune は `.svelte.ts` や `.svelte.js` のファイルならコンポーネントの外でも使えるので、グローバルな状態を共有できる。以前は `svelte/store` の `writable` などが必要だった。

### Props と Event

Props は `$props` で受け取り、`export let` や `$$props`、`$$restProps` は使わない。[[destructuring|分割代入]]やデフォルト値、[[spread-syntax|スプレッド構文]]も使える。

```ts
let { answer = "a mystery", ...stuff } = $props()
```

イベントハンドラは `on:click` ではなく `onclick` のように指定し、`|preventDefault` のようなイベント修飾子もなくなった。

### Style

親から `<Box --color="red" />` のように渡した値を、子の CSS で `var(--color, #ddd)` のようにカスタムプロパティとして使える。

### Action

Action は [[dom|DOM]] 要素にコンポーネントのようなライフタイム管理を与える機能である。`use:tooltip={() => ({ content })}` のようにタグに渡すと、ノードのマウント時に Action 関数が DOM ノードとパラメータを受け取って呼ばれる。更新時の処理は `$effect` に、アンマウント時の処理はその中で返す関数に書くので、`update` や `destroy` を持つオブジェクトを返す必要はなくなった。

### Transition

`transition:fade` のようにタグに Transition 関数を渡すと、トランジションを付けられる。Transition 関数は `delay`、`duration`、`easing`、`css`、`tick` を持つオブジェクトを返す。`css` と `tick` は `(t, u) => ...` の形で、`t` は `easing` を適用した 0 から 1 の値、`u` は `1 - t` である。CSS アニメーションはメインスレッドと別に処理できるので、`tick` より `css` を使うほうがよい。

`transition:slide|global` のように `|global` を付けると、親ブロックの作成・破棄のときにも実行される。Svelte 3 ではデフォルトが global だったが、以降は local になった。

## キーワード

- [[svelte|Svelte]]
- [[svelte-runes|Rune (Svelte)]]
- [[props|Props]]
- [[side-effect|副作用]]
- [[server-side-rendering|SSR]]
- [[destructuring|分割代入]]
- [[spread-syntax|スプレッド構文]]
- [[dom|DOM]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [[relearning-svelte|Svelte / SvelteKit をリラーニングする]]
- [[Advanced Svelte (Svelte Tutorial)]]
- [Lifecycle hooks - Svelte](https://svelte.dev/docs/svelte/lifecycle-hooks)
