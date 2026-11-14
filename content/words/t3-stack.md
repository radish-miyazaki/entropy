---
title: T3 Stack
aliases: []
description: Theo が提唱した、Next.js や TypeScript、tRPC などからなるフルスタックで型安全な Web アプリケーションの技術スタック
tags: [word, typescript, next.js, nextauth.js, prisma-orm]
date: 2024-08-29
---

## TL;DR

[Theo](https://x.com/t3dotgg) が提唱した、Web アプリケーションの技術スタック。単純さ、モジュール性、フルスタックの型安全を特徴とする。

## 仕組み

次のライブラリで構成される。

- [[nextjs|Next.js]]
- [[typescript|TypeScript]]
- [[tailwind-css|Tailwind CSS]]
- [[trpc|tRPC]]
- [[prisma-orm|Prisma ORM]] または [[drizzle|Drizzle]]
- [[nextauth-js|NextAuth.js]]

## 例

create-t3-app（CT3A）を使うと、テンプレートを簡単に作れる。

```sh
bun create t3-app@latest
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nextauth-js|NextAuth.js]]
- [[prisma-orm|Prisma ORM]]
- [[drizzle|Drizzle]]
- [[bun|Bun]]

## 出典

- [The T3 Stack - Create T3 App](https://create.t3.gg/en/introduction#the-t3-stack)
- [Create T3 App](https://create.t3.gg/)
