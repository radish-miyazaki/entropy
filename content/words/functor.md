---
title: ファンクタ
aliases: [Functor]
description: 中の値に関数を適用する fmap を持ち、構造を保ったまま値を変換できる型
tags: [word, 関数型プログラミング, haskell]
date: 2026-11-14
---

## TL;DR

中に入っている値に関数を適用する `fmap` を持ち、構造を保ったまま値を変換できる型。[[haskell|Haskell]] では型クラス `Functor` として定義されている。関手とも訳される。

## 仕組み

Haskell の `base` のドキュメントによると、`Functor` は次の 2 つのメソッドを持つ。最小限の定義は `fmap` だけでよい。

```haskell
class Functor f where
  fmap :: (a -> b) -> f a -> f b
  (<$) :: a -> f b -> f a
```

`fmap` は次の 2 つの法則を満たす必要がある。

- 恒等: `fmap id == id`
- 合成: `fmap (f . g) == fmap f . fmap g`

2 つ目の法則は、1 つ目の法則と型から導けるので、実際には 1 つ目だけを確かめればよい。

## 例

- `Maybe` では、`Just` の中の値に関数を適用する。
- リストでは、すべての要素に関数を適用する。
- `Either a` では、`fmap` で変えられるのは最後の型引数だけなので、`Left` 側の型はそのままになる。

[[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）|Domain Modeling Made Functional]] の `map` は、1 トラックの関数を `Result` を扱う 2 トラックの関数に変換するもので、Haskell の `fmap` や `<$>` にあたる。

## 注意点

Domain Modeling Made Functional によると、ファンクタをさらに抽象化した概念が[[applicative|アプリカティブ]]であり、アプリカティブをさらに抽象化した概念が[[monad|モナド]]である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[applicative|アプリカティブ]]
- [[monad|モナド]]
- [[function-composition|関数合成]]

## 出典

- [Data.Functor - base](https://hackage.haskell.org/package/base/docs/Data-Functor.html)
- [[Domain Modeling Made Functional 第10章 なんとなく理解するモナドとアプリカティブ]]
