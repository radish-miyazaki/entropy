---
title: パターンマッチ
aliases: []
description: 値をパターンと照らし合わせ、一致したかどうかで処理を分けたり、値を分解して中身を取り出したりする言語機能
tags: [word, 関数型プログラミング, fsharp]
date: 2026-11-14
---

## TL;DR

値を「パターン」と照らし合わせ、一致したかどうかで処理を分けたり、値を構成要素に分解して中身を取り出したりする言語機能。[[fsharp|F#]] の公式ドキュメントでは、パターンを「入力データを変換するための規則」と説明している。

## なぜ必要か

[[discriminated-union|判別共用体]]のように、値がいくつかのケースのどれかになる型では、どのケースかを調べてから中身を取り出す必要がある。[[Domain Modeling Made Functional]] では、判別共用体の値を取り出すときや、各ケースの内側に置いた識別子とデータに一度にアクセスするときに、パターンマッチを使っている。

## 仕組み

F# では、主に `match` 式で使う。`match` 式は、各パターンを上から順に入力と照らし合わせ、最初に一致したパターンの右側の式を実行する。一致しなければ、次のパターンを試す。`match` 式のほかにも、`let` 束縛、ラムダ式の引数、`try...with` の例外ハンドラでパターンを使える。

パターンには、リテラルと比べる定数パターン、判別共用体のケースに一致する識別子パターン、値を変数に束縛する変数パターン、タプルやレコード、リストを分解するパターン、どの値にも一致して値を捨てるワイルドカードパターン（`_`）などがある。ワイルドカードパターンは、ほかのどのパターンにも一致しなかった入力を受けるために、最後に置くことが多い。

## 例

[[Domain Modeling Made Functional 第4章 F＃ の型を扱う|Domain Modeling Made Functional 第4章]] の例では、判別共用体の値をケースごとに分解している。

```fsharp
let printQuantity aOrderQty =
    match aOrderQty with
    | UnitQuantity uQty -> printfn "%i units" uQty
    | KilogramQuantity kgQty -> printfn "%g kg" kgQty
```

## 注意点

F# では、2 文字以上で大文字から始まる識別子は、まず識別子パターン（判別共用体のケースなど）として照合される。一致する識別子が見つからなければ、変数パターンとして扱われる。また、`a : int` のような型注釈付きのパターンはコンパイル時に型を指定するだけで、実行時に型を調べるのは `:? Button` のような型テストパターンである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[discriminated-union|判別共用体]]
- [[fsharp|F#]]
- [[functional-programming|関数型プログラミング]]

## 出典

- [Pattern Matching - F# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/pattern-matching)
- [[Domain Modeling Made Functional 第4章 F＃ の型を扱う|Domain Modeling Made Functional 第4章 F# の型を扱う]]
