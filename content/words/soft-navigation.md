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

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[hard-navigation|Hard navigation]]: 画面を再読み込みする画面遷移
- [[nextjs-link-component|<Link> コンポーネント]]
- [[use-router|useRouter Hook]]
- [[client-side-router-cache|Client-side Router Cache]]
