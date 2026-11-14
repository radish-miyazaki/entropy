---
title: Husky
aliases: []
description: JavaScript プロジェクトの Git フックを管理し、Commit の前にテストやフォーマットを実行できるツール
tags: [word, javascript, git]
date: 2024-09-06
---

## TL;DR

[[javascript|JavaScript]] プロジェクトの [[git-hooks|Git フック]]を管理するためのツール。Commit の前にテストやフォーマットを自動で実行できる。

## 仕組み

インストールすると、npm の `prepare` スクリプトを使って、自動的に Git フックをセットアップする。`prepare` は `npm install` を実行するたびに自動で実行される。

`npx husky-init` でセットアップすると、`package.json` の `scripts` に次の設定が追加される。

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

あわせて `.husky/pre-commit` スクリプトが作られる。このスクリプトは Commit の前に実行され、テストが失敗したりエラーが起きたりすると Commit は中断される。

## 例

`.husky/pre-commit` は、初期状態ではテストを実行するだけである。次のように直すと、自動フォーマットも行う。`--run` は [[vitest|Vitest]] のウォッチモードを切るオプションである。

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test -- --run && npm run format
```

Commit すると、`test` と `format` が実行される。

```sh
$ git commit -m ":wrench: Add pre-commit hook"

> carousel@0.0.0 test
> vitest --run

...

> carousel@0.0.0 format
> npm run format:js && npm run format:css

> carousel@0.0.0 format:js
> eslint --fix . && prettier --log-level warn --write .

> carousel@0.0.0 format:css
> stylelint "**/*.{ts,tsx}" --fix
```

## 注意点

実行に時間がかかると開発体験が悪くなる。時間がかかる処理は、Git フックではなく CI のタスクにすることを検討する。実行時間を短くするために、[[lint-staged]] と組み合わせて使うことが多い。

Git フックを飛ばしたいときは、Git コマンドに `--no-verify` フラグを付けて実行する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[lint-staged]]
- [[eslint|ESLint]]
- [[prettier|Prettier]]
- [[stylelint|Stylelint]]

## 出典

- [Husky](https://typicode.github.io/husky/)
- [Get started - Husky](https://typicode.github.io/husky/get-started.html)
- [Git フック - Git のカスタマイズ](https://git-scm.com/book/ja/v2/Git-のカスタマイズ-Git-フック)
- [scripts - npm Docs](https://docs.npmjs.com/cli/v10/using-npm/scripts#life-cycle-scripts)
- [Vitest CLI](https://vitest.dev/guide/cli.html#run)
