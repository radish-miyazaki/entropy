---
title: Firebase Studio
aliases: []
description: AI エージェントと Gemini の支援を備えた、ブラウザで使う Google のクラウド開発環境
tags: [word, google, ai]
date: 2025-05-30
---

## TL;DR

フルスタックの AI アプリを作るための、ブラウザで使うクラウド開発環境。Project IDX に AI エージェントと Gemini の支援を組み合わせたもので、Google が提供している。

## 仕組み

IDE は Code OSS をもとにしていて、Google Cloud の VM 上で動く。Open VSX の拡張機能を入れられ、環境は [[nix|Nix]] で設定できる。

プロジェクトは、リポジトリやローカルのアーカイブ、Figma のデザインから取り込むか、[[nextjs|Next.js]]、[[react|React]]、Flutter、Python Flask などのテンプレートから始める。IDE で直接コードを書くモードと、エージェントに指示するモードを切り替えて使う。

App Prototyping エージェントは、自然言語や画像などの指示から Web アプリを作って直していく。必要なら Cloud Firestore と Firebase Authentication を設定し、Firebase App Hosting に公開できる。Gemini はチャット、コード生成、テストの作成と実行、依存関係の管理などを手伝う。Web アプリと Android アプリは、ブラウザ上でプレビューできる。

## 注意点

公式ドキュメントによると、新しいワークスペースの作成と新規ユーザの登録は受け付けていない。既存のワークスペースは引き続き使え、移行ガイドが用意されている。Preview 段階のため SLA はなく、後方互換性のない変更が入ることがある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Firebase Studio](https://firebase.google.com/docs/studio?hl=ja)
