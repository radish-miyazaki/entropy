---
title: Suave
aliases: []
description: F# 向けの軽量で高速な Web サーバ兼ライブラリ
tags: [word, fsharp]
date: 2024-07-31
---

## TL;DR

[[fsharp|F#]] 向けの軽量で高速な Web サーバ兼ライブラリ。小さな関数を組み合わせて Web アプリケーションを作る。

## なぜ必要か

ルートやレスポンスを F# の型で表すので、多くの間違いをコンパイル時に見つけられる。ライブラリ自体が小さく、すぐに覚えられることを目指している。

## 仕組み

ハンドラは WebPart と呼ばれ、`HttpContext -> Async<HttpContext option>` 型の小さな関数である。WebPart は `>=>` や `choose` で組み合わせる。

非同期でノンブロッキングな I/O を使い、負荷がかかっても応答時間が安定するようにしている。同じハンドラで HTTP/1.1 と HTTP/2 の両方を扱える。TLS、圧縮、Cookie とセッション、レート制限、WebSocket などの機能もそろっている。[[dotnet|.NET]] の上で動き、Linux、macOS、Windows で実行できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fsharp|F#]]

## 出典

- [Suave](https://suave.io/)
- [SuaveIO/suave](https://github.com/SuaveIO/suave)
