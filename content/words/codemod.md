---
title: codemod
aliases: []
description: コードの移行や修正を自動で行う変換。またそれを大規模に実行する Codemod のプラットフォーム
tags: [word, javascript, typescript]
date: 2025-05-02
---

## TL;DR

コードを自動で書き換える変換のこと。同じ名前の Codemod は、大きなコードベースで移行やセキュリティ修正をまとめて行うためのプラットフォームである。

## 仕組み

Codemod の公式サイトによれば、codemod はコンパイラの情報を踏まえてコードを変換し、大きなコードベースにも適用できる。サポートが終わったパッケージのアップグレード、破壊的変更への追従、国際化、セキュリティやコンプライアンスの対応などに使う。

Codemod は、codemod を探せるレジストリ、ast-grep を使った構造的なコード検索、チームをまたいだ移行作業の管理といった機能も提供している。React、ESLint、pnpm、webpack などのプロジェクトが採用している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[igniter|Igniter]]

## 出典

- [Codemod](https://codemod.com/)
