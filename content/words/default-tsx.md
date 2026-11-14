---
title: default.tsx
aliases: []
description: Next.js の Parallel Routes で、Slot の状態を復元できないときに表示するフォールバックのファイル
tags: [word, next.js, app-router]
date: 2024-08-21
---

## TL;DR

[[nextjs|Next.js]] の [[app-router|App Router]] で、`app` ディレクトリ内に置く特別なファイルの 1 つ。[[parallel-routes|Parallel Routes]] のために使い、Slot に表示するフォールバックの UI を定義する。

## なぜ必要か

[[soft-navigation|Soft navigation]] では、Next.js が Slot ごとに今どのページを表示しているかを覚えている。しかし、ページ全体を読み込み直す [[hard-navigation|Hard navigation]] では、この状態を復元できない。このとき、現在の URL に一致しない Slot には `default.tsx` が表示される。

## 仕組み

公式ドキュメントには、次の挙動が書かれている。

- `@team` のような名前付きの Slot で `default.tsx` がないと、エラーになる
- `children` も暗黙の Slot なので、親ページの状態を復元できないときのために `default.tsx` が要る。ない場合は 404 ページになる

## 例

以前のように 404 を返したい場合は、`notFound()` を呼ぶ `default.tsx` を置く。

```tsx
import { notFound } from "next/navigation"

export default function Default() {
  notFound()
}
```

## 注意点

拡張子は `.tsx` でなくてもよく、`.jsx` や `.js` でもよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[parallel-routes|Parallel Routes]]
- [[route-segment|Route Segment]]

## 出典

- [default.js - Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/default)
