---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › 型が不明な値には、anyではなくunknownを使う
description: 型が不明な値には any ではなく unknown を使い、型アサーションや型の絞り込みを利用者に強制すべきだと説く項目
tags: [book-chapter, typescript]
date: 2025-04-22
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 46
---

## TL;DR

- 関数の戻り値など、型が不明な値には `any` の代わりに `unknown` を使う。
- `unknown` の値を使うには、[[type-assertion|型アサーション]]や[[type-narrowing|型の絞り込み]]が必要になる。

## 内容

### any と unknown の違い

`any` は次の 2 つの性質を持つため、型を値の集合として扱う型チェック（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目7 型を値の集合として考える|項目7 型を値の集合として考える]]）を無効にしてしまう。

1. すべての型は `any` に代入できる。つまり `any` は他のすべての型のスーパータイプである。
2. `any` は `never` 以外のすべての型に代入できる。つまり `any` はすべての型のサブタイプである。

`unknown` は 1 の性質だけを持つトップ型である。逆に `never` は 2 の性質だけを持つボトム型である。そのため、`unknown` の値のプロパティにアクセスしたり、関数として呼び出したりすると型エラーになる。これにより、型アサーションや型の絞り込み（`instanceof` や[[user-defined-type-guard|ユーザー定義型ガード]]）を強制できる。

ただし、`unknown` を絞り込むには多くの証拠が必要になる。

```ts
function isBook(value: unknown): value is Book {
  return typeof value === "object" && value != null && "name" in value && "author" in value
}
```

また、ガードが正しく実装されているか、型の変化に合わせて更新されているかを確かめる仕組みがないので、ユーザー定義型ガードは型アサーションと同じく安全ではない。解決策は[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目74 実行時に型を再構築する方法を知る|項目74 実行時に型を再構築する方法を知る]]で扱う。

### 型パラメータで代用しない

`unknown` の代わりに型パラメータを使うこともできるが、戻り値の型にしか使われない型パラメータはアンチパターンである。

```ts
function safeParseYAML<T>(yaml: string): T { ... }
```

これは機能的には型アサーションと同じで、安全ではない（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目51 不必要な型パラメーターを避ける|項目51 不必要な型パラメーターを避ける]]）。

### ダブルアサーション

ダブルアサーションでも、`any` の代わりに `unknown` を使える。機能は同じだが、`any` を使うことへの抵抗を避けられる。

```ts
declare const foo: Foo
let barAny = foo as any as Bar
let barUnk = foo as unknown as Bar
```

### {} や object との違い

`{}` や `object` も幅広い値を受け付ける型だが、`unknown` よりは狭い。

- `{}` 型と `Object` 型: `null` と `undefined` 以外のすべての値
- `object` 型: すべての非プリミティブ値。`true`、`12`、`'foo'` は含まないが、オブジェクト、配列、関数は含む

`null` や `undefined` 以外だけを許可したい場面はほとんどないので、一般には `unknown` のほうが好ましい。

## キーワード

- [[typescript|TypeScript]]
- [[type-assertion|型アサーション]]
- [[type-narrowing|型の絞り込み]]
- [[user-defined-type-guard|ユーザー定義型ガード]]

## 自分の理解

`typeof null` を実行すると `'object'` が返るが、`null` はプリミティブ値である（[The history of “typeof null”](https://2ality.com/2013/10/typeof-null.html)）。
