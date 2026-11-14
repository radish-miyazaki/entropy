---
title: useState for one-time initializations
description: コンポーネント内で一度だけ初期化したい値は、useMemo ではなく useState の初期化関数で作るのがよいという記事
tags: [article, react]
date: 2024-09-04
article-authors: []
site: TkDodo's blog
published:
url: https://tkdodo.eu/blog/use-state-for-one-time-initializations
---

## TL;DR

- コンポーネント内で一度だけ初期化したい値は、[[use-state|useState]] の初期化関数で作る。
- useMemo はパフォーマンス最適化のためのもので、キャッシュが保たれる保証がない。

## 内容

### 素朴に書くと再レンダリングのたびに初期化される

コンポーネント内で一度だけ初期化したい値を、次のように書くことが考えられる。

```tsx
const Component = () => {
  const resource = new Resource()
  return (
    <ResourceProvider resource={resource}>
      <App />
    </ResourceProvider>
  )
}
```

しかし、この書き方ではコンポーネントが再レンダリングされるたびに `Resource` が作り直される。

### useMemo は確実な方法ではない

`useMemo` を使い、空の依存配列 `[]` で値をメモ化する方法も考えられる。

```jsx
const Component = () => {
  const resource = React.useMemo(() => new Resource(), [])
  return (
    <ResourceProvider resource={resource}>
      <App />
    </ResourceProvider>
  )
}
```

`useMemo` は依存配列に基づいて値をキャッシュする。ただし、[React の公式ドキュメント](https://ja.react.dev/reference/react/useMemo#caveats)によると、`useMemo` はパフォーマンス最適化のためのものなので、キャッシュが保たれる保証はない。

> 将来的には、キャッシュが破棄されることを前提とした機能が React に追加される可能性があります。例えば、将来的に仮想リストが組み込みでサポートされた場合、仮想テーブルのビューポートからスクロールアウトした項目は、キャッシュを破棄するようになるかもしれません。このような挙動は、パフォーマンス最適化のみを目的として useMemo を使っている場合には問題ありません。しかし、他の目的で利用している場合は、state 変数 や ref を利用した方が良いかもしれません。

### useState の初期化関数を使う

`useState` に初期化関数を渡すと、その関数は最初のレンダリングで一度だけ実行され、その後のレンダリングでは評価されない。そのため、初期化時に一度だけ実行したい処理に向いている。

```jsx
const Component = () => {
  const [resource] = React.useState(() => new Resource())
  return (
    <ResourceProvider resource={resource}>
      <App />
    </ResourceProvider>
  )
}
```

[[use-ref|useRef]] でも同じように再生成を防げるが、コードが冗長になる。

```jsx
const Component = () => {
  const resource = React.useRef(null)
  if (!resource.current) {
    resource.current = new Resource()
  }
  return (
    <ResourceProvider resource={resource.current}>
      <App />
    </ResourceProvider>
  )
}
```

## キーワード

- [[react|React]]
- [[react-hooks|React Hooks]]
- [[use-state|useState]]
- useMemo
- [[use-ref|useRef]]

## 自分の理解

React の公式ドキュメントにも、[初期 state の再生成を避ける](https://ja.react.dev/reference/react/useState#avoiding-recreating-the-initial-state)という項目で、まったく同じ状況の参考コードがあった。

```tsx
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos)
  // ...
}
```

## 関連

- [[Don't over useState]]
- [[Things to know about useState]]
