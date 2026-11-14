---
title: モノレポ
aliases: [モノレポ]
description: 複数のパッケージを 1 つのリポジトリで管理するコード管理の戦略
tags: [word, フロントエンド]
date: 2024-08-24
---

## TL;DR

複数のパッケージを 1 つのリポジトリで管理するコード管理の戦略。英語では Monorepo と書く。

## なぜ必要か

同じリポジトリ内のパッケージを互いに参照できる。また、`node_modules` を共有するので、ディスクの容量を節約できる。

## 仕組み

Web フロントエンドでは、[[npm|npm]] などのパッケージマネージャが提供する Workspace の機能で実現することが多い。

[[nextjs|Next.js]] では、設定ファイル（`next.config.js`）の `transpilePackages` にパッケージを足すと、そのパッケージを自動でトランスパイルしてバンドルできる。

## 例

[[bun|Bun]] では、npm とほとんど同じ `package.json` で Workspace を作れる。

```json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": ["packages/*"]
}
```

[[pnpm|pnpm]] では、`pnpm-workspace.yaml` を別に作る必要がある。また、Workspace 内の別のパッケージを依存に含めるには、`"workspace:*"` のような接頭辞を付ける。

## 自分の理解

Bun と npm の違いは、コマンドぐらいだと思う。pnpm の Workspace には少し苦戦したので、Bun で npm と同じように書けるのはありがたい。pnpm で書いた例は [trpc-frere-memoir](https://github.com/radish-miyazaki/trpc-frere-memoir) にある。

## 関連

- [[bun|Bun]]
- [[feature-sliced-design|Feature-Sliced Design]]

## 出典

- [workspaces | npm Docs](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [Configuring a monorepo using workspaces with Bun](https://bun.sh/guides/install/workspaces)
- [ワークスペース | pnpm](https://pnpm.io/ja/workspaces)
- [transpilePackages - Next.js](https://nextjs.org/docs/app/api-reference/next-config-js/transpilePackages)
