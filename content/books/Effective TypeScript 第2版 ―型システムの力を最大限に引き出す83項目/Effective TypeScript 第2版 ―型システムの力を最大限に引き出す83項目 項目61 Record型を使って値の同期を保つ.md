---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目61 Record型を使って値の同期を保つ
description: Fail Open と Fail Closed のジレンマを意識し、Record 型で関連する値と型を同期させてプロパティの追加漏れを防ぐ項目
tags: [book-chapter, typescript]
date: 2025-05-05
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 61
---

## TL;DR

- Fail Open と Fail Closed のどちらにも[[trade-off|トレードオフ]]があり、ジレンマになる。
- `Record` 型を使うと、関連する値と型を同期させ、プロパティを変えたときに対応を強制できる。

## 内容

### Fail Open と Fail Closed のジレンマ

Fail Open は、何かに失敗しても処理を続けることである。Fail Closed は、何かに失敗したら処理を止めることである。可用性や継続性を重視するなら Fail Open を、安全性を重視するなら Fail Closed を選ぶことになる。しかし、どちらも完全な解決策ではなく、必ずトレードオフがある。どちらかを選ぶのではなく、ジレンマそのものを避ける方法を探すのも 1 つの手である。

### Record 型で値と型を同期させる

`Record` 型を使うと、関連する値と型を同期させられる。次の例では、`ScatterProps` の各プロパティについて、変わったときに更新が必要かを `Record<keyof ScatterProps, boolean>` で持っている。

```ts
interface ScatterProps {
  xs: number[]
  ys: number[]
  xRange: [number, number]
  yRange: [number, number]
  onClick?: (x: number, y: number, index: number) => void
}
```

```ts
const REQUIRES_UPDATE: Record<keyof ScatterProps, boolean> = {
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,
  onClick: false,
}
```

この状態でインタフェースのプロパティを追加したり変更したりすると、値の側で型エラーが出る。これにより、変更したプロパティについて何らかの対応を強制できる。

## キーワード

- Fail Open
- Fail Closed
- [[trade-off|トレードオフ]]
- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
