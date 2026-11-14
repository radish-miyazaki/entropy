---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目27 コールバックの代わりにasync関数を使用して型の流れを改善する
description: 非同期処理はコールバックではなく Promise で、できれば async/await で書くと、組み合わせやすさと型の流れ、可読性が改善するという項目
tags: [book-chapter, typescript, javascript]
date: 2025-05-01
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 27
---

## TL;DR

- 非同期処理は、組み合わせやすさと型の流れを考えて、コールバックではなく [[promise|Promise]] で書く。
- できれば `Promise` を直接使わずに [[async-await|async/await]] を使う。可読性が上がり、戻り値が `Promise` になることも強制できる。

## 内容

### JavaScript の非同期処理の歴史

ES5 以前の [[javascript|JavaScript]] では、コールバックで非同期処理を表していた。

```js
fetchURL(url1, function (response1) {
  fetchURL(url2, function (response2) {
    fetchURL(url3, function (response3) {
      // ...
    })
    // ...
  })
  // ...
})
```

ネストが深くなり（[[callback-hell|コールバック地獄]]）、実行順序がコードの順序と逆になるなど、[[readability|可読性]]が低かった。

ES2015 で `Promise` が導入され、簡潔に書けるようになった。ネストが浅くなり、実行順序とコードの順序も一致した。`Promise.all` のような便利な関数も登場した。

```js
const page1Promise = fetch(url1)
page1Promise
  .then((response1) => {
    return fetch(url2)
  })
  .then((response2) => {
    return fetch(url3)
  })
  .then((response3) => {
    // ...
  })
  .catch((error) => {
    // ...
  })
```

ES2017 で `async` と `await` が導入され、さらに簡潔に書けるようになった。`await` は、各 `Promise` が完了するまで `fetchPages` の実行を一時停止する。`await` した `Promise` が reject されると、例外が投げられる。

```js
async function fetchPages() {
  try {
    const response1 = await fetch(url1)
    const response2 = await fetch(url2)
    const response3 = await fetch(url3)
    // ...
  } catch (e) {
    // ...
  }
}
```

### TypeScript における async/await

reject された `Promise` が投げる例外は、通常の例外と同じく型を持たない。[[typescript|TypeScript]] では、ES5 以前をターゲットにしても `async` と `await` を使える。また、`async` 関数から `Promise` を返しても、`Promise<Promise<T>>` とネストせず `Promise<T>` になる。

```ts
async function getJSON(url: string) {
  const response = await fetch(url)
  const jsonPromise = response.json()
  return jsonPromise // Promise<any>
} // 戻り値の型も Promise<any>
```

### コールバックより Promise が好ましい理由

`Promise` はコールバックより組み合わせやすく、型の流れもよくなる。たとえば `Promise.all` を使うと、各レスポンスの型が `Response` と推論される。

```ts
async function fetchPages() {
  const [response1, response2, response3] = await Promise.all([
    fetch(url1),
    fetch(url2),
    fetch(url3),
  ]) // response はすべて Response と推論される
  // ...
}
```

コールバックで同じことをすると、より多くのコードと[[type-annotation|型アノテーション]]が必要になる。エラー処理や、`Promise.all` のような汎用の関数を自前で用意するのも難しい。

[`Promise.race`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) は、複数の `Promise` のうち最初に完了したものの結果を返す。次の関数の戻り値は `Promise<Response>` と[[type-inference|推論]]される。`timeout` が返す `Promise<never>` との合併が `Promise<Response | never>` にならないのは、`never` とのユニオンを取っても集合が変わらないので、`Promise<Response>` に単純化されるからである。

```ts
async function fetchWithTimeout(url: string, timeoutMs: number) {
  return Promise.race([fetch(url), timeout(timeoutMs)])
}
```

### Promise より async/await が好ましい理由

1 つ目は、コードの可読性が上がることである。2 つ目は、`async` 関数は常に `Promise` を返すよう強制されることである。これにより、関数が同期的に値を返すのか非同期に返すのかが混在する、紛らわしいバグを避けられる。

```ts
// () => Promise<number> と推論される
async function getNumber() {
  return 42
}
const getNumber = async () => 42
```

```ts
// Promise を直接使った場合
const getNumber = () => Promise.resolve(42)
```

## キーワード

- [[typescript|TypeScript]]
- [[javascript|JavaScript]]
- [[promise|Promise]]
- [[async-await|async/await]]
- [[callback-hell|コールバック地獄]]
- [[type-inference|型推論]]
- [[readability|可読性]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
