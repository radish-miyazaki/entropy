---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › TypeScriptとJavaScriptの関係を理解する
description: TypeScript は JavaScript のスーパーセットであり、その型システムは JavaScript の実行時の動作をモデリングしつつ、疑わしいコードも型エラーにすると説く項目
tags: [book-chapter, typescript]
date: 2025-04-15
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 1
---

## TL;DR

- [[typescript|TypeScript]] は [[javascript|JavaScript]] のスーパーセットなので、すべての JavaScript プログラムは TypeScript プログラムだが、逆は成り立たない。
- TypeScript の[[type-system|型システム]]は JavaScript の実行時の動作をモデリングし、実行時に例外を投げそうなコードや、意図しない挙動につながりそうなコードを型エラーにする。

## 内容

### スーパーセットとしての TypeScript

TypeScript は JavaScript のスーパーセットである。そのため「すべての JavaScript プログラムは TypeScript プログラムである」という命題は真である。一方、逆の「すべての TypeScript プログラムは JavaScript プログラムである」は偽である。

### 実行時の動作のモデリング

TypeScript の型システムは、JavaScript の実行時の動作をモデリングし、実行時に例外を投げそうなコードを検出しようとする。JavaScript では次のコードは問題なく動くので、型チェックも通る。

```ts
const x = 2 + "3"
const y = "2" + 3
```

一方、次のコードは実行時に例外を投げるので、型エラーになる。

```ts
const city = "new york city"
console.log(city.toUppercase())
```

ただし、型チェックを通っても実行時に問題が起きることはある。TypeScript の型システムは[[soundness|健全]]ではないので、次のコードは配列の範囲外を参照しているが、型エラーにはならない。

```ts
const names = ["Alice", "Bob"]
console.log(names[2])
```

### 疑わしいコードの検出

TypeScript は、JavaScript としては動くものの、意図しない挙動につながりそうなコードも型エラーにする。次のコードはすべて型エラーになる。

```ts
const a = null + 7
const b = [] + 12
alert("Hello", "TypeScript")
```

さらに、[[type-annotation|型アノテーション]]でプログラマの意図を TypeScript に伝えると、疑わしいコードを見つけやすくなる。次の例では `states` に型を付けたので、`capital` を `capitol` と書き間違えたことを検出できる。

```ts
const states: State[] = [
  { name: "Alabama", capital: "Montgomery" },
  { name: "Alaska", capital: "Juneau" },
  { name: "Arizona", capital: "Phoenix" },
]
for (const state of states) {
  console.log(state.capitol) // Typo によるエラー
}
```

どこまで JavaScript の実行時の動作をモデリングし、どこからそれ以上のチェックをするかの線引きは、好みの問題である。TypeScript を採用するということは、TypeScript 開発チームのこの判断を信頼するということでもある。

## キーワード

- [[typescript|TypeScript]]
- [[javascript|JavaScript]]
- [[type-system|型システム]]
- [[soundness|健全]]
- [[type-annotation|型アノテーション]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
