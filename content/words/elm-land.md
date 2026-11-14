---
title: Elm Land
aliases: []
description: 信頼性の高い Web アプリケーションを作るための Elm のアプリケーションフレームワーク
tags: [word, elm]
date: 2025-06-06
---

## TL;DR

信頼性の高い Web アプリケーションを作るために設計された、[[elm|Elm]] のアプリケーションフレームワーク。[[react|React]] における [[nextjs|Next.js]]、Vue における Nuxt にあたる。

## なぜ必要か

学びやすい規約、優れた開発ツール、実践的なガイド、実用的なアプリケーションを作るための資料を提供することを目標にしている。Elm に初めて触れる人にも向けたガイドがある。

## 仕組み

開発サーバとビルドツールが組み込まれていて、環境変数、npm、[[typescript|TypeScript]]、CSS ファイルを扱える。ルーティングはファイルベースで、ファイル名の規約でページと URL が結び付く。作ったアプリは SPA としてデプロイでき、Netlify や Vercel へのデプロイのガイドもある。

## 例

CLI（`elm-land`）で、プロジェクトの初期化、開発サーバの起動、ページの雛形の生成ができる。ここでは [[bun|Bun]] の `bunx` で実行している。

```sh
bunx elm-land init my-project
bunx elm-land server
bunx elm-land add page:view /sign-in
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[elm|Elm]]
- [[lamdera|Lamdera]]

## 出典

- [Elm Land](https://elm.land/)
