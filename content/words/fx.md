---
title: Fx
aliases: []
description: Uber が提供する Go の依存性の注入のライブラリ
tags: [word, go]
date: 2025-10-02
---

## TL;DR

Uber が提供している、[[go|Go]] の[[dependency-injection|依存性の注入]]（DI）のライブラリ。Uber のほぼすべての Go のサービスの基盤になっている。

## なぜ必要か

Fx が管理するシングルトンを使うと、アプリケーションからグローバルな状態をなくせる。共通の初期化処理を一度定義すれば、複数のサービスで使い回せるので、ボイラープレートも減る。

## 仕組み

アプリケーションの依存関係のグラフを自動で組み立てる。アプリケーションに追加したコンポーネントは、追加の設定なしにほかのコンポーネントから使える。アプリケーションの起動と終了も Fx が管理するので、初期化のために `init()` 関数を使う必要がない。疎結合な部品はモジュールとしてまとめ、チームの間で共有できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[dependency-injection|依存性の注入]]
- [[uber-go-style-guide|Uber Go Style Guide]]

## 出典

- [uber-go/fx](https://github.com/uber-go/fx)
- [Fx のドキュメント](https://uber-go.github.io/fx/)
