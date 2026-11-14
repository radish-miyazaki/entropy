---
title: HOC Pattern
aliases: []
description: コンポーネントを受け取って新しいコンポーネントを返す関数（高階コンポーネント）で、コンポーネントのロジックを再利用するパターン
tags: [word, react]
date: 2024-09-04
---

## TL;DR

高階コンポーネント（Higher-Order Component、HOC）を使って、[[react|React]] のコンポーネントのロジックを再利用するパターン。HOC は、コンポーネントを受け取って新しいコンポーネントを返す関数である。

## なぜ必要か

複数のコンポーネントが同じロジックを持つことがある。公式ドキュメントの例では、コメント一覧とブログ記事のコンポーネントが、どちらもデータソースを購読し、リスナーを登録・解除し、変更があれば state を更新している。HOC を使うと、このロジックを 1 か所で定義し、多くのコンポーネントで共有できる。

## 仕組み

HOC は React の API の一部ではなく、React のコンポーネントを組み合わせる性質から生まれたパターンである。コンポーネントが [[props|Props]] を UI に変換するのに対し、HOC はあるコンポーネントを別のコンポーネントに変換する。HOC は元のコンポーネントを書き換えず、コンテナで包んで組み合わせる。[[higher-order-function|高階関数]]と同じ考え方である。

```jsx
function withSubscription(WrappedComponent, selectData) {
  return function WithSubscription(props) {
    // データソースの購読などの共通ロジック
    return <WrappedComponent data={selectData(props)} {...props} />
  }
}
```

## 注意点

- コンポーネントの render の中で HOC を適用しない。render のたびに新しいコンポーネントの型が作られ、React はその部分木をアンマウントして作り直してしまう。HOC はコンポーネントの定義の外で適用する。
- 元のコンポーネントの static メソッドは、HOC が返すコンポーネントにコピーされない。
- `ref` は Props として渡らない。HOC で包んだコンポーネントに付けた `ref` は、一番外側のコンテナを指す。
- 公式ドキュメントでは、HOC は今の React のコードではあまり使われないとしている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[higher-order-function|高階関数]]
- [[patterns-dev|patterns.dev]]
- [[react-hooks|React Hooks]]

## 出典

- [HOC パターン - Learning Patterns](https://zenn.dev/morinokami/books/learning-patterns-1/viewer/hoc-pattern)
- [Higher-Order Components - React](https://legacy.reactjs.org/docs/higher-order-components.html)
