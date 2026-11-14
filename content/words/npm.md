---
title: npm
aliases: []
description: JavaScript のパッケージを共有・再利用するための、Web サイト、CLI、レジストリからなる仕組み
tags: [word, javascript]
date: 2026-11-14
---

## TL;DR

[[javascript|JavaScript]] のパッケージを共有・再利用するための仕組み。Web サイト、コマンドラインインタフェース（CLI）、レジストリの 3 つで構成される。

## なぜ必要か

公式ドキュメントによると、npm を使うと、他人が書いたコードのパッケージをそのまま、または手を加えてアプリケーションに取り込める。自分のコードを、どこにいる npm のユーザとも共有できる。

## 仕組み

公式ドキュメントによると、npm は次の 3 つで構成される。

- Web サイト: パッケージを探したり、プロフィールを設定したりする
- CLI: ターミナルから実行する。ほとんどの開発者は CLI で npm を使う
- レジストリ: JavaScript のソフトウェアと、そのメタ情報を集めた大規模な公開データベース

コードを特定の開発者だけに公開したり、組織を作ったりもできる。`npx` を使えば、パッケージをダウンロードせずに実行できる。

## 例

[[nodejs|Node.js]] のプロジェクトでは、npm でパッケージを入れる。Web フロントエンドの[[monorepo|モノレポ]]は、npm などのパッケージマネージャが提供する Workspace の機能で実現することが多い。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nodejs|Node.js]]
- [[monorepo|モノレポ]]
- [[definitely-typed|DefinitelyTyped]]

## 出典

- [About npm](https://docs.npmjs.com/about-npm)
