---
title: Taskfile
aliases: []
description: Make に影響を受けた、YAML でタスクを定義するクロスプラットフォームのビルドツール Task の設定ファイル
tags: [word]
date: 2024-09-10
---

## TL;DR

Make に影響を受けたビルドツール Task の設定ファイル。コマンド、依存関係、入力を YAML（`Taskfile.yml`）で定義する。

## なぜ必要か

タスクを YAML で書くので、チームの誰もが読める。同じ Taskfile を Linux、macOS、Windows のどこでも、ローカルでも CI でも実行できる。ソースと生成物を追跡し、最新のものは処理を飛ばせる。

## 仕組み

`Taskfile.yml` の `tasks` にタスクを定義し、`task <タスク名>` で実行する。`task --list` で定義済みのタスクを一覧できる。`deps` に書いたタスクは先に実行される。

## 例

`task build` を実行すると、先に `test` が走り、そのあとバイナリをビルドする。

```yaml
version: "3"

vars:
  APP: '{{.APP | default "my-app"}}'

tasks:
  build:
    desc: Test and build {{.APP}}
    aliases: [b]
    deps: [test]
    cmds:
      - go build -o bin/{{.APP}} .

  test:
    preconditions:
      - sh: command -v go
        msg: "Install Go to test and build this project."
    cmds:
      - go test ./...
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Task](https://taskfile.dev/)
