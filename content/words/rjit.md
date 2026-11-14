---
title: RJIT
aliases: []
description: Ruby で書かれた Ruby のための JIT コンパイラ
tags: [word, ruby]
date: 2023-12-25
---

## TL;DR

Pure Ruby で書かれた、[[ruby|Ruby]] のための [[jit-compilation|JIT]] コンパイラ。機械語を生成するアセンブラも Ruby で書かれている。

## なぜ必要か

従来の MJIT は C 言語のコードを生成していた。そのため生成するコードが C に縛られ、コードを動的に書き換える最適化が難しかった。RJIT は MJIT を置き換える形で、2023 年 3 月に Ruby の master ブランチへマージされた。

開発者の k0kubun 氏は、目的として次の 3 つを挙げている。

- モンキーパッチで JIT を差し替えられる仕組みを残し、JIT の開発者が実験的な実装を続けられるようにする
- 成果が出た実装を [[yjit|YJIT]] へ移植する
- JIT を書ける開発者を増やす

## 注意点

本番環境では、引き続き [[yjit|YJIT]] を使うことが推奨されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[yjit|YJIT]]
- [[jit-compilation|JIT]]
- [[ruby|Ruby]]

## 出典

- [RJIT: Ruby で書かれた Ruby の JIT（k0kubun）](https://k0kubun.hatenablog.com/entry/rjit)
