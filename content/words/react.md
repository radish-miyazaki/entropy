---
title: React
aliases: []
description: UI を、ロジックと見た目を持つコンポーネントの組み合わせで作る JavaScript のライブラリ
tags: [word, react, javascript]
date: 2024-09-04
---

## TL;DR

UI（ユーザインタフェース）を[[react-component|コンポーネント]]の組み合わせで作る [[javascript|JavaScript]] のライブラリ。

## 仕組み

React のアプリケーションはコンポーネントでできている。コンポーネントは、独自のロジックと見た目を持つ UI の部品である。ボタンのように小さいものから、ページ全体のように大きいものまである。

React のコンポーネントは、マークアップを返す JavaScript の関数である。コンポーネントの名前は大文字で始め、HTML のタグは小文字で書く。マークアップの記法を [[jsx|JSX]] と呼ぶ。JSX は必須ではないが、ほとんどのプロジェクトが使っている。

## 例

```jsx
function MyButton() {
  return <button>I'm a button</button>
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[jsx|JSX]]
- [[react-hooks|React Hooks]]
- [[nextjs|Next.js]]
- [[react-devtools|React DevTools]]
- [[controlled-component|Controlled Component]]
- [[uncontrolled-component|Uncontrolled Component]]

## 出典

- [React](https://ja.react.dev/)
- [Quick Start - React](https://react.dev/learn)
