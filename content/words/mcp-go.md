---
title: mcp-go
aliases: []
description: Go で MCP サーバを実装するためのサードパーティ製のライブラリ
tags: [word, go, mcp]
date: 2025-04-17
---

## TL;DR

[[go|Go]] で [[model-context-protocol|MCP]] サーバを実装するためのサードパーティ製のライブラリ。

## なぜ必要か

[公式の GitHub アカウント](https://github.com/modelcontextprotocol)を見る限り、公式が提供している SDK は [[kotlin|Kotlin]]、Java、Swift、C#、[[typescript|TypeScript]]、[[python|Python]] だけで、Go の SDK はない。Go のライブラリには [mcp-golang](https://github.com/metoro-io/mcp-golang) や [go-mcp](https://github.com/ThinkInAIXYZ/go-mcp) もあるが、mcp-go が一番 Star 数が多い。

高レベルな API を提供しているので、コード量が少なくなり、開発が速くなる。最小限のボイラープレートで MCP サーバを作れる。MCP の仕様を完全に実装することを目指している。

## 仕組み

コアとなる要素は次の 4 つである。

- Server: MCP サーバ
- Resources: [[llm|LLM]] に公開するデータ
- Tools: LLM がサーバを介して処理を実行するときに使うツール
- Prompts: LLM がサーバと効率的にやり取りするためのプロンプト

## 例

Examples を実際に動かした。まずモジュールを作り、mcp-go を追加する。

```sh
go mod init mcp-go-example
go get github.com/mark3labs/mcp-go
```

`main.go` を書いている途中で `import` の部分にエラーが出たので、`go mod tidy` を実行した。[uuid](https://github.com/google/uuid) と [uritemplate](https://github.com/yosida95/uritemplate) が追加された。`go build` でビルドして実行ファイルを用意する。

[[cursor|Cursor]] に MCP サーバを登録するには、`.cursor/mcp.json` に次のように書く。

```jsonc
{
  "mcpServers": {
    "calculate": {
      // go build で作った実行ファイルを絶対パスで指定する
      "command": "/path/to/mcp-go-example/mcp-go-example",
      "args": [],
      "env": {},
    },
  },
}
```

設定がうまくいくと、Cursor Settings > MCP で MCP サーバが `Enabled` になる。Agent モードにして実行すると、ツールが呼び出される。

## 注意点

Cursor でモデルを Auto に設定すると、`invalid type for parameter 'x' in tool calculate` というエラーが出た。本来は数値で渡すべき値を、文字列として渡しているのかもしれない。モデルを claude-3.7-sonnet に切り替えると動いた。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[model-context-protocol|Model Context Protocol]]
- [[cursor-github-mcp-server|Cursor で GitHub の MCP サーバを利用する]]

## 出典

- [mcp-go](https://github.com/mark3labs/mcp-go)
- [mcp-go で MCP サーバを作る](https://zenn.dev/uji/articles/try-mpc-development-mcp-go)
