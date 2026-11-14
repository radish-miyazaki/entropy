---
title: bun で Next.js の環境を構築する
description: bun create next-app で Next.js のプロジェクトを作り、--bun を付けて各コマンドを Bun で実行する
tags: [blog, bun, next.js]
date: 2024-08-18
draft: false
---

## TL;DR

- [[bun|Bun]] では、npm と同じように `bun create next-app` で [[nextjs|Next.js]] のプロジェクトを作れる。
- サーバの起動などを Node.js ではなく Bun で実行するには、`bun --bun run dev` のように `--bun` を付ける。

## 検証

`bun create next-app` を実行する。`bunx create-next-app` でもよい。実行すると、次の質問が順に聞かれる。

- What is your project named?: プロジェクト名
- Would you like to use TypeScript?: [[typescript|TypeScript]] を使うか
- Would you like to use ESLint?: [[eslint|ESLint]] を使うか
- Would you like to use Tailwind CSS?: Tailwind CSS を使うか
- Would you like to use `src/` directory?: `src/` ディレクトリを使うか。Yes にすると、`app` ディレクトリが `src/app` になる
- Would you like to use App Router? (recommended): [[app-router|App Router]] と Pages Router のどちらを使うか。今は App Router 一択である
- Would you like to customize the default import alias (@/\*)?: デフォルトの import alias を変えるか

すべてに答えると、インストールが始まる。各コマンドを Node.js ではなく Bun で実行するには、`--bun` を付ける。

- サーバの起動: `bun --bun run dev`
- ビルド: `bun --bun run build`
- 本番モードでのサーバの起動: `bun --bun run start`
- ESLint: `bun --bun run lint`

## 結果

`bun --bun run dev` でサーバが起動し、Next.js のウェルカムページが表示された。いつ見てもかっこいい。

## キーワード

- [[bun|Bun]]
- [[nextjs|Next.js]]
- [[typescript|TypeScript]]
- [[eslint|ESLint]]
- [[app-router|App Router]]

## 参考

- [Build an app with Next.js and Bun](https://bun.sh/guides/ecosystem/nextjs)
