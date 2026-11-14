---
title: SvelteKit
aliases: []
description: Svelte で Web アプリケーションを作るためのメタフレームワーク
tags: [word, svelte]
date: 2025-02-02
---

## TL;DR

[[svelte|Svelte]] のメタフレームワーク。React における [[nextjs|Next.js]]、Vue における Nuxt にあたる。

## なぜ必要か

Svelte は UI コンポーネントを書くための仕組みで、コンパイラがコンポーネントを JavaScript と CSS に変換する。Svelte だけでもページ全体を描画できるが、アプリケーションを作るにはルーティングやビルドの最適化などが別に必要になる。SvelteKit はその部分を提供する。

## 仕組み

- リンクをクリックしたときに UI を更新するルーター
- 必要最小限のコードだけを読み込むビルドの最適化
- オフライン対応と、遷移前のページのプリロード
- サーバサイドレンダリング、クライアントサイドレンダリング、ビルド時のプリレンダリングを、アプリの部分ごとに選べる設定
- 画像の最適化

開発には Svelte プラグインを入れた [[vite|Vite]] を使い、Hot Module Replacement でコードの変更がすぐにブラウザに反映される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[svelte|Svelte]]
- [[svelte-cli|Svelte CLI]]
- [[svelte-runes|Rune (Svelte)]]
- [[relearning-svelte|Svelte / SvelteKit をリラーニングする]]

## 出典

- [Introduction - SvelteKit Docs](https://svelte.dev/docs/kit/introduction)
