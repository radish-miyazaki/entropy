---
title: HHVM
aliases: [HipHop Virtual Machine]
description: Meta（旧 Facebook）が開発する、Hack 言語のプログラムを実行するオープンソースの仮想マシン
tags: [word, php]
date: 2025-04-25
---

## TL;DR

HipHop Virtual Machine の略。Hack 言語で書かれたプログラムを実行するための、オープンソースの仮想マシンである。リポジトリは facebook/hhvm で、Meta が開発している。

## なぜ必要か

公式ドキュメントでは、Hack を、大規模で信頼性の高い Web サイトを作るための高性能なプログラミング言語だと説明している。HHVM はその Hack のプログラムを動かす実行環境である。

## 仕組み

HHVM は [[jit-compilation|JIT コンパイル]]を使い、高い性能を出す。ライセンスは [[php|PHP]] と Zend のライセンスである。

## 例

README によると、単体のプログラムは `hhvm example.hack` のようにコマンドラインから実行できる。Web アプリケーションとして動かすときは、Web サーバと組み合わせる。組み込みの Proxygen サーバを使うか、nginx や Apache の後ろで FastCGI として動かす。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[php|PHP]]

## 出典

- [facebook/hhvm - GitHub](https://github.com/facebook/hhvm)
- [HHVM and Hack Documentation](https://docs.hhvm.com/)
