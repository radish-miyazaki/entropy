---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目71 モジュールオーグメンテーションを使って型を改善する
description: 宣言のマージを使って、any を返す既存 API を unknown を返すように直したり、問題のある使い方を禁止したりする項目
tags: [book-chapter, typescript]
date: 2025-06-06
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 71
---

## TL;DR

- [[declaration-merging|宣言のマージ]]を使うと、既存の API の型を改善できる。`any` を返す API を `unknown` を返すように直したり、問題のある使い方を禁止したりできる。
- 実行時の動作は変わらないので、この 2 つの用途以外ではなるべく使わない。

## 内容

### any を返す API を改善する

宣言のマージを使うと、既存の API の型を改善できる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目13 type（型エイリアス）とinterfaceの違いを知る|項目13 type（型エイリアス）とinterfaceの違いを知る]]）。たとえば `JSON.parse` は `any` を返すが、次のように書けば `unknown` を返すようになる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目46 型が不明な値には、anyではなくunknownを使う|項目46 型が不明な値には、anyではなくunknownを使う]]）。

```ts
// safe-json.d.ts
interface JSON {
  parse(text: string, reviver?: (this: any, key: string, value: any) => any): unknown
}
```

```ts
declare let apiResponse: string
const response = JSON.parse(apiResponse)
//    ^? const response: unknown
```

これで、使うときには[[type-assertion|型アサーション]]が必須になる。

```ts
const cacheExpirationTime = response.lastModified + 3600
//                          ~~~~~~~~ 'response' is of type 'unknown'.
```

```ts
interface ApiResponse {
  lastModified: number
}

const response = JSON.parse(apiResponse) as ApiResponse
const cacheExpirationTime = response.lastModified + 3600
```

[[fetch-api|Fetch API]] の `Response.prototype.json()` も `any` を返すが、`JSON.parse` と同じように直せる。

```ts
interface Body {
  json(): Promise<unknown>
}
```

### 問題のある使い方を禁止する

問題のある機能の使用を禁止することもできる。たとえば `Set` のコンストラクタに `string` を渡すと、`'abc'` は `Set (3) { 'a', 'b', 'c' }` という意図しない値になる。これを防ぐには、`string` を渡したときに `void` を返すようにすればよい。すると、コンストラクタの戻り値を使おうとしたときに型エラーが出る。

```ts
const s = new Set("abc")
//    ^? const s: void
console.log(s.has("abc"))
//            ~~~ Property 'has' does not exist on type 'void'.
```

何が起きているのかをより明確に伝えたいなら、エラーメッセージを戻り値の型にし、`@deprecated` を付けるとよい。

```ts
interface SetConstructor {
  /** @deprecated */
  new (str: string): "Error! new Set(string) is banned"
}
```

本来は `new` した時点で型エラーにしたいが、今の TypeScript ではできない。

### 使うときの注意

[[module-augmentation|モジュールオーグメンテーション]]は、実行時の動作には影響しない。上の 2 つの用途以外では、なるべく使わない。実行時の挙動を反映しない型を足すと、読み手を混乱させるおそれがあるからである（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目40 正確でない型より精度の低い型を選択する|項目40 正確でない型より精度の低い型を選択する]]）。また、すでに `void` を返す関数やメソッドの使用は、この方法では禁止できない。

## キーワード

- [[module-augmentation|モジュールオーグメンテーション]]
- [[declaration-merging|宣言のマージ]]
- [[type-assertion|型アサーション]]
- [[fetch-api|Fetch API]]
- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
