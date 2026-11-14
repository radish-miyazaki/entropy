---
title: use client は境界を宣言する
aliases: []
description: use client はすべての Client Component に書くものではなく、サーバとクライアントの境界を宣言するもの
tags: [word, react]
date: 2024-08-20
---

## TL;DR

`use client` は、すべての [[client-component|Client Component]] に書くものではない。サーバで実行されるコードとクライアントで実行されるコードの「境界」を宣言するものである。

## 仕組み

> 'use client' でマークされているファイルがサーバコンポーネントからインポートされた場合、互換性のあるバンドラは当該モジュールのインポートを、サーバで実行されるコードとクライアントで実行されるコードの境界として扱います。

`use client` を宣言したファイルをルートとするサブツリー全体が、クライアント側のコードになる。そのため、必要な場所で必要に応じて宣言すればよい。

## 例

`onClick` イベントハンドラを使うコンポーネントの例。

```tsx
"use client";

export function LikeButton({ photoId }: { photoId: string }) {
  return <button onClick={() => ...}>いいね</button>;
}
```

`LikeButton` の親コンポーネントは [[react-server-component|Server Component]] である。もし親コンポーネントが Client Component なら、このコンポーネントの `use client` は不要になる。

## 自分の理解

エラーで怒られたときに初めて `use client` を書くくらいでもよい。

## 関連

- [[client-component|Client Component]]
- [[react-server-component|React Server Component]]
- [[server-vs-client-components|Server Component vs Client Component]]

## 出典

- ['use client' - React](https://ja.react.dev/reference/rsc/use-client)
