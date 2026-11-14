---
title: Gemini CLI
aliases: []
description: Google が公開した、ターミナルで動くオープンソースの AI エージェント
tags: [word, ai]
date: 2025-06-26
---

## TL;DR

Google が公開した、ターミナルで動くオープンソースの AI エージェント。Google 版の [[claude-code|Claude Code]] といえる。

## 仕組み

npm で入れる。

```sh
npm install -g @google/gemini-cli
```

作成時点では、個人の Google アカウントでログインすれば、Gemini のモデルへのリクエストを 1 分あたり 60 回、1 日あたり 1,000 回まで無料で使えた。

> When prompted, sign in with your personal Google account. This will grant you up to 60 model requests per minute and 1,000 model requests per day using Gemini.

主なコマンドは `/help` で確認できる。

### 拡張機能

`$HOME/.gemini/extensions` か `<workspace>/.gemini/extensions` の下に JSON ファイルを置くと、拡張機能として読み込まれる。JSON には次のフィールドを書ける。

- `name`: 拡張機能の名前。一意にする
- `version`: 拡張機能のバージョン
- `mcpServers`: 使わせたい [[model-context-protocol|MCP]] サーバ。複数指定できる
- `contextFileName`: 拡張機能のコンテキストを書いたファイル。指定しなくても、拡張機能のディレクトリに `GEMINI.md` があれば読み込まれる

> If this property is not used but a GEMINI.md file is present in your extension directory, then that file will be loaded.

### 設定

設定も、拡張機能と同じように JSON ファイルで書く。

## 自分の理解

終了時に入力と出力のトークン数など、主なコストを確認できるのが良い。

## 関連

- [[claude-code|Claude Code]]
- [[openai-codex-cli|OpenAI Codex CLI]]
- [[model-context-protocol|Model Context Protocol]]

## 出典

- [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)
- [Gemini CLI のドキュメント](https://github.com/google-gemini/gemini-cli/blob/main/docs/index.md)
- [拡張機能](https://github.com/google-gemini/gemini-cli/blob/main/docs/extension.md)
- [設定](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md)
- [Gemini CLI: your open-source AI agent](https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/)
