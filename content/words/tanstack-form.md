---
title: TanStack Form
aliases: [Tanstack Form]
description: TypeScript の型サポートが強い、フレームワークに依存しないヘッドレスなフォーム管理ライブラリ
tags: [word]
date: 2024-10-24
---

## TL;DR

Web アプリケーションのフォームを扱うためのライブラリ。[[typescript|TypeScript]] の型サポートが強く、UI を持たない（ヘッドレスな）作りで、特定のフレームワークに依存しない。

## なぜ必要か

公式ドキュメントによると、多くの Web フレームワークにはフォームを扱うための完全な仕組みがない。そのため独自のコードや機能の限られたライブラリに頼ることになり、一貫性がなくなる、性能が落ちる、開発に時間がかかる、といった問題が起きる。TanStack Form はこれを 1 つのパッケージで解決することを目指している。

## 仕組み

フレームワークごとのアダプタがあり、[[react|React]]、Vue、Angular、Solid、Svelte、Lit で使える。

## 例

公式ドキュメントの例では、フィールドごとに、同期のバリデータを `onChange` に、非同期のバリデータを `onChangeAsync` に指定している。複雑なバリデーションとエラー処理を扱うことも、ライブラリの目的に挙げられている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-hook-form|React Hook Form]]
- [[zod|Zod]]

## 出典

- [TanStack Form](https://tanstack.com/form/latest)
- [Overview - TanStack Form Docs](https://tanstack.com/form/latest/docs/overview)
