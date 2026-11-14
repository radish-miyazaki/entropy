---
title: Things to know about useState
description: React の useState について、関数による更新、遅延初期化、更新のスキップ、TypeScript のオーバーロード、内部実装の 5 点を解説した記事
tags: [article, react]
date: 2024-09-04
article-authors: [TkDodo]
site: TkDodo's blog
published: 2021-02-13
url: https://tkdodo.eu/blog/things-to-know-about-use-state
---

## TL;DR

- [[react|React]] の useState には、関数による更新、遅延初期化、同じ値での再レンダリングのスキップという、見落とされがちな挙動がある。
- TypeScript では `useState<number>()` のオーバーロードが使え、内部では useReducer をもとに実装されている。

## 内容

### 1. 関数による更新

setter には新しい値の代わりに、前の値を受け取る関数を渡せる（`setCount(prev => prev + 1)`）。setter は値をすぐに変えず、更新を予約するだけである。そのため、1 つのハンドラで `setCount(count + 1)` を 2 回呼んでも、どちらも同じ `count` を参照するので 1 しか増えない。前の状態から次の状態を計算するときは、関数で更新する。

関数で更新すれば、useCallback の依存配列から `count` を外せるので、関数の参照が変わらなくなる。真偽値の切り替えは、`useReducer(previous => !previous, true)` と書くと、名前の付いた toggle 関数として再利用できる。

### 2. 遅延初期化

useState に値を渡すと、使われるのは最初のレンダリングだけなのに、その式はレンダリングのたびに評価される。`useState(() => calculateExpensiveInitialValue(props))` のように関数を渡せば、マウント時に一度だけ実行される。初期値の計算が重いときにだけ意味がある。

### 3. 更新のスキップ

新しい状態が今の状態と同じなら、React は再レンダリングをスキップする。比較には `Object.is` を使う。

### 4. TypeScript の便利なオーバーロード

`useState(undefined)` と書くと型が `undefined` と推論されて役に立たない。`useState<number>()` と書けば、型に `undefined` が加わり、実行時の値も `undefined` になる。`null` が必要なときだけ `useState<number | null>(null)` と書く。

### 5. 実装の詳細

useState は内部では useReducer をもとに実装されている。著者によると、5 つのうち最初の 3 つは React 公式ドキュメントの Hooks API Reference に書かれている。

## キーワード

- [[react|React]]
- [[react-hooks|React Hooks]]
- useState
- useReducer

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [[Don't over useState]]
- [[useState for one-time initializations]]
