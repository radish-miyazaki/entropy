---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目22 型の絞り込みを理解する
description: 制御フローに基づく型の絞り込みの仕組みと、タグ付きユニオンやユーザ定義型ガードで絞り込みを助ける方法、その注意点を扱う項目
tags: [book-chapter, typescript]
date: 2025-05-02
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 22
---

## TL;DR

- [[typescript|TypeScript]] は、条件分岐や早期 `return` などの制御フローをもとに[[type-narrowing|型を絞り込む]]。
- [[discriminated-union|タグ付きユニオン]]や[[user-defined-type-guard|ユーザ定義型ガード]]を使うと、絞り込みを助けられる。ただし明示的な型ガードは安全ではない。
- 型と格闘していると気づいたら、TypeScript が追いやすいコードにリファクタリングできないか考える。

## 内容

### 制御フローに基づく型の絞り込み

TypeScript は、次のような制御フローをもとに型を絞り込む。

- 条件分岐
- 早期 `return` や `throw`
- `Array.isArray` などの一部の標準関数
- `instanceof`
- `in` によるプロパティのチェック

```ts
const contains = (text: string, search: string | RegExp) => {
  if (search instanceof RegExp) return !!search.exec(text)
  //                                     ^? (parameter) search: RegExp

  return text.includes(search)
  //                   ^? (parameter) search: string
}
```

```ts
interface Apple {
  isGoodForBaking: boolean
}
interface Orange {
  numSlices: number
}

const pickFruit = (fruit: Apple | Orange) => {
  if ("isGoodForBaking" in fruit) fruit
  //                              ^? (parameter) fruit: Apple
  else fruit
  //   ^? (parameter) fruit: Orange
  fruit
  // ^? (parameter) fruit: Apple | Orange
}
```

### 絞り込みを助ける 2 つの方法

1 つ目はタグ付きユニオンである。共通のプロパティ（タグ）の値で分岐すると、型が絞り込まれる。

```ts
interface UploadEvent {
  type: "upload"
  filename: string
  contents: string
}
interface DownloadEvent {
  type: "download"
  filename: string
}
type AppEvent = UploadEvent | DownloadEvent

const handleEvent = (e: AppEvent) => {
  switch (e.type) {
    case "download":
      console.log("Download", e.filename)
      //                      ^? (parameter) e: DownloadEvent
      break
    case "upload":
      console.log("Upload", e.filename)
      //                    ^? (parameter) e: UploadEvent
      break
  }
}
```

2 つ目はユーザ定義型ガードである。戻り値の型に書いた `el is HTMLInputElement` を型述語と呼ぶ。

```ts
const isInputElement = (el: Element): el is HTMLInputElement => "value" in el

const getElementContent = (el: HTMLElement) => {
  if (isInputElement(el)) return el.value
  //                             ^? (parameter) el: HTMLInputElement

  return el.textContent
  //     ^? (parameter) el: HTMLElement
}
```

`filter` などの一部の関数では、型ガードを使って配列の要素の型を絞り込める。

```ts
const formEls = document.querySelectorAll(".my-form *")
const formInputEls = [...formEls].filter(isInputElement)
//    ^? const formInputEls: HTMLInputElement[]
```

### ユーザ定義型ガードの注意点

型ガードの本体が型述語と正しく対応しているかを誰もチェックしないので、明示的なユーザ定義型ガードは、[[type-assertion|型アサーション]]と同じく安全ではない。

一方、[TypeScript 5.5 で導入された型述語の推論](https://devblogs.microsoft.com/typescript/announcing-typescript-5-5/#inferred-type-predicates)は安全である。関数が次の条件をすべて満たすと、型述語が推論される。

1. 戻り値の型アノテーションを明示していない
2. `return` 文が 1 つだけで、暗黙の return がない
3. 引数を変更しない
4. 引数の型を絞り込む `boolean` 式を返す

この機能は、配列の `filter` メソッドを使うときに便利である。5.4 以前では、次のコードの `v.toFixed` で型エラーになっていた。

```ts
const stringOrNumberArr = [0, "1", 2, "3"]
const stringArr = stringOrNumberArr
  .filter((v) => typeof v === "number")
  // ^? function(v: string | number): v is number
  .map((v) => v.toFixed())
```

### アドバイス

型と格闘していると気づいたら、TypeScript がコードを追いやすいように[[refactoring|リファクタリング]]できないか考えるとよい。

```ts
const nameToNickname = new Map<string, string>()
declare let yourName: string

// リファクタリング前
let nameToUse: string
if (nameToNickname.has(yourName)) nameToUse = nameToNickname.get(yourName)
else nameToUse = yourName

// リファクタリング後
const nameToUse = nameToNickname.get(yourName) ?? yourName
```

また、型の絞り込みが行われない場合もあることを知っておく。次のコードでは、コールバックが実行されるまでに `obj.value` が書き換えられる可能性があるので、絞り込みが効かない。

```ts
function logLaterIfNumber(obj: { value: string | number }) {
  if (typeof obj.value === "number") {
    setTimeout(() => console.log(obj.value.toFixed()))
    // Property 'toFixed' does not exist on type 'string | number'.
  }
}

const obj: { value: string | number } = { value: 123 }
logLaterIfNumber(obj)
obj.value = "Cookie Monster"
```

## キーワード

- [[typescript|TypeScript]]
- [[type-narrowing|型の絞り込み]]
- [[discriminated-union|タグ付きユニオン]]
- [[user-defined-type-guard|型ガード]]
- [[type-assertion|型アサーション]]
- [[refactoring|リファクタリング]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
