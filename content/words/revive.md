---
title: revive
aliases: []
description: 高速で、設定や拡張ができる Go のリンター
tags: [word, go]
date: 2025-09-11
---

## TL;DR

高速で、設定や拡張ができる [[go|Go]] の[[linter|リンター]]。OSS で開発されている。

> Fast, configurable, extensible, and beautiful linter for Go.

## 仕組み

公式サイトによると、主な特徴は次のとおりである。

- スタイルと命名、複雑さ、エラー、Go のイディオムにわたる 100 以上のルールがある
- TOML ファイルでルールの有効化・無効化と設定ができる。ルールごとに重大度や終了コードも決められる
- revive の上に独自のルールやフォーマッタを書いて拡張できる
- JSON、checkstyle、SARIF など、複数の出力形式に対応している
- コメントで、ファイル全体や特定の行の範囲だけルールやリンターを無効にできる
- 大きなコードベースでも数秒で検査でき、型チェックを無効にするとさらに速くなる

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[linter|リンター]]
- [[eslint|ESLint]]

## 出典

- [revive](https://revive.run/)
