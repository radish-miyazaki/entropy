---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目62 レストパラメーターとタプル型を使って、可変長引数の関数をモデリングする
description: レストパラメータとタプル型、条件型を組み合わせて、シグネチャが引数の型に依存する関数をモデリングする項目
tags: [book-chapter, typescript]
date: 2025-04-12
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 62
---

## TL;DR

- レストパラメータとタプル型を使うと、シグネチャが引数の型に依存する関数をモデリングできる。
- [[conditional-types|条件型]]を使うと、あるパラメータの型と他のパラメータの型の関係を表現できる。タプルの要素にはラベルを付ける。

## 内容

### レストパラメータとタプル型

レストパラメータとタプル型を使うと、シグネチャが引数の型に依存する関数をモデリングできる。さらに条件型を使うと、あるパラメータの型と、それ以外のパラメータの型の関係をモデリングできる。次の `buildURL` は、ルートによってクエリパラメータが要るかどうかが変わる。

```ts
function buildURL<Path extends keyof RouteQueryParams>(
  route: Path,
  ...args: RouteQueryParams[Path] extends null ? [] : [params: RouteQueryParams[Path]]
) {
  const params = args[0]
  return route + (params ? `?${new URLSearchParams(params)}` : "")
}
```

呼び出し側で分かりやすいパラメータ名を表示するため、タプルの要素にはラベルを付ける。付けないと、次のように `args_0` のような名前で表示される。

```ts
function buildURL<"/search">(
  route: "/search",
  args_0: {
    query: string
    language?: string
  },
): string
```

### 訳者による解説

特定の文字列と型が結びつくのは、[[javascript|JavaScript]] でよく見るパターンである。たとえば DOM のイベントハンドラでは、イベント名とイベントオブジェクトの型が結びついている（`click` と [MouseEvent](https://developer.mozilla.org/ja/docs/Web/API/MouseEvent)）。

この関係を次のように `interface` で定義する方法は、直感的で分かりやすいので広く使える。

```ts
interface RouteQueryParams {
  "/": null
  "/search": { query: string; language?: string }
}
```

```ts
// OK
buildURL("/")
buildURL("/search", { query: "foo" })
buildURL("/search", { query: "bar", language: "en" })

// 型エラー
buildURL("/", { query: "recursion" })
buildURL("/search", {})
```

## キーワード

- [[conditional-types|条件型]]
- [[javascript|JavaScript]]
- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
