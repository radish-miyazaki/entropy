---
title: Opaque types
aliases: [不透明型]
description: 何を表すかは分かるが、内部の構造が隠蔽されている型
tags: [word, 型]
date: 2025-05-26
---

## TL;DR

内部の構造が隠蔽された型。何を表しているかは分かるが、内部の詳細は見えない。日本語では不透明型と呼ぶ。

## なぜ必要か

Wikipedia によると、不透明型は、具体的なデータ構造がインタフェースに定義されていない型である。値は、隠れた情報にアクセスできるサブルーチンを通してしか操作できないので、[[information-hiding|情報隠蔽]]を強制できる。

## 仕組み

[[scala|Scala]] 3 の opaque type は、型を抽象化しつつ実行時のオーバーヘッドを生じさせない。型の実体は、定義したスコープの中でだけ見える。外からは別の型として扱われるので、実体の型の変数に代入しようとするとコンパイルエラーになる。値をクラスで包むわけではないので、`Double` などのプリミティブ型でもボクシングが起きない。

## 例

Scala 3 での例。`LastName` の実体が `String` であることは、`DefScope` の中でだけ見える。

```scala
object DefScope:
  opaque type LastName = String
  object LastName:
    def apply(s: String): LastName = s
```

C の標準ライブラリは、ファイルストリームを `FILE` へのポインタとして受け渡すが、`FILE` の具体的な実装は規定していない。C では、サイズやフィールドを隠した構造体を宣言でき、利用者はそのアドレス（不透明ポインタ）だけを扱う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[information-hiding|情報隠蔽]]
- [[abstraction|抽象化]]

## 出典

- [Opaque Types - Scala 3 Book](https://docs.scala-lang.org/scala3/book/types-opaque-types.html)
- [Opaque data type - Wikipedia](https://en.wikipedia.org/wiki/Opaque_data_type)
