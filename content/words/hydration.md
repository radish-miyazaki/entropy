---
title: ハイドレーション
aliases: []
description: SSR などで生成した静的な HTML の DOM にイベントハンドラを結び付け、インタラクティブにするプロセス
tags: [word, react]
date: 2024-08-20
---

## TL;DR

[[server-side-rendering|SSR]] などで生成した静的な HTML の DOM にイベントハンドラを結び付け、動的にするプロセス。これにより UI がインタラクティブになる。

## 仕組み

Hydration は「水分補給」という意味で、名前は次のたとえに由来する。

> Hydration とは、先ほど述べたとおり水分補給という意味で、まるで乾いた HTML に、インタラクティブ性という「水」を与えるようなものです。

## 例

[[react|React]] では、`react-dom/client` の `hydrateRoot` を使う。React の公式ドキュメントによると、`hydrateRoot` は `react-dom/server` で生成した HTML にコンポーネントのロジックを「アタッチ」し、その中の DOM の管理を引き継ぐ。これで、サーバから届いた最初の HTML が、ブラウザで動く完全にインタラクティブなアプリケーションになる。

```js
import { hydrateRoot } from "react-dom/client"
import App from "./App.js"

hydrateRoot(document.getElementById("root"), <App />)
```

## 注意点

`hydrateRoot` は、クライアントで描画した結果がサーバで描画した内容と同じであることを前提にしている。公式ドキュメントは、食い違い（ハイドレーションのミスマッチ）をバグとして直すよう求めている。原因には、描画中に `typeof window !== 'undefined'` で分岐すること、`window.matchMedia` のようなブラウザ専用の API を使うこと、サーバとクライアントで違うデータを描画することなどがある。サーバで描画した HTML がないときは、`hydrateRoot` ではなく `createRoot` を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[client-component|Client Component]]
- [[react-server-component|React Server Component]]

## 出典

- [Hydration (web development) - Wikipedia](<https://en.wikipedia.org/wiki/Hydration_(web_development)>)
- https://zenn.dev/ak/articles/dd60f8b1712628
- [hydrateRoot - React](https://react.dev/reference/react-dom/client/hydrateRoot)
