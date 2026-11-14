---
title: 静的サイト生成
aliases: [SSG]
description: ビルド時にページを静的な HTML ファイルとして生成しておくレンダリング方式
tags: [word, web, フロントエンド]
date: 2026-11-14
---

## TL;DR

ビルド時に、テンプレートとコンテンツから Web ページを静的な HTML ファイルとして生成しておく方式。リクエストごとにページを作らない。

## なぜ必要か

[Wikipedia](https://en.wikipedia.org/wiki/Static_site_generator) によると、ページが事前に作られているので、サーバの処理が単純になり、[[cdn|CDN]] から配信でき、攻撃対象も小さくなる。ドキュメントやブログのように、内容があまり変わらないサイトでよく使われる。

## 仕組み

Markdown や JSON などの入力ファイルを HTML テンプレートと組み合わせて、静的なページを生成する。動的なサイトと違い、生成したページはリクエストによって変わらない。

## 例

- Jekyll、Hugo、[[nextjs|Next.js]]、Gatsby などの静的サイトジェネレータ
- [[sveltekit|SvelteKit]] では、`export const prerender = true` でページをプリレンダリングできる。アプリ全体をプリレンダリングできるなら、adapter-static で静的な Web サーバ向けのファイルを出力できる

## 注意点

[SvelteKit のドキュメント](https://svelte.dev/docs/kit/page-options)によると、ページをプリレンダリングできるのは、どのユーザが直接アクセスしてもサーバから同じ内容を受け取る場合だけである。サーバが POST リクエストを処理する必要があるので、Form actions を持つページはプリレンダリングできない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[server-rendering-strategies|Server Rendering Strategies]]
- [[client-side-rendering|クライアントサイドレンダリング]]
- [[cdn|CDN]]
- [[sveltekit|SvelteKit]]

## 出典

- [Static site generator - Wikipedia](https://en.wikipedia.org/wiki/Static_site_generator)
- [Page options - SvelteKit](https://svelte.dev/docs/kit/page-options)
