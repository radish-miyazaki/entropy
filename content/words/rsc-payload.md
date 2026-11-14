---
title: RSC Payload
aliases: []
description: レンダリングした React Server Components のツリーを、コンパクトにシリアライズしたデータ形式
tags: [word, next.js, react]
date: 2024-09-20
---

## TL;DR

レンダリングした [[react-server-component|React Server Component]] のツリーを、コンパクトにシリアライズしたデータ形式。クライアントの [[react|React]] が、ブラウザの DOM を更新するのに使う。

## 仕組み

[[nextjs|Next.js]] の公式ドキュメントによると、RSC Payload には次のものが含まれる。

- Server Component をレンダリングした結果
- Client Component を描画する位置のプレースホルダと、その JavaScript ファイルへの参照
- Server Component から Client Component に渡す props

サーバでは、Server Component を RSC Payload にレンダリングし、Client Component と RSC Payload から HTML を事前に生成する。最初の読み込みでは、クライアントは HTML で操作できないプレビューをすぐに表示し、RSC Payload で Client Component と Server Component のツリーを突き合わせ、JavaScript で Client Component を[[hydration|ハイドレーション]]する。

その後のページ遷移では、RSC Payload が事前に取得されてキャッシュされる。Client Component はサーバでレンダリングした HTML を使わず、クライアントだけで描画される。

## 例

Next.js では、[[full-route-cache|Full Route Cache]] がサーバで、[[client-side-router-cache|Client-side Router Cache]] がクライアントで、RSC Payload をキャッシュする（[[nextjs-caching|Next.js の 4 種類のキャッシュ]]）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-server-component|React Server Component]]
- [[hydration|ハイドレーション]]
- [[nextjs-caching|Next.js の 4 種類のキャッシュ]]

## 出典

- [Server and Client Components - Next.js](https://nextjs.org/docs/app/getting-started/server-and-client-components)
