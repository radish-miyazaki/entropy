---
title: useState
aliases: []
description: コンポーネントに state 変数を追加する React の Hook
tags: [word, react]
date: 2026-11-14
---

## TL;DR

コンポーネントに state 変数を追加する [[react|React]] の [[react-hooks|Hook]]。現在の state と、それを更新する set 関数の組を返す。

## なぜ必要か

クリックされた回数のように、レンダリングをまたいで覚えておき、変わったら画面を描き直したい値がある。`useState` の set 関数を呼ぶと、state が更新され、再レンダリングが起きる。

## 仕組み

`const [state, setState] = useState(initialState)` の形で呼ぶ。`initialState` は初回のレンダリングでだけ使われ、その後は無視される。

`initialState` に関数を渡すと、初期化関数として扱われる。初期化関数は引数を取らない[[pure-function|純粋関数]]にする。初期値の計算が重いときは、`useState(createInitialTodos())` ではなく `useState(createInitialTodos)` と関数そのものを渡すと、初回だけ実行される。

set 関数には、次の値を直接渡すこともできるし、`setAge(a => a + 1)` のように更新関数を渡すこともできる。更新関数はキューに積まれ、次のレンダリングで順に呼ばれる。

## 例

```js
function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount((c) => c + 1)}>You pressed me {count} times</button>
}
```

## 注意点

set 関数が変えるのは次のレンダリングの state だけなので、呼んだ直後に state を読んでも古い値のままである。新しい値が現在の値と `Object.is` で等しければ、再レンダリングは省かれる。そのため、オブジェクトや配列を直接書き換えてから set 関数に渡しても無視される。`{ ...obj, x: 10 }` のように新しいオブジェクトを作って渡す。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-hooks|React Hooks]]
- [[use-effect|useEffect]]
- [[use-ref|useRef]]
- [[use-action-state|useActionState]]

## 出典

- [useState - React](https://react.dev/reference/react/useState)
