---
title: Suspense
aliases: []
description: 子要素の読み込みが終わるまで、代わりにフォールバックの UI を表示する React のコンポーネント
tags: [word, react]
date: 2024-08-21
---

## TL;DR

子要素の読み込みが終わるまで、代わりにフォールバックの UI を表示する [[react|React]] のコンポーネント。

## なぜ必要か

コンポーネントツリーの一部がまだ表示できる状態にないとき、その部分だけ読み込み中の UI を出したい。`<Suspense>` を使うと、読み込み中の UI をフォールバックとして宣言的に指定できる。

## 仕組み

`<Suspense>` で囲んだ子要素が読み込みを終えるまでは、`fallback` に渡した要素が表示される。読み込みが終わると、子要素に切り替わる。

## 例

`Comments` の読み込み中は、読み込み中を表す `Spinner` コンポーネントが表示される。

```tsx
<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
```

[[nextjs|Next.js]] の [[app-router|App Router]] では、SSR でも [[react-server-component|React Server Component]] でも `Suspense` を使える。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[error-boundary|Error Boundary]]: 子要素で例外が投げられたときにフォールバックの UI を表示する
- [[loading-tsx|loading.tsx]]

## 出典

- [<Suspense> – React](https://ja.react.dev/reference/react/Suspense)
