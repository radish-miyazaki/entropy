---
title: モナド
aliases: [Monad]
description: アプリカティブをより抽象化した概念で、モナディック関数を直列につなげられるもの
tags: [word, 関数型プログラミング]
date: 2025-01-24
---

## TL;DR

[[applicative|アプリカティブ]]をより抽象化した概念。「通常」の値を受け取り「拡張」された値を返す関数（モナディック関数）を、直列につなげられる。

## 仕組み

コンテキスト（コンテナ）の中の値をもとに、新しいコンテキストを作る。技術的には次の 3 つの要素を持つ。

- データ構造（例: `Result`）
- 関連するいくつかの関数（`return`（`pure`）や `bind`）
- 関数がどう動かなければならないかを定めるルール（[[haskell|Haskell]] のモナド則）

```haskell
return x >>= f = f x
mx >>= return = mx
(mx >>= f) >>= g = mx >>= (\x -> (f x >>= g))
```

`bind` を使ってモナディック関数を直列に連結する書き方を、モナディックスタイルと呼ぶ。

## 例

`Result` 型でラップされた値を返す関数は、モナディック関数である。`bind` を使うと、前の関数が成功したときだけ次の関数を呼ぶ処理を連結できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[applicative|アプリカティブ]]
- [[computation-expression|コンピュテーション式]]
- [[dry-monads|dry-monads]]
- [[Domain Modeling Made Functional 第10章 なんとなく理解するモナドとアプリカティブ]]
- [Monad は継続、Applicative は並列](https://blog.ojisan.io/monad-applicative/)

## 出典

- https://qiita.com/suin/items/0255f0637921dcdfe83b#monad
- [[Domain Modeling Made Functional]]
