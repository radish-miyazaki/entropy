---
title: 静的型付け
aliases: []
description: プログラムを実行する前に、ソースコードの解析で型の安全性を検査する方式
tags: [word, 型システム]
date: 2026-11-14
---

## TL;DR

プログラムを実行する前に、ソースコードを解析して型の安全性を検査する方式。実行時に検査する[[dynamic-typing|動的型付け]]と対になる。

## なぜ必要か

[Wikipedia](https://en.wikipedia.org/wiki/Type_system) によると、型エラーをコンパイル時に見つけられるので、プログラムの信頼性が上がる。また、コンパイラがプログラムの型が正しいことを証明できれば、実行時の安全性チェックを出力しなくて済むので、コードが速く小さくなる。

## 例

C や [[java|Java]] は型の宣言を明示する必要がある。一方、[[haskell|Haskell]]、[[scala|Scala]]、[[ocaml|OCaml]]、[[fsharp|F#]]、Swift は型推論があるので、宣言を書かなくても静的に型付けできる。ほかに [[typescript|TypeScript]]、[[kotlin|Kotlin]] なども静的型付けの言語である。

## 注意点

Wikipedia によると、チューリング完全な言語の静的型検査は、本質的に保守的である。健全で決定可能な型検査器は、正しいプログラムの一部も拒否する。たとえば、実際には実行されない分岐でも、到達しないことを証明できなければ型エラーになる。また、ダウンキャストのように静的には検査できないものもあるので、多くの言語は静的な検査と動的な検査を組み合わせている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[dynamic-typing|動的型付け]]
- [[structural-typing|構造的型付け]]
- [[nominal-typing|名前的型付け]]
- [[soundness|健全]]

## 出典

- [Type system - Wikipedia](https://en.wikipedia.org/wiki/Type_system)
