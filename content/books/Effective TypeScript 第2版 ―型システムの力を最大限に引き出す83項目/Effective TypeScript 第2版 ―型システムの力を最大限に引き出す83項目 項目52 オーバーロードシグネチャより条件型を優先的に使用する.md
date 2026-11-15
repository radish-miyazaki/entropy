---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › オーバーロードシグネチャより条件型を優先的に使用する
description: 条件型はユニオン型に分配されるので、オーバーロードシグネチャより条件型を優先して使うべきだと説く項目
tags: [book-chapter, typescript]
date: 2025-06-03
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 52
---

## TL;DR

- [[function-overloading|オーバーロード]]シグネチャより[[conditional-types|条件型]]を優先して使う。条件型はユニオン型に分配されるので、ユニオン型の引数も扱える。
- 条件型を返す関数の実装では、オーバーロードを 1 つだけ定義すると型エラーを避けられる。

## 内容

### 条件型を優先する理由

次の 2 つは、オーバーロードシグネチャと条件型で同じ関数を表したものである。

```ts
declare function double(x: number): number
declare function double(x: string): string
```

```ts
declare function double<T extends string | number>(x: T): T extends string ? string : number
```

条件型は[[union-type|ユニオン型]]に分配されるので、ユニオン型の引数もサポートできる。オーバーロードシグネチャでは、次の呼び出しが型エラーになる。

```ts
function f(x: string | number) {
  return double(x) // オーバーロードシグネチャの場合だと型エラー: No overload matches this call.
}
```

条件型では次のように分配され、`string | number` が返る。

```ts
(string | number) ? string : number
→ string ? string : number | number ? string : number
→ string | number
```

条件型を書くときは、ユニオン型に分配させたいかを考える（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目53 条件型のユニオンでの分配を制御する|項目53 条件型のユニオンでの分配を制御する]]）。ユニオン型を受け付けられない場合や、まったく異なるシグネチャを持つ場合は、条件型にせず、名前の異なる 2 つ以上の関数に分けられないかを検討する。そのほうが可読性が高まる。

### 条件型を返す関数の実装

オーバーロードした関数や条件型を返す関数を実装するとき、TypeScript は戻り値が条件型を満たすかを判断できない。そのため、次のコードは型アサーションがないと型エラーになる。

```ts
function double<T extends string | number>(x: T): T extends string ? string : number {
  return typeof x === "string" ? x + x : x + x // 型エラー
}
```

これを避けるには、オーバーロードを 1 つだけ定義すればよい。

```ts
function double<T extends string | number>(x: T): T extends string ? string : number
function double(x: string | number): string | number {
  return typeof x === "string" ? ((x + x) as any) : ((x + x) as any)
}
```

ただしこれも完璧ではないので、テストが必要である（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目55 型のテストを書く|項目55 型のテストを書く]]）。将来はオーバーロードを使わずに実装できるようになると、公式から言及がある。

## キーワード

- [[typescript|TypeScript]]
- [[function-overloading|オーバーロード]]
- [[conditional-types|条件型]]
- [[union-type|ユニオン型]]
- [[type-assertion|型アサーション]]

## 自分の理解

オーバーロードを使わずに型アサーションで回避するなら、次のように書ける。

```ts
function double<T extends string | number>(x: T): T extends string ? string : number {
  if (typeof x === "string") {
    return (x + x) as unknown as T extends string ? string : number
  } else {
    return ((x as number) + (x as number)) as unknown as T extends string ? string : number
  }
}
```
