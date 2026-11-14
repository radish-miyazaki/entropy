---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目57 再帰的なジェネリック型は末尾再帰にする
description: 再帰的なジェネリック型をアキュムレータで末尾再帰に書き直すと、末尾呼び出し最適化が効いて再帰の深さの制限が緩くなる項目
tags: [book-chapter, typescript]
date: 2025-04-25
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 57
---

## TL;DR

- 再帰的な[[generics|ジェネリック型]]を末尾再帰にすると、[[tail-call-optimization|末尾呼び出し最適化]]（TCO）が効き、再帰の深さの制限が大幅に緩くなる。
- 多くの場合、アキュムレータを使って書き直せば末尾再帰にできる。

## 内容

### 末尾再帰にすると深い再帰に耐えられる

再帰的なジェネリック型を末尾再帰にすると、末尾呼び出し最適化が効く。これにより、再帰呼び出しの深さの制限が大幅に緩くなる。次の型は、再帰呼び出しの結果をユニオン型に組み込んでいるので末尾再帰ではなく、長い文字列を渡すと型エラーになる。

```ts
type GetChars<S extends string> = S extends `${infer FirstChar}${infer RestOfString}`
  ? FirstChar | GetChars<RestOfString>
  : never

type Alphabet = GetChars<"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"> // 型エラー
```

### アキュムレータで書き直す

再帰的な型エイリアスの多くは、アキュムレータを使うように書き直せば末尾再帰にできる。次の `ToSnake` は camelCase を snake_case に変換する型で、書き直す前は長い文字列で型エラーになる。

```ts
type ToSnake<T extends string> = string extends T
  ? string
  : T extends `${infer First}${infer Rest}`
    ? First extends Uppercase<First> // First は大文字か
      ? `_${Lowercase<First>}${ToSnake<Rest>}` // e.g. B は _b に変換
      : `${First}${ToSnake<Rest>}`
    : T

type Long = ToSnake<"reallyDescriptiveNamePropThatsALittleTooLoquacious"> // 型エラー
```

変換済みの部分を型パラメータ `Acc` に貯めながら進めると、再帰呼び出しが末尾に来るので型エラーにならない。

```ts
type ToSnake<T extends string, Acc extends string = ""> = string extends T
  ? string
  : T extends `${infer First}${infer Rest}`
    ? ToSnake<
        // 末尾再帰
        Rest,
        First extends Uppercase<First> ? `${Acc}_${Lowercase<First>}` : `${Acc}${First}`
      >
    : Acc

type Long = ToSnake<"reallyDescriptiveNamePropThatsALittleTooLoquacious"> // OK
```

### 値空間での末尾呼び出し最適化

ES2015 は、[[javascript|JavaScript]] エンジンに末尾呼び出し最適化のサポートを求めている。しかし現時点でサポートしているのは Safari だけである。そのため、値空間で TCO を実際に確かめるには、V8（Chrome）ベースの [[nodejs|Node.js]] のようなランタイムではなく、JavaScriptCore（Safari）ベースの [[bun|Bun]] のようなランタイムを使う必要がある。

## キーワード

- [[generics|ジェネリック型]]
- [[tail-call-optimization|末尾呼び出し最適化]]
- [[conditional-types|条件型]]
- [[template-literal-types|テンプレートリテラル型]]
- [[javascript|JavaScript]]
- [[nodejs|Node.js]]
- [[bun|Bun]]
- [[typescript|TypeScript]]

## 自分の理解

アキュムレータを使って末尾再帰にする書き方は、値空間での再帰処理と同じである。
