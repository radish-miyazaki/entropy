---
title: OpenAI Codex CLI
aliases: [Codex CLI]
description: OpenAI が開発する OSS のコーディングエージェント CLI。ChatGPT のプランで追加料金なしに使える
tags: [word, openai]
date: 2025-08-08
---

## TL;DR

OpenAI が開発している、ターミナルで動くコーディングエージェント。OpenAI 版の [[claude-code|Claude Code]] や [[gemini-cli|Gemini CLI]] にあたる。Gemini CLI と同じく OSS である（[Claude Code は OSS ではない](https://github.com/anthropics/claude-code/blob/main/LICENSE.md)）。

## 仕組み

以前は API による従量課金だった。GPT-5 が出たタイミング（v0.16.0）で「Sign in with ChatGPT」が入り、ChatGPT の Plus、Pro、Team プランで追加料金なしに使えるようになったようだ。

## 例

Homebrew でインストールし、バージョンを確認する。

```sh
brew install codex
codex -V
# codex-cli 0.19.0
```

`codex` を実行し、`1. Sign in with ChatGPT` を選んでログインすると使える。

## 注意点

Team プランのアカウントでは、v0.19.0 でログインしようとするとエラーになった。[この Issue](https://github.com/openai/codex/issues/1977)（Can't available Codex CLI with Team Plan subscription）が原因だったようで、v0.20.0 にアップデートしたら連携できた。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[claude-code|Claude Code]]
- [[gemini-cli|Gemini CLI]]
- [[github-spec-kit|GitHub Spec Kit]]

## 出典

- [openai/codex](https://github.com/openai/codex)
- [OpenAI Codex CLI – Getting Started](https://help.openai.com/en/articles/11096431-openai-codex-cli-getting-started)
