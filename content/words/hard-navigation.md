---
title: Hard navigation
aliases: []
description: ブラウザが画面を再読み込みする画面遷移
tags: [word, next.js]
date: 2024-08-19
---

## TL;DR

ブラウザが画面を再読み込みする画面遷移。

## 仕組み

[[nextjs|Next.js]] のドキュメントによると、サーバでレンダリングされたページへの画面遷移は、従来はページ全体の読み込み（full page load）を起こす。そうなると状態が消え、スクロール位置が先頭に戻り、読み込みが終わるまで操作できなくなる。Next.js は[[nextjs-link-component|Link コンポーネント]]によるクライアントサイドの画面遷移でこれを避けている。共有のレイアウトはそのまま残し、今のページだけを新しいページに差し替える。

## 例

App Router では、複数の[[root-layout|ルートレイアウト]]を作れる。ルートレイアウトをまたいで画面遷移すると、クライアントサイドの画面遷移にはならず、ページ全体が読み込み直される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[soft-navigation|Soft navigation]]: 画面を再読み込みせず、必要な箇所だけを再レンダリングする画面遷移

## 出典

- [Linking and Navigating - Next.js](https://nextjs.org/docs/app/getting-started/linking-and-navigating)
- [layout.js - Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/layout)
