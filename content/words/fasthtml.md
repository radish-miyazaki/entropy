---
title: FastHTML
aliases: []
description: Python だけでモダンな Web アプリケーションを作るためのライブラリ。ブラウザとのやりとりは HTMX が担う
tags: [word, python]
date: 2024-07-31
---

## TL;DR

[[python|Python]] だけでモダンな Web アプリケーションを作るためのライブラリ。ブラウザとのやりとりは [[htmx|HTMX]] が担う。

## なぜ必要か

開発体験は FastAPI を参考にしているが、FastAPI が API 向けなのに対し、FastHTML は HTML を返すアプリケーション向けである。一般的なアプリケーションの多くは、JavaScript を書かずに作れる。必要なら JavaScript のライブラリも追加できる。

## 仕組み

ASGI、HTTP、HTML、HTMX の上に作られており、Uvicorn、Starlette、SQLite を使う。HTML の構造は `Div`、`Ul`、`Table` などの Python のコンポーネントで書く。オブジェクトに `__ft__` メソッドを定義すると、そのオブジェクトの描画方法を決められる。

ルートはデフォルトで軽量な部分的な HTML（パーシャル）を返し、HTMX がそれを使って DOM を直接書き換える。ページ全体を再読み込みせずに画面を更新できる。

Python が動く環境であれば、どこにでもデプロイできる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[python|Python]]
- [[htmx|HTMX]]

## 出典

- [FastHTML](https://fastht.ml/)
- [About FastHTML](https://about.fastht.ml/)
- [AnswerDotAI/fasthtml](https://github.com/AnswerDotAI/fasthtml)
