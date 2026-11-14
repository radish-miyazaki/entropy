---
title: Dynamic Routes
aliases: [Dynamic Segment]
description: Next.js の App Router で、フォルダ名を [ ] で囲んでパスパラメータに応じた画面を提供する仕組み
tags: [word, next.js, app-router]
date: 2024-08-19
---

## TL;DR

パスパラメータを持つ Route。[[nextjs|Next.js]] の [[app-router|App Router]] では、フォルダ名を `[ ]` で囲むと、パスパラメータに応じた画面を提供できる。

## 仕組み

Dynamic Segment の書き方には 3 種類ある。

### `[slug]`

[[layout-tsx|layout.tsx]] や [[page-tsx|page.tsx]] で、パスパラメータを文字列として取得できる。`app/blog/[slug]/page.tsx` の場合は次のようになる。

| URL リクエスト | params          |
| -------------- | --------------- |
| `/blog/a`      | `{ slug: 'a' }` |
| `/blog/b`      | `{ slug: 'b' }` |
| `/blog/c`      | `{ slug: 'c' }` |

### `[...slug]`（Catch-all Segment）

ネストしたパスに対応し、すべてのパスパラメータを配列として取得できる。`app/blog/[...slug]/page.tsx` の場合は次のようになる。

| URL リクエスト | params                      |
| -------------- | --------------------------- |
| `/blog/a`      | `{ slug: ['a'] }`           |
| `/blog/a/b`    | `{ slug: ['a', 'b'] }`      |
| `/blog/a/b/c`  | `{ slug: ['a', 'b', 'c'] }` |

### `[[...slug]]`（Optional Catch-all Segment）

`[...slug]` と似ているが、パスパラメータがないパスにも対応する。`app/blog/[[...slug]]/page.tsx` の場合は次のようになる。

| URL リクエスト | params                      |
| -------------- | --------------------------- |
| `/blog`        | `{}`                        |
| `/blog/a`      | `{ slug: ['a'] }`           |
| `/blog/a/b`    | `{ slug: ['a', 'b'] }`      |
| `/blog/a/b/c`  | `{ slug: ['a', 'b', 'c'] }` |

## 注意点

パスに影響を与えずにフォルダをまとめたいときは、Dynamic Routes ではなく [[route-groups|Route Groups]] を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[route-segment|Route Segment]]
- [[route-groups|Route Groups]]
- [[generate-static-params|generateStaticParams]]
- [[nextjs-link-component|<Link> コンポーネント]]

## 出典

- [Dynamic Routes - Next.js](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
