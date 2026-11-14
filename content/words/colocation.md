---
title: コロケーション
aliases: []
description: 特定の機能に関係するファイルを、近い場所にまとめて置くこと
tags: [word, 設計]
date: 2024-08-23
---

## TL;DR

特定の機能に関係するファイルを、近い場所にまとめて置くこと。英語では Colocation と書く。

## 例

コンポーネントが必要とするデータを、そのコンポーネント自身で取得する。

[[nextjs|Next.js]] の [[app-router|App Router]] では、`_components` のように名前の先頭に `_` を付けたフォルダ（Private Folder）をルーティングの対象から外せる。これを使うと、ルートの近くにそのルートだけで使うファイルを置ける（[[route-groups|Route Groups]] を参照）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[route-groups|Route Groups]]
