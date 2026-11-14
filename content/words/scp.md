---
title: scp
aliases: [Secure Copy]
description: SSH プロトコルを使って、リモートサーバとファイルやディレクトリを送受信するコマンド
tags: [word, linux, ssh]
date: 2023-12-18
---

## TL;DR

Secure Copy の略。[[ssh|SSH]] プロトコルを使って、リモートサーバとファイルやディレクトリを送受信するコマンドである。そのプロトコル（Secure Copy Protocol）を指すこともある。

## 仕組み

OpenSSH の scp は、[[ssh|SSH]] 接続の上で SFTP プロトコルを使ってデータを転送する。`-O` を付けると、従来の SCP プロトコルを使う。

## 例

リモートの場所は `[user@]host:[path]` の形で書く。`-r` はディレクトリを再帰的にコピーし、`-P` は接続先のポートを指定し、`-p` は元のファイルの更新時刻、アクセス時刻、モードを保つ。

```shell
scp -r ./dir user@example.com:/tmp/
```

## 注意点

scp には脆弱性がある。そのため OpenSSH は、代わりに rsync や sftp コマンドを使うよう呼びかけている。ただ、scp は手軽なので、移行はなかなか進んでいない。

従来の SCP プロトコルは、リモートのユーザのシェルを実行するので、リモートのシェルで特別な意味を持つ文字を慎重にクォートする必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ssh|SSH]]
- rsync
- sftp

## 出典

- [開発者たちが慣れ親しんだ「scp」コマンドはなぜ「時代遅れで柔軟性がなくすぐに修正できない」のか？](https://gigazine.net/news/20201111-deprecating-scp/)
- [scp(1) - OpenBSD manual pages](https://man.openbsd.org/scp)
