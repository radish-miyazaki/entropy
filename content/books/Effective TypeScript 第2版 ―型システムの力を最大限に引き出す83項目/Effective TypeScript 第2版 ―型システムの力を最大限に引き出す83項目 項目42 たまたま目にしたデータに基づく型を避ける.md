---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › たまたま目にしたデータに基づく型を避ける
description: 手元のデータから型を手書きせず、提供されている型定義、スキーマからの生成、データからの生成の順に型を用意すべきだと説く項目
tags: [book-chapter, typescript]
date: 2025-05-16
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 42
---

## TL;DR

- 公式やコミュニティが型を提供していれば、自分で定義せずにそれを使う。
- なければスキーマから型を生成し、スキーマもなければデータから型を生成する。

## 内容

### 提供されている型を使う

公式のクライアントやコミュニティが型を提供している場合は、自分で定義せずにそれを使う。たとえば [[geojson|GeoJSON]] には [@types/geojson](https://www.npmjs.com/package/@types/geojson) がある。

### スキーマから型を生成する

型が提供されていない場合は、スキーマから型を生成する。[[openapi|OpenAPI]] なら [Orval](https://orval.dev/)、[[graphql-schema|GraphQL Schema]] なら [[graphql-codegen|GraphQL Code Generator]]、[[protocol-buffers|Protocol Buffers]] なら [[buf|Buf]] が使える。

### データから型を生成する

スキーマも提供されていない場合は、データから型を生成する。JSON なら [quicktype](https://quicktype.io/) が使える。ただし、データセットが無限にある場合は、生成した型からエッジケースが漏れ、実際の型と合わなくなるおそれがある。

## キーワード

- [[typescript|TypeScript]]
- [[geojson|GeoJSON]]
- [[openapi|OpenAPI]]
- [[graphql-schema|GraphQL Schema]]
- [[graphql-codegen|GraphQL Code Generator]]
- [[protocol-buffers|Protocol Buffers]]
- [[buf|Buf]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
