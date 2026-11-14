---
title: Expecto
aliases: []
description: テストを値として書く、軽量な F# のテスティングフレームワーク
tags: [word, fsharp, テスト]
date: 2024-07-31
---

## TL;DR

軽量な [[fsharp|F#]] の[[testing-framework|テスティングフレームワーク]]。[[nunit|NUnit]] のような `[<Test>]` 属性を必要とせず、普通の関数でテストを書く。

## 仕組み

Expecto ではテストを値として書く。値なので、ほかのデータと同じように組み合わせたり、絞り込んだり、繰り返したりできる。

テストはデフォルトで並列かつ非同期に実行される。そのため、テストどうしでグローバルな状態を共有しないようにするか、順番に実行するよう指定する必要がある。テストは `runTestsWithCLIArgs` で実行し、失敗したテストがあれば 1、なければ 0 を返す。

[[fscheck|FsCheck]] を使った[[property-based-testing|プロパティベーステスト]]の API や、2 つの関数の実行時間を統計的に比べる `Expect.isFasterThan` も持っている。

## 例

```fsharp
open Expecto

let tests =
  test "A simple test" {
    let subject = "Hello World"
    Expect.equal subject "Hello World" "The strings should equal"
  }
```

## 注意点

テストが並列で実行されるので、共有する状態があるテストはそのままでは不安定になる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nunit|NUnit]]
- [[fsunit|FsUnit]]
- [[unquote|Unquote]]
- [[fscheck|FsCheck]]

## 出典

- [haf/expecto](https://github.com/haf/expecto)
