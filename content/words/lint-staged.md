---
title: lint-staged
aliases: []
description: pre-commit フックで、ステージングされたファイルだけにリントやテストのコマンドを実行するツール
tags: [word, javascript, git]
date: 2024-09-06
---

## TL;DR

`pre-commit` フックの中で、ステージングされたファイルだけにコマンドを実行するツール。[[husky|Husky]] と一緒に使うことが多い。

## なぜ必要か

Commit のたびにすべてのファイルを検査すると時間がかかる。lint-staged を使えば、変更したファイルだけを対象にできる。

## 仕組み

`package.json` に `lint-staged` の項目を足し、[[glob|glob]] パターンと、それに当てはまるステージング済みのファイルに実行するコマンドの一覧を対応させる。そのうえで、`.husky/pre-commit` のコマンドを `npx lint-staged` に置き換える。

Commit したとき、glob パターンに当てはまるファイルがなければ `pre-commit` フックは飛ばされる。当てはまれば、対応するコマンドが実行される。

## 例

```sh
npm install --save-dev lint-staged
```

```json
{
  "lint-staged": {
    "*.{js,cjs,ts,tsx}": [
      "vitest related --run",
      "eslint --fix",
      "stylelint --fix",
      "prettier --write"
    ]
  }
}
```

`vitest related` は、ステージングされたファイルの依存ツリーに含まれるテストだけを実行する（[[vitest|Vitest]]）。

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

```sh
$ git commit -a -m ":wrench: Use lint-staged to optimize pre-commit hook"
→ No staged files match any configured task.

$ git commit -a -m ":wrench: Add comment to Carousel component"
✔ Preparing lint-staged...
✔ Running tasks for staged files...
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[husky|Husky]]
- [[eslint|ESLint]]
- [[stylelint|Stylelint]]
- [[prettier|Prettier]]

## 出典

- [lint-staged](https://github.com/lint-staged/lint-staged)
- [Vitest CLI](https://vitest.dev/guide/cli.html#vitest-related)
