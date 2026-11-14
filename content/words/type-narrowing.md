---
title: 型の絞り込み
aliases: [narrowing]
description: 条件分岐などの実行時のチェックをもとに、値の型を宣言より具体的な型に絞ること
tags: [word, typescript, 型システム]
date: 2026-11-14
---

## TL;DR

条件分岐などの実行時のチェックをもとに、ある位置での値の型を、宣言された型より具体的な型に絞ること。[[typescript|TypeScript]] では narrowing と呼ぶ。

## なぜ必要か

`number | string` のようなユニオン型の値は、そのままでは `number` にしかないメソッドを呼べない。TypeScript のハンドブックによると、`typeof padding === "number"` のようなチェックを書くと、TypeScript はその分岐の中で値を `number` として扱う。型の絞り込みがあるので、JavaScript でふだん書くチェックをそのまま型の安全性につなげられる。

## 仕組み

TypeScript は、プログラムが通りうる実行経路をたどり、各位置で値が取りうる最も具体的な型を求める。到達可能性に基づくこの解析を制御フロー解析と呼ぶ。TypeScript は、型ガードと呼ばれる特別なチェックや代入に出会うたびに型を絞り込む。

ハンドブックでは、次のような絞り込みの方法を挙げている。

- `typeof`、`instanceof`、`in` 演算子による型ガード
- 真偽値としての評価や、`===` や `!= null` などの等価性のチェック
- `pet is Fish` の形の型述語を返すユーザ定義の型ガード
- `kind` のような共通のリテラル型のプロパティによる、[[discriminated-union|判別共用体]]の絞り込み
- すべてのケースを処理した後に残る `never` 型を使った網羅性チェック

## 例

```ts
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input // padding: number
  }
  return padding + input // padding: string
}
```

## 注意点

`typeof null` は `"object"` になるので、`typeof x === "object"` だけでは `null` を除けない。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] によると、値のエイリアス（別の変数に入れたもの）は型の絞り込みを妨げることがあるので、エイリアスを作ったら一貫してそれを使う。また、[[user-defined-type-guard|ユーザ定義型ガード]]は、本体が型述語と正しく対応しているかを誰もチェックしないので、[[type-assertion|型アサーション]]と同じく安全ではない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[discriminated-union|判別共用体]]
- [[type-assertion|型アサーション]]
- [[type-inference|型推論]]
- [[evolving-any|進化する型]]

## 出典

- [TypeScript: Documentation - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目22 型の絞り込みを理解する|Effective TypeScript 第2版 項目22]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目23 エイリアスを作成したら一貫してそれを使う|Effective TypeScript 第2版 項目23]]
