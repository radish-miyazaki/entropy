---
title: 楽観的更新
aliases: [楽観的更新]
description: Web API へのリクエストが成功する前提で、レスポンスを待たずに先に UI を更新する手法
tags: [word, ui]
date: 2024-09-16
---

## TL;DR

Web API へのリクエストが成功する前提で、レスポンスを待たずに先に UI を更新する手法。英語では Optimistic updates と呼ぶ。

## なぜ必要か

リクエストの成否を待たずに更新するので、ユーザへのフィードバックが速い。

## 仕組み

まずリクエストが成功したと仮定して UI を更新する。実際にレスポンスが返ってきたら、その内容で UI を描画し直す。このような UI を Optimistic UI と呼ぶ。

[[react|React]] では [[use-optimistic|useOptimistic]] を使って実現する。React の公式ドキュメントによると、`useOptimistic` は Action の実行中だけ一時的な値を表示する。Action が成功して元の値が更新されると、楽観的な値と実際の値は同じ描画で一致する。Action が失敗して元の値が変わらなければ、UI は更新前の表示に戻る。サーバの結果が楽観的な予想と違うときは、サーバの結果が使われる。

## 例

React の公式ドキュメントの例を簡略化したもの。ボタンを押すとすぐに表示が変わり、`onToggle` が失敗すると元の表示に戻る。

```jsx
import { useOptimistic, startTransition } from "react"

function LikeButton({ isLiked, onToggle }) {
  const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic(isLiked)

  function handleClick() {
    startTransition(async () => {
      setOptimisticIsLiked(!optimisticIsLiked)
      await onToggle(!optimisticIsLiked)
    })
  }

  return <button onClick={handleClick}>{optimisticIsLiked ? "Unlike" : "Like"}</button>
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[use-optimistic|useOptimistic]]

## 出典

- [Optimistic Updates - TanStack Query](https://tanstack.com/query/v5/docs/framework/react/guides/optimistic-updates)
- [useOptimistic - React](https://react.dev/reference/react/useOptimistic)
