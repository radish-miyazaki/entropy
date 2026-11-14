---
title: Hono
aliases: []
description: Web 標準の API の上に作られた、小さく高速で、多くのランタイムで動く Web フレームワーク
tags: [word, typescript, web]
date: 2026-11-14
---

## TL;DR

Web 標準の API の上に作られた、小さく高速な Web フレームワーク。名前は日本語の「炎」に由来する。Cloudflare Workers、[[deno|Deno]]、[[bun|Bun]]、AWS Lambda、Node.js など、多くのランタイムで同じコードが動く。

## なぜ必要か

ランタイム固有の API ではなく Web 標準の API を使うので、同じアプリケーションを複数のプラットフォームで動かせる。Node.js ではアダプタを通して動く。

## 仕組み

- 高速: `RegExpRouter` は線形のループを使わずにルートを照合する
- 軽量: `hono/tiny` のプリセットは 14 kB 未満で、依存パッケージがない
- 機能がそろっている: 認証、CORS、圧縮、ログ、JWT などのミドルウェアとヘルパーが組み込まれている
- 開発体験: [[typescript|TypeScript]] で書かれていて、パスパラメータにリテラル型が付く。Validator と Hono Client（`hc`）を使うと、API の仕様をクライアントと共有する [[rpc|RPC]] モードで、型安全なアプリケーションを作れる

Web API、バックエンドサーバのプロキシ、CDN のフロント、エッジのアプリケーション、フルスタックのアプリケーションなどに使える。Express に似ているが、フロントエンドの層は持たない。

## 例

`npm create hono@latest` でプロジェクトを作れる。

```ts
import { Hono } from "hono"
const app = new Hono()

app.get("/", (c) => c.text("Hono!"))

export default app
```

[[bhvr|bhvr]] は Bun、Hono、Vite、React を組み合わせた構成である。[[pylon|Pylon]] は、内部の Web フレームワークに Hono を使っている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[bhvr|bhvr]]
- [[pylon|Pylon]]

## 出典

- [Hono - Web framework built on Web Standards](https://hono.dev/docs/)
