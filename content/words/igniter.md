---
title: Igniter
aliases: []
description: Elixir のプロジェクトでコード生成と既存コードへのパッチ適用を支援するフレームワーク
tags: [word, elixir]
date: 2025-04-25
---

## TL;DR

コード生成と、プロジェクトへのパッチの適用を支援する [[elixir|Elixir]] のフレームワーク。既存の Elixir プロジェクトを効率よく拡張・保守できるように作られている。

## なぜ必要か

Igniter は、新しいファイルを作るだけでなく、既存のファイルの意味を理解したうえで書き換えられる。これにより、依存の追加やアップグレードに伴うコードの変更を自動化できる。

## 仕組み

主な利用者は 2 種類いる。

1. **エンドユーザ**: `mix igniter.install` や `mix igniter.upgrade` などのタスクを使い、[[dependency|依存関係]]の追加、アップグレード、[[refactoring|リファクタリング]]を自動化する
2. **ライブラリの作者やプラットフォームの提供者**: 高度なコード生成のツールキットとして使い、既存ファイルの意味を踏まえた変更や、複雑なジェネレータを作る

`mix igniter.install <パッケージ>` は、`mix.exs` に依存を追加し、そのライブラリにインストーラがあれば実行する。`mix igniter.upgrade` は `mix deps.update` と同じように依存を更新し、パッケージが用意した移行用の処理も実行する。

ライブラリの作者は、`<パッケージ>.install` という名前のインストーラのタスクを書いておく。すると `mix igniter.install` で入れたときに、そのタスクが実行される。

## 例

```sh
# 新しいプロジェクトを作り、ash と ecto を入れる
mix igniter.new app_name --install ash,ecto
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[codemod]]
- [[ash-framework|Ash Framework]]

## 出典

- [Igniter](https://hexdocs.pm/igniter/readme.html)
