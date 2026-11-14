---
title: Serena を導入し、Claude Code と連携させる
description: uvx で Serena の MCP サーバを立ち上げ、claude mcp add で Claude Code に登録した。初期化コマンドを実行すると .serena ディレクトリにドキュメントが生成される
tags: [blog, serena, claude-code, mcp]
date: 2025-08-01
draft: false
---

## TL;DR

- `uvx` で [[serena|Serena]] の [[model-context-protocol|MCP]] サーバを立ち上げ、`claude mcp add` で [[claude-code|Claude Code]] に登録した。
- Claude Code 内で `/mcp__serena__initial_instructions` を実行すると、ルートディレクトリ直下に `.serena` ディレクトリが作られ、さまざまなドキュメントが生成された。

## 背景

最近よく使われている Serena を導入し、Claude Code から使えるようにしたかった。

## 環境

- [[uv|uv]]（[[python|Python]] のパッケージマネージャ）。mise（asdf）からインストールできる。自分はすでに入っていたので、セットアップは省いた

## 検証

### MCP サーバを立ち上げる

`uvx`（`uv` の、`npx` のようなコマンド）を使って、次のコマンドを実行した。

```sh
$ uvx --from git+https://github.com/oraios/serena serena start-mcp-server
```

### Claude Code を MCP クライアントとして使う

次のコマンドで、Claude Code に Serena を MCP サーバとして登録した。

```sh
claude mcp add serena -- uvx --from git+https://github.com/oraios/serena serena-mcp-server --context ide-assistant --project $(pwd)
```

その後、Claude Code 内で `/mcp__serena__initial_instructions` を実行した。

## 結果

MCP サーバが正常に起動すると、`http://127.0.0.1:24282/dashboard/index.html` が自動で開き、Serena のダッシュボードが表示された。

`/mcp__serena__initial_instructions` の実行が終わると、ルートディレクトリ直下に `.serena` ディレクトリが作られ、さまざまなドキュメントが生成された。

## キーワード

- [[serena|Serena]]
- [[claude-code|Claude Code]]
- [[model-context-protocol|Model Context Protocol]]
- [[uv|uv]]
- [[python|Python]]

## 参考

- [oraios/serena](https://github.com/oraios/serena)
