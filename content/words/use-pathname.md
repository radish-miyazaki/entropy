---
title: usePathname Hook
aliases: []
description: Next.js で、現在表示している URL のパスを文字列で取得する Hook
tags: [word, next.js]
date: 2024-08-20
---

## TL;DR

現在表示している URL の[[url-path|パス]]を `string` で取得する Hook。[[client-component|Client Component]] でしか使えない。

## 例

```tsx
import { usePathname } from "next/navigation"

const pathName = usePathname()
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[use-router|useRouter Hook]]

## 出典

- [Functions: usePathname - Next.js](https://nextjs.org/docs/app/api-reference/functions/use-pathname)
