---
title: Supabase
aliases: []
description: プロジェクトごとに PostgreSQL のデータベースを持つ、認証やストレージなどをまとめたバックエンドのプラットフォーム
tags: [word, データベース]
date: 2026-11-14
---

## TL;DR

データベースからアプリケーションのロジックまでをそろえたバックエンドのプラットフォーム。プロジェクトごとに [[postgresql|PostgreSQL]] のデータベースを持つ。

## 仕組み

[Supabase のドキュメント](https://supabase.com/docs)では、主に次の機能を挙げている。

- Database: プロジェクトごとの PostgreSQL のデータベース
- Auth: メールアドレスとパスワード、パスワードレス、OAuth などのログイン
- Storage: PostgreSQL のデータベースと統合されたファイルストレージ。アクセスポリシーを設定できる
- Realtime: データベースの変更を監視し、購読しているクライアントに配信する
- Edge Functions: ユーザの近くで動くサーバサイドの関数

Firebase Auth、Firebase Storage、Firestore からの移行ガイドも用意されている。

## 例

PostgreSQL を使っているので、[[row-level-security|Row-Level Security]] を使える。[[convex|Convex]] は、Firebase や Supabase と同じ分野のサービスである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[postgresql|PostgreSQL]]
- [[row-level-security|Row-Level Security]]
- [[convex|Convex]]

## 出典

- [Supabase Docs](https://supabase.com/docs)
