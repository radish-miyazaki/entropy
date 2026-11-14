---
title: Vercel
aliases: []
description: Web アプリケーションを構築・デプロイ・運用するためのクラウドプラットフォーム
tags: [word, フロントエンド, クラウド]
date: 2026-11-14
---

## TL;DR

Web アプリケーションを構築・デプロイ・運用するためのクラウドプラットフォーム。[[nextjs|Next.js]] を開発している会社でもある。

## なぜ必要か

公式ドキュメントによると、Git のリポジトリをつなぐだけで push のたびにデプロイされ、ブランチごとにプレビュー用の URL が作られる。Next.js は設定なしでデプロイでき、ほかにも 40 以上のフレームワークに対応している。

## 仕組み

公式ドキュメントでは、次のような機能が紹介されている。

- Functions: サーバ側のコードを必要に応じて実行する
- [[cdn|CDN]]: レスポンスを利用者の近くでキャッシュする
- Incremental Static Regeneration: サイト全体を作り直さずに、静的なページを定期的または必要なときに作り直す
- Instant Rollback: 問題が起きたとき、作り直さずに本番を以前のデプロイに戻す
- AI Gateway と AI SDK: 多数の AI モデルを 1 つのエンドポイントから呼び出す

## 例

```sh
npm i -g vercel
vercel login
vercel
```

プロンプトからアプリケーションを作る [[v0|v0]] も Vercel が提供している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nextjs|Next.js]]
- [[v0|v0]]
- [[cdn|CDN]]
- [[edge-computing|エッジコンピューティング]]

## 出典

- [Vercel Documentation](https://vercel.com/docs)
