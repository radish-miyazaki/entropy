---
title: next/script
aliases: []
description: Next.js でサードパーティのスクリプトを読み込むための Script コンポーネント
tags: [word, next.js]
date: 2024-09-19
---

## TL;DR

[[nextjs|Next.js]] で、アクセス解析などのサードパーティのスクリプトを読み込むときに使う `<Script>` コンポーネント。

## 仕組み

`<Script>` を置く場所によって、スクリプトを読み込む範囲が変わる。

### Layout Script

特定のルートでだけスクリプトを読み込む。`<Script>` を置いた [[layout-tsx|layout.tsx]] の配下にあるルートでも読み込まれる。ただし、ユーザがそのレイアウト内の複数のルートを移動しても、読み込みは 1 回だけである。

```tsx
// app/dashboard/layout.tsx
import Script from "next/script"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section>{children}</section>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```

### Application Script

すべてのルートでスクリプトを読み込む。[[root-layout|Root Layout]] に `<Script>` を置く。ユーザが複数のページを移動しても、読み込みは 1 回だけである。

## 注意点

パフォーマンスへの不要な影響を抑えるため、サードパーティのスクリプトは特定のページやレイアウトでだけ読み込むほうがよい。Application Script はなるべく避ける。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nextjs-image|next/image]]
- [[nextjs-font|next/font]]
- [[root-layout|Root Layout]]

## 出典

- [Script Optimization - Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/scripts)
- [Script Component - Next.js](https://nextjs.org/docs/app/api-reference/components/script)
