---
title: Soft navigation
aliases: []
description: ブラウザが画面を再読み込みせず、必要な箇所だけを再レンダリングする画面遷移
tags: [word, next.js]
date: 2024-08-19
---

## TL;DR

ブラウザが画面を再読み込みせず、必要な箇所だけを再レンダリングする画面遷移。[[app-router|App Router]] では、変更された [[route-segment|Route Segment]] だけを再レンダリングする。

## なぜ必要か

画面を再読み込みしないので、一度ブラウザに確保した値を、リロードするまで保持できる。つまり、一度取得したデータをブラウザ上のキャッシュとして使える。データだけでなく、レンダリングした画面もキャッシュできる。App Router には、このように画面をキャッシュする仕組みが備わっている。

## 仕組み

[[nextjs|Next.js]] のドキュメントによると、サーバでレンダリングしたページへ移動すると、通常はページ全体を読み込み直す。そのため、状態が消え、スクロール位置が戻り、読み込みの間は操作できなくなる。Next.js は [[nextjs-link-component|<Link> コンポーネント]]によるクライアント側の遷移でこれを避ける。ページを再読み込みせず、共通のレイアウトや UI を残したまま、今のページだけを、先読みしたローディング状態か新しいページに置き換える。

`<Link>` はビューポートに入ったリンク先をバックグラウンドで先読み（プリフェッチ）しておく。クリックした時点で次のページを描画するデータがそろっているので、遷移がすぐに終わる。なお、今のドキュメントでは、この遷移を client-side transition と呼んでいる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[hard-navigation|Hard navigation]]: 画面を再読み込みする画面遷移
- [[nextjs-link-component|<Link> コンポーネント]]
- [[use-router|useRouter Hook]]
- [[client-side-router-cache|Client-side Router Cache]]

## 出典

- [Linking and Navigating - Next.js](https://nextjs.org/docs/app/getting-started/linking-and-navigating)
