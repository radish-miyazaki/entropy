---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目23 エイリアスを作成したら一貫してそれを使う
description: 値のエイリアスは型の絞り込みを妨げることがあるので、作ったら一貫してそれを使い、分割代入で名前をそろえる項目
tags: [book-chapter, typescript]
date: 2025-05-04
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 23
---

## TL;DR

- 値のエイリアスは、TypeScript による[[type-narrowing|型の絞り込み]]を妨げることがある。エイリアスを作ったら一貫してそれを使う。
- [[destructuring-assignment|分割代入]]を使うと、名前に一貫性が生まれ、コードも簡潔になる。

## 内容

### エイリアスとは

エイリアスとは、同じ値を別の名前で参照することである。参照型やポインタに近いイメージである。

```ts
const place = { name: "New York", latLng: [41.6868, -74.2692] }
const loc = place.latLng
```

エイリアスを通じてプロパティを変更すると、元の値にも反映される。

```ts
loc[0] = 0
place.latLng // [0, -74.2692]
```

### TypeScript でのエイリアス

[[typescript|TypeScript]] では、エイリアスを導入したら一貫してそれを使う。エイリアスが型の絞り込みを妨げることがあるからである。次のコードでは、`polygon.bbox` で絞り込んでも、エイリアスの `box` は絞り込まれない。

```ts
const isPointInPolygon = (polygon: Polygon, pt: Coordinate) => {
  const box = polygon.bbox // box: BoundingBox | undefined
  if (polygon.bbox) {
    if (
      pt.x < box.x[0] ||
      pt.x > box.x[1] ||
      //     ---                --- 'box' is possibly 'undefined'
      pt.y < box.y[0] ||
      pt.y > box.y[1]
      //     ---                --- 'box' is possibly 'undefined'
    ) {
      return false
    }
  }
  // ...
}
```

このとき分割代入（`const { bbox } = polygon`）を使うと、変数名に[[consistency|一貫性]]が生まれ、コードも簡潔になる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目41 ドメインの言語を使って型を命名する|項目41]]）。

### 注意点

関数にオブジェクトを渡すと、その関数がプロパティを削除する可能性がある。そのため、本来はプロパティの型の絞り込みが無効になりうる。しかし TypeScript は利便性を優先し、関数が型の絞り込みを無効にしないと仮定する。

```ts
polygon.bbox
//      ^? (property) Polygon.bbox?: BoundingBox | undefined
if (polygon.bbox) {
  polygon.bbox
  //      ^? (property) Polygon.bbox?: BoundingBox
  expandABit(polygon)
  polygon.bbox
  //      ^? (property) Polygon.bbox?: BoundingBox
}
```

この仮定が[[soundness|健全性]]を損なう原因になる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目48 健全性の罠を回避する|項目48]]）。

以上を踏まえると、ローカル変数による型の絞り込みを信頼したほうがよい。ただしこのままだと、変数と元のオブジェクトとで値が食い違う[[side-effect|副作用]]が起こりうる。これが心配なら、関数には `readonly` なオブジェクトを渡すとよい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目14 readonlyを使用して変更にまつわるエラーを避ける|項目14]]）。

## キーワード

- [[typescript|TypeScript]]
- [[type-narrowing|型の絞り込み]]
- [[destructuring-assignment|分割代入]]
- [[consistency|一貫性]]
- [[soundness|健全]]
- [[side-effect|副作用]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
