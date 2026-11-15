---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › クラスやカリー化を使って型パラメーターを段階的に割り当てる
description: 型パラメータの一部だけを明示し残りを推論させたいときに、クラスやカリー化で型パラメータを段階的に割り当てる項目
tags: [book-chapter, typescript]
date: 2025-04-25
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 28
---

## TL;DR

- [[typescript|TypeScript]] では、型パラメータをすべて推論させるか、すべて明示するかのどちらかしか選べない。
- 一部だけを明示したいときは、クラスや[[currying|カリー化]]で型パラメータを段階的に割り当てる。

## 内容

### 型パラメータは一部だけ明示できない

TypeScript では、型パラメータをすべて[[type-inference|推論]]させるか、すべて明示的に指定するかを選ぶ必要がある。そのため、次のコードは型エラーになる。

```ts
function fetchAPI<API, Path extends keyof API>(path: Path): Promise<API[Path]> { ... }

export interface SeedAPI {
  '/seed': Seed[]
  '/seed/apple': Seed
  '/seed/strawberry': Seed
}
fetchAPI<SeedAPI>('/seed/strawberry') // 型エラー: Expected 2 type arguments, but got 1.
```

`Path` の型も渡せば解消するが、記述が冗長になる。

```ts
fetchAPI<SeedAPI, "/seed/strawberry">("/seed/strawberry")
```

### 型パラメータを段階的に割り当てる

これを避けるには、型パラメータを段階的に渡す。1 つ目の方法はクラスを使うことである。

```ts
declare class ApiFetcher<API> {
  fetch<Path extends keyof API>(path: Path): Promise<API[Path]>
}
```

```ts
const fetcher = new ApiFetcher<SeedAPI>() // 明示的に指定
const berry = await fetcher.fetch("/seed/strawberry") // 型推論
```

2 つ目の方法はカリー化である。

```ts
declare function fetchAPI<API>(): <Path extends keyof API>(path: Path) => Promise<API[Path]>
```

```ts
const berry = await fetchAPI<SeedAPI>()("/seed/strawberry")
```

どちらを採用してもよいが、カリー化ではローカルな[[type-alias|型エイリアス]]を作れる。

```ts
function fetchAPI<API>() {
  // ローカルな型エイリアス
  type Routes = keyof API & string

  return <Path extends Routes>(path: Path): Promise<API[Path]> => fetch(path).then((r) => r.json())
}
```

## キーワード

- [[typescript|TypeScript]]
- [[currying|カリー化]]
- [[type-inference|型推論]]
- [[type-alias|型エイリアス]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
