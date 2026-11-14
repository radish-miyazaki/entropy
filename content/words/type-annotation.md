---
title: 型アノテーション
aliases: []
description: 変数や引数、戻り値に、その型を明示的に書くこと
tags: [word, typescript, 型システム]
date: 2026-11-14
---

## TL;DR

変数や関数の引数、戻り値に、その型を明示的に書くこと。型注釈ともいう。[[typescript|TypeScript]] では `let myName: string = "Alice"` のように、対象の後ろに `: 型` を書く。

## なぜ必要か

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] によると、型アノテーションでプログラマの意図を TypeScript に伝えると、疑わしいコードを見つけやすくなる。たとえば、オブジェクトに型を付けておけば、プロパティ名の書き間違いを検出できる。型アノテーションは値がその型に適合するかをチェックし、[[excess-property-checking|余剰プロパティチェック]]も行うので、チェックをしない[[type-assertion|型アサーション]]より安全である。

## 仕組み

TypeScript のハンドブックによると、型アノテーションは JavaScript の一部ではなく、コンパイル時にすべて消える（[[type-erasure|型消去]]）。そのため、型アノテーションがプログラムの実行時の振る舞いを変えることはない。

多くの場合、型アノテーションは書かなくてよい。TypeScript は[[type-inference|型推論]]で、変数の型を初期値から、関数の戻り値の型を `return` 文から決める。

## 例

```ts
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`)
}

function getFavoriteNumber(): number {
  return 26
}
```

## 注意点

ハンドブックは、型推論で同じ型になる場所では型アノテーションを付けないほうがよいとしている。一方で Effective TypeScript は、複数の分岐から `return` する関数やアロー関数では、戻り値に型アノテーションを付けるよう勧めている。戻り値の型の明示は、文書化や、意図しない変更を防ぐためにも使われる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[type-inference|型推論]]
- [[type-assertion|型アサーション]]
- [[type-signature|型シグネチャ]]
- [[excess-property-checking|余剰プロパティチェック]]

## 出典

- [TypeScript: Documentation - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript: Documentation - The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目9 型アノテーションを型アサーションより優先的に使用する|Effective TypeScript 第2版 項目9]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目59 never型を使って網羅性チェックを行う|Effective TypeScript 第2版 項目59]]
