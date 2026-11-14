---
title: Server Rendering Strategies
aliases: []
description: Next.js が Route 単位で自動的に切り替える、Static Rendering と Dynamic Rendering の 2 つのレンダリング方式
tags: [word, next.js]
date: 2024-08-21
---

## TL;DR

[[nextjs|Next.js]] は、Route 単位でレンダリング方式を自動で切り替える。デフォルトは Static Rendering で、条件に当てはまると Dynamic Rendering になる。

## 仕組み

### Static Rendering

デフォルトのレンダリング方式。ビルド時か [[revalidate|Revalidate]] 時にレンダリング結果をキャッシュファイルに出力し、Route のレスポンスとして返す。この成果物は [[cdn|CDN]] から配信できる。[[static-site-generation|SSG]] や [[incremental-static-regeneration|ISR]] から派生した機能である。

### Dynamic Rendering

リクエストのたびにレンダリングする。毎回評価するので、Static Rendering よりパフォーマンスは悪い。次のどれかに当てはまると、Static Rendering ではなく Dynamic Rendering になる。

1. 動的データを取得する（[[nextjs-extended-fetch|Next.js による fetch の拡張]]）
2. Dynamic Functions を使う
3. [[dynamic-routes|Dynamic Routes]] を使う

Dynamic Functions は、リクエスト時にしか分からない情報に依存する関数である。たとえば次のものがある。

- [[react-server-component|Server Component]] で `cookies()` を使う（[[cookie|Cookie]] の参照）。[[nextauth-js|NextAuth.js]] の `getServerSession` も内部で `cookies` を呼ぶので、Dynamic Functions と見なされる
- Server Component で `headers()` を使う（リクエストヘッダの参照）
- Server Component で props の `searchParams` を参照する（[[query-parameter|クエリパラメータ]]の参照）
- `unstable_noStore` を使う（キャッシュの無効化）
- `unstable_after` を使う（レスポンスの終了後に実行する処理の登録）

Dynamic Routes でも、[[generate-static-params|generateStaticParams]] を使えば SSG（ISR）ができ、Dynamic Rendering ではなくなる。

### 方式の確認

`next build` を実行すると、すべての Route がレンダリングされ、レンダリング方式が決まる。出力を見ると、どちらでレンダリングされたかが分かる。

## 自分の理解

Dynamic Routes を使うと Dynamic Rendering になることは、ドキュメントに書かれていない。Next.js 14 で実際に試して確かめた。

## 関連

- [[full-route-cache|Full Route Cache]]
- [[data-cache|Data Cache]]
- [[nextjs-extended-fetch|Next.js による fetch の拡張]]
- [[react-server-component|React Server Component]]

## 出典

- [Server Rendering Strategies - Next.js](https://nextjs.org/docs/app/building-your-application/rendering/server-components#server-rendering-strategies)
- [Switching to Dynamic Rendering - Next.js](https://nextjs.org/docs/app/building-your-application/rendering/server-components#switching-to-dynamic-rendering)
- [Dynamic Functions - Next.js](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions)
