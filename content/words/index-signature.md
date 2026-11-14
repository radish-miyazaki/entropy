---
title: インデックスシグネチャ
aliases: []
description: プロパティ名が前もって分からないオブジェクトについて、キーと値の型だけを指定する TypeScript の構文
tags: [word, typescript]
date: 2026-11-14
---

## TL;DR

プロパティ名は前もって分からないが、値の形は分かっているオブジェクトを表す [[typescript|TypeScript]] の構文である。`[key: string]: number` のように、キーの型と値の型を書く。

## なぜ必要か

辞書（連想配列）のように、どんなキーが入るかを型の定義の時点で決められないオブジェクトに型を付けられる。

## 仕組み

キーに使える型は、`string`、`number`、`symbol`、テンプレートリテラル型と、それらだけから成るユニオン型である。

`string` のインデックスシグネチャを書くと、他のプロパティもすべてその値の型に合わせる必要がある。`obj.property` は `obj["property"]` としても参照できるので、型がそろっていないとエラーになる。

[[javascript|JavaScript]] は数値でインデックスするときに数値を文字列に変換するので、`number` と `string` の両方のインデックスシグネチャを書くときは、`number` 側の値の型を `string` 側の値の型の部分型にする。

## 例

```ts
interface NumberDictionary {
  [index: string]: number
  length: number // OK
  name: string // エラー: string は number に代入できない
}

interface ReadonlyStringArray {
  readonly [index: number]: string
}
```

`readonly` を付けると、インデックスを使った代入を禁止できる。

## 注意点

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] では、インデックスシグネチャよりも適切な代替手段を使うことと、数値のインデックスシグネチャは誤解を招くので避け、`Array`、タプル型、`ArrayLike`、`Iterable` を使うことを勧めている。また、`noUncheckedIndexedAccess` を有効にすると、インデックスシグネチャのプロパティを参照するときに `undefined` のチェックが必須になる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[typescript|TypeScript]]
- [[intersection-type|インターセクション型]]

## 出典

- [TypeScript Handbook: Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目16 インデックスシグネチャよりも適切な代替手段を使う|Effective TypeScript 第2版 項目16]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目17 数値型のインデックスシグネチャを避ける|Effective TypeScript 第2版 項目17]]
