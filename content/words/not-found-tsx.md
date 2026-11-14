---
title: not-found.tsx
aliases: []
description: Next.js の App Router で、notFound 関数が呼ばれたときに表示する 404 ページを定義する特別なファイル
tags: [word, next.js, app-router]
date: 2024-08-21
---

## TL;DR

[[app-router|App Router]] の `app` ディレクトリに置く特別なファイルの 1 つ。リソースが見つからなかったことを伝えるページ（404 ページ）を定義する。

```tsx
export default function NotFound() {
  return <div>Not Found</div>
}
```

## 仕組み

置いた [[url-segment|URL Segment]] 配下のすべての URL Segment で、`notFound` 関数が呼ばれたときに表示される。`notFound` は例外を投げ、Next.js が内部でその例外を `catch` する設計になっている。

```ts
export function notFound(): never {
  // eslint-disable-next-line no-throw-literal
  const error = new Error(NOT_FOUND_ERROR_CODE)
  ;(error as NotFoundError).digest = NOT_FOUND_ERROR_CODE
  throw error
}
```

## 例

[[page-tsx|page.tsx]] や [[layout-tsx|layout.tsx]] で Web API からデータを取得し、リソースが見つからなかったときは、慣習として `notFound` を呼ぶ。

```tsx
import { getPage } from "@/utils"
import { notFound } from "next/navigation"
import styles from "./page.module.css"

type Props = {
  params: { categoryName: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ params, searchParams }: Props) {
  const page = getPage(searchParams)
  if (page > 10) {
    notFound()
  }

  return (
    <div>
      <h1>カテゴリー別一覧画面</h1>
      {/* ... */}
    </div>
  )
}
```

## 自分の理解

拡張子は `.jsx`（`.js`）でもよい。

## 関連

- [[route-segment|Route Segment]]
- [[error-tsx|error.tsx]]
- [[loading-tsx|loading.tsx]]

## 出典

- [File Conventions: not-found.js - Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
- [Functions: notFound - Next.js](https://nextjs.org/docs/app/api-reference/functions/not-found)
