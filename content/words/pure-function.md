---
title: 純粋関数
aliases: []
description: 同じ引数に対して常に同じ値を返し、副作用を持たない関数
tags: [word, 関数型プログラミング]
date: 2026-11-14
---

## TL;DR

同じ引数に対して常に同じ値を返し、副作用を持たない関数。[[functional-programming|関数型プログラミング]]の基本要素である。

## なぜ必要か

出力が入力だけで決まるので、扱いやすい。Wikipedia では、次の利点を挙げている。

- **参照透過性**: 同じ入力には同じ出力が返るので、関数の呼び出しをその結果で置き換えられる
- **[[memoization|メモ化]]**: 結果を表に保存して再利用できる
- **[[unit-test|単体テスト]]**: 出力が入力だけで決まるので、テストしやすい
- **コンパイラの最適化**: 共通部分式の削除やループの最適化ができる

## 仕組み

純粋関数は、次の 2 つの性質を持つ。

1. 同じ引数に対して、常に同じ値を返す。出力は入力だけで決まる
2. 副作用を持たない。グローバル変数、参照で渡された引数、入出力のストリームなどの外部の状態を変えない

## 例

C++ の `floor` や `max` は純粋関数である。一方、静的変数やグローバル変数を読む関数、標準入力から読む関数は、同じ引数でも値が変わりうるので純粋ではない。グローバル変数を書き換える関数や、標準出力に書く関数も、副作用があるので純粋ではない。

[[react|React]] では、[[react-component|コンポーネント]]と [[react-hooks|React Hooks]] は純粋関数であるべきだとされている。[[nix|Nix]] は、ビルドとデプロイのプロセスを純粋関数として扱う発想で開発されたパッケージマネージャである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[functional-programming|関数型プログラミング]]
- [[immutability|イミュータブル]]
- [[memoization|メモ化]]
- [[container-presentational-pattern|Container/Presentational Pattern]]

## 出典

- [Pure function - Wikipedia](https://en.wikipedia.org/wiki/Pure_function)
- [[react-hooks|React Hooks]]
- [[nix|Nix]]
