---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目82 依存関係グラフの下から上へモジュールごとに移行する
description: JavaScript から TypeScript へは依存関係グラフの下から順にモジュールごとに移行し、移行中はリファクタリングより型の追加に集中する項目
tags: [book-chapter, typescript]
date: 2025-05-09
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 82
---

## TL;DR

- [[javascript|JavaScript]] から [[typescript|TypeScript]] へは、[[dependency-graph|依存関係グラフ]]の下から上に向かって、モジュールごとに移行する。
- 移行中は[[refactoring|リファクタリング]]より型の追加に集中する。

## 内容

### 移行の順序

JavaScript から TypeScript へ移行するときは、依存関係グラフの下から上に向かって進める。依存関係グラフは [madge](https://github.com/pahen/madge) で可視化できる。生成したグラフを[[topological-sort|トポロジカルソート]]すれば、各モジュールをどの順序で移行すればよいかが分かる。

最初に移行するのは、サードパーティのパッケージである。型が同梱されていないパッケージは、`@types` パッケージを別途インストールする。このとき、パッケージと型のバージョンは必ず一致させる。

```sh
npm i --save-dev @types/lodash
```

外部 API を呼び出すコードも早めに移行する。仕様書や DB スキーマのような信頼できる情報源があれば、そこから型を生成したほうがよい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目42 たまたま目にしたデータに基づく型を避ける|項目42]]）。

### 移行時の注意

移行するときは、リファクタリングよりも型の追加に集中する。直近の目標は TypeScript への移行であり、設計の改善ではない。リファクタリングにまで手を出すと、作業が遅くなり、コードレビューも難しくなり、バグを生むリスクも高まる。

[[jsdoc|JSDoc]] と `@ts-check` を使っていた場合、TypeScript に移行すると型安全性を失うことがある。TypeScript では JSDoc の型が強制されなくなるからである。たとえば次の `num` は暗黙の `any` になる。

```ts
/**
 * @param {number} num
 */
function double(num) {
  return 2 * num
}
```

この場合、IDE のクイックフィックスを使うと、JSDoc の型から[[type-annotation|型アノテーション]]を追加できる。型を追加したら、JSDoc からは型を消す（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目31 型情報をドキュメントで繰り返さない|項目31]]）。

### よく出るエラーと解決策

#### 宣言されていないクラスのメンバー

JavaScript のクラスはメンバーを宣言しなくてもよいが、TypeScript では宣言が必要である。クイックフィックスを使えば、使われ方に基づいてメンバーの宣言を追加してくれる。ただし、使われ方から型を推測できない場合は `any` になる。

#### 型が変化する値

```ts
const state = {}
//    ^? const state: {}
state.name = "New York" // 型エラー: Property 'name' does not exist on type '{}'.
state.capital = "Albany" // 型エラー: Property 'capital' does not exist on type '{}'.
```

修正が小さく済むなら、オブジェクトを一度に構築する（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目21 オブジェクトを一度に構築する|項目21]]）。

```ts
const state = { name: "New York", capital: "Albany" }
```

そうでなければ、`const state = {} as State` のように[[type-assertion|型アサーション]]を使う。型アサーションは避けるのが最善である（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目9 型アノテーションを型アサーションより優先的に使用する|項目9]]）。しかし、今はリファクタリングより移行を優先し、TODO コメントや Issue を残して後で直してもよい。

## キーワード

- [[typescript|TypeScript]]
- [[javascript|JavaScript]]
- [[dependency-graph|依存関係グラフ]]
- [[topological-sort|トポロジカルソート]]
- [[refactoring|リファクタリング]]
- [[jsdoc|JSDoc]]
- [[type-annotation|型アノテーション]]
- [[type-assertion|型アサーション]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
