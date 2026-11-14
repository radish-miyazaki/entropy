---
title: CodeRabbit
aliases: []
description: GitHub の Pull Request などの要約やレビューを行う AI ツール
tags: [word, ai]
date: 2024-10-23
---

## TL;DR

[[github|GitHub]] の [[pull-request|Pull Request]] などに対して、要約を作成したりレビューを行ったりする AI ツール。OSS 版と SaaS 版がある。

## 注意点

CodeRabbit が自動でレビューするのは、ベースブランチがデフォルトブランチの Pull Request だけである。すべての Pull Request でレビューを動かしたいときは、設定画面の Review > Auto Review にある Base Branches に `.*` を設定する。`.coderabbit.yaml` でも設定できる。

```yaml
reviews:
  auto_review:
    base_branches: [".*"]
```

## 自分の理解

OSS 版と SaaS 版があるのは、WordPress と同じようなイメージである。実際のプロダクトで SaaS 版を使っている。

## 関連

- [[github|GitHub]]

## 出典

- [CodeRabbit](https://coderabbit.ai/)
- [Which branches are the pull requests reviewed on? - CodeRabbit FAQ](https://docs.coderabbit.ai/faq#which-branches-are-the-pull-requests-reviewed-on)
- [Configure CodeRabbit](https://docs.coderabbit.ai/configure-coderabbit)
