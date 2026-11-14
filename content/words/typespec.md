---
title: TypeSpec
aliases: []
description: Microsoft が開発した、API の仕様を TypeScript に近い構文で記述する DSL
tags: [word, typescript, dsl]
date: 2025-05-16
---

## TL;DR

API の仕様を記述するために Microsoft が開発した [[dsl|DSL]]。構文は [[typescript|TypeScript]] とほとんど同じで、拡張子は `.tsp`。

## なぜ必要か

1 つの定義から、[[openapi|OpenAPI]]（[[rest-api|REST API]]）や [[protocol-buffers|Protocol Buffers]]（[[grpc|gRPC]]）など、複数の形式の仕様を出力できる。公式サイトでは、データ設計を先に行い、そこからスキーマ、API 仕様、クライアントやサーバーのコード、ドキュメントを生成する使い方を挙げている。

## 仕組み

公式に用意されている出力先は、OpenAPI 3.0、JSON Schema 2020-12、Protobuf の `.proto` ファイルである。独自のエミッタ（出力処理）やデコレータを作って拡張することもできる。`tsp init` でテンプレートからプロジェクトを作れる。

## 例

JSON Schema を出力する定義の例。

```ts
import "@typespec/json-schema";

using JsonSchema;

@jsonSchema
namespace Schemas;

model Person {
  name: string;
  address: Address;
  @uniqueItems nickNames?: string[];
  cars?: Car[];
}

model Address {
  street: string;
  city: string;
  country: string;
}

model Car {
  kind: "ev" | "ice";
  brand: string;
  @minValue(1900) year: int32;
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[openapi|OpenAPI]]
- [[protocol-buffers|Protocol Buffers]]
- [[typescript|TypeScript]]

## 出典

- [TypeSpec](https://typespec.io/)
