---
title: ESLint
aliases: []
description: JavaScript や TypeScript、JSX のコードの品質とコードスタイルをチェックする静的解析ツール
tags: [word, javascript]
date: 2024-08-29
---

## TL;DR

[[javascript|JavaScript]] や [[typescript|TypeScript]]、[[jsx|JSX]] のための静的解析ツール。コードの品質とコードスタイルをチェックする。

## なぜ必要か

文法的には正しいが、間違いを含んでいる可能性のあるコードを検出できる。たとえば、比較のつもりで `==` や `===` ではなく `=` を書いてしまったコードを見つけられる。

```js
if ((savings = 0)) {
}
```

`window` を `wisdom` とタイポするような、実行時に初めて分かるエラーにも事前に気づける。

## 仕組み

v9.0 から、設定ファイルの形式は Flat Config（`eslint.config.js`）がデフォルトになった。typescript-eslint も Flat Config に対応している。

`npm init @eslint/config` を実行し、使い方、モジュールの形式（ES Modules か CommonJS か）、フレームワーク（[[react|React]] や Vue.js）、TypeScript の有無、実行環境、パッケージマネージャについての質問に答えると、設定ファイルが作られる。あとは必要に応じて設定をカスタマイズする。React や Angular、[[jest|Jest]] 向けのプラグインもある。

## 例

Jest のプラグインを使う設定の例。

```js
const pluginJs = require("@eslint/js")
const pluginJest = require("eslint-plugin-jest")

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  pluginJs.configs.recommended,
  {
    ...pluginJest.configs["flat/recommended"],
    files: ["*.test.js"],
  },
  {
    languageOptions: {
      sourceType: "commonjs",
    },
  },
]
```

除外したいディレクトリは `ignores` で指定する。

```js
export default [
  {
    ignores: [".config/*"],
  },
]
```

`npx eslint` で実行する。`--fix` を付けると、自動で修正できる問題を修正する。`package.json` の `scripts` には次のように追加する。

```json
{
  "scripts": {
    "test": "jest",
    "lint": "eslint . && prettier --list-different .",
    "format": "eslint --fix && prettier --loglevel warn --write ."
  }
}
```

## 注意点

[[visual-studio-code|Visual Studio Code]] の[拡張機能](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)を入れると、コマンドを実行しなくても自動でチェックが走る。ただし、入力し終わる前に警告が出るため、偽陽性が多くなる。気になる場合は、保存時にだけ動くように設定する。

```json
{
  "eslint.run": "onSave"
}
```

[[prettier|Prettier]] と併用すると、両者の設定が衝突することがある。これを避けるには、Prettier 公式が提供する [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) を設定に追加する。

```js
const eslintConfigPrettier = require("eslint-config-prettier")

/** @type {import('eslint').Linter.Config[]} */
module.exports = [pluginJs.configs.recommended, eslintConfigPrettier]
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[prettier|Prettier]]
- [[stylelint|Stylelint]]
- [xo](https://github.com/xojs/xo): ESLint の代替

## 出典

- [ESLint](https://eslint.org/)
- [Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started)
- [Configure ESLint](https://eslint.org/docs/latest/use/configure/)
- [Ignore Files](https://eslint.org/docs/latest/use/configure/ignore)
- [Command Line Interface Reference](https://eslint.org/docs/latest/use/command-line-interface#run-the-cli)
- [typescript-eslint v7 の Flat Config 対応](https://typescript-eslint.io/blog/announcing-typescript-eslint-v7/#new-features---flat-config-support)
