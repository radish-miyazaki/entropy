---
title: Docker 上から dockertest を使う
description: Docker 上から dockertest を使おうとしたが、DSN の指定がうまくいかずコンテナに接続できなかったので、ローカルで実行することにした
tags: [blog, go]
date: 2023-12-08
draft: false
---

## TL;DR

- [[docker|Docker]] のコンテナの中から dockertest を使おうとしたが、立ち上がったコンテナに接続できなかった。
- go コマンドがあればローカルの環境に影響を与えずに実行できるので、無理に Docker 上から使う必要はないと判断した。

## 検証

[[go|Go]] のテストで使う dockertest を、Docker のコンテナの中から実行してみた。dockertest が立ち上げたデータベースのコンテナに接続するため、DSN を指定した。

## 結果

DSN の指定がうまくいかず、立ち上がったコンテナに接続できなかった。

## 考察

公式のサンプルコードは、どれも `sql.Open` に `localhost` を直接指定している。dockertest は、Docker 上から使うことを想定していないようである。

少し引っかかるが、go コマンドがあればローカルの環境に影響を与えずにテストを実行できるので、無理に Docker 上から使う必要はないという結論にした。

## キーワード

- [[go|Go]]
- [[docker|Docker]]
- dockertest

## 参考

- [dockertest の MySQL のサンプル](https://github.com/ory/dockertest/blob/v3/examples/MySQL.md)
