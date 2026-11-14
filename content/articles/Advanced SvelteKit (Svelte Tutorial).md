---
title: Advanced SvelteKit (Svelte Tutorial)
description: Svelte 公式チュートリアルの Advanced SvelteKit。Hooks、Page options、Link options、server load と universal load、環境変数
tags: [article, svelte, sveltekit]
date: 2025-02-07
article-authors: []
site: Svelte
published:
url:
---

## TL;DR

- Svelte 公式チュートリアルの Advanced SvelteKit。[[sveltekit|SvelteKit]] の Hooks、Page options、Link options、`load` の応用、環境変数を扱う。
- server load と universal load を両方定義すると、server load の戻り値はページに直接渡らず、universal load の `data` 引数に渡される。

## 内容

### Hooks

Hook は SvelteKit のデフォルトの振る舞いに割り込んで上書きする仕組みで、`src/hooks.server.js` か `src/hooks.client.js` から export する。

`handle` はリクエストを受け取るたびに実行される。引数の `event` は [RequestEvent](https://svelte.jp/docs/kit/@sveltejs-kit#RequestEvent) で、`cookies`、`fetch`、`locals`、`params`、`url` などを持つ。`event.fetch` は受け取ったリクエストの `cookie` や `authorization` を引き継ぐので、サーバ上で認証付きのリクエストを送れる。もう 1 つの引数 `resolve` に `event` を渡すと通常のルーティングで処理され、`transformPageChunk` で生成された [[html|HTML]] を書き換えられる。

`handleFetch` はサーバで SvelteKit の `fetch` が呼ばれたときに、`handleError` は予期せぬエラーが起きたときに実行される。

### Page options

SvelteKit はデフォルトで [[server-side-rendering|SSR]] と [[client-side-rendering|CSR]] を組み合わせて動く。初回アクセス時は SSR した HTML と最低限の [[javascript|JavaScript]] を送って[[hydration|ハイドレーション]]し、その後のページ遷移は CSR で処理する。

この動作は `+page.js` や `+layout.js` から [Page options](https://svelte.jp/docs/kit/page-options) を export して変える。`export const prerender = true` でプリレンダリング（[[static-site-generation|SSG]]）できるが、どのユーザもサーバから同じ内容を受け取り、Form actions を含まないことが条件になる。動的なルートパラメータを持つページは、`prerender.entries` で指定するか、指定したページからリンクをたどって到達できればプリレンダリングできる。

末尾のスラッシュは SEO やプリレンダリングの保存先に影響するので、SvelteKit はデフォルトで削除する。`trailingSlash` を export するとこの挙動を変えられる。

### Link options

[Link options](https://svelte.jp/docs/kit/link-options) の `data-sveltekit-preload-data` を付けると、デスクトップではホバー時、モバイルではタップ時にナビゲーションを始める。デフォルトのテンプレートでは `<body>` に付いている。データを読まずに JavaScript だけを先読みするには `data-sveltekit-preload-code` を使う。ページをリロードして遷移させたいときは `data-sveltekit-reload` を付ける。

### Advanced loading

外部 API から直接データを取りたいときや、コンポーネントのように[[serialization|シリアライズ]]できないものを返したいときは、`+page.server.js` ではなく `+page.js` で `load` を export する。サーバ側の `load` を server load、`+page.js` の `load` を universal load と呼ぶ。

> 両方を使用する場合は、server load の戻り値は直接ページには渡されず、universal load 関数に (data プロパティとして) 渡されます

親の `load` のデータは `await parent()` で取る。universal load は親の server load からも取れるが、server load は親の server load からしか取れない。

ページを移動すると、SvelteKit は変更があった `load` だけを呼び直す。`load` の中で `fetch(url)` を呼ぶとその URL が[[dependency|依存関係]]として登録され、`invalidate(url)` でその `load` を再実行できる。`depends('data:now')` で手動でも登録できる。`invalidateAll` は URL の依存を持たない `load` も再実行するので、`invalidate(() => true)` とは同じではない。

### Environment variables

`$env/static/private` と `$env/dynamic/private` は、`+page.server.js` などのサーバ用のモジュールと `src/lib/server` 以下でしか import できない。

## キーワード

- [[sveltekit|SvelteKit]]
- [[server-side-rendering|SSR]]
- [[client-side-rendering|CSR]]
- [[static-site-generation|SSG]]
- [[hydration|ハイドレーション]]
- [[serialization|シリアライズ]]
- [[dependency|依存関係]]
- [[props|Props]]

## 自分の理解

`+page.svelte` や `+layout.svelte` では、親の `load` が返したものすべてに [[props|Props]] からアクセスできる。これと「universal load の戻り値だけが渡される」という話を合わせると、混乱する。[SvelteKit の load 関数を図解した記事](https://qiita.com/ciscorn/items/c50ac5c98c5ef1e11a14)の図が分かりやすかった。実際に試した結果は[[sveltekit-server-load-called-twice|+page.js と +page.server.js が両方存在するページでリロードすると、+page.server.js の load 関数は 2 回呼び出される]]にまとめた。

## 関連

- [[relearning-svelte|Svelte / SvelteKit をリラーニングする]]
- [[Basic SvelteKit (Svelte Tutorial)]]
- [[sveltekit-server-load-called-twice|+page.js と +page.server.js が両方存在するページでリロードすると、+page.server.js の load 関数は 2 回呼び出される]]
