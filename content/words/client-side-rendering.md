---
title: クライアントサイドレンダリング
aliases: [CSR]
description: ブラウザで JavaScript を実行して DOM を書き換え、アプリケーションを描画する方式
tags: [word, web, レンダリング]
date: 2026-11-14
---

## TL;DR

ブラウザで JavaScript を実行して DOM を書き換え、アプリケーションを描画する方式。サーバで HTML を作って送るサーバサイドレンダリング（SSR）と対になる。

## なぜ必要か

ページの組み立てや更新をブラウザの中で行えるので、クライアント側のルーターでページ遷移を処理できる。web.dev の「Rendering on the Web」によると、シングルページアプリケーションでは、UI の共通部分をアプリケーションシェルとしてキャッシュし、Service Worker と組み合わせて再訪問を速くできる。

## 仕組み

web.dev の定義では、CSR はブラウザで JavaScript を使って DOM を書き換え、アプリケーションを描画することである。SSR と組み合わせる場合は、サーバで描画した HTML に、クライアントのスクリプトで状態とインタラクティブ性を加える。これを[[hydration|ハイドレーション]]という。

## 例

[[sveltekit|SvelteKit]] の公式ドキュメントによると、SvelteKit はデフォルトで、コンポーネントをまずサーバで描画して HTML として送り、ブラウザでもう一度描画してハイドレーションする。その後のページ遷移は、クライアント側のルーターが引き受ける。ページオプションで `csr = false` にすると、クライアントに JavaScript を一切送らなくなり、リンクはブラウザの通常のページ遷移になる。[[Basic SvelteKit (Svelte Tutorial)]] によると、`+page.js` は SSR のときはサーバで、CSR のときはブラウザで実行される。

## 注意点

web.dev によると、JavaScript の量を抑えて往復を減らせば、CSR でも純粋な SSR に近い性能を出せる。ただし、アプリケーションが大きくなるにつれて JavaScript が増え、INP が悪化しやすい。モバイル端末で速さを保つのも難しい。SEO の面でも、CSR は機能するが追加のテストと手間がかかることが多い。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[hydration|ハイドレーション]]
- [[server-rendering-strategies|Server Rendering Strategies]]
- [[react-server-component|React Server Component]]
- [[interaction-to-next-paint|INP]]

## 出典

- [Rendering on the Web - web.dev](https://web.dev/articles/rendering-on-the-web)
- [Page options - SvelteKit](https://svelte.dev/docs/kit/page-options)
- [[Basic SvelteKit (Svelte Tutorial)]]
- [[Advanced SvelteKit (Svelte Tutorial)]]
