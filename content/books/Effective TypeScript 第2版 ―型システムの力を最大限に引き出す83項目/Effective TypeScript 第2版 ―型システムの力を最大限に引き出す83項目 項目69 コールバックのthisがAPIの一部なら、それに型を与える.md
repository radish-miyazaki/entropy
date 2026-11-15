---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › コールバックのthisがAPIの一部なら、それに型を与える
description: this の動的なバインドを踏まえ、コールバックに this をバインドする API では this パラメータに型を与える項目
tags: [book-chapter, typescript]
date: 2025-05-06
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 69
---

## TL;DR

- `this` のスコープは動的で、呼び出し方によって決まる。
- コールバックに `this` をバインドする API では、`this` パラメータに型を与える。新しい API では動的な `this` のバインドを避ける。

## 内容

### this は動的に決まる

`this` のスコープは、レキシカルスコープではなく動的に決まる（[[javascript-this|JavaScript の this]]）。

```js
class C {
  vals = [1, 2, 3]

  logSquares() {
    for (const val of this.vals) {
      console.log(val ** 2)
    }
  }
}
```

```js
const c = new C()
c.logSquares() // OK
```

このとき裏側では、`C.prototype.logSquares` を呼び出し、`this` を `c` にバインドしている。したがって、メソッドを変数に取り出して呼ぶと実行時エラーになる。

```js
const method = c.logSquares
method() // 実行時エラー
```

`call` を使って呼び出すと、`this` を指定できる。

```js
method.call(c) // OK
```

### コールバックの this に型を付ける

コールバックに `this` をバインドしている場合は、`this` に型を与えて、正しくバインドされるようにするべきである。

```ts
function addKeyListener(el: HTMLElement, listener: (this: HTMLElement, e: KeyboardEvent) => void) {
  el.addEventListener("keydown", (e) => listener.call(el, e))
}
```

`this` パラメータは特別で、追加してもパラメータの数は増えない。

```ts
el.addEventListener("keydown", (e) => {
  listener(el, e)
  //           ~ Expected 1 arguments, but got 2
})
```

正しくバインドしていない場合は型エラーになる。

```ts
el.addEventListener("keydown", (e) => {
  listener(e)
  // ~~~~~~~~ The 'this' context of type 'void' is not assignable
  //          to method's 'this' of type 'HTMLElement'.
})
```

呼び出し側は、型安全に `this` を参照できる。

```ts
addKeyListener(el, function (e) {
  console.log(this.innerHTML)
  //          ^? this: HTMLElement
})
```

[[arrow-function|アロー関数]]を使うと `this` が外側のものに置き換わるが、TypeScript はこの問題も検出する。

```ts
class Foo {
  registerHandler(el: HTMLElement) {
    addKeyListener(el, (e) => {
      console.log(this.innerHTML)
      //               ~~~~~~~~~ Property 'innerHTML' does not exist on type 'Foo'.
    })
  }
}
```

### 新しい API では動的な this を避ける

新しく API を作るときは、動的な `this` のバインドを避ける。ES2022 以降では、クラスフィールドにアロー関数を使える（メソッドには使えない。[MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions#メソッドとしては使用不可)）。アロー関数は自分の `this` を持たないが、クラスは `this` を持つ。そのため、クラスフィールドのアロー関数の中の `this` は、正しくインスタンスを指す。

```ts
class ResetButton {
  constructor() {
    this.onClick = this.onClick.bind(this)
  }
  onClick = () => {
    alert(`Reset ${this}`)
  } // この this は ResetButton を参照
}
```

## キーワード

- [[javascript-this|JavaScript の this]]
- [[arrow-function|アロー関数]]
- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
