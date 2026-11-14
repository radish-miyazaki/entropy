---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目80 @ts-checkとJSDocを使ってTypeScriptを試す
description: JavaScript ファイルに // @ts-check を書いて型チェックを試し、出てくるエラーを型宣言ファイルや JSDoc で解消する項目
tags: [book-chapter, typescript]
date: 2025-05-09
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 80
---

## TL;DR

- [[javascript|JavaScript]] ファイルの先頭に `// @ts-check` を書くと、[[typescript|TypeScript]] に置き換えなくても型チェックを有効にできる。
- ただしチェックはかなり緩い。最終的なゴールは TypeScript への置き換えなので、[[jsdoc|JSDoc]] で完璧に型を付けることに時間をかけない。

## 内容

### @ts-check の位置づけ

TypeScript に移行するとき、JavaScript ファイルの先頭に `// @ts-check` を追加すると、そのファイルの型チェックを有効にできる。ただし、チェックは非常に限定的で、`noImplicitAny` をオフにした場合よりも緩い。最終的なゴールは TypeScript に置き換えることなので、JSDoc でコードを完璧に型付けすることに時間をかけない。

### よく出るエラーと解決策

#### 宣言されていないグローバル変数

```js
// @ts-check
console.log(user.firstName)
//          ~~~~ Cannot find name 'user'
```

そのシンボルが別の場所で定義されているなら、型宣言ファイルに書く。

```ts
// types.d.ts
interface UserData {
  firstName: string
  lastName: string
}

declare let user: UserData
```

#### サードパーティのライブラリ

型宣言のパッケージ（`@types/...`）を別にインストールする必要がある。

```sh
npm i --save-dev @types/jquery
```

#### DOM

[[dom|DOM]] を扱うコードでは、具体的な要素の型が分からずにエラーになることがある（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目75 DOMの型階層を理解する|項目75]]）。

```js
const ageEl = document.getElementById("age")
ageEl.value = "12" // 型エラー: Property 'value' does not exist on type 'HTMLElement'
```

JSDoc で[[type-assertion|型アサーション]]を書いて解決する。

```js
const ageEl = /** @type {HTMLInputElement} */ (document.getElementById("age"))
ageEl.value = "12" // OK
```

#### 既存の JSDoc が誤っている

```js
/**
 * 要素のサイズを（ピクセル単位で）取得する。
 * @param {Node} el 対象の要素
 * @returns {{w: number, h: number}} 要素のサイズ
 */
function getSize(el) {
  const bounds = el.getBoundingClientRect()
  //                ~~~~~~~~~~~~~~~~~~~~~ Property 'getBoundingClientRect' does not exist
  //                                      on type 'Node'

  return { width: bounds.width, height: bounds.height }
  //       ~~~~~ Type '{ width: any; height: any }' is not
  //             assignable to type '{ w: number; h: number }'
}
```

IDE の言語サービスが提供するクイックフィックスで直せる。ただし、うまくいかない場合もあり、そのときは手で直す。

## キーワード

- [[typescript|TypeScript]]
- [[javascript|JavaScript]]
- [[jsdoc|JSDoc]]
- [[dom|DOM]]
- [[type-assertion|型アサーション]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
