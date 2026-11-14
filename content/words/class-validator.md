---
title: class-validator
aliases: []
description: TypeScript と JavaScript 向けのバリデーションライブラリ。NestJS と相性がよい
tags: [word, javascript, typescript]
date: 2024-09-10
---

## TL;DR

[[typescript|TypeScript]] と [[javascript|JavaScript]] 向けのバリデーションライブラリ。[[nestjs|NestJS]] と相性がよい。

## 仕組み

`npm install class-validator --save` でインストールする。NestJS の組み込みの Pipe である `ValidationPipe` と組み合わせると、リクエストを簡単にバリデーションできる。使い方は [[nestjs-graphql-server|NestJS で GraphQL サーバを実装する]] で試した。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[class-transformer]]
- [[nestjs|NestJS]]

## 出典

- [class-validator - GitHub](https://github.com/typestack/class-validator)
- [Pipes - NestJS](https://docs.nestjs.com/pipes#class-validator)
