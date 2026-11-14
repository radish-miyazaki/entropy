---
title: global-error.tsx
aliases: []
description: Next.js の App Router で、error.tsx が扱わなかった例外を受け止めてエラー画面を表示する、app 直下のファイル
tags: [word, next.js, app-router]
date: 2024-08-21
---

## TL;DR

[[nextjs|Next.js]] の [[app-router|App Router]] で、`app/` ディレクトリ直下に置くファイル。[[error-tsx|error.tsx]] で扱われなかった例外が起きたときに、エラーを伝える UI を表示する。

## 仕組み

[[error-tsx|error.tsx]] と同じく、例外が起きたときにエラーを伝える UI を提供する。アプリケーション全体を置き換えて表示されるので、`<html>` と `<body>` を自分で持つ必要がある。また、[[client-component|Client Component]] として定義する必要がある。

## 例

```tsx
"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```

## 注意点

本番環境でしか動かない。開発環境では、代わりに Next.js のエラーオーバーレイが表示される。

> global-error.js is only enabled in production. In development, our error overlay will show instead.

拡張子は `.tsx` でなくてもよく、`.jsx` や `.js` でもよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[error-tsx|error.tsx]]
- [[route-segment|Route Segment]]
- [[error-boundary|Error Boundary]]

## 出典

- [error.js - Next.js（global-error.js）](https://nextjs.org/docs/app/api-reference/file-conventions/error#global-errorjs)
