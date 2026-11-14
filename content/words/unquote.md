---
title: Unquote
aliases: []
description: テストが失敗したとき、失敗に至るまでの値をすべて表示する F# のテスティングフレームワーク
tags: [word, fsharp, テスト]
date: 2024-07-31
---

## TL;DR

テストが失敗したとき、失敗に至るまでのすべての値を表示するのが特徴の [[fsharp|F#]] の[[testing-framework|テスティングフレームワーク]]。

## 仕組み

アサーションは専用の DSL ではなく、静的に型検査される F# の引用式（`<@ ... @>`）で書く。中心となる関数は `test` で、bool を返す引用式を受け取る。単純な比較には `=!` や `>!` などの演算子を使える。

アサーションが失敗すると、式を 1 段階ずつ簡約した途中の値を、最終的な結果まで順に表示する。

xUnit.net、[[nunit|NUnit]]、MSTest など、例外でテストの失敗を伝えるフレームワークと設定なしで組み合わせられる。F# Interactive でも使える。

## 例

```fsharp
[<Fact>]
let ``demo Unquote xUnit support`` () =
    test <@ [3; 2; 1; 0] |> List.map ((+) 1) = [1 + 3..1 + 0] @>
```

このテストは失敗し、次のように簡約の過程が表示される。

```
[3; 2; 1; 0] |> List.map ((+) 1) = [1 + 3..1 + 0]
[4; 3; 2; 1] = [4..1]
[4; 3; 2; 1] = []
false
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fsunit|FsUnit]]
- [[expecto|Expecto]]

## 出典

- [SwensenSoftware/unquote](https://github.com/SwensenSoftware/unquote)
- [User Guide](https://github.com/SwensenSoftware/unquote/wiki/UserGuide)
