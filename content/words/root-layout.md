---
title: Root Layout
aliases: []
description: Next.js の App Router で app ディレクトリ直下に置く、html と body を含む最上位の layout.tsx
tags: [word, next.js]
date: 2024-08-19
---

## TL;DR

[[app-router|App Router]] の `app` ディレクトリ直下に置く [[layout-tsx|layout.tsx]]。すべての [[url-segment|URL Segment]] に適用される最上位の Layout で、`<html>` と `<body>` を含む。

## 例

[[page-tsx|page.tsx]] と同じく、`export default` する必要がある。

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <div className={styles.container}>
          <Header />
        </div>
        <div className={styles.content}>
          <Nav />
          <main className={styles.main}>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
```

## 注意点

公式ドキュメントによると、`app` ディレクトリには Root Layout が必ず必要で、Root Layout は `<html>` と `<body>` のタグを定義しなければならない。`<title>` や `<meta>` などの `<head>` のタグは手で足さず、[[nextjs-metadata|Metadata API]] を使う。Metadata API は、ストリーミングや `<head>` の要素の重複の除去などを自動で扱う。

Root Layout は複数作れる。上に `layout.js` を持たない Layout は、すべて Root Layout になる。[[route-groups|Route Groups]] で `app/(shop)/layout.js` と `app/(marketing)/layout.js` を作る方法や、`app/layout.js` を置かずにサブディレクトリごとに Layout を置く方法がある。ただし、異なる Root Layout をまたいで移動すると、クライアント側の遷移ではなく、ページ全体の読み込みが起きる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[layout-tsx|layout.tsx]]
- [[page-tsx|page.tsx]]

## 出典

- [layout.js - Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/layout)
- [Root Layout - Next.js](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#root-layout-required)
