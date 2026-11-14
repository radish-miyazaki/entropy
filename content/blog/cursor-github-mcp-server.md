---
title: Cursor で GitHub の MCP サーバを利用する
description: GitHub 公式の MCP サーバを Docker で動かし、Cursor の .cursor/mcp.json に登録する
tags: [blog, cursor, github, mcp]
date: 2025-04-12
draft: false
---

## TL;DR

- [[github|GitHub]] 公式の [[model-context-protocol|MCP]] サーバ（[github-mcp-server](https://github.com/github/github-mcp-server)）を [[cursor|Cursor]] から使う手順。
- [[docker|Docker]] でサーバを動かし、Personal Access Token を渡す設定を `.cursor/mcp.json` に書く。

## 検証

1. MCP サーバを Docker で立ち上げるので、Docker をインストールして起動しておく
2. [GitHub の Personal Access Token を作成する](https://github.com/settings/personal-access-tokens/new)。必要な権限は、README の [Tools](https://github.com/github/github-mcp-server?tab=readme-ov-file#tools) を見て与える
3. `.cursor/mcp.json` を作成する

```jsonc
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server",
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "XXX", // 2. で作成したトークンを入力
      },
    },
  },
}
```

## キーワード

- [[model-context-protocol|Model Context Protocol]]
- [[cursor|Cursor]]
- [[github|GitHub]]
- [[docker|Docker]]

## 参考

- https://github.com/github/github-mcp-server
