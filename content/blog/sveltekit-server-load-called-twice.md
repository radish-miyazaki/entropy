---
title: +page.js と +page.server.js が両方存在するページでリロードすると、+page.server.js の load 関数は 2 回呼び出される
description: SvelteKit で +page.js と +page.server.js を両方置いたページをリロードすると、+page.server.js の load が 2 回呼ばれた。条件を変えて試した
tags: [blog, sveltekit]
date: 2025-02-16
draft: false
---

## TL;DR

- [[sveltekit|SvelteKit]] で `+page.js` と `+page.server.js` の両方があるページをリロードすると、`+page.server.js` の `load` が 2 回呼ばれた。
- `ssr = false` にするか `+page.js` を消すと 1 回になった。HTML の生成時とハイドレーション時に 1 回ずつ呼ばれていると考えている。

## 背景

[[Advanced SvelteKit (Svelte Tutorial)|Advanced Svelte（Svelte Tutorial）を読む]]で server load と universal load の関係を読んでいて混乱してきたので、いくつか試した。

## 検証

`+page.js` と `+page.server.js` の両方に `load` があるページで、次の条件を変えてリロードし、`+page.server.js` の `load` が何回呼ばれるかを見た。

1. `export const csr = false` を定義する
2. `export const ssr = false` を定義する
3. `+page.js` を削除する

## 結果

| 条件                              | `+page.server.js` の `load` が呼ばれた回数 |
| --------------------------------- | ------------------------------------------ |
| `+page.js` と `+page.server.js`   | 2 回                                       |
| `export const csr = false` を定義 | 2 回                                       |
| `export const ssr = false` を定義 | 1 回                                       |
| `+page.js` を削除                 | 1 回                                       |

## 考察

ChatGPT と議論して、自分なりに次のように結論づけた。1 回目は HTML の生成時、2 回目は[[hydration|ハイドレーション]]時に呼ばれている。

1. 1 回目: サーバで [[html|HTML]] を生成するときに `+page.server.js` の `load` が実行され、その結果が HTML に埋め込まれる
2. 2 回目: ハイドレーション時に（サーバ上で）`+page.js` の `load` を呼ぶが、`+page.server.js` もあるので、そちらが先に実行される

[[Basic SvelteKit (Svelte Tutorial)|Basic SvelteKit（Svelte Tutorial）を読む]]にまとめたとおり、`+page.js` はページが SSR されるときはサーバで、CSR されるときはブラウザで実行される。

## キーワード

- [[sveltekit|SvelteKit]]
- [[hydration|ハイドレーション]]
- [[html|HTML]]
