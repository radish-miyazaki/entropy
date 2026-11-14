---
title: Prettier
aliases: []
description: 設定オプションを最小限に絞った、意見を持ったコードフォーマッタ
tags: [word, javascript]
date: 2024-08-29
---

## TL;DR

「意見を持った（opinionated）」コードフォーマッタ。[[javascript|JavaScript]]、[[html|HTML]]、[[css|CSS]]、[[markdown|Markdown]]、[[graphql|GraphQL]]、YAML などに対応している。

> Prettier is an opinionated code formatter

## なぜ必要か

コードの可読性を上げ、コードスタイルの[[consistency|一貫性]]を保てる。

## 仕組み

意見を持ったフォーマッタなので、設定オプションはわずかしかない。ここが [[eslint|ESLint]] との大きな違いである。デフォルト値が決まっているので、オプションを指定しなくても使える。

`npm install --save-dev prettier` でインストールし、必要なら `.prettierrc` でオプションを指定する。除外したいディレクトリは `.prettierignore` に書く。

## 例

`.prettierrc` の例。

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true
}
```

`npx prettier index.js` で整形結果を表示し、`--write` を付けるとファイルを書き換える。`package.json` の `scripts` に追加すると、CI で使いやすい。

```json
{
  "scripts": {
    "test": "jest",
    "lint": "eslint . && prettier --list-different .",
    "format": "eslint --fix && prettier --loglevel warn --write ."
  }
}
```

`--list-different` は、フォーマットに問題があるファイルの名前を一覧にする。`--log-level warn` は、問題が起きたときだけ出力する。どちらも ESLint の動作に合わせるためのものである。

[[visual-studio-code|Visual Studio Code]] では[拡張機能](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)を入れ、保存時に整形されるよう `editor.formatOnSave` を `true` にするとよい。`editor.formatOnType` を `true` にすると、入力中にも整形される。

```json
{
  "editor.formatOnSave": true
}
```

## 注意点

オプションを指定しない場合でも、Prettier を使っていることが分かるように、空の `.prettierrc`（`{}`）を作っておくとよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[eslint|ESLint]]
- [[stylelint|Stylelint]]

## 出典

- [Prettier](https://prettier.io/)
- [Why Prettier?](https://prettier.io/docs/en/why-prettier)
- [Options](https://prettier.io/docs/en/options)
- [Install](https://prettier.io/docs/en/install)
- [Ignoring Code](https://prettier.io/docs/en/ignore.html#ignoring-files-prettierignore)
- [CLI](https://prettier.io/docs/en/cli.html#--list-different)
