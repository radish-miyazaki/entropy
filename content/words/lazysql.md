---
title: Lazysql
aliases: []
description: Go で書かれた、ターミナルで動くデータベース管理ツール（TUI）
tags: [word, go]
date: 2025-08-08
---

## TL;DR

[[go|Go]] で書かれた、[[tui|TUI]] のデータベース管理ツール。ターミナル上でスキーマの閲覧、クエリの実行、データの直接編集ができる。

## 仕組み

[README の Features](https://github.com/jorgerojas26/lazysql?tab=readme-ov-file#features) によると、主な特徴は次のとおりである。

- macOS、Windows、Linux で動くクロスプラットフォームのツールである
- [[mysql|MySQL]]、[[postgresql|PostgreSQL]]、SQLite、MSSQL に対応している
- Vim に似たキーバインドで操作する
- 複数のコネクションを管理できる
- タブを使って、複数のデータベースオブジェクトを同時に操作できる
- 内蔵の SQL エディタでクエリを実行できる

## 例

macOS では Homebrew でインストールする（[Getting Started](https://github.com/jorgerojas26/lazysql?tab=readme-ov-file#getting-started)）。

```sh
brew tap jorgerojas26/lazysql
brew install lazysql
```

`lazysql -h` でオプションを確認できる。

```sh
$ lazysql -h
lazysql

Usage:  lazysql [options] [connection_url]

  connection_url
        database URL to connect to. Omit to start in picker mode

Options:
  -config string
        config file to use (default "/.../Application Support/lazysql/config.toml")
  -logfile string
        Log file
  -loglevel string
        Log level (default "info")
  -version
        Show version
```

MySQL には、接続 URL を渡して接続する。`lazysql` を起動してから `n` を押しても接続できる。

```sh
lazysql mysql://phper:secret@localhost:3306/laravel
```

### キーバインド

すべてのキーバインドは `?` で確認できる（[Keybindings](https://github.com/jorgerojas26/lazysql?tab=readme-ov-file#keybindings)）。よく使うものは次のとおりである。

全般

- `q`: 終了する
- `Ctrl + e`: SQL エディタを開く
- `Delete`: コネクションの選択画面に戻る

テーブル

- `c`: セルを編集する
- `d`: 行を削除する
- `o`: 行を追加する
- `/`: `WHERE` 句の入力欄か SQL エディタにフォーカスする
- `Ctrl + s`: 変更をコミットする
- `>` / `<`: 次のページ / 前のページ
- `K` / `J`: 昇順 / 降順に並び替える
- `H`: ツリーにフォーカスする
- `Ctrl + [` / `Ctrl + ]`: 次のタブ / 前のタブに移動する。タブは、ツリーからテーブルを選んだり SQL エディタを開いたりするたびに作られ、画面上部で確認できる
- `X`: 現在のタブを閉じる
- `R`: 現在のテーブルを更新する

ツリー

- `L`: テーブルにフォーカスする
- `g` / `G`: ツリーの一番上 / 一番下にフォーカスする
- `Ctrl + u` / `Ctrl + d`: 現在の位置から 5 つ上 / 5 つ下にフォーカスする

SQL エディタ

- `Ctrl + R`: SQL 文を実行する

## 自分の理解

Vim ライクなキーバインドかぁ…という気持ちはある。とはいえ、上のキーバインドを知っておけばなんとかなる。

## 関連

- [[tui|TUI]]
- [[mysql|MySQL]]
- [[postgresql|PostgreSQL]]

## 出典

- [jorgerojas26/lazysql](https://github.com/jorgerojas26/lazysql)
- https://minerva.mamansoft.net/2024-12-08-lazysql-sql-client-tools
