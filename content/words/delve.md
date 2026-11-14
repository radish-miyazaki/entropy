---
title: Delve
aliases: []
description: Go のデバッガ
tags: [word, go]
date: 2025-07-25
---

## TL;DR

[[go|Go]] のデバッガ。シンプルで、機能のそろったデバッグツールを目指している。

## 仕組み

Delve は [[go|Go]] のプログラムをソースコードの単位でデバッグする。コマンドラインの `dlv` から、目的に応じたサブコマンドで起動する。

- `dlv debug`: カレントディレクトリか指定したパッケージの main パッケージをコンパイルして、デバッグを始める
- `dlv exec`: コンパイル済みのバイナリを実行して、デバッグを始める
- `dlv test`: テストバイナリをコンパイルして、デバッグを始める
- `dlv attach`: 実行中のプロセスにアタッチする
- `dlv core`: コアダンプを調べる
- `dlv trace`: プログラムをコンパイルして、トレースを始める
- `dlv dap`: Debug Adapter Protocol（DAP）で通信するヘッドレスの TCP サーバを起動する

`dlv connect` を使うと、ヘッドレスで動いているデバッグサーバにターミナルのクライアントから接続できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[go|Go]]

## 出典

- [go-delve/delve](https://github.com/go-delve/delve)
- [dlv - go-delve/delve Documentation](https://github.com/go-delve/delve/blob/master/Documentation/usage/dlv.md)
