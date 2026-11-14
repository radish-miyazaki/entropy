---
title: Don't over useState
description: 他の state から計算できる値は state にせず、useEffect で state 同士を同期しない、という useState の落とし穴を解説した記事
tags: [article, react]
date: 2024-09-04
article-authors: [Dominik Dorfmeister]
site: TkDodo's blog
published: 2020-08-29
url: https://tkdodo.eu/blog/dont-over-use-state
---

## TL;DR

- 他の state や props から計算できる値（派生した値）は state にせず、レンダリングの中で計算する。
- `useEffect` は React の外のものと同期するためのもので、React の state 同士の同期には使わない。

## 内容

「useState pitfalls」シリーズの 1 本目の記事である。

### state とは何か

React の公式ドキュメントはデータごとに「親から props で渡されるか」「時間がたっても変わらないか」「他の state や props から計算できるか」を問うよう勧めている。著者は 3 つ目の、派生した state を取り上げる。シニアの候補者のコーディング課題でも、この書き方がよく見られたという。

### 例

カテゴリ付きの項目の一覧を取得し、カテゴリで絞り込めるようにする課題である。最初の実装は `data` と `categories` の両方を state に持ち、effect で `data` から `categories` を計算して入れる。

```jsx
const [data, setData] = React.useState(null)
const [categories, setCategories] = React.useState([])

React.useEffect(() => {
  if (data) {
    setCategories(computeCategories(data))
  }
}, [data])
```

### effect で state を同期する問題

`setCategories` が使えるので、後から来た開発者が `categories` を直接書き換えられてしまい、`data` とずれる。さらに、react-query がタブのフォーカス時に再取得するなどしてデータが取り直されると、`categories` は `data` から計算した値に戻る。こうして、たまにしか起きない追いにくいバグが生まれる。

### 派生した値として計算する

著者は次のルールを示す。

> Whenever a state setter function is only used synchronously in an effect, get rid of the state!

直した実装ではレンダリング中に計算する。

```jsx
const categories = data ? computeCategories(data) : []
```

effect の数が半分になり、`categories` が `data` から作られることが明らかになる。計算方法を変えるときも `computeCategories` の 1 か所を直せばよく、信頼できる情報源が 1 つになる。

### まとめ

派生した値は state に入れない。`useMemo` は計測して計算が重いと分かってから使う。effect は外部のシステムとの同期に使い、React の state 同士の同期には使わない。

## キーワード

- [[react|React]]
- [[react-hooks|React Hooks]]
- useState
- useEffect
- useMemo

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [[Things to know about useState]]
- [[useState for one-time initializations]]
