---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目68 APIのコメントにTSDocを使う
description: 公開する API のドキュメントは TSDoc で書き、型情報は繰り返さず、非推奨の API には @deprecated を付ける項目
tags: [book-chapter, typescript]
date: 2025-04-18
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 68
---

## TL;DR

- 公開する API（`export` しているクラスや関数、型）のドキュメントは [[tsdoc|TSDoc]] で書く。TSDoc では `@param` や `@returns`、[[markdown|Markdown]] が使える。
- 型情報はドキュメントに書かない。非推奨になった API には `@deprecated` を付ける。

## 内容

### TSDoc で書く

公開する API を説明するコメントは TSDoc で書くべきである。多くの IDE やエディタ（[[zed|Zed]] など）が TSDoc に対応しているからである。TSDoc は [[jsdoc|JSDoc]] とほぼ同じ書き方ができ、[`@param`](https://tsdoc.org/pages/tags/param/) や [`@returns`](https://tsdoc.org/pages/tags/returns/) などのタグを使える。

型定義にも TSDoc を書ける。

```ts
/** ある時間にある場所で行われた運動量の計測 */
interface Measurement {
  /** 計測の行われた場所 */
  position: Vector3D
  /** 計測の行われた時間、UNIX epoch からの秒数 */
  time: number
  /** 観測された運動量 */
  momentum: Vector3D
}
```

個々のフィールドに書いたドキュメントは、`Partial<T>` や `Pick<T, Keys>` のようなポリモーフィックな[[mapped-type|マップ型]]にも引き継がれる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目15 型演算とジェネリック型を使って重複を避ける|項目15 型演算とジェネリック型を使って重複を避ける]]）。

```ts
type PartialMeasurement = Partial<Measurement>
```

ジェネリック型の型パラメータの説明には、[`@typeParam`](https://tsdoc.org/pages/tags/typeparam/) か `@template` を使う（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目50 ジェネリックを型に対する関数と考える|項目50 ジェネリックを型に対する関数と考える]]）。

### Markdown を使う

TSDoc には Markdown が使える。ただし、コメントは短く、要点を押さえて書く。

```ts
/**
 * この _interface_ はプロパティを**3つ**持つ
 * 1. x
 * 2. y
 * 3. z
 */
interface Vector3D {
  x: number
  y: number
  z: number
}
```

### 型情報を書かない

JSDoc には `@param {string} name ...` のように型情報を書く方法があるが、TypeScript では不要なので書かない（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目31 型情報をドキュメントで繰り返さない|項目31 型情報をドキュメントで繰り返さない]]）。

### 非推奨の API には @deprecated を付ける

非推奨の API には `@deprecated` を付ける。`@deprecated` を付けたシンボルは、エディタ上や補完の候補で取り消し線付きで表示される。

## キーワード

- [[tsdoc|TSDoc]]
- [[jsdoc|JSDoc]]
- [[markdown|Markdown]]
- [[mapped-type|マップ型]]
- [[zed|Zed]]
- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
