---
title: Kombai
aliases: []
description: Figma のデザインからのコード生成などができる、フロントエンド開発に特化した AI エージェント
tags: [word, figma]
date: 2025-08-08
---

## TL;DR

フロントエンド開発に特化した [[ai-agent|AI エージェント]]のサービス。独自のコンテキストエンジンとツール群を使って、質の高いコードを速く生成することをうたっている。無料枠でも試すくらいはできる。

## 仕組み

主な特徴は次のとおりである。

- **Figma からのコード生成**: 組み込みの深層学習モデルで、実際の [[figma|Figma]] デザインを忠実にコードにする
- **人間が検証した RAG**: 対応ライブラリごとに人間が検証した [[rag|RAG]] を使い、ベストプラクティスに沿ったコードを生成する
- **フロントエンド向けのインデックスと検索**: フロントエンドのコードベースに特化したインデックスと検索ツールで、関連するコードを速く正確に見つけて再利用する
- **事前の計画とプレビュー**: 複雑なタスクの前に編集できる計画を示し、コードベースを変える前に出力をプレビューできる
- **編集範囲の限定**: 編集はフロントエンドに限られ、データベースやバックエンドのロジックを誤って変えることはない
- **データの扱い**: SOC 2 認証を取得しており、ユーザのデータを学習やモデルの改善に使わない

> Kombai is Soc2 certified. It never uses your data for training or model improvements.

## 例

[[cursor|Cursor]] で使う場合は、次の手順でセットアップする（[Set up](https://docs.kombai.com/get-started/set-up)）。

1. [拡張機能](https://marketplace.cursorapi.com/items/?itemName=kombai.kombai)をインストールする。
2. 拡張機能のタブを開き、「Sign up」ボタンからアカウントを登録して連携する。

その後は[クイックスタート](https://docs.kombai.com/get-started/quickstart)に沿って試せる。

## 自分の理解

正直、Figma の [[model-context-protocol|MCP]] サーバは使い物にならないので、Kombai の精度がどれくらい高いか試してみたい。[参考記事の Figma から UI を作る例](https://zenn.dev/oikon/articles/kombai-frontend#figmaからuiを作成する)の成果物を見ると、だいぶマシに見える。

## 関連

- [[figma|Figma]]
- [[ai-agent|AI エージェント]]
- [[rag|RAG]]

## 出典

- [Kombai](https://kombai.com/)
- [Kombai Docs](https://docs.kombai.com/get-started/welcome)
- https://zenn.dev/oikon/articles/kombai-frontend
