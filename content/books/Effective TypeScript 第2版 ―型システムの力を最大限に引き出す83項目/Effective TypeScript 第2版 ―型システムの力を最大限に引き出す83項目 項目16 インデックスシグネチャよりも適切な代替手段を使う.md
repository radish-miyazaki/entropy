---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目16 インデックスシグネチャよりも適切な代替手段を使う
description: インデックスシグネチャは型安全性を損ない自動補完も効かないので、interface、Map、Record などの代替手段を使うよう勧める項目
tags: [book-chapter, typescript]
date: 2025-04-29
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 16
---

## TL;DR

- [[index-signature|インデックスシグネチャ]]はどんなキーでも受け入れるので、型安全性を損ない、自動補完も効かない。
- 代わりに interface、`Map`、`Record` などを使う。インデックスシグネチャは、余剰プロパティチェックを無効にしたいときなどに限って使う。

## 内容

### インデックスシグネチャとは

インデックスシグネチャは、`type Rocket = { [property: string]: string }` の `[property: string]: string` の部分である。次の 3 つから構成される。

1. キーの名前: 何でもよい（型チェックでは使われない）
2. キーの型: `string`、`number`、`symbol`、テンプレートリテラル型、またはこれらの[[union-type|ユニオン型]]（`number` は避ける：[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目17 数値型のインデックスシグネチャを避ける|項目17]]）
3. 値の型: どんな型でもよい

### インデックスシグネチャを避けるべき理由

インデックスシグネチャは型安全性を損なう。どんなキーでも受け入れ、特定のキーの存在を要求しないので、`{}` も有効な値になる。また、キーごとに異なる型を持てない。さらに、[[language-service|言語サービス]]の自動補完の恩恵も受けられない。

### 代替手段

型が持つフィールドがすべて分かっているなら、interface を使う。フィールドが動的に決まるなら、`Map<string, string>` のような `Map` を使う。一般に、`Map` のような抽象的な型は、使うときに具体的な型に変換する必要がある。このパターンは TypeScript ではよくある（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目74 実行時に型を再構築する方法を知る|項目74]]）。

```ts
function parseCSVMap(input: string): Map<string, string>[] { ... }
function parseRocket(map: Map<string, string>): Rocket { ... }

parseCSVMap(csvData).map(parseRocket);
```

型が限られたフィールドしか持たないなら、組み込みの[[mapped-type|マップ型]]である `Record` を使う。

```ts
type Vec3D = Record<"x" | "y" | "z", number>
```

### インデックスシグネチャの使い道

インデックスシグネチャは、[[excess-property-checking|余剰プロパティチェック]]を無効にしたいときに使える。

```ts
declare function renderAButton(props: ButtonProps): void
interface ButtonProps {
  title: string
  onClick: () => void
  [otherProps: string]: unknown
}

renderAButton({
  title: "Roll the dice",
  onClick: () => alert(1 + Math.floor(6 * Math.random())),
  theme: "Solarized",
}) // インデックスシグネチャがなければ型エラーになる
```

また、特定のパターンに一致するプロパティだけを追加できるように制限することもできる。たとえば、`data-` で始まる任意のプロパティを許可する型を作れる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目54 テンプレートリテラル型を使ってDSLや文字列間の関係をモデリングする|項目54]]）。

## キーワード

- [[index-signature|インデックスシグネチャ]]
- [[mapped-type|マップ型]]
- [[union-type|ユニオン型]]
- [[language-service|言語サービス]]
- [[excess-property-checking|余剰プロパティチェック]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
