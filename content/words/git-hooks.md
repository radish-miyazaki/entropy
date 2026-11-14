---
title: Git フック
aliases: []
description: コミットやプッシュなど、Git の操作の決まった時点で自動的に実行されるプログラム
tags: [word, git]
date: 2026-11-14
---

## TL;DR

コミットやプッシュなど、[[git|Git]] の操作の決まった時点で自動的に実行されるプログラム。リポジトリの `.git/hooks/` に、実行権限を付けて置く。

## なぜ必要か

コミットやプッシュの前に、空白のエラーやテストの失敗などを機械的に確かめられる。チェックに通らなければ操作そのものを中止できるので、問題のある変更がリポジトリに入るのを手元で防げる。

## 仕組み

フックは既定では `$GIT_DIR/hooks/` に置く。設定 `core.hooksPath` で場所を変えられる。実行権限のないファイルは無視される。

操作を止められるフックでは、0 以外の終了コードを返すとその操作が中止される。主なフックは次のとおりである。

- `pre-commit`: `git commit` でコミットメッセージを受け取る前に実行される。失敗するとコミットが中止される
- `commit-msg`: コミットメッセージのファイルのパスを受け取り、内容を書き換えたり、コミットを拒否したりできる
- `pre-push`: `git push` のときに実行され、失敗すると何もプッシュされない

`post-commit` のような `post-*` のフックは通知のためのもので、操作の結果は変えられない。

## 例

```sh
#!/bin/sh
# .git/hooks/pre-commit
if git diff --cached --check; then
    exit 0
else
    echo "Fix whitespace errors before committing." >&2
    exit 1
fi
```

[[Effective Rust 項目32 CIシステムを設定しよう]] では、秘密情報を誤ってチェックインしていないかの確認は、CI ではなく Git フックでコミット前に行うとしている。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目58 コード生成を複雑な型の代替手段として検討する|Effective TypeScript 項目58]] では、`pre-push` でコードを生成し、`git diff` で差分が出ないことを確かめる方法が挙げられている。

## 注意点

`pre-commit` と `commit-msg` は、`--no-verify` を付けると飛ばせる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[husky|Husky]]
- [[git|Git]]

## 出典

- [Git - githooks Documentation](https://git-scm.com/docs/githooks)
