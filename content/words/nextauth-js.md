---
title: NextAuth.js
aliases: []
description: Next.js アプリケーション向けに開発された OSS の認証ライブラリ。現在は Auth.js になっている
tags: [word, next.js, typescript]
date: 2024-08-25
---

## TL;DR

[[nextjs|Next.js]] アプリケーション向けに開発された OSS の認証ライブラリ。[[github|GitHub]]、[[x|X]]（旧 Twitter）、Google など、多くの [[oauth-2|OAuth]] プロバイダに対応している。現在は [[authjs|Auth.js]] になっている。

## なぜ必要か

認証まわりの処理を自前で実装せずに、OAuth によるログインやメールアドレス認証を Next.js に組み込める。

## 仕組み

組み込みのプロバイダが多数用意されており、それ以外のプロバイダもカスタムプロバイダとして定義すれば使える。パスワードを使わないメールアドレス認証にも対応している。

データベースがあってもなくても使える。データベースを使わない場合は、たとえば OAuth と [[jwt|JWT]] を組み合わせてセッションを管理する。

## 例

- [[t3-stack|T3 Stack]] の構成要素の 1 つである
- 導入例: [[nextauth-v4-nextjs-v14|NextAuth.js (v4) を Next.js (v14) に導入する]]

## 注意点

現在は [[authjs|Auth.js]] に名前が変わり、Next.js だけでなく [[sveltekit|SvelteKit]] や Qwik City にも対応している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[authjs|Auth.js]]
- [[t3-stack|T3 Stack]]
- [[react-cache|React.cache]]: セッションの取得をメモ化するのに使える

## 出典

- [NextAuth.js](https://next-auth.js.org/)
- [OAuth - Built-in providers](https://next-auth.js.org/configuration/providers/oauth#built-in-providers)
- [OAuth - Using a custom provider](https://next-auth.js.org/configuration/providers/oauth#using-a-custom-provider)
