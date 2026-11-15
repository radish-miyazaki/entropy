---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › オプションプロパティは限定的に使用する
description: オプションプロパティはバグの見逃しやデフォルト値の不一致を招くので、追加する前に必須にできないかを考えるべきだと説く項目
tags: [book-chapter, typescript]
date: 2025-05-09
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 37
---

## TL;DR

- オプションプロパティを追加する前に、本当に必須プロパティにできないかを考える。
- 避けられないときは、正規化前と正規化後の入力を別の型で表す。

## 内容

### 避けるべき理由

オプションプロパティは、型チェッカがバグを見つけるのを妨げる。たとえば、関数に値を渡し忘れても型エラーにならない。

また、デフォルト値を埋めるコードがあちこちで繰り返され、それぞれでデフォルト値が食い違うおそれがある。次の 2 行は同じ設定を読んでいるのに、デフォルト値が異なっており、[[consistency|一貫性]]がない。

```ts
const unitSystem = config.unitSystem ?? "imperial"
const unitSystem = config.unitSystem ?? "metric"
```

### 避ける方法

正規化されていない入力データと、正規化した入力データを別の型で表す方法がある。

```ts
interface InputAppConfig {
  darkMode: boolean
  unitSystem?: UnitSystem
}
interface AppConfig extends InputAppConfig {
  unitSystem: UnitSystem
}
```

`AppConfig` は `Required<InputAppConfig>` でも表せる。

### 使うべきケース

オプションプロパティが適しているのは、既存の API を型で表すときや、後方互換性を保ちながら API を拡張したいときである。巨大な設定項目を扱う場合や、ミドルネームのように本当に省略可能なプロパティにも使える。

### 使うときの注意点

オプションプロパティを n 個追加すると、2^n 通りの組み合わせが生まれる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目29 有効な状態のみ表現する型を作る|項目29 有効な状態のみ表現する型を作る]]）。また、オプションプロパティは不健全性の原因にもなる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目48 健全性の罠を回避する|項目48 健全性の罠を回避する]]）。

## キーワード

- [[typescript|TypeScript]]
- [[consistency|一貫性]]
- [[soundness|健全]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
