---
title: useRouter Hook
aliases: []
description: Next.js で、<Link> コンポーネントを使わずに画面遷移させる Hook
tags: [word, next.js]
date: 2024-08-19
---

## TL;DR

[[nextjs-link-component|<Link> コンポーネント]]を使わずに画面遷移させる Hook。[[client-component|Client Component]] でしか使えない。

## 仕組み

Next.js のドキュメントによると、`useRouter` は `next/navigation` から import し、次のメソッドを持つ。

- `push`: 指定したルートにクライアント側で遷移し、ブラウザの履歴に新しいエントリを足す
- `replace`: 履歴にエントリを足さずに遷移する
- `refresh`: 今のルートをサーバにもう一度リクエストし、Server Components を再レンダリングする。`useState` などのクライアントの状態やスクロール位置は失われない
- `prefetch`: 指定したルートを先読みし、遷移を速くする
- `back`、`forward`: ブラウザの履歴を戻る、進む

## 例

`router.push` を呼ぶと、任意の画面に遷移する。

```tsx
"use client"

import { useRouter } from "next/navigation"

export default function Page({ params, searchParams }: Props) {
  // ...
  const router = useRouter()

  return (
    <div>
      ...
      <button onClick={() => router.push("/categories")}>カテゴリー一覧へ戻る</button>
    </div>
  )
}
```

`router.back` を呼ぶと、1 つ前に表示していた画面に戻る。

```tsx
<button onClick={() => router.back()}>戻る</button>
```

## 注意点

Next.js のドキュメントでは、特別な理由がなければ `useRouter` より [[nextjs-link-component|<Link> コンポーネント]]を使うよう勧めている。また、信頼できない URL を `push` や `replace` に渡してはならない。`javascript:` の URL を渡すとページのコンテキストで実行されるので、[[xss|XSS]] の脆弱性になる。App Router では `next/router` ではなく `next/navigation` から import する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nextjs-link-component|<Link> コンポーネント]]
- [[use-pathname|usePathname Hook]]
- [[soft-navigation|Soft navigation]]

## 出典

- [Functions: useRouter - Next.js](https://nextjs.org/docs/app/api-reference/functions/use-router)
