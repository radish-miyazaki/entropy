---
title: scp
aliases: [Secure Copy]
description: SSH プロトコルを使って、リモートサーバとファイルやディレクトリを送受信するコマンド
tags: [word, linux, ssh]
date: 2023-12-18
---

## TL;DR

Secure Copy の略。[[ssh|SSH]] プロトコルを使って、リモートサーバとファイルやディレクトリを送受信するコマンドである。そのプロトコル（Secure Copy Protocol）を指すこともある。

## 注意点

scp には脆弱性がある。そのため OpenSSH は、代わりに [[rsync|rsync]] や [[sftp|sftp]] コマンドを使うよう呼びかけている。ただ、scp は手軽なので、移行はなかなか進んでいない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ssh|SSH]]
- [[rsync|rsync]]
- [[sftp|sftp]]

## 出典

- [[開発者たちが慣れ親しんだ「scp」コマンドはなぜ「時代遅れで柔軟性がなくすぐに修正できない」のか？]]
