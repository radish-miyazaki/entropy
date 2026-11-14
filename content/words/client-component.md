---
title: Client Component
aliases: [CC]
description: ブラウザとサーバの両方で実行される、インタラクティブな操作のための React のコンポーネント
tags: [word, react]
date: 2024-08-20
---

## TL;DR

ブラウザとサーバの両方で実行される [[react|React]] のコンポーネント。従来の [[server-side-rendering|SSR]] でレンダリングされていたコンポーネントに近いが、SSR よりも範囲を絞ってバンドルできる。

## なぜ必要か

インタラクティブな操作が必要なときに使う。[[react-server-component|React Server Component]] は[[hydration|ハイドレーション]]されないので、インタラクティブな操作を実現できない。

## 仕組み

ファイルの先頭に `use client` ディレクティブを書くと、Client Component になる。`use client` の後のコードは、インタラクションに必要な処理を含むものとして、ブラウザ向けにバンドルされて送られる。これにより、ブラウザに送る JavaScript を必要最小限に抑えられ、パフォーマンスの向上が見込める。

## 例

```tsx
"use client"

import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

## 注意点

「Client Component であれば、ファイルの先頭に `use client` がある」のではなく、`use client` は境界を宣言するものである（[[use-client-boundary|use client は境界を宣言する]]）。

Client Component から import されるコンポーネントや関連ファイルも、ブラウザ向けにバンドルされる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-server-component|React Server Component]]
- [[server-vs-client-components|Server Component vs Client Component]]
- [[use-client-boundary|use client は境界を宣言する]]
- [[hydration|ハイドレーション]]

## 出典

- ['use client' - React](https://ja.react.dev/reference/rsc/use-client)
