---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › エディターを使って型システムを調査、探求する
description: エディタの言語サービスで型を確かめながら書くと、型システムと型推論の直感が身につき、ライブラリの型宣言も読めると説く項目
tags: [book-chapter, typescript]
date: 2025-04-19
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 6
---

## TL;DR

- エディタの[[language-service|言語サービス]]で型を確かめると、[[type-system|型システム]]の動きや[[type-inference|型推論]]の直感が身につく。
- ライブラリの型宣言ファイルを読むと、そのライブラリのモデリングやエラーのデバッグ方法が分かる。

## 内容

### 言語サービスを使いこなす

[[typescript|TypeScript]] の言語サービスは `tsserver` が提供する。言語サービスとは、自動補完、インスペクション、ナビゲーション、[[refactoring|リファクタリング]]などの機能である。

IDE で型を確認すると、型システムがどう動き、TypeScript がどう型推論するかの直感を養える。シンボルやファイルのリネームなど、TypeScript のリファクタリング機能も使いこなすとよい。

### 型宣言ファイルを読む

言語サービスを使うと、外部ライブラリの型宣言ファイルや定義も確認できる。型宣言ファイルを読むと、使っているライブラリがどのようにモデリングされているか、エラーをどうデバッグすればよいかが分かる。

### 型を確かめて分かること

たとえば配列リテラルは `number[]` と推論されるので、タプル型にするには[[type-annotation|型アノテーション]]が必要になる。

```ts
const arr = [1, 2, 3] // number[]
const tuple: [number, number, number] = [1, 2, 3]
```

また、`typeof null` は `'object'` になる。

## キーワード

- [[language-service|言語サービス]]
- [[type-inference|型推論]]
- [[type-annotation|型アノテーション]]
- [[refactoring|リファクタリング]]

## 自分の理解

TS Playground でも外部ライブラリの定義を確認できることを、初めて知った。ただし、定義先のさらに定義先までは辿れない。
