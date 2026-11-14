---
title: template.tsx
aliases: []
description: Next.js の App Router で、配下の URL Segment に共通の UI を、ページ遷移のたびに作り直して適用する特別なファイル
tags: [word, next.js, app-router]
date: 2024-08-21
---

## TL;DR

[[nextjs|Next.js]] の [[app-router|App Router]] で、`app` ディレクトリ内に置く特別なファイルの 1 つ。置いた [[url-segment|URL Segment]] 配下のすべての URL Segment に、共通の UI を適用する。

## なぜ必要か

公式ドキュメントによると、ページ遷移のたびに [[use-effect|useEffect]] を再同期したいときや、入力欄のような [[client-component|Client Component]] の状態を遷移ごとにリセットしたいときに使う。layout の中の [[suspense|Suspense]] 境界は最初の読み込みでしかフォールバックを出さないが、template の中ならページ遷移のたびに出す。

## 仕組み

[[layout-tsx|layout.tsx]] と違い、ページ遷移の間で状態を保持しない。遷移するたびに再レンダリングされる。

公式ドキュメントによると、template には固有の key が与えられ、自分のセグメント（動的パラメータを含む）が変わると再マウントされる。それより深いセグメントの遷移では上位の template は再マウントされず、検索パラメータが変わっても再マウントされない。再マウントすると、中の Client Component の状態はリセットされ、useEffect は再同期され、DOM は作り直される。デフォルトでは Server Component である。

入れ子の位置は layout とその子の間である。同じセグメントの `error.js`、`loading.js`、`not-found.js`、`page.js` を包むが、`layout.js` は包まない。Next.js 13.0.0 で導入された。

## 例

```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

## 注意点

拡張子は `.tsx` でなくてもよく、`.jsx` や `.js` でもよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[route-segment|Route Segment]]
- [[layout-tsx|layout.tsx]]

## 出典

- [template.js - Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/template)
