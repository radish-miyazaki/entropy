---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › 型アノテーションを型アサーションより優先的に使用する
description: 型アサーションより型アノテーションを使い、型アサーションは TypeScript が知らない情報をプログラマが知っているときだけ、理由をコメントに書いて使うよう説く項目
tags: [book-chapter, typescript]
date: 2025-04-12
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 9
---

## TL;DR

- [[type-assertion|型アサーション]]より[[type-annotation|型アノテーション]]を使う。アロー関数では戻り値に型アノテーションを付ける。
- 型アサーションや[[non-null-assertion|非 null アサーション]]は、[[typescript|TypeScript]] が知らない型の情報をプログラマが知っているときだけ使い、なぜ必要かをコメントに書く。

## 内容

### 型アノテーションを優先する理由

型アノテーションは、値がその型に適合するかをチェックする。一方、型アサーションはチェックしない。

```ts
interface Person {
  name: string
}

const alice: Person = {} // 型エラー
const bob = {} as Person // OK
```

[[excess-property-checking|余剰プロパティチェック]]も、型アノテーションのときにしか行われない。

```ts
const alice: Person = { name: "Alice", occupation: "TypeScript developer" } // 型エラー
const bob = { name: "Bob", occupation: "JavaScript developer" } as Person // OK
```

### アロー関数で型アノテーションを使う

次のコードでは、`people` の型は `{ name: string }[]` と推論され、`Person[]` にはならない。

```ts
const people = ["alice", "bob", "jan"].map((name) => ({ name }))
```

アロー関数の中で型アノテーション付きの変数を宣言することもできるが、ノイズが多くなる。代わりに、アロー関数の戻り値に型アノテーションを付ければよい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目24 型推論に文脈がどう使われるか理解する|項目24]]）。

```ts
const people = ["alice", "bob", "jan"].map((name): Person => ({ name })) // Person[]
```

### 型アサーションを使うべき場面

型アサーションは、値の型について TypeScript が知らない情報をプログラマが知っているときだけ使う。典型的な例は DOM 要素の型である。

```ts
document.querySelector("#myButton")?.addEventListener("click", (e) => {
  e.currentTarget // EventTarget | null
  const button = e.currentTarget as HTMLButtonElement // HTMLButtonElement
})
```

非 null アサーション（`!`）も同じである。ただし、多くの場合はオプショナルチェーン（`?.`）を使うとよい。

```ts
const el = document.getElementById("foo")! // HTMLElement
document.getElementById("foo")?.addEventListener("click", () => alert("Hi there!"))
```

型アサーションや非 null アサーションを使うときは、なぜ必要なのかを説明するコメントを書く。

### 型アサーションの限界

型アサーションは、2 つの型が互いに「比較可能」なとき、つまり積集合が空でないとき（一方が他方の[[subtyping|サブタイプ]]であるときなど）にしかできない。`HTMLElement` は `HTMLElement | null` のサブタイプであり、`Person` は `{}` のサブタイプなので、型アサーションできる。一方、`Person` と `HTMLElement` の積集合は空（`never`）なので、型アサーションできない。ただし、一度 `unknown` にアサーションすれば通せる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目46 型が不明な値には、anyではなくunknownを使う|項目46]]）。

```ts
const body = document.body
const el = body as Person // 型エラー
const el2 = body as unknown as Person // OK
```

### as を使わない型アサーション

すべての型アサーションが `as` を使うわけではない。ユーザー定義型ガード（`is`）は、型アサーションを何らかのロジックと結び付け、その正しさをチェックする（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目22 型の絞り込みを理解する|項目22]]）。[[generics|ジェネリクス]]を使う方法もあるが、TypeScript が型をチェックしていないのに、チェックしているように見えるので避ける（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目51 不必要な型パラメーターを避ける|項目51]]）。

### 型アサーションはキャストではない

C 言語などのキャストは、実行時に値を変換する。一方、型アサーションは型空間の構文であり、実行時には消えるので値を変えない。型アサーションは、値についてすでに真であることを断言するためのものである。なお、`as const` は安全である（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目24 型推論に文脈がどう使われるか理解する|項目24]]）。

### 訳者による解説

型アサーションは危険なのに、型エラーを簡単に消せる、`any` より罪悪感なく使える、といった理由で安易に使われがちである。安易に頼らず、型エラーの原因を突き止めて解消し、型安全なコードを書くべきである。ただし、型アサーションが有効な場面もある。

## キーワード

- [[type-annotation|型アノテーション]]
- [[type-assertion|型アサーション]]
- [[non-null-assertion|非 null アサーション]]
- [[excess-property-checking|余剰プロパティチェック]]
- [[subtyping|サブタイプ]]
- [[generics|ジェネリクス]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
