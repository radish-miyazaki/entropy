---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › 安全でない型アサーションを、適切に型付けされた関数の内部に隠す
description: 安全でない型アサーションや any は適切に型付けされた関数の内部に隠し、型エラーを消すために関数の型シグネチャを妥協しないよう説く項目
tags: [book-chapter, typescript]
date: 2025-05-16
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 45
---

## TL;DR

- 安全でない[[type-assertion|型アサーション]]や `any` は、関数の内部に隠したほうが使いやすい関数になる。
- 実装の型エラーを消すために、関数の型シグネチャを妥協してはいけない。

## 内容

### 型アサーションを関数の内部に隠す

次の `checkedFetchJSON` は `unknown` を返す。

```ts
async function checkedFetchJSON(url: string): Promise<unknown> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Unable to fetch! ${response.statusText}`)
  }
  return response.json()
}
```

これをそのまま返すと、利用者が毎回型アサーションを書かなければならない。関数の内部でアサーションし、具体的な型を返すほうが扱いやすい。

```ts
// 🙅 NG: unknown だと利用者は型アサーションを必ずする必要があるので使いづらい
const fetchPeak = async (peakId: string): Promise<unknown> =>
  checkedFetchJSON(`/api/mountain-peaks/${peakId}`)

// 🙆 OK: MountainPeak という具体的な型なので扱いやすい
const fetchPeak = async (peakId: string): Promise<MountainPeak> =>
  checkedFetchJSON(`/api/mountain-peaks/${peakId}`) as Promise<MountainPeak>
```

このとき、関数の内部でデータを検証するとより安全になる。

```ts
const fetchPeak = async (peakId: string): Promise<MountainPeak> => {
  const maybePeak = checkedFetchJSON(`/api/mountain-peaks/${peakId}`)
  if (!maybePeak || typeof maybePeak !== "object" || !("firstAccentYear" in maybePeak)) {
    throw new Error(`Invalid mountain peak: ${JSON.stringify(maybePeak)}`)
  }
  // ...
}
```

### 型シグネチャを妥協しない

実装の型エラーを直すために、パラメータを `any` にするなどして型シグネチャを妥協してはいけない。次の例では、`b` を `any` にしたせいで、実行時にクラッシュする呼び出しが通ってしまう。

```ts
// 🙅 NG: 実行時にクラッシュするコードが許される
const shallowObjectEqual = (a: object, b: any): boolean => {
  for (const [k, aVal] of Object.entries(a)) {
    if (!(k in b) || aVal !== b[k]) {
      return false
    }
  }
  return Object.keys(a).length === Object.keys(b).length
}

shallowObjectEqual({ a: 1 }, null) // 実行時エラー
```

シグネチャは `object` のままにし、`any` は必要な式だけに使う（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目43 可能なかぎり狭いスコープでany型を使う|項目43 可能なかぎり狭いスコープでany型を使う]]）。

```ts
// 🙆 OK: any も最低限のスコープ内に収まっている
const shallowObjectEqual = (a: object, b: object): boolean => {
  for (const [k, aVal] of Object.entries(a)) {
    // `k in b` をチェックしているので、`(b as any)[k]` は安全
    if (!(k in b) || aVal !== (b as any)[k]) {
      return false
    }
  }
  return Object.keys(a).length === Object.keys(b).length
}

shallowObjectEqual({ a: 1 }, null) // 型エラー
```

### 型アサーションを使うときの注意

型アサーションを使うときは、必ずコメントで理由を説明し、[[unit-test|単体テスト]]も重点的に書く（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目9 型アノテーションを型アサーションより優先的に使用する|項目9 型アノテーションを型アサーションより優先的に使用する]]）。

## キーワード

- [[typescript|TypeScript]]
- [[type-assertion|型アサーション]]
- [[unit-test|単体テスト]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
