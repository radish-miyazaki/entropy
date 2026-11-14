---
title: nuqs
aliases: []
description: クエリパラメータで状態を管理する Next.js 向けのライブラリ
tags: [word, next.js]
date: 2024-08-21
---

## TL;DR

[[query-parameter|クエリパラメータ]]で状態を管理するライブラリ。[[client-component|Client Component]] と [[react-server-component|Server Component]] の両方に対応している。

## 例

Client Component で使う例。

```tsx
"use client"

import { parseAsInteger, useQueryState } from "nuqs"

export function Demo() {
  const [hello, setHello] = useQueryState("hello", { defaultValue: "" })
  const [count, setCount] = useQueryState("count", parseAsInteger.withDefault(0))
  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <input
        value={hello}
        placeholder="Enter your name"
        onChange={(e) => setHello(e.target.value || null)}
      />
      <p>Hello, {hello || "anonymous visitor"}!</p>
    </>
  )
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[query-parameter|クエリパラメータ]]
- [[nextjs|Next.js]]

## 出典

- [nuqs](https://nuqs.47ng.com/)
- https://zenn.dev/rehabforjapan/articles/83782ae386c9db
