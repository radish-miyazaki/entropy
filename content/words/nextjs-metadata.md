---
title: Next.js におけるメタデータ
aliases: []
description: Next.js の App Router で、page.tsx や layout.tsx から静的または動的にページのメタデータを定義する仕組み
tags: [word, next.js, app-router]
date: 2024-08-23
---

## TL;DR

[[nextjs|Next.js]] のメタデータ API を使うと、SEO の観点で重要なアプリケーションのメタデータを定義できる。[[app-router|App Router]] には、静的メタデータと動的メタデータの 2 種類がある。

## 仕組み

### 静的メタデータ

固定のメタデータ。任意の [[route-segment|Route Segment]] の [[page-tsx|page.tsx]] や [[layout-tsx|layout.tsx]] から、`metadata` オブジェクトを `export` する。

```tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Photo Share",
  description:
    "「Photo Share」は、ユーザが写真を共有し、コメントや「いいね」を通じて交流できる SNS アプリケーションです。",
}
```

### 動的メタデータ

リクエストの内容に応じて出し分けるメタデータ。[[react-server-component|React Server Component]] でのみ使える。任意の Route Segment の page.tsx や layout.tsx から、非同期関数 `generateMetadata` を `export` する。Page コンポーネントと同じように、データ取得関数を使う。

```tsx
export async function generateMetadata({ params }: Props) {
  const photo = await getPhoto(params.photoId)

  return {
    title: photo.title,
    description: photo.description,
  }
}
```

`generateMetadata` と Page コンポーネントとで同じ API を 2 回呼ぶことになるが、同じとみなせるデータ取得は 1 回にまとめられる。[[request-memoization|Request Memoization]] や [[react-cache|React.cache]] で重複を避けられる。

`generateMetadata` の第 2 引数では、親から継承したメタデータを `ResolvingMetadata` として参照できる。

```tsx
import { ResolvingMetadata } from "next"

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata) {
  const photo = await getPhoto(params.photoId)
  const { title } = await parent

  return {
    title: `投稿写真「${photo.title}」 | ${title?.absolute}`,
  }
}
```

### 評価の順番

メタデータは、ルートの Segment から現在の Segment に向かって順に評価される。たとえば `app/layout.tsx`、`app/blog/layout.tsx`、`app/blog/[slug]/page.tsx` の順である。メタデータはマージされるが、同じキーは後から評価されたもので置き換えられる。

```js
// app/layout.js
export const metadata = {
  title: "Acme",
  openGraph: {
    title: "Acme",
    description: "Acme is a...",
  },
}

// app/blog/page.js
export const metadata = {
  title: "Blog",
  openGraph: {
    title: "Blog",
  },
}

// Output:
// <title>Blog</title>
// <meta property="og:title" content="Blog" />
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[page-tsx|page.tsx]]
- [[layout-tsx|layout.tsx]]
- [[request-memoization|Request Memoization]]

## 出典

- [Metadata - Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [generateMetadata - Next.js](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
