---
title: Convex
aliases: []
description: TypeScript を中心にデータベースとバックエンドを統合して提供する BaaS
tags: [word, baas]
date: 2025-07-01
---

## TL;DR

[[typescript|TypeScript]] を中心にした統合的なアプローチを取る BaaS。[[firebase|Firebase]] や [[supabase|Supabase]] と同じ分野のサービスである。

## なぜ必要か

アーキテクチャの構成や設計思想、ベストプラクティスまで公式に提供している。ローカルで立ち上げられるので開発しやすい。AI 駆動開発を支える機能も多く、MCP サーバや AI 向けのルールを提供している。AI エージェントを開発する基盤やベクトルストレージもある。

## 仕組み

`convex dev` を実行すると、プロジェクトの直下に `convex` ディレクトリが作られる。ここにスキーマ、クエリ、ミューテーションを書く。`convex/schema.ts` のスキーマを変えると、`convex dev` のプロセスが変更を検知して自動でマイグレーションする（Live migration）。

## 例

[[bun|Bun]] でセットアップする場合は次のようにする。

```sh
bun add convex
bunx convex dev
```

`convex dev` を実行すると、アカウントにログインするか、ローカルで実行するかを選ぶ。とりあえず試すなら「Start without an account (run Convex locally)」を選べばよい。

```sh
Welcome to Convex! Would you like to login to your account? (Use arrow keys)
❯ Start without an account (run Convex locally)
  Login or create an account
```

ローカルで動かすときは `--local` を付ける。

```sh
bunx convex dev --local
```

## 注意点

`convex/_generated` ディレクトリも Git の管理対象に含める。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[supabase|Supabase]]
- [[firebase|Firebase]]
- [[model-context-protocol|Model Context Protocol]]

## 出典

- [Convex](https://www.convex.dev/)
- [Understanding Convex](https://docs.convex.dev/understanding/)
- [The Zen of Convex](https://docs.convex.dev/understanding/zen)
- [Best Practices](https://docs.convex.dev/understanding/best-practices/)
- [Check generated code into version control](https://docs.convex.dev/understanding/best-practices/other-recommendations#check-generated-code-into-version-control)
- [Local Deployments](https://docs.convex.dev/cli/local-deployments)
- [Convex MCP Server](https://docs.convex.dev/ai#convex-mcp-server)
- [Convex AI Rules](https://docs.convex.dev/ai#convex-ai-rules)
- [AI Agents](https://docs.convex.dev/agents)
- [Convex vs. Supabase](https://www.convex.dev/compare/supabase)
- https://zenn.dev/chot/articles/582c381a80d0d1
- https://zenn.dev/ryryo/articles/a345a912206a52
- https://zenn.dev/taroosg/articles/20250609173737-3ea3f2062a8cbd
