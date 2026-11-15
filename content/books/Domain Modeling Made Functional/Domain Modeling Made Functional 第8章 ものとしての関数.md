---
title: Domain Modeling Made Functional › ものとしての関数
description: 関数型プログラミングでは関数を値として扱い、入力や出力に使える。F# の関数はカリー化されており、部分適用で依存性の注入を行う
tags: [book-chapter]
date: 2024-07-26
book: "[[Domain Modeling Made Functional]]"
chapter: 8
---

## TL;DR

- [[functional-programming|関数型プログラミング]]では関数を「もの」として扱い、他の関数の入力や出力に使える。
- [[fsharp|F#]] の関数はすべて[[currying|カリー化]]されており、[[partial-application|部分適用]]がワークフローでの[[dependency-injection|依存性の注入]]に使われる。

## 内容

[[Domain Modeling Made Functional 第8章 Understanding Functions|Understanding Functions]] の一節である。

関数型プログラミングでは、関数は「もの」として扱われる。そのため、関数を他の関数の入力として渡したり、出力として返したりできる。関数をパラメータとして渡せば、その関数の動作を制御できる。このような関数を[[higher-order-function|高階関数]]と呼ぶ。

### F# で関数を「もの」として扱う

通常の関数定義と、無名関数（ラムダ式）は次のように書く。

```fsharp
let plus3 x = x + 3
let times2 x = x * 2

let square = (fun x -> x * x)
```

関数は変数に束縛したり、リストにまとめたりできる。リストをループして、各関数を順に評価することもできる。

```fsharp
let addThree = plus3

let listOfFunctions = [addThree; times2; square]

for fn in listOfFunctions do
    let result = fn 100
    printfn "If 100 is the input, the output is %i" result
```

### 入力としての関数

関数を入力として受け取る関数を考える。次の関数は、`int -> int` の任意の関数を受け取れる。

```fsharp
// val evalWith5WithAdd2: fn: (int -> int) -> int
let evalWith5WithAdd2 fn =
    fn(5) + 2

let add1 x = x + 1
evalWith5WithAdd2 add1 // val it: int = 8

let square x = x * x
evalWith5WithAdd2 square // val it: int = 27
```

### 出力としての関数

関数を返すと、関数に特定のパラメータを組み込める。次の加算器ジェネレータは、`int` を受け取って `int -> int` の関数を返す。無名関数の代わりに名前付きの関数を返してもよい。

```fsharp
// val adderGenerator: numberToAdd: int -> x: int -> int
let adderGenerator numberToAdd =
    fun x -> numberToAdd + x

let add1 = adderGenerator 1 // val add1: (int -> int)
add1 2 // val it: int = 3

let add100 = adderGenerator 100 // val add100: (int -> int)
add100 2 // val it: int = 102
```

### カリー化

関数を返せるなら、複数のパラメータを取る関数を、1 つのパラメータを取る関数の連なりに変換できる。これをカリー化と呼ぶ。F# では、すべての関数がカリー化されている。

### 部分適用

関数がカリー化されていれば、複数のパラメータを取る関数に引数を 1 つだけ渡すと、残りのパラメータを受け取る新しい関数が返る。これを部分適用と呼ぶ。

```fsharp
let sayGreeting greeting name =
    printfn "%s %s" greeting name

let sayHello = sayGreeting "Hello"
let sayGoodbye = sayGreeting "Goodye"

sayHello "Alex"
sayGoodbye "Alex"
```

部分適用は、[[workflow|ワークフロー]]の実装で依存性の注入を行うときに使われる。

## キーワード

- [[functional-programming|関数型プログラミング]]
- [[higher-order-function|高階関数]]
- [[fsharp|F#]]
- [[currying|カリー化]]
- [[partial-application|部分適用]]
- [[dependency-injection|依存性の注入]]
- [[workflow|ワークフロー]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
