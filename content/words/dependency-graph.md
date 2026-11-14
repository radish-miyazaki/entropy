---
title: 依存グラフ
aliases: [依存関係グラフ]
description: 複数の対象の間の依存関係を表す有向グラフ
tags: [word, グラフ理論]
date: 2026-11-14
---

## TL;DR

複数の対象の間の[[dependency|依存関係]]を表す[[directed-graph|有向グラフ]]。ノードが対象で、辺は「ある対象を評価する前に、別の対象を先に評価する必要がある」ことを表す。

## なぜ必要か

依存グラフがあれば、どの順に処理すればよいかを決められる。Wikipedia では、パッケージのインストーラが未インストールの依存を探す例、Make や npm などのビルドシステムが変更の影響を受けるファイルだけを再ビルドする例、スプレッドシートがセルの計算順を決める例を挙げている。

## 仕組み

Wikipedia によると、どの対象も依存先より後に評価される順序が、正しい評価順序になる。これはトポロジカル順序であり、[[topological-sort|トポロジカルソート]]で求められる。依存が循環していると（循環依存）、正しい評価順序は存在しない。循環のない依存グラフは [[dag|DAG]] である。

## 例

[[rust|Rust]] では、`cargo tree` で依存グラフをツリーとして表示できる。

```
myproject v0.1.0 (/myproject)
└── rand v0.7.3
    ├── getrandom v0.1.14
    │   ├── cfg-if v0.1.10
    │   └── libc v0.2.68
    ├── libc v0.2.68 (*)
    └── rand_core v0.5.1 (*)
```

`(*)` は、依存がグラフの別の場所ですでに表示されたことを示す。`-d` を付けると複数のバージョンで入っている依存だけを、`-i` を付けると指定したパッケージに依存しているパッケージを表示する。

[[Effective Rust]] の項目 25 によると、ある依存クレートで有効になるフィーチャは、依存グラフ全体で指定されたフィーチャの和集合になる（[[feature-unification|フィーチャ統合]]）。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目|Effective TypeScript]] の項目 82 では、JavaScript から [[typescript|TypeScript]] へ、依存関係グラフの下から上に向かってモジュールごとに移行するよう勧めている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[directed-graph|有向グラフ]]
- [[dag|DAG]]
- [[topological-sort|トポロジカルソート]]
- [[cycle-graph-theory|閉路]]
- [[feature-unification|フィーチャ統合]]

## 出典

- [Dependency graph - Wikipedia](https://en.wikipedia.org/wiki/Dependency_graph)
- [cargo tree - The Cargo Book](https://doc.rust-lang.org/cargo/commands/cargo-tree.html)
- [[Effective Rust 項目25 依存グラフを管理しよう|Effective Rust 項目25]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目82 依存関係グラフの下から上へモジュールごとに移行する|Effective TypeScript 第2版 項目82]]
