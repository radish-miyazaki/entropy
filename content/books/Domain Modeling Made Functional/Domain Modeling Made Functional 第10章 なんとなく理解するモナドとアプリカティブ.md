---
title: Domain Modeling Made Functional 第10章 なんとなく理解するモナドとアプリカティブ
description: モナディック関数を直列につなぐのがモナド、並列に組み合わせるのがアプリカティブ、という大まかな理解
tags: [book-chapter, ddd, fsharp]
date: 2024-08-06
book: "[[Domain Modeling Made Functional]]"
chapter: 10
---

## TL;DR

- [[monadic-function|モナディック関数]]は、通常の値を受け取り「拡張」された値を返す関数で、本書のスイッチ関数に当たる。
- [[monad|モナド]]はモナディック関数を直列につなげるもの、[[applicative|アプリカティブ]]は並列に組み合わせるものである。

## 内容

### モナディック関数

モナディック関数は、「通常」の値を受け取り、ある種の「拡張」された値を返す関数である。[[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）]]に当てはめると、「拡張」された値は `Result` 型で包まれた値である。したがって、モナディック関数はスイッチ関数のことである。

### モナド

モナドは、モナディック関数を直列につなげられるものである。アプリカティブをさらに抽象化した概念で、コンテキスト（コンテナ）の中の値に基づいて新しいコンテキストを作る。技術的には、次の 3 つの要素を持つ。

1 つめはデータ構造で、たとえば `Result` である。2 つめは関連する関数である。`return`（`pure`）は「通常」の値を「拡張」された値に変換する関数で、`Result` では `Ok` コンストラクタがこれに当たる。`bind`（`flatMap`）はモナディック関数を連鎖させる関数で、`Result` では次のように書ける。

```fsharp
let bind f aResult =
  match aResult with
  | Ok success -> f success
  | Error failure -> Error failure
```

3 つめは、関数がどう動作しなければならないかを定めるルールで、[[haskell|Haskell]] ではモナド則と呼ばれる。

```haskell
return x >>= f = f x
mx >>= return = mx
(mx >>= f) >>= g = mx >>= (\x -> (f x >>= g))
```

`bind` を使ってモナディック関数を直列につなぐ書き方を、モナディックスタイルと呼ぶ。

```haskell
do
  x1 <- m1
  x2 <- m2
  ...
  xn <- mn
  f x1 x2 ... xn
```

### アプリカティブ

アプリカティブは、モナディック関数を並列に組み合わせられるものである。[[functor|ファンクタ]]をさらに抽象化した概念である。`apply`（`<*>`）を使ってモナディック関数を並列に組み合わせる書き方を、アプリカティブスタイルと呼ぶ。

```haskell
(<*>) :: Applicative f => f (a -> b) -> f a -> f b

pure g <*> x1 <*> x2 <*> ... <*> xn
```

アプリカティブを使うと、複数のエラーを同時に扱える。

モナドとアプリカティブの違いについては、[Monad は継続、Applicative は並列](https://blog.ojisan.io/monad-applicative/)も参考になる。

## キーワード

- [[monad|モナド]]
- [[applicative|アプリカティブ]]
- [[monadic-function|モナディック関数]]
- [[functor|ファンクタ]]
- [[haskell|Haskell]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
