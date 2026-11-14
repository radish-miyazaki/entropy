---
title: Clojure MCP を触ってみる
description: Clojure MCP を Claude Code に登録し、nREPL につないで REPL 駆動開発でスターリンソートを実装させた。REPL で確かめながら実装したが、トークンの消費は多かった
tags: [blog, clojure, clojure-mcp, repl駆動開発]
date: 2025-08-29
draft: false
---

## TL;DR

- [[clojure-mcp|Clojure MCP]] を [[claude-code|Claude Code]] に登録し、nREPL のサーバにつないで動かした。
- [[repl-driven-development|REPL駆動開発]]でスターリンソートを実装させると、`clojure_eval` で REPL を使って動作を確かめながら実装した。

## 背景

Clojure MCP は前から知っていた。直近で参加した [Shibuya.lisp lispmeetup #116](https://lisp.connpass.com/event/365507/) で実際に触っている方がいたので、自分も触りたくなった。

## 環境

- [Clojure MCP の README](https://github.com/bhauman/clojure-mcp) に沿って進めた
- MCP クライアント: Claude Code
- シェル: zsh
- clojure-mcp v0.1.8-alpha

## 検証

### セットアップ

まず [[clj-new]] でプロジェクトを作成した。

```sh
$ clj -Tclj-new app :name clojure-mcp-example.main
```

`deps.edn` の `:aliases` に nREPL を追加した。

```clojure
{
  ;; 省略
  :aliases {
    :nrepl {:extra-paths ["test"]
            :extra-deps {nrepl/nrepl {:mvn/version "1.3.1"}}
            :jvm-opts ["-Djdk.attach.allowAttachSelf"]
            :main-opts ["-m" "nrepl.cmdline" "--port" "7888"]}}}
```

nREPL のサーバが立ち上がるかを確かめた。

```sh
$ clj -M:nrepl
```

続いて、`deps.edn` の `:aliases` に、[[model-context-protocol|MCP]] サーバに必要な依存関係と設定を追加した。

```clojure
{
  ;; 省略
  :aliases {
    ;; 省略
    :mcp {:deps {org.slf4j/slf4j-nop {:mvn/version "2.0.16"}
                 com.bhauman/clojure-mcp {:git/url "https://github.com/bhauman/clojure-mcp.git"
                                          :git/tag "v0.1.8-alpha"
                                          :git/sha "457f197"}}
          :exec-fn clojure-mcp.main/start-mcp-server
          :exec-args {:port 7888}}}}
```

MCP サーバが立ち上がるかを確かめた。

```sh
$ clj -X:mcp
```

最後に、次のコマンドで Claude Code に MCP サーバの設定を追加した。

```sh
$ claude mcp add clojure-mcp -s project -- clj -X:mcp :port 7888
```

このコマンドで、次の `.mcp.json` が生成された。

```json
{
  "mcpServers": {
    "clojure-mcp": {
      "type": "stdio",
      "command": "clj",
      "args": ["-X:mcp", ":port", "7888"],
      "env": {}
    }
  }
}
```

### 実際に動かす

REPL のサーバを立ち上げた。

```sh
$ clj -M:nrepl
```

そのうえで、Claude Code に次のプロンプトを渡した。

```md
スターリンソートを REPL 駆動開発で実装してください。
```

## 結果

Claude Code が `clojure_eval` を何度も呼び出し、REPL で動作を確かめながら実装していた。一方で、トークンは大量に消費された。また、開発中に動作確認のために使った関数も、成果物に含まれていた。

## 考察

動作確認用の関数が成果物に残ったので、プロンプトで制御する必要がありそうである。REPL 駆動開発に関するソースやドキュメントも用意しておくと、より良くなると思う。

## キーワード

- [[clojure-mcp|Clojure MCP]]
- [[clojure|Clojure]]
- [[repl-driven-development|REPL駆動開発]]
- [[model-context-protocol|Model Context Protocol]]
- [[claude-code|Claude Code]]
- nREPL
- [[clj-new]]

## 参考

- [bhauman/clojure-mcp](https://github.com/bhauman/clojure-mcp)
