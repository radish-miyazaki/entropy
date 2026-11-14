---
title: Agent Package Manager
aliases: [APM]
description: Skills や Hooks、MCP サーバなど、AI エージェントを構成するファイルを宣言的に管理する依存関係管理ツール
tags: [word, ai-agent]
date: 2026-07-14
---

## TL;DR

AI エージェント向けの依存関係管理ツール（CLI）。AI エージェント版の [[npm|npm]] のようなもので、Skills、Prompts、Hooks、MCP サーバ、Instructions（Rules）などを宣言的に管理する。Microsoft が開発した MIT ライセンスの OSS である。このページは v0.25.0 時点の情報である。

## なぜ必要か

リポジトリをクローンした開発者が `apm install` を実行すれば、同じ Skill などをさまざまな AI エージェントで使える。

## 仕組み

npm や pip、cargo のマニフェストとロックファイルという形を、AI エージェントを構成するファイルに当てはめたものである。AI エージェントの実行には介入しない。マニフェストは `apm.yml`、ロックファイルは `apm.lock.yaml` で、パッケージに含まれる Skill などの原本は `.apm/` に置く。`apm install` を実行すると、推移的な依存関係も含めた依存ツリー全体を解決し、各エージェントが読むファイルとして展開する。

管理できるのは Instructions、Skills、Prompts、Agents、Hooks、Commands、Plugins、MCP サーバである。出力先は、GitHub Copilot（`.github/`）、Codex（`.codex/`、`.agents/`）、Claude（`.claude/`）、Gemini（`.gemini/`）、OpenCode（`.opencode/`）、[[cursor|Cursor]]（`.cursor/`）、Antigravity（`.agents/`）、[[windsurf|Windsurf]]（`.windsurf/`）、Kiro（`.kiro/`）などに対応している。

### 安全性とポリシー

`apm install` は、エージェントの挙動を乗っ取り得る不可視の Unicode を検査し、コンテンツのハッシュをロックファイルに固定する。推移的な MCP サーバは、明示的な確認なしには通さない。`apm audit` で意図しない変更がないかを確認できる。

GitHub Organization の `.github` リポジトリに `apm-policy.yml` を置くと、Organization 内の全リポジトリに対して、ソース、スコープ、プリミティブの許可リストを定義できる。`apm install` と `apm audit --ci --policy org` の実行時に、Git の remote から自動で検出される。

```yaml
name: "Contoso Engineering Policy"
version: "1.0.0"
enforcement: block # warn | block | off

dependencies:
  allow:
    - "contoso/**"
    - "microsoft/*"
  deny:
    - "untrusted-org/**"

mcp:
  transport:
    allow: [http, stdio] # sse と streamable-http を拒否
```

## 注意点

リポジトリ側に独自の `apm-policy.yml` を置いてポリシーを拡張できるが、ルールは厳しくすることしかできず、緩めることはできない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[gemini-cli|Gemini CLI]]
- [[openai-codex-cli|OpenAI Codex CLI]]

## 出典

- [microsoft/apm - GitHub](https://github.com/microsoft/apm)
- [Agent Package Manager](https://microsoft.github.io/apm/)
- [What is APM](https://microsoft.github.io/apm/concepts/what-is-apm/)
- [Primitives and targets](https://microsoft.github.io/apm/concepts/primitives-and-targets/)
- [The Three Promises](https://microsoft.github.io/apm/concepts/the-three-promises/)
- [Lifecycle: audit](https://microsoft.github.io/apm/concepts/lifecycle/#5-audit)
- [GitHub rulesets](https://microsoft.github.io/apm/enterprise/github-rulesets/)
