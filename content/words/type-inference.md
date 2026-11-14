---
title: 型推論
aliases: []
description: 型が明示されていない式や変数の型を、周りの情報からコンパイラが決めること
tags: [word, 型システム]
date: 2026-11-14
---

## TL;DR

[[type-annotation|型アノテーション]]が書かれていない式や変数の型を、すでに分かっている型の情報からコンパイラが決めること。

## なぜ必要か

型推論があれば、静的な型検査の恩恵を受けながら、すべての変数や引数、戻り値に型を書かずに済む。[[Domain Modeling Made Functional]] によると、[[fsharp|F#]] では型推論が効くので、型を明示的に書く必要はほとんどない。TypeScript のハンドブックも、最初は思っているより少ない型アノテーションで書いてみるよう勧めている。

## 仕組み

[[型推論入門 ― Hindley-Milnerの仕組みと実装の違い|型推論入門]]によると、型推論は確定している型の情報を集め、それをもとに型の制約を生成して解く。このアルゴリズムの違いが言語ごとの個性になる。ML 系の言語で多く使われる Hindley-Milner 型推論は、制約を単一化で解く。ただし、そのままでは[[subtyping|部分型]]を推論できないので、[[typescript|TypeScript]] は採用していない。

TypeScript のハンドブックによると、TypeScript は変数やメンバの初期化、引数のデフォルト値、関数の戻り値の型を決めるときに型推論を行う。複数の式から推論するときは、すべての候補と互換性のある「最適な共通型」を選ぶ。式が置かれた場所から型を決める文脈的型付け（contextual typing）もある。

## 例

```ts
let x = [0, 1, null] // (number | null)[]

window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.button) // mouseEvent は MouseEvent と推論される
}
```

F# では、`let add x y = x + y` の型シグネチャが `int -> int -> int` と推論される。

## 注意点

最適な共通型は候補の型の中からしか選ばれない。`[new Rhino(), new Elephant(), new Snake()]` は `Animal[]` ではなく `(Rhino | Elephant | Snake)[]` と推論されるので、`Animal[]` にしたければ型アノテーションを付ける。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] によると、1 つの変数を異なる型の値に使い回すと、型推論がうまく効かない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[type-annotation|型アノテーション]]
- [[type-system|型システム]]
- [[type-narrowing|型の絞り込み]]
- [[subtyping|部分型]]

## 出典

- [TypeScript: Documentation - Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)
- [[Domain Modeling Made Functional 第4章 関数の理解|Domain Modeling Made Functional 第4章 関数の理解]]
- [[型推論入門 ― Hindley-Milnerの仕組みと実装の違い|型推論入門 ― Hindley-Milnerの仕組みと実装の違い]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目19 異なる型には異なる変数を使う|Effective TypeScript 第2版 項目19]]
