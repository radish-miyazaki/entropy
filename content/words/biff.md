---
title: Biff
aliases: []
description: 個人開発者がすばやくプロジェクトを立ち上げられることを重視した、Clojure の Web フレームワーク
tags: [word, clojure]
date: 2025-03-21
---

## TL;DR

[[clojure|Clojure]] 向けの Web フレームワーク。個人開発者がすばやくプロジェクトを立ち上げ、後から複雑さに悩まされずに開発を続けられることを重視している。

## なぜ必要か

設計思想は [[Philosophy of Biff|Philosophy of Biff]] にまとめている。

## 仕組み

### XTDB と Malli

データベースに XTDB を使う。XTDB は保存したデータを変更・削除せず履歴として残す（イミュータブル）。そのため、データがいつ、どのように変わったかを簡単に追える。XTDB はスキーマレスなので、[[malli|Malli]] でスキーマを明確にし、不正なデータを防ぐ。

### HTMX

[[htmx|HTMX]] を採用しているので、JavaScript をほとんど書かずに動きのある Web ページを作れる。どうしても JavaScript が必要なときは、\_hyperscript というシンプルなスクリプト言語を使える。

### 認証

パスワードを使わず、メールアドレスを使ったログイン認証（マジックリンクやワンタイムパスワード）に対応している。

### デプロイ

Ubuntu の VPS にすぐデプロイできるテンプレートが用意されているので、設定を考えなくても本番環境に出せる。Docker コンテナを使う方法もある。

## 例

プロジェクトは次のコマンドで作る。`https://biffweb.com/new.clj` のコードを `slurp` 関数で読み込んで実行している。

```sh
$ clj -M -e '(load-string (slurp "https://biffweb.com/new.clj"))'
```

`clj -M:dev dev` で REPL サーバを立ち上げ、Emacs から `M-x cider-connect` で接続する。

公式の[チュートリアル](https://biffweb.com/docs/tutorial/build-a-chat-app/)では、チャットアプリを作れる。

## 自分の理解

XTDB がデータを履歴として残す考え方は、永続データ構造に近いと思う。

## 関連

- [[Philosophy of Biff|Philosophy of Biff]]
- [[htmx|HTMX]]
- [[ring|Ring]]
- [[clojure|Clojure]]

## 出典

- [Biff](https://biffweb.com/)
- https://zenn.dev/shinseitaro/books/6ea3b73a1afe3a
- https://zenn.dev/shinseitaro/books/bc7a1a1400742c
