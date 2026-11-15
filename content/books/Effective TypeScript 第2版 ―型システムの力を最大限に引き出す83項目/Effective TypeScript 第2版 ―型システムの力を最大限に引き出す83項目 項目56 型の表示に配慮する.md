---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › 型の表示に配慮する
description: 同じ型でも表示のされ方で読みやすさが変わるため、Resolve 型や条件型を使って型の表示を整える項目
tags: [book-chapter, typescript]
date: 2025-06-03
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 56
---

## TL;DR

- 同じ型でも表示の仕方はいくつもあり、表示によって読みやすさが変わる。
- `Resolve` 型を使うと、型の表示を分かりやすくしつつ実装の詳細を隠せる。

## 内容

### 型の表示は一通りではない

[[typescript|TypeScript]] には同じ型を表示する方法がいくつもあり、方法によって読みやすさが変わる。たとえばユニオン型のメンバーの並び順は、先に別の型を宣言しただけで変わることがある。

```ts
type T123 = "1" | "2" | "3" // '1' | '2' | '3'
```

```ts
type T21 = "2" | "1" // '2' | '1'
type T123 = "1" | "2" | "3" // '2' | '1' | '3'
```

### Resolve 型

次の `Resolve` 型を使うと、型の表示を分かりやすくしつつ、実装の詳細を[[encapsulation|カプセル化]]できる。同じものが `Simplify`、`NOP`、`NOOP`、`MergeInsertions` という名前で使われることもある。

```ts
type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] }
```

[[conditional-types|条件型]]の部分を無視すると、オブジェクト型を受け取って同じ型を返す定義が残る。

```ts
type ObjIdentity<T> = { [K in keyof T]: T[K] }
```

これは準同型な[[mapped-type|マップ型]]なので、プリミティブ型には手を加えない。

```ts
type S = ObjIdentity<string> // string
type U = ObjIdentity<"A" | "B" | "C">
```

ただし関数を渡すと `{}` になってしまうので、条件型で関数を除外している。

```ts
type F = ObjIdentity<(a: number) => boolean> // {}
```

### 使い方

`keyof` の結果や、型演算を重ねた型を展開して表示できる。

```ts
interface Color {
  r: number
  g: number
  b: number
  a: number
}

type Chan = keyof Color // keyof Color
type ChanInline = Resolve<keyof Color> // "r" | "g" | "b" | "a"
```

```ts
interface BlogComment {
  commentId: number
  title: string
  content: string
}

// 改善前
type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
type PartComment = PartiallyPartial<BlogComment, "title">
// Partial<Pick<BlogComment, "title">> & Omit<BlogComment, "title">

// 改善後
type PartiallyPartial<T, K extends keyof T> = Resolve<Partial<Pick<T, K>> & Omit<T, K>>
type PartComment = PartiallyPartial<BlogComment, "title">
// { title?: string | undefined; commentId: number; content: string; }
```

条件型でエッジケースを扱うと、表示をさらに改善できることもある。次の例では、`K` が `never` のときに元の型名をそのまま表示させている。

```ts
// 改善前
type FullComment = PartiallyPartial<BlogComment, never>
// BlogComment と同じだが展開される
// { title?: string | undefined; commentId: number; content: string; }

// 改善後
type PartiallyPartial<T extends object, K extends keyof T> = [K] extends [never]
  ? T
  : Resolve<Partial<Pick<T, K>> & Omit<T, K>>
type FullComment = PartiallyPartial<BlogComment, never> // BlogComment
```

クラスを渡すと大量のプロパティが表示されるので、避けたほうがよい。

### その他の方法

`keyof` の結果をインライン表示するには `Exclude<keyof T, never>`、オブジェクト型をインライン表示するには `unknown & T` や `{} & T` を使う方法もある。ただし、どちらも `Resolve` で代替でき、`Resolve` のほうが安定して動く。

リグレッションを避けるため、ジェネリック型とその表示に対するテストを書くとよい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目55 型のテストを書く|項目55 型のテストを書く]]）。

## キーワード

- [[conditional-types|条件型]]
- [[mapped-type|マップ型]]
- [[encapsulation|カプセル化]]
- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
