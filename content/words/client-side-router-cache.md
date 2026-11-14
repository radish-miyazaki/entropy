---
title: Client-side Router Cache
aliases: []
description: RSC Payload をルートごとにクライアントのメモリに保持する Next.js のキャッシュ
tags: [word, next.js]
date: 2024-09-16
---

## TL;DR

[[nextjs-caching|Next.js の 4 種類のキャッシュ]]の 1 つ。[[rsc-payload|RSC Payload]] をルートごとにクライアントのメモリに保持し、ページ遷移時のサーバへのリクエストを減らす。

## なぜ必要か

ページ遷移を速くするためにある。メモリ上のキャッシュなので、ページの更新（`router.refresh`）などで消える。

## 仕組み

ページにアクセスしたときだけでなく、`<Link>` コンポーネントや `router.prefetch` によるプリフェッチでもキャッシュが作られる。プリフェッチは本番環境でのみ有効である。

キャッシュの有効期間は次のとおり。

- `prefetch` を指定しない場合: 30 秒
- `prefetch={true}` や `router.prefetch` の場合: 5 分

次の場合にキャッシュが無効になる。

1. [[server-actions|Server Actions]] の中で、[[on-demand-revalidation|On-demand Revalidation]] を実行したり、`cookies.set` や `cookies.delete` を使ったりした場合
2. `router.refresh` を呼んだ場合

## 注意点

Next.js 15 から、ページコンポーネントでは Client-side Router Cache がデフォルトで無効になった。`<Link>` や `useRouter` でページを移動しても、ページのセグメントはキャッシュから再利用されない。ブラウザの戻る・進むと、共有されるレイアウト（[[layout-tsx|layout.tsx]]、[[loading-tsx|loading.tsx]]）では引き続き再利用される。

以前と同じ動作にするには、`next.config.js` で `experimental.staleTimes` を指定する。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
}

module.exports = nextConfig
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nextjs-caching|Next.js の 4 種類のキャッシュ]]
- [[full-route-cache|Full Route Cache]]
- [[on-demand-revalidation|On-demand Revalidation]]

## 出典

- [Client-side Router Cache - Next.js](https://nextjs.org/docs/app/building-your-application/caching#client-side-router-cache)
- [Upgrading: Version 15 - Next.js](https://nextjs.org/docs/app/building-your-application/upgrading/version-15#client-side-router-cache)
- [staleTimes - Next.js](https://nextjs.org/docs/app/api-reference/next-config-js/staleTimes)
- [Prefetching - Next.js](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
- [Link の prefetch - Next.js](https://nextjs.org/docs/app/api-reference/components/link#prefetch)
