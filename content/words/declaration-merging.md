---
title: 宣言のマージ
aliases: []
description: 同じ名前の複数の宣言を、TypeScript のコンパイラが 1 つの定義にまとめる仕組み
tags: [word, typescript]
date: 2026-11-14
---

## TL;DR

同じ名前で宣言された複数の宣言を、[[typescript|TypeScript]] のコンパイラが 1 つの定義にまとめる仕組み。代表例は同名の `interface` のマージで、`type` にはない `interface` の特徴である。

## なぜ必要か

既存のライブラリや標準の API の型に、あとからメンバーを足したり、型を直したりできる。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目|Effective TypeScript]] の項目 71 では、`any` を返す `JSON.parse` を `unknown` を返すように直す例や、問題のある使い方を禁止する例を挙げている。

## 仕組み

TypeScript の公式ドキュメントによると、宣言は namespace、type、value の少なくとも 1 つを作り、どれを作るかでマージの挙動が決まる。

同名の `interface` は、メンバーが 1 つにまとめられる。関数でないメンバーは名前が重複してもよいが、型が同じでなければならない。同名の関数メンバーは、同じ関数のオーバーロードとして扱われ、後から宣言したものほど優先される。

同名の `namespace` もマージされるが、`export` していないメンバーは元の宣言の中からしか見えない。`namespace` は、クラス、関数、enum ともマージできる。ただし、クラスどうしや、クラスと変数はマージできない。

`declare module` を使うと既存のモジュールの型を拡張でき、`declare global` を使うとモジュールの中からグローバルの宣言を拡張できる。どちらも新しいトップレベルの宣言は足せず、既存の宣言への追加だけができる。

## 例

```ts
interface Box {
  height: number
  width: number
}
interface Box {
  scale: number
}
let box: Box = { height: 5, width: 6, scale: 10 }
```

## 注意点

Effective TypeScript の項目 71 によると、宣言のマージは型を変えるだけで実行時の動作は変えないので、既存の API の型を改善する用途以外ではなるべく使わない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[declaration-file|型宣言ファイル]]

## 出典

- [TypeScript: Documentation - Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目13 type（型エイリアス）とinterfaceの違いを知る|Effective TypeScript 第2版 項目13]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目71 モジュールオーグメンテーションを使って型を改善する|Effective TypeScript 第2版 項目71]]
