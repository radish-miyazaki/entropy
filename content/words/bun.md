---
title: Bun
aliases: [bun]
description: ランタイム、トランスパイラ、バンドラ、パッケージマネージャ、テストランナーを一つにまとめた JavaScript のツールキット
tags: [word, javascript]
date: 2023-11-30
---

## TL;DR

[[javascript|JavaScript]] のランタイム、トランスパイラ、バンドラ、パッケージマネージャ、テストランナーを一つにまとめたオールインワンのツールキット。[[nodejs|Node.js]] や [[deno|Deno]] を置き換えることを目指している。

## なぜ必要か

JavaScript のツールは層を重ねるうちに遅く複雑になった。複数のツールを組み合わせると、同じコードを何度もパースするなど処理が重複する。Bun はこれらを一つにまとめ、既存のライブラリを生かしたまま遅さと複雑さを取り除くことを目指している。

## 仕組み

Bun が置き換えるツールは、役割ごとに次のとおりである。

### ランタイム

Node.js の代わりに動くので、`node`、`npx`、`dotenv`、`cross-env`、nodemon、pm2、`ws`、`node-fetch`、`isomorphic-fetch` が不要になる。`npx` の代わりには、5 倍速い `bunx` を使う。`.env` ファイルはデフォルトで読み込む。JavaScript エンジンには、多くのランタイムが使う V8 ではなく、Apple の WebKit のエンジンを使っている。

### トランスパイラ

`.js`、`.ts`、`.cjs`、`.mjs`、`.jsx`、`.tsx` のファイルを直接実行できる。このため、[[babel|Babel]]、`ts-node`、`ts-node-esm`、tsx が不要になる。

### バンドラ

esbuild と互換性のあるプラグイン API を提供している。このため、esbuild、webpack、Parcel、Rollup が不要になる。

### パッケージマネージャ

npm と互換性があり、`package.json` を読み取って `node_modules` に書き込む。このため、npm、Yarn、pnpm、Lerna が不要になる。

### テストランナー

[[jest|Jest]] と互換性のあるテストランナーで、[[snapshot-testing|スナップショットテスト]]、モック、コードカバレッジをサポートしている。このため、Jest や [[vitest|Vitest]]、`ts-jest` などの関連パッケージが不要になる。

## 注意点

トランスパイラは型チェックをしない。型チェックには、引き続き `tsc` を使える。

## 自分の理解

Node.js をほとんど触ったことがなかったので、必要なツールの多さに驚いた。

## 関連

- [[nodejs|Node.js]]
- [[deno|Deno]]
- [[typescript|TypeScript]]
- [[jest|Jest]]
- [[vitest|Vitest]]

## 出典

- [Bun](https://bun.sh/)
- [Bun 1.0 | Bun Blog](https://bun.sh/blog/bun-v1.0)
