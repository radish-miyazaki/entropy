---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目34 ユニオンを含むインターフェイスよりも、インターフェイスのユニオンを選択する
description: ユニオン型のプロパティを複数持つインタフェースはプロパティ間の関係を表せないので、インタフェースのユニオンやタグ付きユニオンを使う項目
tags: [book-chapter, typescript]
date: 2025-05-06
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 34
---

## TL;DR

- [[union-type|ユニオン型]]のプロパティを複数持つインタフェースは、プロパティ間の関係を表せていないことがある。その場合はインタフェースのユニオンにする。
- 制御フロー解析で絞り込みやすくするため、[[tagged-union|タグ付きユニオン]]を使うとよい。
- 一緒に存在する複数のオプションプロパティは、1 つのオプションプロパティにまとめる。

## 内容

### インタフェースのユニオンにする

ユニオン型のプロパティを複数持つインタフェースは、プロパティ間の関係を明確に表せていないことがある（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目29 有効な状態のみ表現する型を作る|項目29]]）。次の `Layer` では、`layout` が `FillLayout` なのに `paint` が `LinePaint` という組み合わせも許してしまう。

```ts
// NG
interface Layer {
  layout: FillLayout | LineLayout | PointLayout
  paint: FillPaint | LinePaint | PointPaint
}
```

この場合は、代わりにインタフェースのユニオンを検討する。

```ts
// OK
interface FillLayer {
  layout: FillLayout
  paint: FillPaint
}
interface LineLayer {
  layout: LineLayout
  paint: LinePaint
}
interface PointLayer {
  layout: PointLayout
  paint: PointPaint
}
type Layer = FillLayer | LineLayer | PointLayer
```

### タグ付きユニオンを使う

制御フロー解析で[[type-narrowing|型を絞り込み]]やすくするため、タグ付きユニオンを使うとよい。このパターンは [[typescript|TypeScript]] で頻繁に使われる。

```ts
interface FillLayer {
  type: "fill"
  layout: FillLayout
  paint: FillPaint
}
interface LineLayer {
  type: "line"
  layout: LineLayout
  paint: LinePaint
}
interface PointLayer {
  type: "point"
  layout: PointLayout
  paint: PointPaint
}
type Layer = FillLayer | LineLayer | PointLayer
```

```ts
const drawLayer = (layer: Layer) => {
  if (layer.type === "fill") {
    const { paint } = layer
    //      ^? const paint: FillPaint
    const { layout } = layer
    //      ^? const layout: FillLayout
  }
  // ...
}
```

### オプションプロパティをまとめる

データを正確にモデリングするため、複数のオプションプロパティを 1 つにまとめられないか検討する。次の `Person` では、`placeOfBirth` と `dateOfBirth` は両方存在するか、両方存在しないかのどちらかだが、型からはそれが分からない。

```ts
// NG
interface Person {
  name: string
  placeOfBirth?: string
  dateOfBirth?: Date
}
```

```ts
// OK
interface Person {
  name: string
  birth?: {
    placeOfBirth: string
    dateOfBirth: Date
  }
}
```

データ構造を変えられない場合は、インタフェースのユニオンを使えばよい。

```ts
interface Name {
  name: string
}
interface PersonWithBirth extends Name {
  placeOfBirth: string
  dateOfBirth: Date
}
type Person = Name | PersonWithBirth
```

## キーワード

- [[typescript|TypeScript]]
- [[union-type|ユニオン型]]
- [[tagged-union|タグ付きユニオン]]
- [[type-narrowing|型の絞り込み]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
