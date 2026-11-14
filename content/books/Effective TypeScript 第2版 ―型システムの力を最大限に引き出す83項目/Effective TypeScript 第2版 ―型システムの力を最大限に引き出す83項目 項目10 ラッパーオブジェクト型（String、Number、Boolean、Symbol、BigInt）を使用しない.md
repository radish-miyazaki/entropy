---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目10 ラッパーオブジェクト型（String、Number、Boolean、Symbol、BigInt）を使用しない
description: String や Number などのラッパーオブジェクト型は使わず、string などのプリミティブ型を使うよう説く項目
tags: [book-chapter, typescript]
date: 2025-04-19
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 10
---

## TL;DR

- プリミティブ型のラッパーオブジェクトは使わない。ラッパーオブジェクトは、プリミティブ値にメソッドを提供したり、静的メソッドを提供したりするために存在している。
- ただし、`Symbol` と `BigInt` を `new` なしで呼び出すとプリミティブ値が生成されるので、問題ない。

## 内容

### プリミティブとラッパーオブジェクト

[[javascript|JavaScript]] は、`null` と `undefined` 以外のプリミティブ値を、必要に応じてラッパーオブジェクトに自動で変換する。プリミティブ型 `string`、`number`、`boolean`、`symbol`、`bigint` に対応するラッパーオブジェクトが、`String`、`Number`、`Boolean`、`Symbol`、`BigInt` である。ラッパーオブジェクトはメソッドや静的メソッドを提供するために存在しているので、直接インスタンス化する理由はない。

自動で変換されることは、`String.prototype` をモンキーパッチして確かめられる。

```js
const originalCharAt = String.prototype.charAt
String.prototype.charAt = function (pos) {
  console.log(this, typeof this, pos)
  return originalCharAt.call(this, pos)
}

"primitive".charAt(3)
// [String: 'primitive'] object 3
```

ラッパーオブジェクトはオブジェクトなので、自分自身としか等しくならない。

```js
"hello" === new String("hello") // false
new String("hello") === new String("hello") // false
```

### TypeScript での区別

[[typescript|TypeScript]] は、プリミティブとラッパーオブジェクトを別の型にすることで、この区別をモデリングしている。`string` は `String` に代入できるが、`String` は `string` に代入できない。そのため、次の関数は型エラーになる。こうした違いを考えるのは面倒なので、ラッパーオブジェクト型は使わないほうがよい。

```ts
const isGreeting = (phrase: String) => ["hello", "good day"].includes(phrase)
```

大文字の型で[[type-annotation|型アノテーション]]を付けた場合も、型はラッパーオブジェクトになる。ただし実行時の値はプリミティブのままである（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目3 コード生成は型に依存しないことを理解する|項目3]]）。このような型アノテーションは冗長で、読みやすさも下げるので避ける。

```ts
const s: String = "primitive" // string は String に代入できるので OK
```

[[typescript-eslint|typescript-eslint]] の [no-wrapper-object-types](https://typescript-eslint.io/rules/no-wrapper-object-types/) ルールを有効にすると、ラッパーオブジェクト型の利用を禁止できる。このルールは、recommended の設定で有効になる。

### BigInt と Symbol

`BigInt` と `Symbol` を `new` なしで呼び出すと、プリミティブ値が生成されるので問題ない。なお、`bigint` の値は、`123n` のように数値の末尾に `n` を付けても作れる。

```js
typeof BigInt(123) // 'bigint'
typeof Symbol("sym") // 'symbol'
```

## キーワード

- ラッパーオブジェクト
- [[type-annotation|型アノテーション]]
- [[typescript-eslint|typescript-eslint]]
- [[eslint|ESLint]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
