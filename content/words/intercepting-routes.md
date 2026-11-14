---
title: Intercepting Routes
aliases: []
description: Next.js の App Router で、別の Route Segment の内容を、現在のページの文脈を保ったまま現在のレイアウトに表示する仕組み
tags: [word, next.js, app-router]
date: 2024-08-23
---

## TL;DR

[[nextjs|Next.js]] の [[app-router|App Router]] で、同じ階層または別の階層の [[route-segment|Route Segment]] を横取り（インターセプト）するための Route の定義。現在のページの文脈を保ったまま、別の Segment の内容を現在のレイアウトの中に表示できる。

## 仕組み

インターセプトは [[soft-navigation|Soft navigation]] のときだけ起きる。リロードは [[hard-navigation|Hard navigation]] なので、インターセプトは起きない。

どの Route Segment に一致させるかは、ディレクトリ名の先頭に付ける記号で決める。

| 規則       | インターセプトする Segment |
| ---------- | -------------------------- |
| `(.)`      | 同じ階層                   |
| `(..)`     | 1 つ上の階層               |
| `(..)(..)` | 2 つ上の階層               |
| `(...)`    | `app` ディレクトリ直下     |

## 例

[[parallel-routes|Parallel Routes]] と組み合わせると、「Soft navigation のときはモーダルで写真を表示する」といった機能を作れる。`@modal` は Parallel Routes の Slot で、Route Segment ではない。このため、`@modal` の中から `(..)` で 1 つ上の階層に一致させられる。

インターセプトしたときに表示するコンポーネントは、写真をモーダルで包む。

```jsx
// Intercepting Route
export default function PhotoModal({ params }) {
  const photo = photo.find((p) => p.id === params.id)

  return (
    <Modal>
      <Photo photo={photo} />
    </Modal>
  )
}
```

直接アクセスしたときに表示する、元の Route Segment のコンポーネントは、写真だけを表示する。

```jsx
// current Route Segment
export default function PhotoModal({ params }) {
  const photo = photo.find((p) => p.id === params.id)

  return <Photo photo={photo} />
}
```

## 自分の理解

文章で理解するより、実際のディレクトリ構成を見たほうが理解しやすい。

## 関連

- [[parallel-routes|Parallel Routes]]
- [[soft-navigation|Soft navigation]]
- [[hard-navigation|Hard navigation]]
- [[実践Next.js ——App Routerで進化するWebアプリ開発 第8章 Parallel RoutesとIntercepting Routesを用いたモーダル]]

## 出典

- [Intercepting Routes - Next.js](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
- [Intercepting Routes - Next.js（Modals）](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes#modals)
