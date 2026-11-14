---
title: Basic SvelteKit (Svelte Tutorial)
description: Svelte 公式チュートリアルの Basic SvelteKit。load 関数、ヘッダと Cookie、Form actions、API routes、$app/state、エラーとリダイレクト
tags: [article, svelte, sveltekit]
date: 2025-02-05
article-authors: []
site: Svelte
published:
url:
---

## TL;DR

- Svelte 公式チュートリアルの Basic SvelteKit。[[sveltekit|SvelteKit]] のデータの読み込み、ヘッダと [[cookie|Cookie]]、フォーム、API routes、`$app/state`、エラーとリダイレクトを扱う。
- `+page.js` の `load` は、初回アクセス時にはサーバで、ページ遷移時にはブラウザで実行される。`error` を使わずに投げたエラーのメッセージは、ユーザには公開されない。

## 内容

### Loading data

SvelteKit 2 から、`load` 関数が返すオブジェクトのトップレベルにある `Promise` は自動で `await` されなくなった。`load` から `$props` で受け取った `data` は Deep reactivity ではないので、再代入しないと再描画されない。

`+page.server.js` は常にサーバで実行される。一方、`+page.js` はページが [[server-side-rendering|SSR]] されるときはサーバで、[[client-side-rendering|CSR]] されるときはブラウザで実行される。そのため、デフォルトでは初回アクセス時にはサーバで、ページ遷移時にはブラウザで呼ばれる。

### Headers and cookies

`load`、Form actions、Hooks、API routes で使える `setHeaders` は、主に `Cache-Control` を変えるのに使う。`Set-Cookie` は `setHeaders` では設定できないので、`cookies.get` と `cookies.set` を使う。ブラウザはデフォルトで現在のパスの親を Cookie のパスにするので、アプリケーション全体で使うには `path: '/'` を明示する。`cookies.set` は内部の map も更新するので、同じリクエストの中の `cookies.get` は更新後の値を返す。

オプションは [cookie](https://github.com/jshttp/cookie#api) モジュールの `parse` と `serialize` のものに対応する。SvelteKit は `set` のデフォルトとして `httpOnly: true`、`secure: true`、`sameSite: 'lax'` を指定している。

### Forms

Form actions でバリデーションエラーを返すときは、`fail` に[[status-code|ステータスコード]]とデータを渡す。そのデータはページの [[props|Props]] の `form` で受け取れる。`fail` で包まなくても、返した値は Props で受け取れる。

```ts
return fail(422, { description: data.get("description"), error: error.message })
```

`use:enhance` を付けると、ページを再読み込みせずにブラウザ標準の POST の挙動をまねるので（[[progressive-enhancement|Progressive Enhancement]]）、トランジションで装飾できる。

### API routes

`@sveltejs/kit` の `json` を使うと JSON を簡単に返せ、`json({ id }, { status: 201 })` のように [Response コンストラクタ](https://developer.mozilla.org/ja/docs/Web/API/Response/Response)と同じオプションを渡せる。

### $app/state

[`$app/state`](https://svelte.jp/docs/kit/$app-state) は、読み取り専用の `page`、`navigating`、`updated` を提供する。以前の `$app/stores` は非推奨になった。`page` は現在のページの `url`、`params`、`data` などを持ち、内部で `$state.raw` を使っているのでリアクティブである。`navigating` はナビゲーション中だけ `from`、`to`、`type` を持つオブジェクトになり、ローディング表示に使える。`updated` はページを開いた後に新しいバージョンがデプロイされたかを表す。

### Errors and redirects

`@sveltejs/kit` の `error` で作る[想定されたエラー](https://svelte.jp/docs/kit/errors#Expected-errors)は、指定したメッセージがユーザに公開される。それ以外の[予期せぬエラー](https://svelte.jp/docs/kit/errors#Unexpected-errors)は機密情報を含むかもしれないので、メッセージもスタックトレースも公開されず、デフォルトでは `{ "message": "Internal Error" }` になる。この挙動は `handleError` フックで変えられる。

`load` 中にエラーが起きると、いちばん近い `+error.svelte` が描画される。ルートの `+layout.svelte` の `load` や `+error.svelte` の描画中のエラーでは、静的な `src/error.html` にフォールバックする。

リダイレクトには `redirect(307, "/b")` のように `redirect` を使う。`load` のほか、Form actions、API routes、`handle` フックの中でも使える。

## キーワード

- [[sveltekit|SvelteKit]]
- [[server-side-rendering|SSR]]
- [[client-side-rendering|CSR]]
- [[cookie|Cookie]]
- [[status-code|ステータスコード]]
- [[props|Props]]
- [[progressive-enhancement|Progressive Enhancement]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [[relearning-svelte|Svelte / SvelteKit をリラーニングする]]
- [[Advanced Svelte (Svelte Tutorial)]]
- [[Advanced SvelteKit (Svelte Tutorial)]]
- [SvelteKit 2 への移行 - Top-level promises are no longer awaited](https://svelte.jp/docs/kit/migrating-to-sveltekit-2#Top-level-promises-are-no-longer-awaited)
