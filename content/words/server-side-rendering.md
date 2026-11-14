---
title: サーバーサイドレンダリング
aliases: [SSR]
description: ページの内容をサーバで生成し、HTML としてブラウザに返すこと
tags: [word, web, フロントエンド]
date: 2026-11-14
---

## TL;DR

ページの内容をサーバで生成すること。対になるのは、ブラウザ上の JavaScript でページを生成する[[client-side-rendering|クライアントサイドレンダリング]]（CSR）である。

## 仕組み

[SvelteKit の用語集](https://svelte.dev/docs/kit/glossary)では、SSR を「サーバでページの内容を生成すること」、CSR を「Web ブラウザで JavaScript を使ってページの内容を生成すること」と定義している。また、ビルド時にページの内容を計算して HTML を保存しておくことは、プリレンダリングと呼んで区別している。

SSR で生成した HTML はそのままでは静的なので、ブラウザで[[hydration|ハイドレーション]]してイベントハンドラを結び付け、操作できるようにする。

## 例

[[sveltekit|SvelteKit]] はデフォルトで SSR と CSR を組み合わせる。初回アクセス時は SSR した HTML と最低限の JavaScript を送ってハイドレーションし、その後のページ遷移は CSR で処理する。

[[react-server-component|React Server Components]] では、RSC Payload と[[client-component|クライアントコンポーネント]]から初期表示の HTML を作る段階が SSR にあたる。

## 注意点

SSR 中には実行されない処理がある。たとえば Svelte の `$effect` は SSR 中には動かない。また、[[runtime-css-in-js|ランタイム CSS-in-JS]] のように、SSR と組み合わせると追加の設定が必要になったり、問題が起きたりするライブラリもある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[client-side-rendering|クライアントサイドレンダリング]]
- [[hydration|ハイドレーション]]
- [[server-rendering-strategies|サーバーレンダリングの戦略]]
- [[react-server-component|React Server Components]]

## 出典

- [Glossary - SvelteKit](https://svelte.dev/docs/kit/glossary)
- [[Advanced SvelteKit (Svelte Tutorial)]]
- [[Basic Svelte (Svelte Tutorial)]]
