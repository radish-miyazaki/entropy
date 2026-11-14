---
title: スマートコンストラクタ
aliases: [smart constructor]
description: 入力を検証してから値を作る関数で、コンストラクタを隠して不正な値を作れないようにする手法
tags: [word, 設計, 関数型プログラミング]
date: 2026-11-14
---

## TL;DR

入力を検証し、制約を満たすときだけ値を返す関数。型のコンストラクタを外から使えないようにして、この関数だけを公開することで、不正な値を作れないようにする。

## なぜ必要か

ふつうのコンストラクタは、型が合えばどんな値でも受け付ける。[Haskell Wiki](https://wiki.haskell.org/Smart_constructors) の例では、帯の数が 4〜8 本の抵抗器を表す型でも、コンストラクタに `23` を渡せてしまう。[[Domain Modeling Made Functional]] でも、桁数や範囲のような単純型の制約をコメントで書くだけでなく、制約を満たさない値をそもそも作れないようにしたいとしている。

## 仕組み

コンストラクタをプライベートにし、値を作る関数を別に用意する。この関数は入力を検証し、無効ならエラーを返す。Haskell Wiki によると、スマートコンストラクタだけを公開しないと、利用者がそれを迂回して値を作れてしまう。[[Domain Modeling Made Functional]] の [[fsharp|F#]] の例では、エラーを Result で返す。

## 例

[[Domain Modeling Made Functional 第6章 単純な値の完全性|Domain Modeling Made Functional 第6章]] の例である。

```fsharp
module UnitQuantity =
    type UnitQuantity = private UnitQuantity of int

    let create qty =
        if qty < 1 then
            Error "UnitQuantity can not be negative"
        else if qty > 1000 then
            Error "UnitQuantity can not be more than 1000"
        else
            Ok (UnitQuantity qty)

    let value (UnitQuantity qty) = qty
```

## 注意点

この方法での検証は実行時に行われる。Haskell Wiki では、制約を型の水準に置くほど静的なチェックが増え、制約を満たさない値を含むプログラムをコンパイルできなくする方法も紹介している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fsharp|F#]]
- [[haskell|Haskell]]
- [[integrity|完全性]]
- [[branded-types|Branded Types]]

## 出典

- [[Domain Modeling Made Functional 第6章 単純な値の完全性|Domain Modeling Made Functional 第6章]]
- [Smart constructors - HaskellWiki](https://wiki.haskell.org/Smart_constructors)
