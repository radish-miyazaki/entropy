---
title: Error Boundary
aliases: []
description: 子要素で例外が投げられたときに、フォールバックの UI を表示する React の仕組み
tags: [word, react]
date: 2024-08-21
---

## TL;DR

子要素で例外が投げられたときに、フォールバックの UI を表示する [[react|React]] の仕組み。コンポーネント版の `try ... catch` のようなものである。

## 仕組み

React は Error Boundary のコンポーネントを用意していない。使うには [react-error-boundary](https://github.com/bvaughn/react-error-boundary) などのサードパーティ製ライブラリを入れるか、自分でクラスコンポーネントとして実装する。

## 例

react-error-boundary を使う場合は、次のように書く。`Page` で例外が投げられると `NotFound` が表示される。

```tsx
<ErrorBoundary fallback={<NotFound />}>
  <Page />
</ErrorBoundary>
```

自分で実装する場合は、`getDerivedStateFromError` でエラー状態に切り替え、`componentDidCatch` でエラーを記録する。

```ts
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    logErrorToMyService(error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[suspense|Suspense]]
- [[error-tsx|error.tsx]]

## 出典

- [Component – React（エラーバウンダリでレンダー中のエラーをキャッチする）](https://ja.react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
