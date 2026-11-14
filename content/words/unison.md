---
title: Unison
aliases: [Unison language]
description: コードを名前ではなくハッシュで参照する、静的型付けの純粋関数型プログラミング言語
tags: [word, プログラミング言語, 関数型プログラミング]
date: 2025-06-30
---

## TL;DR

静的型付けの純粋[[functional-programming|関数型プログラミング]]言語。コードをテキストファイルではなくデータベースに保存し、名前ではなくハッシュで参照する。

## 仕組み

コードをハッシュで参照するので、依存関係の衝突の一種がなくなる。副作用は Abilities として関数の型に現れ、たとえば `{IO, Exception}` は I/O を行い例外を投げうることを表す。どこで計算を実行するかを指定するだけで分散実行でき、ネットワークの境界でエンコーダやデコーダを書く必要がない。

コードの追加、更新、実行は、Unison Codebase Manager（UCM）というツールで行う。

## 例

macOS では Homebrew で入れられる。

```sh
brew tap unisonweb/unison
brew install unison-language
```

デスクトップアプリは [ucm-desktop のリリースページ](https://github.com/unisonweb/ucm-desktop/releases)から入れる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[unison-language|プログラミング言語 Unison を知る]]
- [[functional-programming|関数型プログラミング]]
- [[haskell|Haskell]]

## 出典

- [Unison](https://www.unison-lang.org/)
