---
title: JavaScript の this
aliases: []
description: JavaScript の this は、関数がどう呼ばれたかで決まる値で、トップレベル、関数、メソッド、クラスで指すものが変わる
tags: [word, javascript]
date: 2024-08-20
---

## TL;DR

[[javascript|JavaScript]] の `this` は、関数がどのように呼ばれたかで決まる値である。トップレベルではグローバルオブジェクト、メソッドではレシーバのオブジェクトを指す。関数の中では [[strict-mode|strict モード]]かどうかで変わる。

## 仕組み

ES5 からは、`bind` メソッドで、関数の呼ばれ方に関係なく `this` の値を固定した新しい関数を作れるようになった。ES2015 からは、自身では `this` を結び付けない[[arrow-function|アロー関数]]が導入された。アロー関数は、それを囲む構文上のコンテキストの `this` を保持する。

### トップレベル

ファイル直下（クラスや関数の外側）では、strict モードかどうかに関わらず、`this` はグローバルオブジェクトを指す。ブラウザでは `window`、Node.js では `global` である。

```js
// ウェブブラウザーでは window オブジェクトもグローバルオブジェクト
console.log(this === window) // true

a = 37
console.log(window.a) // 37

this.b = "MDN"
console.log(window.b) // "MDN"
console.log(b) // "MDN"
```

### 関数

strict モードでなければ、`this` はグローバルオブジェクトを指す。strict モードでは `undefined` になる。

```js
function f1() {
  return this
}

// ブラウザー上
f1() === window // true

// Node 上
f1() === global // true

function f2() {
  "use strict" // strict モードにする
  return this
}

f2() === undefined // true
```

`call` や `apply` を使うと、`this` として使うオブジェクトを指定できる。`bind` は新しい関数を返すが、`call` と `apply` はその場で関数を呼び出す。

```js
function add(c, d) {
  return this.a + this.b + c + d
}

var o = { a: 1, b: 3 }

add.call(o, 5, 7) // 16
add.apply(o, [10, 20]) // 34
```

### メソッド

関数がオブジェクトのメソッドとして呼ばれたとき、`this` にはメソッドを呼び出したオブジェクト（レシーバ）が入る。

```js
var o = { prop: 37 }

function independent() {
  return this.prop
}

o.f = independent

console.log(o.f()) // 37
```

### クラス

クラスは関数の機能なので、`this` の動きはほぼ関数と同じである。ただし、コンストラクタの中では `this` は生成されるオブジェクト自身を指す。インスタンスメソッドは `this` のプロトタイプに追加され、静的メソッドはクラス自身のプロパティになる。

```js
class Example {
  constructor() {
    const proto = Object.getPrototypeOf(this)
    console.log(Object.getOwnPropertyNames(proto))
  }
  first() {}
  second() {}
  static third() {}
}

new Example() // ['constructor', 'first', 'second']
```

## 注意点

関数の呼ばれ方によって `this` が変わるので、予期しない挙動になりやすい。アロー関数を使うか、`bind` で `this` を固定すると防げる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[arrow-function|アロー関数]]
- [[strict-mode|strict モード]]

## 出典

- [this - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/this)
