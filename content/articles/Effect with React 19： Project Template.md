---
title: "Effect with React 19: Project Template"
description: React 19 と Waku のアプリで、Effect を使ってクライアントとサーバのコードを整理する方法を示す、typeonce.dev の無料のプロジェクトテンプレート
tags: [article, react, effect, waku]
date: 2025-05-30
article-authors: [Sandro Maglione]
site: typeonce.dev
published:
url: https://www.typeonce.dev/course/effect-react-19-project-template
---

## TL;DR

- React 19 のサーバコンポーネントとサーバアクションでサーバとクライアントの境界があいまいになるので、[[effect-ts|Effect]] でコードを整理する方法を示すテンプレートである。
- フレームワークには、React 19 の機能をほぼ備えた軽量な [[waku|Waku]] を使う。

## 内容

### 動機

記事によると、React 19 は [[react-server-component|サーバコンポーネント]]や[[server-actions|サーバアクション]]によって、サーバをクライアントに近づける。そのため、サーバのコードの整理のしかたは、クライアントだけのアプリでのいつものやり方とは変わる。

> Effect allows to organize a maintainable and testable codebase for both client and server

Effect を使うと、クライアントとサーバの両方で、保守しやすくテストしやすいコードにできる。クライアントとサーバのコードを分け、その境界を扱いやすくする役にも立つ。

### 構成

テンプレートは [[effect-ts|Effect]]、[[react|React]] 19、[[typescript|TypeScript]] で書かれ、GitHub のリポジトリが付いている。React 19 の機能のほとんどに対応した軽量なフレームワークで、少ない設定で Effect と React 19 の組み合わせを見せられるので、Waku を選んだとしている。内容は次の 8 つのモジュールに分かれている。

1. Project setup
2. Effect server API
3. Effect in server components
4. Client and server boundary
5. Server actions with Effect
6. Client state with Effect
7. Effect on the client
8. Effect services for web interfaces

## キーワード

- [[react|React]]
- [[effect-ts|Effect（TypeScript）]]
- [[waku|Waku]]
- [[react-server-component|React Server Components]]
- [[server-actions|Server Actions]]
- [[typescript|TypeScript]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%
