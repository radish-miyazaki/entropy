---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目49 型カバレッジを監視し、型安全性のリグレッションを防ぐ
description: noImplicitAny を有効にしても any は入り込むので、type-coverage などで型カバレッジを監視し、型安全性を保つべきだと説く項目
tags: [book-chapter, typescript]
date: 2025-05-02
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 49
---

## TL;DR

- `noImplicitAny` を有効にしても、明示的な `any` とサードパーティの型宣言から `any` が入り込む。
- コードベースの `any` の数を監視すると、`any` を使う判断を見直すきっかけになり、型安全性を高めていける。

## 内容

### any が入り込む 2 つの経路

`noImplicitAny` を有効にしても、次の 2 つの経路から `any` が入り込む。

1 つ目は、明示的な `any` 型である（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目43 可能なかぎり狭いスコープでany型を使う|項目43]]、[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目44 anyをそのまま使うのではなく、より具体的な形式で使う|項目44]]）。特に `any[]` や `{ [key: string]: any }` は、要素の型が `any` なので、コードに入り込むと厄介である。

2 つ目は、サードパーティの型宣言である。`@types` の宣言ファイルに由来する `any` は知らないうちに入り込むので、気づきにくい。

### 型カバレッジを監視する

`any` は型安全性や開発者体験を損なうので、コードベースにある `any` の数を監視するとよい。たとえば [type-coverage](https://github.com/plantain-00/type-coverage) を使う。

```sh
$ npx type-coverage
(406 / 486) 83.53%
type-coverage success.
```

`--detail` を付けると、`any` が出てくる箇所を確認できる。

```sh
$ npx type-coverage --detail
/Users/.../xxx.ts:63:13: parent
...
```

[[visual-studio-code|Visual Studio Code]] に[組み込む](https://github.com/plantain-00/type-coverage?tab=readme-ov-file#vscode-pluginadded-in-v213)こともできる。監視することで、`any` を使った判断を見直すきっかけが生まれ、時間とともに型安全性を高められる。

## キーワード

- [[typescript|TypeScript]]
- [[visual-studio-code|Visual Studio Code]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
