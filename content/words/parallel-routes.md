---
title: Parallel Routes
aliases: []
description: Next.js の App Router で、同じレイアウトの中に 1 つ以上のページを同時に、または条件付きで表示する仕組み
tags: [word, next.js, app-router]
date: 2024-08-23
---

## TL;DR

[[nextjs|Next.js]] の [[app-router|App Router]] で、同じレイアウトの中に 1 つ以上のページを同時に、または条件付きでレンダリングするための Route の定義。

## 仕組み

ディレクトリ名の先頭に `@` を付けると、そのディレクトリは Slot になる。Slot は、親の [[layout-tsx|layout.tsx]] に `children` と同じように Props として渡される。

```tsx
export default function Layout(props: {
  children: React.ReactNode
  users: React.ReactNode // @users というフォルダ名に由来する
}) {
  return (
    <>
      {props.children}
      {props.users}
    </>
  )
}
```

Slot は、Slot をルートとしたサブツリーが、表示中の [[route-segment|Route Segment]] と一致したときに表示される。一度表示された Slot は、一致しない Route Segment に [[soft-navigation|Soft navigation]] で移っても表示され続ける。一致する Route Segment が表示されるまでの間、Slot には [[default-tsx|default.tsx]] がフォールバックの UI として表示される。

## 例

次のディレクトリ構成では、`/accounts` の画面を表示しているときに限り、`@users` Slot がレンダリングされる。

```text
layout.tsx
/@users
  default.tsx
  /accounts
    page.tsx
/accounts
  page.tsx
/photos
  page.tsx
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[intercepting-routes|Intercepting Routes]]: Parallel Routes と組み合わせると、Soft navigation でモーダルを表示できる
- [[default-tsx|default.tsx]]
- [[route-groups|Route Groups]]
- [[実践Next.js ——App Routerで進化するWebアプリ開発 第8章 Parallel RoutesとIntercepting Routesを用いたモーダル]]

## 出典

- [Parallel Routes - Next.js](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
