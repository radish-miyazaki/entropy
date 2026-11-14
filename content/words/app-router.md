---
title: App Router
aliases: []
description: Next.js の、app ディレクトリのフォルダとファイルでルートを定義するルーター。Server Components や Suspense など React の新しい機能を使う
tags: [word, nextjs, react]
date: 2026-11-14
---

## TL;DR

[[nextjs|Next.js]] の、ファイルシステムに基づくルーター。`app` ディレクトリのフォルダとファイルでルートを定義し、[[react-server-component|Server Components]]、[[suspense|Suspense]]、Server Functions など React の新しい機能を使う。

## なぜ必要か

Next.js のルーターには、App Router と Pages Router（`pages` ディレクトリ）の 2 つがあり、ドキュメントも分かれている。App Router では、レイアウト、読み込み中の UI、エラー時の UI などを決まった名前のファイルとして置くだけで、React の仕組みに組み込める。`create-next-app` でも App Router を使うかを最初に聞かれ、推奨されている。

## 仕組み

`app` ディレクトリのフォルダが [[url-segment|URL Segment]] を定め、フォルダを入れ子にするとセグメントも入れ子になる。ルートが公開されるのは、そのフォルダに [[page-tsx|page]] か [[route-ts|route]] のファイルがあるときだけである。そのため、ルートのフォルダにほかのファイルを置いても、誤ってルーティングされない（[[colocation|コロケーション]]）。

特別なファイルには、[[layout-tsx|layout]]、[[page-tsx|page]]、[[loading-tsx|loading]]、[[not-found-tsx|not-found]]、[[error-tsx|error]]、[[global-error-tsx|global-error]]、[[route-ts|route]]、[[template-tsx|template]]、[[default-tsx|default]] がある。これらは layout、template、error（[[error-boundary|Error Boundary]]）、loading（Suspense の境界）、not-found、page の順に入れ子でレンダリングされ、子のセグメントは親のセグメントの中に入る。

フォルダ名の書き方でも挙動を変えられる。

- `[slug]`: パスパラメータを持つ [[dynamic-routes|Dynamic Routes]]
- `(group)`: URL に影響させずにルートをまとめる [[route-groups|Route Groups]]
- `_folder`: ルーティングの対象から外す Private Folder
- `@slot`: [[parallel-routes|Parallel Routes]] の名前付きスロット
- `(.)folder` など: 別のルートを今のレイアウトの中に表示する [[intercepting-routes|Intercepting Routes]]

## 例

| パス                       | URL             |
| -------------------------- | --------------- |
| `app/layout.tsx`           | 全ルートを包む  |
| `app/page.tsx`             | `/`             |
| `app/blog/page.tsx`        | `/blog`         |
| `app/blog/[slug]/page.tsx` | `/blog/my-post` |
| `app/(shop)/cart/page.tsx` | `/cart`         |

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nextjs|Next.js]]
- [[route-segment|Route Segment]]
- [[root-layout|Root Layout]]
- [[route-handler|Route Handler]]
- [[react-server-component|React Server Component]]

## 出典

- [App Router - Next.js](https://nextjs.org/docs/app)
- [Project structure and organization - Next.js](https://nextjs.org/docs/app/getting-started/project-structure)
- [[bun-nextjs-setup|bun で Next.js の環境を構築する]]
