---
title: 代数的データ型
aliases: [Algebraic Data Types, ADT]
description: 直和型と直積型を組み合わせて、データの構造を型として安全かつ明確に表す考え方
tags: [word]
date: 2024-12-10
---

## TL;DR

直和型と直積型を組み合わせてデータを表す型。主に[[functional-programming|関数型プログラミング]]で使われ、データの構造を型として安全かつ明確に記述できる。

## なぜ必要か

データの構造を型で表すと、不正な値が入りにくくなり、[[invariant|不変条件]]を型で守れる。また、データの構造がコードから読み取りやすくなり、新しいケースも追加しやすい。

## 仕組み

集合論や代数学の考え方を元に、型を組み合わせてデータを構造化する。これが「代数的」と呼ばれる理由である。基本となる構成要素は直積型と直和型の 2 つである。

直積型は複数の要素をまとめて持つ。取りうる値の数は構成要素の値の数の積になる。

```latex
A×B={(a,b)∣a∈A,b∈B}
```

直和型は複数の選択肢のうち 1 つを持つ。取りうる値の数は構成要素の値の数の和になる。

```latex
A+B={Left(a)∣a∈A}∪{Right(b)∣b∈B}
```

この 2 つを組み合わせることで、多様な構造を表現できる。

## 例

[[haskell|Haskell]] と [[rust|Rust]] で、直積型、直和型、その組み合わせを書くと次のようになる。

```hs
-- 直積型: name と age がセットになったデータ型
data User = User { name :: String, age :: Int }

-- 直和型
data PaymentMethod = CreditCard String | PayPal String | Cash

-- 組み合わせ
data Shape = Circle Float | Rectangle Float Float
```

```rust
// 直積型
struct User {
    name: String,
    age: u32,
}

// 直和型
enum PaymentMethod {
    CreditCard(String),
    PayPal(String),
    Cash,
}

// 組み合わせ
enum Shape {
    Circle { radius: f64 },
    Rectangle { width: f64, height: f64 },
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[algebraic-type-system|代数的な型システム]]
- 直積型
- 直和型
- [[invariant|不変条件]]
