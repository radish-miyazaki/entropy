---
title: 型アサーション
aliases: [as]
description: TypeScript が知らない型の情報をプログラマが与え、値の型を指定すること。実行時のチェックはない
tags: [word, typescript, 型システム]
date: 2026-11-14
---

## TL;DR

[[typescript|TypeScript]] が知りえない型の情報をプログラマが与え、値の型を指定すること。`値 as 型` と書く。実行時のチェックはない。

## なぜ必要か

TypeScript のハンドブックによると、値の型について、TypeScript が知りえない情報をプログラマが知っていることがある。典型的な例は DOM 要素で、`document.getElementById` の戻り値は `HTMLElement` だが、それが `HTMLCanvasElement` だと分かっていれば型アサーションで指定できる。

## 仕組み

型アサーションは[[type-annotation|型アノテーション]]と同じくコンパイル時に取り除かれ、実行時の振る舞いには影響しない。そのため、アサーションが間違っていても、例外や `null` は生じない。`<HTMLCanvasElement>値` という山括弧の書き方もあるが、`.tsx` ファイルでは使えない。

TypeScript は、より具体的な型か、より一般的な型への変換だけを許す。`"hello" as number` のような「ありえない」変換はエラーになる。どうしても必要なら、`unknown` か `any` を経由して `expr as unknown as T` と 2 回アサーションする。

## 例

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement
```

## 注意点

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] によると、型アノテーションは値が型に適合するかをチェックするが、型アサーションはチェックしない。`const bob = {} as Person` は、必要なプロパティがなくてもエラーにならず、[[excess-property-checking|余剰プロパティチェック]]も行われない。そのため、型アサーションより型アノテーションを使い、型アサーションを使うときはなぜ必要かをコメントに書く。型アサーションは `any` などと並んで、型システムの不健全さ（[[soundness|健全性]]の破れ）を生むパターンの 1 つである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[type-annotation|型アノテーション]]
- [[non-null-assertion|非 null アサーション]]
- [[type-narrowing|型の絞り込み]]
- [[any-type|any 型]]
- [[soundness|健全性]]

## 出典

- [TypeScript: Documentation - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目9 型アノテーションを型アサーションより優先的に使用する|Effective TypeScript 第2版 項目9]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目48 健全性の罠を回避する|Effective TypeScript 第2版 項目48]]
