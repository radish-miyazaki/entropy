---
title: 型システム
aliases: []
description: プログラムの各式に型を対応づける規則の集まり。型の不一致によるバグを見つけ、防ぐ
tags: [word, 型システム]
date: 2026-11-14
---

## TL;DR

プログラムの各式に型を対応づける規則の集まり。値の解釈の食い違いによるバグを見つけ、防ぐことを主な目的とする。

## なぜ必要か

Wikipedia によると、型システムには次のような役割がある。

- バグを減らす: 値の解釈の食い違いを検出し、防ぐ
- インタフェースを定める: プログラムの部品どうしのつながりを型で表し、一貫しているかを確かめる
- 文書になる: 型がプログラマの意図を明らかにする
- 最適化に使う: 静的な型検査の情報を、コンパイラがより速いコードの生成に使える

[[Domain Modeling Made Functional]] は、型システムを使うとソースコードをドキュメントとして機能させられるとしている。ビジネスルールや[[invariant|不変条件]]を型で表せば、ルールが守られていることをコンパイラが確かめてくれる。

## 仕組み

型検査には、静的なものと動的なものがある。静的な型検査は、プログラムを実行する前にソースコードを解析する。検査を通ったプログラムは、すべての入力に対してある種の型安全性を満たす。ただし保守的なので、正しいプログラムを拒否することもある。動的な型検査は実行中に行うので、誤りは誤ったコードを実行したときに初めて分かる。多くの言語は両方を組み合わせている。

誤ったプログラムをすべて拒否する型システムを[[soundness|健全]]という。

## 例

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] によると、[[typescript|TypeScript]] の型システムは JavaScript の実行時の動作をモデル化し、実行時に例外を投げそうなコードや、意図しない挙動につながりそうなコードを型エラーにする。

## 注意点

Wikipedia によると、健全で決定可能な型システムは、必ず不完全になる。つまり、正しいプログラムの一部も拒否する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[soundness|健全性]]
- [[type-inference|型推論]]
- [[dynamic-typing|動的型付け]]
- [[algebraic-type-system|代数的型システム]]
- [[invariant|不変条件]]

## 出典

- [Type system - Wikipedia](https://en.wikipedia.org/wiki/Type_system)
- [[Domain Modeling Made Functional 第5章 Domain Modeling with Types|Domain Modeling Made Functional 第5章 Domain Modeling with Types]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目1 TypeScriptとJavaScriptの関係を理解する|Effective TypeScript 第2版 項目1]]
