---
title: generateStaticParams
aliases: []
description: Dynamic Routes のルートをビルド時に静的に生成するための Next.js の関数
tags: [word, next.js]
date: 2024-09-18
---

## TL;DR

ビルド時にだけ実行される [[nextjs|Next.js]] の関数。[[dynamic-routes|Dynamic Routes]] で使うと、ビルド時にルートを静的に生成できる。

## 仕組み

戻り値はオブジェクトの配列で、各オブジェクトは Dynamic Routes のパスパラメータを持つ。

| ルートの例                       | 戻り値の型                                |
| -------------------------------- | ----------------------------------------- |
| `/product/[id]`                  | `{ id: string }[]`                        |
| `/products/[category]/[product]` | `{ category: string, product: string }[]` |
| `/products/[...slug]`            | `{ slug: string[] }[]`                    |

生成したルートは [[full-route-cache|Full Route Cache]] に入る。`revalidate` を指定して [[data-cache|Data Cache]] を作ると、指定した時間内は Full Route Cache が再利用され、時間を過ぎると更新される。

## 例

```tsx
// app/product/[id]/page.tsx
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }]
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  // ...
}
```

この場合、`/product/1`、`/product/2`、`/product/3` はビルド時に静的に生成される。それ以外のパスは、リクエスト時に生成される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[dynamic-routes|Dynamic Routes]]
- [[full-route-cache|Full Route Cache]]
- [[data-cache|Data Cache]]

## 出典

- [generateStaticParams - Next.js](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Incremental Static Regeneration - Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
