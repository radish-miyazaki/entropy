---
title: useRef
aliases: []
description: レンダー時に不要な値を参照するための React の Hook で、値を変えても再レンダリングは起きない
tags: [word, react]
date: 2024-09-06
---

## TL;DR

レンダー時には不要な値を参照するための [[react-hooks|React の Hook]]。

> レンダー時には不要な値を参照するための React フックです。

## なぜ必要か

React のドキュメントによると、ref は画面の見た目に影響しない値を、再レンダリングをまたいで持っておきたいときに使う。たとえば `setInterval` の ID を保存しておき、後で `clearInterval` に渡す。また、[[dom|DOM]] ノードに直接触れて、フォーカスやスクロール、再生の制御をしたいときにも使う。画面に表示するデータは [[use-state|useState]] で持ち、ref には入れない。

## 仕組み

`useRef` は初期値を受け取り、それを `current` プロパティに持つオブジェクトを返す。初回のレンダリング以降、初期値は無視され、常に同じオブジェクトが返される。

## 例

`null` を初期値にした ref を JSX の `ref` 属性に渡すと、描画後に `current` に DOM ノードが入る。ノードが画面から外れると、React は `current` を `null` に戻す。

```jsx
const inputRef = useRef(null)

function handleClick() {
  inputRef.current.focus()
}

return <input ref={inputRef} />
```

## 注意点

`current` の値を変更しても、再レンダリングは起き**ない**。

React のドキュメントによると、レンダリング中に `ref.current` を読み書きしてはいけない。コンポーネントが純粋でなくなり、動作を予測しにくくなる。読み書きはイベントハンドラや [[use-effect|useEffect]] の中で行う。例外は、初回に一度だけ値を作る初期化のパターンである。`useRef(new VideoPlayer())` のように書くと、初回しか使わない値をレンダリングのたびに作ってしまうので、`null` で初期化し、`current` が `null` のときだけ作る。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-hooks|React Hooks]]
- [[use-state|useState]]

## 出典

- [useRef – React](https://ja.react.dev/reference/react/useRef)
