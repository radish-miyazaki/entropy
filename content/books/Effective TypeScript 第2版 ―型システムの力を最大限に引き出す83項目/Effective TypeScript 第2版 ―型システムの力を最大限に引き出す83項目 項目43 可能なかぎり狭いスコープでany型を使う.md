---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › 可能なかぎり狭いスコープでany型を使う
description: any を使うときはスコープをできるだけ狭くし、関数から any を返さないようにして、コードの他の部分の型安全性を守るべきだと説く項目
tags: [book-chapter, typescript]
date: 2025-05-02
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 43
---

## TL;DR

- どうしても `any` を使うときは、スコープをできるだけ狭くし、他の部分の型安全性を損なわないようにする。
- 関数から `any` を返すのは絶対に避ける。

## 内容

### スコープを狭くする

変数全体を `any` にすると、その変数を使うすべての箇所で型安全性が失われる。`any` は必要な式にだけ付ける。

```ts
// 🙅 Bad
const pizza: any = getPizza()
eatSalad(pizza)
pizza.slice() // 型安全でない

// 🙆 OK
const pizza = getPizza()
eatSalad(pizza as any)
pizza.slice() // 型安全
```

[`@ts-ignore`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html#suppress-errors-in-ts-files-using--ts-ignore-comments) や [`@ts-expect-error`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#-ts-expect-error-comments) でも型エラーを回避できる。これらのコメントが効くのは次の 1 行だけなので、他に影響しない。エラーがなくなったときにエラーになる `@ts-expect-error` のほうが望ましい。ただし、意図しない別のエラーが起きても気づけないので、頼りすぎないこと。

オブジェクトの場合も、オブジェクト全体ではなく個々のプロパティに `as any` を付けてスコープを狭める。

### 関数から any を返さない

関数が `any` を返すと、その呼び出し元の型安全性まで損なわれる。

```ts
function eatDinner1() {
  const pizza: any = getPizza()
  // ...
  return pizza
} // 戻り値の型が any

function spiceItUp() {
  const pizza = eatDinner1()
  pizza.addRedPepperFlakes() // 型安全でない
}
```

戻り値に型アノテーションを付けると、意図しない `any` を防げる。ただし、推論できる型を書きすぎないように注意する（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目18 推論可能な型でコードを乱雑にしない|項目18 推論可能な型でコードを乱雑にしない]]）。また、標準 API にも `any` を返すものがある。

```ts
JSON.parse(text: string, reviver?: (this: any, key: string, value: any) => any): any
```

### Linter で検出する

[[typescript-eslint|typescript-eslint]] の [recommended-type-checked](https://typescript-eslint.io/users/configs/#recommended-type-checked) を有効にすると、[no-unsafe-assignment](https://typescript-eslint.io/rules/no-unsafe-assignment/) や [no-unsafe-return](https://typescript-eslint.io/rules/no-unsafe-return/) などのルールが有効になり、`any` の拡散を検出できる。

## キーワード

- [[typescript|TypeScript]]
- [[typescript-eslint|typescript-eslint]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
