---
title: アプリカティブ
aliases: [Applicative]
description: 関手をより拡張した概念で、モナディック関数を並列に組み合わせられるもの
tags: [word, 関数型プログラミング]
date: 2025-01-24
---

## TL;DR

[[functor|関手]]をより拡張した概念。「通常」の値を受け取り「拡張」された値を返す関数（モナディック関数）を、並列に組み合わせられる。

## 仕組み

`apply`（[[haskell|Haskell]] では `<*>`）を使って、複数のモナディック関数を並列に組み合わせる。この書き方をアプリカティブスタイルと呼ぶ。

```haskell
(<*>) :: Applicative f => f (a -> b) -> f a -> f b

pure g <*> x1 <*> x2 <*> ... <*> xn
```

Haskell の `Control.Applicative` のドキュメントでは、アプリカティブを関手とモナドの中間の構造としている。純粋な値を埋め込む `pure` と、計算を順に行って結果を組み合わせる `<*>`（または `liftA2`）を持つ。すべてのアプリカティブは関手である。モナドの `>>=` を持たないので、モナドより表現力は弱い。その代わり、当てはまる型が多く、実行する前に計算を解析できる。

## 例

アプリカティブを使うと、複数のエラーを同時（並列）に扱える。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[monad|モナド]]: アプリカティブをより抽象化した概念
- [[functor|関手]]
- [[computation-expression|コンピュテーション式]]
- [[Domain Modeling Made Functional 第10章 なんとなく理解するモナドとアプリカティブ]]
- [Monad は継続、Applicative は並列](https://blog.ojisan.io/monad-applicative/)

## 出典

- https://qiita.com/suin/items/0255f0637921dcdfe83b#applicative
- [Control.Applicative - base](https://hackage.haskell.org/package/base/docs/Control-Applicative.html)
