---
title: Higher Kinded Types
aliases: [HKT, 高カインド型]
description: Functor[F[_]] のように、型コンストラクタを引数に取る型
tags: [word, 型システム]
date: 2026-11-14
---

## TL;DR

`Functor[F[_]]` のように、型コンストラクタ（型を受け取って型を返すもの）を引数に取る型。[[higher-order-function|高階関数]]を型の世界に持ち込んだものに当たる。

## 仕組み

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目50 ジェネリックを型に対する関数と考える|Effective TypeScript 項目50]] では、[[generics|ジェネリック]]型を「型に対する関数」と考える。この見方では、型パラメータを取る型をさらに引数に取るものが、高階関数に当たる高カインド型になる。TypeScript は今のところこれを表現できず、次のように型パラメータ `F` に型引数を渡そうとするとエラーになる。

```ts
type MapValues<T extends object, F> = {
  [K in keyof T]: F<T[K]> // type 'F' is not generic.
}
```

## 注意点

[[なぜ多くの言語はHigher Kinded Typesをサポートしないのか]] によると、ほとんどの言語は HKT をサポートしていない。高階単一化が必要になることや、型クラスの暗黙の解決が複雑になることから、実装が複雑になり、コンパイルも遅くなる。一方で、多くの実用アプリケーションは HKT がなくても困っておらず、増えるボイラープレートも今は AI が書ける。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[generics|ジェネリクス]]
- [[higher-order-function|高階関数]]

## 出典

- [[なぜ多くの言語はHigher Kinded Typesをサポートしないのか]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目50 ジェネリックを型に対する関数と考える|Effective TypeScript 項目50]]
