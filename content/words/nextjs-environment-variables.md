---
title: Next.js における環境変数
aliases: []
description: Next.js が標準で読み込む .env ファイルの種類と優先順位、NEXT_PUBLIC_ 接頭辞の有無による扱いの違い
tags: [word, next.js]
date: 2024-08-27
---

## TL;DR

[[nextjs|Next.js]] は環境変数の読み込みを標準でサポートしており、dotenv のようなライブラリは要らない。`NEXT_PUBLIC_` が付いた環境変数だけがブラウザに公開される。

## 仕組み

### 読み込むファイル

デフォルトで次のファイルを読み込む。

- `.env`: 常に読み込む
- `.env.${NODE_ENV}`: その `NODE_ENV` のときに読み込む
- `.env.local`: ローカル開発のときに常に読み込む
- `.env.${NODE_ENV}.local`: ローカル開発で、その `NODE_ENV` のときに読み込む

`NODE_ENV` には、開発モードで起動したときは `development`、本番モードで起動したときやビルド時は `production`、自動テストの実行時は `test` が入る。

### 読み込む順序

ローカルの開発モードで起動した場合は、次の順に `process.env` に設定する。

1. 環境変数
2. `.env.development.local`
3. `.env.local`
4. `.env.development`
5. `.env`

上にあるものほど優先順位が高い。すでに設定されているプロパティは上書きしない。

### NEXT_PUBLIC_ 接頭辞

`NEXT_PUBLIC_` が付いた環境変数は、値が [[javascript|JavaScript]] にバンドルされ、ブラウザからアクセスできるようになる。アナリティクスの ID など、秘匿性の低い情報に使う。値はビルド時に固定されるので、変更したら再ビルドが必要である。

`NEXT_PUBLIC_` が付かない環境変数は、秘匿性の高い情報に使う。基本はこちらを使う。

## 注意点

[[client-component|Client Component]] で `NEXT_PUBLIC_` の付かない環境変数を使おうとすると、Next.js は値を空文字に置き換える。環境変数がクライアントに漏れるのを防ぐためである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[client-component|Client Component]]

## 出典

- [Environment Variables - Next.js](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Environment Variable Load Order](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#environment-variable-load-order)
