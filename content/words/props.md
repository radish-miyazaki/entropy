---
title: Props
aliases: []
description: React で親コンポーネントが子コンポーネントに情報を渡すための引数で、読み取り専用である
tags: [word, react]
date: 2026-11-14
---

## TL;DR

[[react|React]] で、親の[[react-component|コンポーネント]]が子のコンポーネントに情報を渡すための仕組み。HTML の属性に似ているが、オブジェクト、配列、関数など任意の JavaScript の値を渡せる。

## 仕組み

親は子の [[jsx|JSX]] タグに属性を書いて Props を渡す。子のコンポーネントは関数の引数として `props` オブジェクトを 1 つ受け取るので、分割代入で読み出すことが多い。分割代入では `size = 100` のようにデフォルト値も指定できる。デフォルト値は、Props がないときと `undefined` が渡されたときだけ使われ、`null` や `0` のときは使われない。

タグの間に入れた内容は、`children` という Props で受け取れる。

## 例

```js
function Avatar({ person, size = 100 }) {
  // person と size を使う
}

export default function Profile() {
  return <Avatar person={{ name: "Lin Lanying", imageId: "1bX5QH6" }} size={100} />
}
```

## 注意点

Props はある時点の読み取り専用のスナップショットである。レンダリングのたびに新しい Props が渡されるが、コンポーネントの中で書き換えてはいけない。ユーザの操作に応じて値を変えたいときは、state を使う。

また、`function Avatar(person, size)` のように波括弧を忘れると、Props を受け取れない。コンポーネントが受け取るのは 1 つのオブジェクトである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-component|React のコンポーネント]]
- [[controlled-component|Controlled Component]]
- [[uncontrolled-component|Uncontrolled Component]]
- [[control-props-pattern|Control Props Pattern]]

## 出典

- [Passing Props to a Component – React](https://react.dev/learn/passing-props-to-a-component)
