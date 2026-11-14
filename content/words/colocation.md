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

Next.js の公式ドキュメントによると、`app` ディレクトリのフォルダはルートの構造を決めるが、ルートは `page.js` か `route.js` を置くまで公開されない。公開されても、クライアントに送られるのは `page.js` や `route.js` が返す内容だけである。そのため、プロジェクトのファイルは、Private Folder を使わなくても、ルートのフォルダの中に安全にコロケーションできる。Private Folder は、UI のロジックとルーティングのロジックを分けたり、将来の Next.js のファイル規約と名前がぶつかるのを避けたりするのに役立つ。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[route-groups|Route Groups]]

## 出典

- [Project structure and organization - Next.js](https://nextjs.org/docs/app/getting-started/project-structure)
