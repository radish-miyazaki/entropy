---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › テンプレートリテラル型を使ってDSLや文字列間の関係をモデリングする
description: テンプレートリテラル型で構造化された文字列を表し、ジェネリクスや条件型と組み合わせて型どうしの関係や DSL のパーサを表現する項目
tags: [book-chapter, typescript]
date: 2025-06-03
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 54
---

## TL;DR

- [[template-literal-types|テンプレートリテラル型]]を使うと、`string` より構造化された文字列をモデリングできる。
- [[generics|ジェネリクス]]や[[type-inference|型推論]]、[[conditional-types|条件型]]と組み合わせると、型どうしの関係や [[domain-specific-language|DSL]] のパーサを型で表現できる。

## 内容

### 構造化された文字列をモデリングする

テンプレートリテラル型の[[domain|ドメイン]]は、`string` と同じく無限である。ただし、テンプレートリテラル型を使うと、より構造化された文字列をモデリングできる。たとえば DOM 要素の `data-` で始まるプロパティは次のように書ける。

```ts
interface Checkbox {
  id: string
  checked: boolean
  [key: `data-${string}`]: unknown
}
```

### 型どうしの関係を表現する

テンプレートリテラル型をジェネリクスや型推論と組み合わせると、型どうしの関係を表現できる。例として `querySelector` の挙動を改善する。標準の型定義では、タグ名だけのセレクタなら `HTMLImageElement | null` が返るが、ID を付けると `Element | null` になってしまう。

```ts
// 修正前
const img = document.querySelector("img") // HTMLImageElement | null
const img = document.querySelector("img#spectacular-sunset") // Element | null
```

`タグ名#ID` の形のセレクタからタグ名を取り出すオーバーロードを足すと、ID 付きでも要素の型が残る。

```ts
type HTMLTag = keyof HTMLElementTagNameMap
type CSSSpecialChars = " " | ">" | "+" | "-" | "||" | ","

declare global {
  interface ParentNode {
    querySelector(selector: `${HTMLTag}#${string}${CSSSpecialChars}${string}`): Element | null

    querySelector<TagName extends HTMLTag>(
      selector: `${TagName}#${string}`,
    ): HTMLElementTagNameMap[TagName] | null
  }
}

const img = document.querySelector("img#spectacular-sunset") // HTMLImageElement | null
```

より厳密な CSS セレクタのパーサを作ることもできるが、ここでは最低限の実装にとどめている。

### DSL のパーサを実装する

テンプレートリテラル型を条件型と組み合わせると、DSL のパーサを型で実装できる。次の例は、snake_case のオブジェクトのキーを camelCase に変換する型である。

```ts
type ToCamel<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<ToCamel<Tail>>}`
  : S

type ObjectToCamel<T extends object> = {
  [K in keyof T as K extends string ? ToCamel<K> : K extends number ? K : never]: T[K]
}

function objectToCamel<T extends object>(obj: T): ObjectToCamel<T> {
  const out: any = {}
  for (const [k, v] of Object.entries(obj)) {
    out[camelCase(k)] = v
  }
  return out
}

const snake = { foo_bar: 12 }
const camel = objectToCamel(snake)
const val = camel.fooBar
//    ^? const camel: ObjectToCamel<{ foo_bar: number; }>
const val2 = camel.foo_bar
//                 ~~~~~~~ Property 'foo_bar' does not exist on type
//                         'ObjectToCamel<{ foo_bar: number; }>'.
```

この実装では `camel` の型の表示が理想的ではないが、これは改善できる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目56 型の表示に配慮する|項目56 型の表示に配慮する]]）。

### 使うときの注意

テンプレートリテラル型を使うときは、利用者がテンプレートリテラル型や条件型、[[mapped-type|マップ型]]といった TypeScript の高度な機能を知らなくても、開発者体験が良くなるように努める。

## キーワード

- [[template-literal-types|テンプレートリテラル型]]
- [[conditional-types|条件型]]
- [[mapped-type|マップ型]]
- [[generics|ジェネリクス]]
- [[type-inference|型推論]]
- [[domain-specific-language|DSL]]
- [[domain|ドメイン]]
- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
