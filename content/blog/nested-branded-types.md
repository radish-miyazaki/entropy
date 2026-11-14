---
title: Branded types をネストさせたい
description: ブランドのキーを型ごとに分けると、Branded types をネストしても never にならない
tags: [blog, typescript, branded-types]
date: 2025-06-03
draft: false
---

## TL;DR

- よくある [[branded-types|Branded types]] の実装では、ブランドをネストした型が `never` になる。
- ブランドのキーを `__brand_${B}` のように型ごとに分けると、ネストしても正しく型付けできる。ただし型は冗長になる。

## 背景

単位がメートルの標高を表す型のように、Branded types をネストしたい場面があった。

```ts
export type Meter = Branded<number, "Meter">
export type Elevation = Branded<Meter, "Elevation">
```

Branded types は普通、次のように実装する。しかしこの実装では、ネストした型（`Elevation`）が `never` になった。

```ts
declare const __brand: unique symbol
export type Branded<T, B extends string> = T & { readonly [__brand]: B }
```

`Elevation` では `__brand` の値が `"Meter"` かつ `"Elevation"` でなければならない。そのような値は存在しないので、型が `never` になる。

## 検証

ブランドのキーを型ごとに分けるように定義した。

```ts
export type Branded<T, B extends string> = T & {
  readonly [K in `__brand_${B}`]: B
}
```

こうすると、`Elevation` は次のような型になる。

```ts
type Elevation = number & {
  readonly __brand_Meter: true
} & {
  readonly __brand_Elevation: true
}
```

これは存在しうる型なので、`never` にはならない。

正しく型チェックされるかも確かめた。

```ts
async function getElevation(latlng: LatLng): Promise<Elevation> {
  return 0
  // ~~ Type 'number' is not assignable to type 'Elevation'.
}

async function getElevation(latlng: LatLng): Promise<Elevation> {
  return 0 as Meter
  // ~~~ Type 'Meter' is not assignable to type 'Elevation'.
}

async function getElevation(latlng: LatLng): Promise<Elevation> {
  return 0 as Elevation // OK
}
```

## 結果

`number` や `Meter` を `Elevation` として返すとエラーになり、`Elevation` を返すときだけ通った。

## 考察

この方法には欠点もある。`__brand_${B}` はただの文字列なので、別の型とキーが衝突するおそれがある。型が冗長で複雑になり、ブランドを外すときにも手間がかかる。

## キーワード

- [[branded-types|Branded types]]
- [[typescript|TypeScript]]
