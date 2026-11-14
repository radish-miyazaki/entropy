---
title: Auth.js
aliases: [NextAuth.js]
description: Web 標準の API の上に作られた、複数の JavaScript フレームワークで使える認証ライブラリ
tags: [word, next.js, sveltekit, qwikcity]
date: 2025-02-05
---

## TL;DR

Web 標準の API の上に作られた、ランタイムに依存しない認証ライブラリ。[[nextjs|Next.js]]、[[qwik|Qwik]]、[[sveltekit|SvelteKit]]、Express などで使える。

## 仕組み

次の認証方式に対応している。

- OAuth: Google、GitHub などのプロバイダでのサインイン
- マジックリンク: メールでのサインイン
- Credentials: ユーザ名とパスワード、または外部 API での認証
- [[webauthn|WebAuthn]]: パスキー（実験的）

ユーザのデータを保存したいときは、Prisma や Drizzle ORM などのデータベースアダプタを使う。アダプタは必須ではない。

## 注意点

`next-auth@5.0.0-beta` 以降と `@auth/*` のパッケージが Auth.js のドキュメントの対象である。`next-auth@4.x.y` のドキュメントは next-auth.js.org に別にある。また、Auth.js のプロジェクトは現在 Better Auth の一部になっており、Better Auth への移行ガイドが用意されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nextauth-js|NextAuth.js]]
- [[nextauth-v4-nextjs-v14|NextAuth.js (v4) を Next.js (v14) に導入する]]

## 出典

- [Auth.js](https://authjs.dev)
- [Getting Started - Auth.js](https://authjs.dev/getting-started)
