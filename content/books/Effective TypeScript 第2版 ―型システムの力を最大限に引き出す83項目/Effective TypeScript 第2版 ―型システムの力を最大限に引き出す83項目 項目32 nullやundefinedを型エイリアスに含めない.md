---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › nullやundefinedを型エイリアスに含めない
description: 読み手が混乱するので、null や undefined をトップレベルの型エイリアスに含めないようにする項目
tags: [book-chapter, typescript]
date: 2025-04-18
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 32
---

## TL;DR

- 読み手が混乱するので、`null` や `undefined` をトップレベルの[[type-alias|型エイリアス]]に含めない。
- オブジェクトのプロパティの型に含めるのは問題ない。

## 内容

`null` や `undefined` をトップレベルの型エイリアスに含めると、名前から `null` を取りうることが読み取れず、読み手が混乱する。

```ts
type User = { id: string; name: string } | null // NG
type User = { id: string; name: string } // OK
```

避けるべきなのはトップレベルの場合だけである。オブジェクトのプロパティの型に含めるのは問題ない。

```ts
type BirthdayMap = { [name: string]: Date | undefined }
```

## キーワード

- [[typescript|TypeScript]]
- [[type-alias|型エイリアス]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
