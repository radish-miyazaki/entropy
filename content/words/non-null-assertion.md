---
title: 非 null アサーション
aliases: [non-null assertion operator]
description: 式の後ろに ! を付けて、値が null でも undefined でもないと TypeScript に伝える構文
tags: [word, typescript]
date: 2026-11-14
---

## TL;DR

式の後ろに `!` を付けて、値が `null` でも `undefined` でもないと [[typescript|TypeScript]] に伝える構文。型から `null` と `undefined` を取り除く、型アサーションの一種である。

## 仕組み

TypeScript の公式ハンドブックによると、式の後ろに `!` を書くと、明示的なチェックをせずに型から `null` と `undefined` を取り除ける。他の型アサーションと同じく、実行時のコードの挙動は変わらない。

```ts
function liveDangerously(x?: number | null) {
  // エラーにならない
  console.log(x!.toFixed())
}
```

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目8 型空間のシンボルと値空間のシンボルの見分け方を知る|Effective TypeScript 項目8]] によると、`!` は値空間では論理 NOT 演算子、型の文脈では非 null アサーションになる。

## 例

`document.getElementById` は `HTMLElement | null` を返すので、`!` を付けると `HTMLElement` になる。

```ts
const el = document.getElementById("foo")! // HTMLElement
```

## 注意点

実行時には何もチェックしないので、値が `null` や `undefined` になりえないと分かっているときだけ使う。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目9 型アノテーションを型アサーションより優先的に使用する|Effective TypeScript 項目9]] では、TypeScript が知らない型の情報をプログラマが知っているときだけ使い、なぜ必要かをコメントに書くよう勧めている。多くの場合は、オプショナルチェーン（`?.`）を使うとよい。

```ts
document.getElementById("foo")?.addEventListener("click", () => alert("Hi there!"))
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[typescript|TypeScript]]

## 出典

- [Everyday Types - TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]
