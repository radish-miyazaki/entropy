---
title: nuqs
aliases: []
description: クエリパラメータで状態を管理する Next.js 向けのライブラリ
tags: [word, next.js]
date: 2024-08-21
---

## TL;DR

[[query-parameter|クエリパラメータ]]で状態を管理するライブラリ。[[client-component|Client Component]] と [[react-server-component|Server Component]] の両方に対応している。

## 仕組み

公式サイトでは「React 向けの型安全な検索パラメータの状態管理ライブラリ」と紹介されている。React の `useState` に似た API で、状態を URL と同期させる。よく使う型のパーサとシリアライザが組み込まれていて、自分で作ることもできる。複数のキーは `useQueryStates` でまとめて扱える。

更新はデフォルトでクライアントだけの浅い更新になり、必要なときだけサーバに通知して Server Component を描画し直せる。履歴を置き換えるか積むかも選べるので、積む設定にすればブラウザの戻るボタンで状態の変化をたどれる。

nuqs 2 は、[[nextjs|Next.js]] 14.2.0 以降（App Router と Pages Router）、React の SPA、Remix、React Router、TanStack Router に対応している。

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
- [nuqs](https://nuqs.dev/)
- [Installation - nuqs](https://nuqs.dev/docs)
- https://zenn.dev/rehabforjapan/articles/83782ae386c9db
