---
title: MobX
aliases: []
description: アプリケーションの状態から導けるものを自動で導く、フレームワークに依存しない状態管理ライブラリ
tags: [word, react, javascript]
date: 2025-05-30
---

## TL;DR

[[javascript|JavaScript]] の状態管理ライブラリ。「アプリケーションの状態から導けるものは、すべて自動で導くべきだ」という考え方にもとづく。

## なぜ必要か

状態はふつうの JavaScript の代入で更新でき、変更は依存しているところへ自動で伝わる。実行時に値の読み書きを追跡するので、[[react|React]] のコンポーネントは依存する値が変わったときだけ再描画される。手でメモ化したりセレクタを書いたりしなくてよい。UI フレームワークに縛られないので、状態のコードを切り離してテストしやすい。

## 仕組み

データの流れは一方向である。クリックやタイマーなどのイベントがアクションを呼び、アクションが observable な状態を更新し、その変更が状態に依存するすべてのもの（computed な値や、コンポーネントなどの副作用）に伝わる。

## 例

`makeAutoObservable` で状態とアクションを定義し、`observer` で包んだコンポーネントから使う。

```jsx
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"

const myTimer = makeAutoObservable({
  secondsPassed: 0,
  increase() {
    this.secondsPassed += 1
  },
  reset() {
    this.secondsPassed = 0
  },
})

const TimerView = observer(({ timer }) => (
  <button onClick={() => timer.reset()}>Seconds passed: {timer.secondsPassed}</button>
))
```

`TimerView` は `timer.secondsPassed` に依存していることが検出され、この値が変わったときだけ再描画される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [MobX](https://mobx.js.org/README.html)
