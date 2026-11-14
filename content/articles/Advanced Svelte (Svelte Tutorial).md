---
title: Advanced Svelte (Svelte Tutorial)
description: Svelte 公式チュートリアルの Advanced Svelte。$state.raw、スニペット、Tween と Spring、バインディング、特殊要素、script module
tags: [article, svelte]
date: 2025-02-03
article-authors: []
site: Svelte
published:
url:
---

## TL;DR

- Svelte 公式チュートリアルの Advanced Svelte。[[svelte|Svelte]] 5 のリアクティビティの応用、スニペット、モーション、バインディング、特殊要素、`<script module>` を扱う。
- `<svelte:fragment>` や `<svelte:component>`、`tweened`、`spring`、`<script context="module">` は非推奨になり、スニペットや `Tween`、`Spring` などに置き換わった。

## 内容

### Advanced reactivity

`$state.raw` を使うと、個々のプロパティの変更を検知するオーバーヘッドがなくなる。そのかわり、`person.age += 1` のようにプロパティを変えても UI は更新されず、オブジェクトを再代入したときだけ更新される。

`$state` や `$derived` はクラスのプロパティにも使える。プロパティを private にして getter / setter を用意すれば、値に制限をかけられる。

`svelte/reactivity` は、`Map`、`Set`、`Date`、`URL`、`URLSearchParams` のリアクティブ版（`SvelteDate` など）を提供している。これらのメソッドは Proxy を介さないので、`$state` で包むより効率がよい。

### Reusing content

コンポーネント内で再利用するマークアップは、スニペットで定義して `{@render}` で描画する。引数も受け取れる。

```svelte
{#snippet monkey(emoji, description)}
  <tr><td>{emoji}</td><td>{description}</td></tr>
{/snippet}

{@render monkey("🙈", "see no evil")}
```

スニペットは [[props|Props]] として他のコンポーネントに渡せるので、表示の仕方を親で決められる。コンポーネントのタグの中で宣言したスニペットはその Props になり、スニペットでない中身は `children` として渡される。

### Motion

`svelte/motion` の `Tween` クラスは、時間をかけて値が変わる状態を作る。`delay`、`duration`、`easing`、`interpolate` を指定でき、書き込み用の `target` と読み取り用の `current` を持つ。`Spring` クラスは値がばねのように変わる状態を作り、頻繁に変わる値に向いている。`stiffness`、`damping`、`precision` を指定できる。`tweened` と `spring` は非推奨になった。

### Advanced bindings

`contenteditable` 属性を持つ要素は `textContent` と `innerHTML` をバインドできる。`$bindable()` を使うと Props をバインドできるが、単方向データフローが崩れるので、Vue と同じく極力使わない。特に[[single-source-of-truth|信頼できる唯一の情報源]]がない場合は避ける。`bind:this` でコンポーネントのインスタンスをバインドすると、子が `export` した関数を親から呼べる。

### Special elements

`<svelte:fragment>` はスニペットで、`<svelte:component>` は v5 でコンポーネントが動的になったことで、`<svelte:self>` は自分自身を `import` できるようになったことで、それぞれ不要になった。

`<svelte:document>` を使うと、`selectionchange` のような `Window` では起きないイベントを listen できる。ただし `mouseenter` や `mouseleave` はすべての[[web-browser|ブラウザ]]の `Document` で起きるわけではないので、`<svelte:body>` を使う。

`<svelte:boundary>` は、子要素の描画や更新、`$effect` の中でエラーが起きたときに、その中身を破棄する。エラー時の表示は `error` と `reset` を受け取る `failed` スニペットに書く。イベントハンドラや非同期処理の後のように、描画の外で起きたエラーは捕捉できない。

### `<script module>`

すべてのインスタンスで状態を共有するには `<script module>` を書く。`<script context="module">` は非推奨になった。ここで `export` したものはモジュールからのエクスポートになるが、コンポーネント自体が `default export` なので、`default export` は使えない。

## キーワード

- [[svelte|Svelte]]
- [[props|Props]]
- 単方向データフロー
- [[single-source-of-truth|信頼できる唯一の情報源]]
- [[web-browser|ブラウザ]]
- [[error-boundary|Error Boundary]]

## 自分の理解

`<svelte:boundary>` は [[react|React]] の [[error-boundary|Error Boundary]] に似ている。`{#await}` は [[suspense|Suspense]] のような立ち位置だろうか。

## 関連

- [[relearning-svelte|Svelte / SvelteKit をリラーニングする]]
- [[Basic Svelte (Svelte Tutorial)]]
- [[Basic SvelteKit (Svelte Tutorial)]]
- [Svelte 5 移行ガイド](https://svelte.jp/docs/svelte/v5-migration-guide#svelte:component-is-no-longer-necessary)
