---
title: Next.js
aliases: []
description: Vercel が開発している、フルスタックの Web アプリケーションを作るための React のフレームワーク
tags: [word, javascript, react]
date: 2024-08-18
---

## TL;DR

[[vercel|Vercel]] が開発している [[react|React]] のフレームワーク。フルスタックの Web アプリケーションを作るために使う。

## 仕組み

UI は React のコンポーネントとして書き、Next.js がその周りのルーティング、レンダリング、データ取得、キャッシュ、ビルドの仕組みを提供する。ルーターには [[app-router|App Router]] と Pages Router の 2 つがあり、ドキュメントも分かれている。

App Router は、フォルダとファイルでルートを定義するファイルシステムベースのルーティングである。フォルダが [[url-segment|URL Segment]] に対応する [[route-segment|Route Segment]] を定め、[[page-tsx|page.tsx]] や [[layout-tsx|layout.tsx]] などのファイルがそのセグメントで表示する UI を作る。

## 例

新しいプロジェクトは次のコマンドで作れる。

```sh
npx create-next-app@latest
```

## 自分の理解

ロゴを公式から直接ダウンロードしたが、ファイルサイズがとても大きかった。

## 関連

- [[react|React]]
- [[vercel|Vercel]]
- [[app-router|App Router]]
- [[react-patterns|React Patterns]]

## 出典

- [Next.js](https://nextjs.org/)
- [Layouts and Pages - Next.js](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
