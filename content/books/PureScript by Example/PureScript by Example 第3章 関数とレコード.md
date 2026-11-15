---
title: PureScript by Example › 関数とレコード
description: PureScript の基本的な型、レコード、型構築子とカインド、量化された型、η 変換、中置演算子、関数合成を扱う章
tags: [book-chapter, purescript]
date: 2025-05-02
book: "[[PureScript by Example]]"
chapter: 3
---

## TL;DR

- [[purescript|PureScript]] の基本的な型とレコード、独自の型の定義を学ぶ。
- 型構築子とカインド、量化された型、η 変換によるポイントフリースタイル、[[function-composition|関数合成]]も扱う。

## 内容

### 単純な型

基本的な型には、整数の `Int`、浮動小数点数の `Number`、文字列の `String`、真偽値（`true` と `false`）の `Boolean`、文字の `Char`、配列の `Array` がある。配列の要素はすべて同じ型でなければならない。モジュールの詳細は [Pursuit](https://pursuit.purescript.org/) で確認できる。

### レコード

レコードは JavaScript のオブジェクトに相当する。フィールドには `.` でアクセスする（`author.name`）。

```haskell
author :: { name :: String, interests :: Array String }
author = { name: "Radish", interests: ["Functional Programming", "Type Theory"] }
```

関数はインラインでも書ける。REPL で複数行を入力するには `:paste` を使い、`^D` で終える。

```sh
> :paste
… add :: Int -> Int -> Int
… add = \x y -> x + y
^D
```

### 独自の型の定義

`type` キーワードで型に名前を付けられる。

```haskell
type Entry =
  { firstName :: String
  , lastName :: String
  , address :: Address
  }
```

### 型構築子とカインド

`List` や `Array` は型構築子である。型引数 `a` を受け取り、新しい型 `List a`（`Array a`）を作る。そのため、`List` そのものに型注釈（`::`）を付けようとすると、次のエラーになる。

> In a type-annotated expression x :: t, the type t must have kind Type.

これはカインドによるエラーである。カインドは型を区別するための概念で、`String` や `Number` のカインドは `Type`、`List` のカインドは `Type -> Type` である。関数の `->` も型構築子で、引数の型と戻り値の型の 2 つを取る。

```sh
> :k String
Type
> :k List
Type -> Type
> :k (->)
Type -> Type -> Type
```

### 量化された型

`forall` は、その型が全称量化された型であることを示す。次の `constantlyFirst` では、`a` と `b` はどんな型でもよい。

```haskell
constantlyFirst :: forall a b. a -> b -> a
constantlyFirst = \a b -> a
```

たとえば `a` が `Int`、`b` が `String` なら、`constantlyFirst` の型は `Int -> String -> Int` になる。このように具体的な型を当てはめて単相型にすることを特殊化（specialization）と呼び、コンパイラが自動で行う。

### η 変換

η 変換では、`f` と `\x -> f x` を同じものとみなす。そのため、`insertEntry entry book = Cons entry book` は次のように引数を省略できる。こうして関数をポイントフリースタイルで書ける。

```haskell
insertEntry entry = Cons entry -- book を削除
insertEntry = Cons             -- entry も削除
```

### プロパティ取得子

`\entry -> entry.address` のような無名関数は `_.address` と書ける。ネストしたプロパティも `_.address.city` のように取得できる。

### 中置演算子

`infixr` を使うと、既存の関数に右結合の中置演算子として別名を付けられる。たとえば `infixr 0 apply as $` は、関数 `apply` を優先度 0 の右結合の中置演算子 `$` にする。引数を `_` にすると、中置演算子も部分適用できる。

```haskell
add3 = (3 + _)
add3 1 -- 4
```

### 関数合成

PureScript の関数合成には `<<<` と `>>>` を使う。関数合成を使うと、さらに η 変換ができる。

```haskell
findEntry firstName lastName book = head (filter filterEntry book) -- 関数合成前
findEntry firstName lastName = head <<< filter filterEntry          -- 関数合成後
```

右辺は `filter filterEntry >>> head` と書いてもよい。

## キーワード

- [[purescript|PureScript]]
- 型構築子
- カインド
- η 変換
- ポイントフリースタイル
- [[function-composition|関数合成]]

## 自分の理解

ほとんど [[haskell|Haskell]] と同じなので、基本文法はどんどん飛ばして読んだ。
