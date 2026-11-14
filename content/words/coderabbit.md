---
title: CodeRabbit
aliases: []
description: GitHub の Pull Request などの要約やレビューを行う AI ツール
tags: [word, ai]
date: 2024-10-23
---

## TL;DR

[[github|GitHub]] の Pull Request などに対して、要約を作成したりレビューを行ったりする AI ツール。OSS 版と SaaS 版がある。

## 仕組み

公式ドキュメントによると、CodeRabbit は、コーディングエージェントが生成したものも含めて、コードの変更をレビューし、優先順位を付け、理解し、安全にするための AI のプラットフォームである。チームのフィードバックから学ぶ、文脈を踏まえた自動のコードレビューを行う。GitHub のほか、GitLab、Azure DevOps、Bitbucket でも使える。VS Code や [[cursor|Cursor]]、[[windsurf|Windsurf]]、JetBrains の IDE の拡張機能や、コミット前にレビューする CLI もある。

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
- [CodeRabbit Documentation](https://docs.coderabbit.ai/)
- [Which branches are the pull requests reviewed on? - CodeRabbit FAQ](https://docs.coderabbit.ai/faq#which-branches-are-the-pull-requests-reviewed-on)
- [Configure CodeRabbit](https://docs.coderabbit.ai/configure-coderabbit)
