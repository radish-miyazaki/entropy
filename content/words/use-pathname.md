---
title: usePathname Hook
aliases: []
description: Next.js で、現在表示している URL のパスを文字列で取得する Hook
tags: [word, next.js]
date: 2024-08-20
---

## TL;DR

現在表示している URL の[[url-path|パス]]を `string` で取得する Hook。[[client-component|Client Component]] でしか使えない。

## 仕組み

Next.js のドキュメントによると、`usePathname` は引数を取らず、現在の URL のパスを文字列で返す。クエリ文字列は含まれない。

| URL                 | 返り値                |
| ------------------- | --------------------- |
| `/`                 | `'/'`                 |
| `/dashboard`        | `'/dashboard'`        |
| `/dashboard?v=2`    | `'/dashboard'`        |
| `/blog/hello-world` | `'/blog/hello-world'` |

Client Component でしか使えないのは意図した設計である。`usePathname` を使う Client Component は、最初の読み込みでは HTML としてレンダリングされる。別のルートに移動したときは取得し直さず、一度ダウンロードしたコンポーネントが現在の状態に合わせて再レンダリングされる。

## 例

```tsx
import { usePathname } from "next/navigation"

const pathName = usePathname()
```

ルートが変わったときに何か処理をしたいときは、`useSearchParams` と組み合わせて [[use-effect|useEffect]] の依存配列に入れる。

```tsx
"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

function ExampleClientComponent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    // ルートが変わったときの処理
  }, [pathname, searchParams])
}
```

## 注意点

Next.js のドキュメントによると、ページの移動をまたいでレイアウトの状態を保てるように、Server Component では現在の URL を読めない設計になっている。

静的に事前レンダリングするページで、`next.config` の rewrites や Proxy を使っていると、`usePathname()` で[[hydration|ハイドレーション]]の不一致が起きることがある。初期値はサーバから来るので、ルーティング後のブラウザのパスと一致しない場合がある。Pages Router から読み込んだコンポーネントでは、ルーターが初期化される前に `null` を返すことがある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[use-router|useRouter Hook]]

## 出典

- [Functions: usePathname - Next.js](https://nextjs.org/docs/app/api-reference/functions/use-pathname)
