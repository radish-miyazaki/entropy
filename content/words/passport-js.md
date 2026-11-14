---
title: Passport.js
aliases: []
description: Node.js 向けの認証ミドルウェア。認証の方式は Strategy と呼ばれる拡張機能で選ぶ
tags: [word, javascript, typescript, nodejs]
date: 2024-09-06
---

## TL;DR

[[nodejs|Node.js]] 向けの認証ライブラリ（ミドルウェア）。どのような認証を行うかは、Strategy と呼ばれる拡張機能で選ぶ。

## 仕組み

Passport.js 自体は認証の枠組みだけを提供し、具体的な認証の処理は Strategy に任せる。Strategy にはパスワード認証（passport-local）、[[oauth|OAuth]]、OpenID などがあり、公式サイトでは 500 を超える Strategy が公開されている。Express ベースの Web アプリケーションであれば、既存のコードをほとんど変えずに組み込める。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nestjs-passport-jwt|NestJS と Passport.js を組み合わせて JWT 認証を実現する]]
- [[jwt|JWT]]

## 出典

- [Passport.js](https://www.passportjs.org/)
- [Strategies - Passport.js](https://www.passportjs.org/packages/)
