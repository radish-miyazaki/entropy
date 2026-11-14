---
title: HMR
aliases: [Hot Module Replacement]
description: ページ全体を再読み込みせずに、コードの変更をブラウザに反映する仕組み
tags: [word, フロントエンド]
date: 2024-08-30
---

## TL;DR

ページ全体を再読み込みせずに、コードの変更をブラウザに反映する仕組み。Hot Module Reloading とも呼ばれる。

## なぜ必要か

ページを再読み込みすると、入力中のフォームなどアプリケーションの状態が失われる。HMR を使えば、状態を保ったまま変更をすぐに確認できる。

## 例

[[vite|Vite]] はネイティブの ES Modules 上で HMR の API を提供している。フレームワークはこの API を使って、ページの再読み込みやアプリケーションの状態の破棄をせずに更新を反映できる。Vue の単一ファイルコンポーネントと [[react|React]] の Fast Refresh には、Vite 公式の HMR 連携がある。create-vite で作ったアプリでは設定済みなので、自分で設定する必要はない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Features | Vite](https://vite.dev/guide/features)
