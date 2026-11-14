---
title: Full Route Cache
aliases: []
description: 静的にレンダリングするルートの RSC Payload と HTML を、ビルド時にサーバでキャッシュする Next.js のキャッシュ
tags: [word, next.js]
date: 2024-09-16
---

## TL;DR

[[nextjs-caching|Next.js の 4 種類のキャッシュ]]の 1 つ。ビルド時または [[revalidate|Revalidate]] 時に、静的レンダリングするルートの [[rsc-payload|RSC Payload]] と HTML を自動でレンダリングし、その結果をキャッシュする。

## なぜ必要か

レンダリングのコストを減らし、パフォーマンスを上げるためにある。リクエストのたびにレンダリングせず、事前に生成した RSC Payload と HTML を使うので、応答が速くなる。

## 仕組み

### レンダリングの流れ

サーバでは、まず [[react|React]] が [[react-server-component|React Server Component]] を RSC Payload に変換する。次に [[nextjs|Next.js]] が、RSC Payload と [[client-component|Client Component]] の JavaScript を使って HTML を生成する。

クライアントでは、HTML を初期表示に使う。RSC Payload は差分の検出と DOM の更新に使う。最後に Client Component を[[hydration|ハイドレーション]]し、アプリケーションを操作できる状態にする。

### Revalidate と無効化

キャッシュは永続的に保持されるが、次のどちらかで Revalidate できる。

1. [[data-cache|Data Cache]] を Revalidate する。サーバ上のコンポーネントが再レンダリングされ、新しい結果が出力される
2. 再デプロイする

次のどれかに当てはまるルートは、Full Route Cache の対象外になる。

- Dynamic Functions を使っている
- [[route-segment-config|Route Segment Config]] で動的レンダリングを指定している
- Data Cache が無効な `fetch` がある

```ts
export const dynamic = "force-dynamic"
// または
export const revalidate = 0
```

> If a route has a fetch request that is not cached, this will opt the route out of the Full Route Cache.

## 注意点

Next.js 15 から Data Cache がデフォルトで無効になった。そのため、以前よりもキャッシュされる条件が厳しくなっている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nextjs-caching|Next.js の 4 種類のキャッシュ]]
- [[data-cache|Data Cache]]
- [[client-side-router-cache|Client-side Router Cache]]
- [[generate-static-params|generateStaticParams]]

## 出典

- [Full Route Cache - Next.js](https://nextjs.org/docs/app/building-your-application/caching#full-route-cache)
