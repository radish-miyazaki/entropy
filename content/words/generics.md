---
title: ジェネリクス
aliases: []
description: 型をパラメータとして受け取り、さまざまな型で動く関数や型を 1 つの定義で書く仕組み
tags: [word, 型システム]
date: 2026-11-14
---

## TL;DR

型をパラメータ（型パラメータ）として受け取り、呼び出し側が指定するさまざまな型で動く関数や型を、1 つの定義で書く仕組み。[[go|Go]] や [[typescript|TypeScript]] などの言語が備えている。

## なぜ必要か

ジェネリクスがないと、同じロジックを型ごとに書き分けることになる。Go の公式チュートリアルでは、`int64` を合計する `SumInts` と `float64` を合計する `SumFloats` を、1 つのジェネリック関数にまとめている。TypeScript の Handbook によると、`any` を使っても任意の型を受け取れるが、戻り値の型の情報が失われる。ジェネリクスなら、入力の型を型パラメータで捕らえて出力にも使える。

## 仕組み

関数や型は、通常の引数に加えて型パラメータを宣言できる。呼び出すときは型引数を渡すが、多くの場合はコンパイラが引数の型から推論するので省略できる。

型パラメータに使える型は制約で絞る。Go では制約をインタフェースで書き、`comparable` や `int64 | float64` のような型の和を使える。TypeScript では `extends` で制約を付ける。ジェネリックなコードの中では、制約が保証する操作しか使えない。

## 例

```go
type Number interface {
    int64 | float64
}

func SumNumbers[K comparable, V Number](m map[K]V) V {
    var s V
    for _, v := range m {
        s += v
    }
    return s
}
```

```ts
function identity<Type>(arg: Type): Type {
  return arg
}
let output = identity("myString") // string と推論される
```

## 注意点

型パラメータは「どんな型でもよい」ものとして扱われるので、制約を付けずにプロパティやメソッドを使うとコンパイルエラーになる。TypeScript では、型パラメータを取る型を引数に取ること（[[higher-kinded-types|Higher Kinded Types]]）は今のところ表現できない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[featherweight-go|Featherweight Go]]
- [[higher-kinded-types|Higher Kinded Types]]

## 出典

- [Tutorial: Getting started with generics - The Go Programming Language](https://go.dev/doc/tutorial/generics)
- [TypeScript: Documentation - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
