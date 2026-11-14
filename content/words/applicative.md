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
- [[Monad は継続、Applicative は並列]]

## 出典

- https://qiita.com/suin/items/0255f0637921dcdfe83b#applicative
