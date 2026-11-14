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
- tRPC
- [[prisma-orm|Prisma ORM]] または [[drizzle|Drizzle]]
- [[nextauth-js|NextAuth.js]]

公式ドキュメントによると、中心になるのは Next.js と TypeScript だけで、Tailwind CSS はほぼ常に含まれる。tRPC、Prisma、NextAuth.js は、バックエンドが必要なときに足す任意の部品である。create-t3-app は選んだ部品からプロジェクトを作る。

create-t3-app は 3 つの原則（T3 Axioms）に従う。中心の技術にある具体的な問題を解決するものだけを足すこと（Solve Problems）、リスクの高い技術はリスクの低い部分で使うこと（Bleed Responsibly）、型安全を重視すること（Typesafety Isn't Optional）である。

## 例

create-t3-app（CT3A）を使うと、テンプレートを簡単に作れる。

```sh
bun create t3-app@latest
```

## 注意点

すべてを含んだテンプレートではないので、アプリケーション固有の要件に必要なライブラリは自分で足す。状態管理やデプロイの方法も決めていない。

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
