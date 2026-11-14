---
title: JetZig
aliases: []
description: Zig で書かれた Web フレームワーク
tags: [word, zig]
date: 2026-02-24
---

## TL;DR

[[zig|Zig]] で書かれた、MIT ライセンスの Web フレームワーク。

## 仕組み

ファイルベースのルーティングで、リクエストを RESTful な Zig の関数に振り分ける。独自のルートも定義できる。HTML は Zmpl というテンプレートで書き、レイアウト、パーシャル、継承、ビルド時の静的レンダリングが使える。エンドポイントはデフォルトで JSON も返すので、そのまま RESTful API になる。

ほかに、プロジェクトやコンポーネントを作る CLI、リクエストとレスポンスを加工するミドルウェア（[[htmx|htmx]] 用のミドルウェアを含む）、Cookie とセッション、JetQuery というデータベース層がある。HTTP サーバには http.zig を使っている。

## 自分の理解

Zig の master 版が必要と案内されていたので 0.16.0-master で試し、0.15.2 で動くという情報もあったので試したが、どちらでも動かなかった。

## 関連

- [[jetzig-cli-install|JetZig CLI のインストール]]

## 出典

- [Jetzig](https://www.jetzig.dev/)
