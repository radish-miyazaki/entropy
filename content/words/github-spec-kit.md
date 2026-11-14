---
title: GitHub Spec Kit
aliases: [Spec Kit]
description: GitHub が開発する、AI エージェントで仕様駆動開発を進めるためのツールキット
tags: [word, github, 生成ai]
date: 2025-09-03
---

## TL;DR

[[github|GitHub]] が開発している、[[spec-driven-development|仕様駆動開発]]を支援するツール。普段使っている [[claude-code|Claude Code]] などの [[ai-agent|AI エージェント]]で、仕様の策定から実装までを一気通貫で進められる。

## 仕組み

使うには、次のものをインストールしておく必要がある。

- [[python|Python]] のパッケージマネージャ [[uv|uv]]
- Python 3.11 以上
- AI エージェント（Claude Code、GitHub Copilot、[[gemini-cli|Gemini CLI]] など）。2025 年 9 月の時点では、ドキュメントを見る限り [[openai-codex-cli|OpenAI Codex CLI]] にはまだ対応していないようだった

`specify` コマンドをグローバルにインストールし、プロジェクトで初期化する。

```sh
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

初期化すると、エージェント用のカスタムスラッシュコマンド、補助のスクリプト、プロジェクトの原則を書く `memory` が生成される。

```sh
.claude/
└── commands
    ├── plan.md
    ├── specify.md
    └── tasks.md
scripts/
├── check-task-prerequisites.sh
├── common.sh
├── create-new-feature.sh
├── get-feature-paths.sh
├── setup-plan.sh
└── update-agent-context.sh
memory/
├── constitution_update_checklist.md
└── constitution.md
```

生成されるスラッシュコマンドは次の 3 つである。

- `/specify`: 仕様書と機能ブランチを作り、新しい機能の開発を始める（Start a new feature by creating a specification and feature branch.）
- `/plan`: 指定した機能の実装方法を計画する（Plan how to implement the specified feature.）
- `/tasks`: 計画を実行可能なタスクに分解する（Break down the plan into executable tasks.）

この 3 つを順に実行した後、「@specs/.../plan.md の実装を開始して」のようなプロンプトを投げればよさそうである。なお、現在の README では、コマンドは `/speckit-specify` のように `speckit-` の接頭辞が付いた名前になっている。

## 自分の理解

触ってみた感じ、[[kiro|Kiro]] から仕様を生成する部分を抜き出したようなイメージである。Claude Code など普段使っている AI エージェントの CLI で、仕様の策定から実装まで一気通貫でできるのは DX がとても良い。自前でやっていたときよりも、初期化時に専用の Markdown やスクリプトが生成されるぶん、精度が高い。

## 関連

- [[spec-driven-development|仕様駆動開発]]
- [[kiro|Kiro]]
- [[claude-code|Claude Code]]

## 出典

- [github/spec-kit](https://github.com/github/spec-kit)
- [チュートリアル（Detailed process）](https://github.com/github/spec-kit?tab=readme-ov-file#detailed-process)
- [spec-kit/spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)
