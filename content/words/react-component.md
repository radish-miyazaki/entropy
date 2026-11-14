---
title: React のコンポーネント
aliases: []
description: マークアップを返す JavaScript の関数として書く、React アプリケーションの再利用できる UI の部品
tags: [word, react]
date: 2026-11-14
---

## TL;DR

[[react|React]] アプリケーションの、再利用できる UI の部品。マークアップを返す [[javascript|JavaScript]] の関数として書く。React のアプリケーションでは、UI のすべての部分がコンポーネントである。

## 仕組み

コンポーネントは普通の JavaScript の関数だが、名前を大文字で始め、[[jsx|JSX]] のマークアップを返す。React は、名前が大文字かどうかで HTML のタグ（`<section>`）とコンポーネント（`<Profile />`）を区別する。

コンポーネントは一度定義すれば、何度でも、どこででも使える。コンポーネントの中で別のコンポーネントを描画できるので、組み合わせてページ全体を作る。親のコンポーネントから子のコンポーネントへは、[[props|Props]] でデータを渡す。

## 注意点

コンポーネントの定義を、別のコンポーネントの中に入れ子にしてはいけない。とても遅くなり、バグの原因にもなる。コンポーネントはすべてトップレベルで宣言する。

```js
export default function Gallery() {
  // ...
}

// コンポーネントはトップレベルで宣言する
function Profile() {
  // ...
}
```

`return` の後のマークアップが複数行になるときは、括弧で囲む。囲まないと、`return` の次の行以降は無視される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react|React]]
- [[props|Props]]
- [[jsx|JSX]]
- [[react-hooks|React Hooks]]
- [[pure-function|純粋関数]]

## 出典

- [Your First Component – React](https://react.dev/learn/your-first-component)
