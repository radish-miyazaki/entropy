---
title: typescript-eslint
aliases: []
description: ESLint で TypeScript を扱えるようにし、型情報を使うルールも加えるツール群
tags: [word, typescript, linter]
date: 2026-11-14
---

## TL;DR

[[eslint|ESLint]] などの JavaScript のツールで [[typescript|TypeScript]] を扱えるようにするツール群。TypeScript 向けのリントルールを追加し、その多くは型の情報を使ってコードを解析する。

## なぜ必要か

TypeScript は JavaScript に型の構文を追加した言語なので、JavaScript 向けのツールはそのままでは読めない。公式サイトによると、typescript-eslint は ESLint のようなツールが TypeScript の新しい構文を扱えるようにするために必要である。さらに、TypeScript の型 API を使うので、ESLint だけでは書けない強力なルールを提供できる。

## 仕組み

`eslint`、`@eslint/js`、`typescript`、`typescript-eslint` をインストールし、ESLint の flat config に設定を書く。

共有の設定として、次のようなものが用意されている。

- `recommended`: 追加の設定なしで動く、正しさのための基本のルール。TypeScript と衝突する ESLint 本体のルールは無効にする
- `strict`: `recommended` に、より主張の強いルールを加えたもの
- `stylistic`: ロジックを変えずに、一貫したスタイルを強制するルール
- `recommended-type-checked` など `-type-checked` の付いた設定: 型情報を必要とするルールを加えたもの。使うには `languageOptions.parserOptions` の設定が要る

## 例

```js
// eslint.config.mjs
// @ts-check
import js from "@eslint/js"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig({
  files: ["**/*.{js,ts}"],
  extends: [js.configs.recommended, tseslint.configs.recommended],
})
```

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] では、`any` の拡散を検出する `no-unsafe-assignment` や、網羅していない `switch` 文を検出する `switch-exhaustiveness-check` など、多くのルールが紹介されている。

## 注意点

`strict` と `strict-type-checked` は、メジャーバージョンの間で安定していない。全ルールを有効にする `all` は、ほとんどのプロジェクトには勧められていない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[eslint|ESLint]]
- [[linter|リンタ]]
- [[typescript|TypeScript]]
- [[prettier|Prettier]]

## 出典

- [typescript-eslint](https://typescript-eslint.io/)
- [Getting Started | typescript-eslint](https://typescript-eslint.io/getting-started/)
- [Shared Configs | typescript-eslint](https://typescript-eslint.io/users/configs/)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目43 可能なかぎり狭いスコープでany型を使う|Effective TypeScript 第2版 項目43]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目59 never型を使って網羅性チェックを行う|Effective TypeScript 第2版 項目59]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目84 コンパイラーオプションやリンターを使ってコードに規約を適用する|Effective TypeScript 第2版 項目84]]
