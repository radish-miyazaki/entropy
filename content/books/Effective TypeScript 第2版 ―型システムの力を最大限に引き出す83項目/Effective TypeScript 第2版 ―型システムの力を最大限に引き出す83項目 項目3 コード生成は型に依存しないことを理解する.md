---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目3 コード生成は型に依存しないことを理解する
description: TypeScript の型は実行時には消えるので、生成される JavaScript は型に依存せず、型で実行時の動作やパフォーマンスは変わらないと説く項目
tags: [book-chapter, typescript]
date: 2025-04-16
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 3
---

## TL;DR

- [[typescript|TypeScript]] の型は JavaScript に変換するときに消えるので、生成されるコードは型に依存しない。
- そのため、実行時に型をチェックすることも、型によって実行時の値や動作、パフォーマンスを変えることもできない。

## 内容

### 実行時には型をチェックできない

TypeScript の型は、JavaScript に変換するときに消える（[[type-erasure|型消去]]）。そのため、実行時に型をチェックすることはできない。たとえば `instanceof` によるチェックは実行時に行われるので、interface に対しては使えない。

```ts
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;

if (shape instanceof Rectangle) { ... }
```

代わりに、次の 3 つの方法がある。1 つ目は、`in` 演算子でプロパティがあるかを調べる方法である（`if ('height' in shape) { ... }`）。2 つ目は、型の情報をタグとして値に持たせる方法である。このような `Shape` の型を[[discriminated-union|タグ付きユニオン（判別可能なユニオン型）]]と呼ぶ。

```ts
interface Square {
  kind: "square";
  width: number;
}
interface Rectangle {
  kind: "rectangle";
  height: number;
  width: number;
}
type Shape = Square | Rectangle;

if (shape.kind === "rectangle") { ... }
```

3 つ目は、クラスとして定義する方法である。クラスは型と値の両方を導入するので、そのまま `instanceof` を使える。ただし、`type Shape = Square | Rectangle` の `Rectangle` は型だが、`shape instanceof Rectangle` の `Rectangle` は値（コンストラクタ）である点に注意する（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目8 型空間のシンボルと値空間のシンボルの見分け方を知る|項目8]]）。

### 型エラーがあってもコードは出力される

コードの出力は型チェックに依存しないので、型エラーがあっても JavaScript は出力される。出力を止めたいときは、`noEmitOnError` を `true` にする。

型エラーがあっても出力されるので、型エラーがあるときに「コンパイルが通らない」と言うのは、技術的には正しくない。「型チェックに失敗する」と言うのが正しい。エラーがあっても出力されることは開発中には役立つこともあるが、コミットするときには型エラーを 0 にしたほうがよい。

### 型演算は実行時の値に影響しない

型アサーションなどの型演算は、実行時の値を変えない。たとえば次の TypeScript のコードは、

```ts
function asNumber(val: number | string): number {
  return val as number
}
```

次の JavaScript になる。

```js
function asNumber(val) {
  return val
}
```

値を正規化したいときは、`return Number(val)` のように実行時の処理を書く必要がある。

### 実行時の型は宣言した型と違うことがある

たとえば API のレスポンスに型を付けても、実際に返ってくる値がその型であることは保証されない（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目48 健全性の罠を回避する|項目48]]）。

### 型に基づくオーバーロードはできない

実行時の動作は TypeScript の型に依存しないので、型によって実装を切り替える関数のオーバーロードはできない。出力に残るのは実装だけである。

### 型は実行時のパフォーマンスに影響しない

型は実行時のパフォーマンスに影響しないが、注意点が 2 つある。1 つ目は、ビルド時のオーバーヘッドである。ただし通常、コンパイルは十分に速く、特に[[incremental-build|インクリメンタルビルド]]では速い。オーバーヘッドが大きいときは、ビルド時に型チェックを省いてトランスパイルだけをする設定を検討する。

2 つ目は、古いランタイムをサポートするために TypeScript が生成するコードが、ネイティブの実装より遅くなる場合があることである。たとえば `target` を `ES5` にしてジェネレータを使うと、ES5 にはない機能なので、`tsc` はジェネレータを動かすためのヘルパーのコードを生成する。これは TypeScript に限らず、どのトランスパイラでも起きる。

## キーワード

- [[type-erasure|型消去]]
- [[discriminated-union|タグ付きユニオン]]
- [[union-type|ユニオン型]]
- [[soundness|健全]]
- [[incremental-build|インクリメンタルビルド]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
