---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目30 入力には寛容に、出力には厳格に
description: 関数のシグネチャに Postel の法則を当てはめ、引数の型は寛容に、戻り値の型は厳格にする項目
tags: [book-chapter, typescript]
date: 2025-04-22
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 30
---

## TL;DR

- 関数のシグネチャにも [[robustness-principle|Postel の法則]]を当てはめ、入力（引数）の型は寛容に、出力（戻り値）の型は厳格にする。
- 入出力で型を再利用できるよう、出力用の正規の型と、入力用の寛容な型を用意するとよい。

## 内容

### 入力には寛容に、出力には厳格に

関数のシグネチャにも Postel の法則を適用できる。つまり、引数の型はより寛容に、戻り値の型はより厳格にする。戻り値の型が寛容だと（たとえばプロパティが省略可能だと）、呼び出し側で扱いにくい。この原則に従うと、オプションプロパティや[[union-type|ユニオン型]]は、主に入力の型に現れるはずである。

### 正規の型と寛容な型を分ける

入出力で型を再利用するには、出力の型に使う正規の形式と、入力の型に使う寛容な形式を用意するとよい。

```ts
// 出力の型
interface LngLat {
  lng: number
  lat: number
}
interface Camera {
  center: LngLat
  zoom: number
  bearing: number
  pitch: number
}

// 入力の型
type LngLatLike = LngLat | { lon: number; lat: number } | [number, number]
interface CameraOptions extends Omit<Partial<Camera>, "center"> {
  center?: LngLatLike
}
```

```ts
function setCamera(camera: CameraOptions): void { ... }
function viewportForBounds(bounds: LngLatBounds): Camera { ... }
```

### 反復処理するだけなら Iterable

入力値を反復処理するだけなら、`Iterable<T>` が最も寛容な型である（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目17 数値型のインデックスシグネチャを避ける|項目17]]）。

```ts
function sum(xs: Iterable<number>): number {
  let sum = 0
  for (const x of xs) {
    sum += x
  }
  return sum
}
```

`Iterable<T>` を受け取るようにすれば、[[generator|ジェネレータ]]も渡せる。

```ts
function* range(limit: number) {
  for (let i = 0; i < limit; i++) {
    yield i
  }
}
const zeroToNine = range(10)
const fortyFive = sum(zeroToNine)
```

## キーワード

- [[typescript|TypeScript]]
- [[robustness-principle|Postel の法則]]
- [[union-type|ユニオン型]]
- [[generator|ジェネレータ]]

## 自分の理解

[[100 Go Mistakes and How to Avoid Them]] にも、同じ考え方の項目があった（[インタフェースを返す (#7)](https://100go.co/ja/#7)）。
