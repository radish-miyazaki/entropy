---
title: 鉄道指向プログラミング
aliases: [ROP]
description: 成功と失敗の 2 本の線路を持つ鉄道にたとえて、エラーを返しうる関数を合成する関数型プログラミングの手法
tags: [word, 関数型プログラミング, fsharp]
date: 2026-11-14
---

## TL;DR

成功と失敗の 2 本の線路を持つ鉄道にたとえて、エラーを返しうる関数をパイプラインとして合成する[[functional-programming|関数型プログラミング]]の[[error-handling|エラー処理]]の手法。Scott Wlaschin が [[fsharp|F#]] を使って示した。

## なぜ必要か

Scott Wlaschin によると、関数型プログラミングの例の多くは、常にうまくいく「ハッピーパス」だけを前提にしている。しかし、実際のアプリケーションでは、検証、ログ、ネットワークやサービスのエラーなどを扱う必要がある。

## 仕組み

[[Domain Modeling Made Functional]] では、`Result` を返す関数をスイッチ関数と呼ぶ。一般には[[monadic-function|モナディック関数]]と呼ばれる。スイッチ関数は 1 つの入力を受け取り、成功か失敗のどちらかに分岐する。

スイッチ関数をつなぐときは、前の関数が成功したら次の関数に進み、失敗したら次の関数を飛ばしてそのまま失敗を流したい。すべてのステップをこうつなぐと、成功の線路と失敗の線路が並走する形になる。これが 2 トラックモデルである。

ただし、スイッチ関数の出力は 2 トラックで入力は 1 トラックなので、そのままでは[[function-composition|合成]]できない。そこで、すべてのステップを 2 トラックの関数にそろえるアダプタを使う。

- `bind`（Haskell の `>>=`）: スイッチ関数を 2 トラックの関数に変換する
- `map`（Haskell の `fmap`）: 1 トラックの関数を 2 トラックの関数に変換する
- `mapError`: エラー型を共通の選択型に変換する

Scott Wlaschin のページでは、ほかに戻り値が unit の関数をパイプラインに組み込む `tee` や、検証などでモナディック関数を並列に実行する `&&&` も挙げている。

## 例

[[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）|Domain Modeling Made Functional 第10章]] の `bind` の実装は次のとおりである。

```fsharp
let bind f aResult =
  match aResult with
  | Ok success -> f success
  | Error failure -> Error failure
```

## 注意点

Scott Wlaschin 自身が、エラー処理の便利な方法ではあるが、極端に使いすぎないよう注意している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[monadic-function|モナディック関数]]
- [[monad|モナド]]
- [[function-composition|関数合成]]
- [[error-handling|エラー処理]]
- [[pattern-matching|パターンマッチ]]

## 出典

- [Railway Oriented Programming | F# for fun and profit](https://fsharpforfunandprofit.com/rop/)
- [[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）|Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）]]
