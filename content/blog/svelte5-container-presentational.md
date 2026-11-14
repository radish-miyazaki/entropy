---
title: Svelte5 で Container/Presentational パターン
description: React で使われる Container/Presentational パターンを、Svelte 5 の Rune を使って書いた
tags: [blog, svelte]
date: 2025-12-06
draft: false
---

## TL;DR

- [[react|React]] でロジックと表示を分けるのに使う [[container-presentational-pattern|Container/Presentational Pattern]] を、[[svelte|Svelte]] 5 で書いた。
- 状態の取得と保持は Container 側で `$state` を使い、表示は Presentational 側で `$props` から受け取る。

## 背景

React では、ロジックと表示を別のコンポーネントとして定義するために Container/Presentational Pattern を使う。これを Svelte でも実現したいと思った。Svelte で書いた記事はいくつかあるが、v4 以前のものが多いので、v5 で書くことにした。

## 検証

コードは [[patterns-dev|patterns.dev]] の [Vue 向けの例](https://www.patterns.dev/vue/container-presentational/)を参考にした。犬の画像の URL を API から取得して表示する。

表示だけを担当する Presentational コンポーネントでは、[[svelte-runes|Rune]] の `$props` で URL の一覧を受け取る。

```svelte
<!-- DogImage.svelte -->
<script lang="ts">
  const urls = $props()
</script>

{#each urls as url}
  <img src={url} alt="Dog" />
{/each}
```

Container コンポーネントでは、`$state` で URL の一覧を保持し、`onMount` で API から取得する。

```svelte
<!-- DogImageContainer.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  const urls = $state([])

  const fetchURLs = async () => {
    const res = await fetch(
      "https://dog.ceo/api/breed/labrador/images/random/6"
    )
    const { message } = await res.json()
    urls.push(...message)
  }

  onMount(fetchURLs)
</script>

{#each urls as url}
  <img src={url} alt="Dog" />
{/each}
```

アプリケーション側では Container を使う。

```svelte
<!-- App.svelte -->
<script>
  import DogImageContainer from './DogImageContainer.svelte'
</script>

<DogImageContainer />
```

## 考察

ロジックは `.svelte.ts` ファイルに追い出したい。

## キーワード

- [[svelte|Svelte]]
- [[svelte-runes|Rune (Svelte)]]
- [[react|React]]
- [[container-presentational-pattern|Container/Presentational Pattern]]
- [[patterns-dev|patterns.dev]]

## 参考

- https://www.patterns.dev/vue/container-presentational/
