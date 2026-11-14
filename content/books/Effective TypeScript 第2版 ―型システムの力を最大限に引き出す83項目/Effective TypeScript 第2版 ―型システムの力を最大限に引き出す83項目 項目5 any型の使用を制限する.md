---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目5 any型の使用を制限する
description: any 型を使うと型安全性や言語サービスの支援を失い、型設計も見えなくなるので、使用をできるだけ制限するよう説く項目
tags: [book-chapter, typescript]
date: 2025-04-18
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 5
---

## TL;DR

- [[any-type|any 型]]を使うと、型安全性、関数の契約、[[language-service|言語サービス]]の支援を失い、リファクタリングのバグも見つけにくくなる。
- `any` は型設計も隠してしまうので、危険性を理解した上で、できるだけ使わない。

## 内容

`any` を使うときは、次の危険性を理解した上で使う。そもそも、可能な限り使わないほうがよい。

### 型安全性と契約が失われる

`any` を使うと、型安全ではなくなる。また、関数の契約を破れるようになる。ここでの契約とは、決まった型の入力が与えられたら、決まった型の出力を返すという約束である。

### 言語サービスの支援を受けられない

言語サービスは、[[visual-studio-code|Visual Studio Code]] などのエディタや IDE に、自動補完やシンボルの一括リネームなどの機能を提供するプログラムである。`any` 型の値には、これらの支援が効かない。

### リファクタリングによるバグを見つけにくい

次のコードで、コールバックに `item` 全体ではなく `id` だけを渡すようにリファクタリングしたとする。

```ts
interface ComponentProps {
  onSelectItem: (item: any) => void
}

function renderSelector(props: ComponentProps) {
  // ...
}

let selectId: number = 0
function handleSelectItem(item: any) {
  selectId = item.id
}
renderSelector({ onSelectItem: handleSelectItem })
```

```ts
interface ComponentProps {
  // item 全体ではなく id のみ渡す
  onSelectItem: (id: number) => void
}
```

`handleSelectItem` の引数が `any` なので、型チェックは通ってしまう。しかし実際には `handleSelectItem` に `number` の値が渡されるので、実行時に期待どおりに動かない。

### 型設計が隠れる

クリーンで[[cognitive-load|認知的負荷]]の低いコードを書くには、良い型設計が欠かせない（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目|本書]]の 4 章「型設計」）。`any` を使うと型設計が暗黙になり、良い設計なのか、そもそもどんな設計なのかが分かりにくくなる。その結果、レビュアーは暗黙の型設計を頭の中で組み立て直しながら、コードを読むことになる。

## キーワード

- [[any-type|any 型]]
- [[language-service|言語サービス]]
- [[refactoring|リファクタリング]]
- [[cognitive-load|認知的負荷]]

## 自分の理解

TS Playground でも、シンボルの名前変更ができることを知った。
