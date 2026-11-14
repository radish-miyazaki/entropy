---
title: Deno Deploy
aliases: []
description: Deno をベースにしたサーバーレスの実行基盤
tags: [word, javascript, typescript]
date: 2024-09-11
---

## TL;DR

[[deno|Deno]] をベースにしたサーバーレスのサービス。Cloudflare Workers や AWS Lambda、Vercel のような位置づけである。

## 仕組み

Deno Deploy は、Netlify や Supabase などが提供する Edge Functions の実行基盤としても使われている。

公式ドキュメントによると、Deno Deploy は JavaScript と TypeScript のアプリケーションをクラウドで動かすサーバーレスのプラットフォームで、ビルトインの CI を備えた管理画面を提供する。アプリケーションは GitHub のリポジトリから、またはダッシュボードから直接デプロイできる。

## 注意点

公式ドキュメントでは、Deno Deploy は 2027 年 4 月に提供を終了すると告知されている。既存のアプリケーションは、それまで動き続ける。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[deno|Deno]]
- [[flaky-test|Flaky test]]: 下の発表は、Deno Deploy の開発で Flaky test に取り組んだ話である

## 出典

- [Deno Deploy](https://deno.com/deploy)
- [Deno Deploy - Deno Docs](https://docs.deno.com/deploy/)
- [Struggling with Flaky Tests](https://www.docswell.com/s/magurotuna/5MXXY2-2024-09-11-struggling-with-flaky-tests)
