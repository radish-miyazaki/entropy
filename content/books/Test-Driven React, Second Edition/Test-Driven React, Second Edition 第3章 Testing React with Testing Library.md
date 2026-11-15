---
title: Test-Driven React, Second Edition › Testing React with Testing Library
aliases: [Testing React with Testing Library]
description: TDD で React コンポーネントの単体テストを書く章。Vite で環境を作り、Testing Library で ARIA ロールを使って要素を取得する
tags: [book-chapter]
date: 2024-08-30
book: "[[Test-Driven React, Second Edition]]"
chapter: 3
---

## TL;DR

- [[test-driven-development|TDD]] のアプローチで、React コンポーネントの動作を確かめる[[unit-test|単体テスト]]を書く。
- [[testing-library|Testing Library]] で要素を取得するときは ARIA ロールを使うと、自然とアクセシビリティを守ったマークアップになる。

## 内容

### TDD で React コンポーネントを作る

この章では、[[testing-library|Testing Library]] を使った [[react|React]] のテストを扱う。TDD のアプローチでは、複雑なコンポーネントを小さな部品ごとに組み立てる。テストは一度に 1 つずつ書くことを意識する。道具には、[[typescript|TypeScript]] と React の [[jsx|JSX]] 構文、そして Testing Library（React Testing Library）を使う。

Testing Library で要素を取得するときは、[[aria-role|ARIA ロール]]を使うことが推奨されている。ロールで要素を探すようにすると、自然とアクセシビリティを守ったマークアップになる。

### セットアップ

単一の React コンポーネントを開発するので、[Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) でプロジェクトを作る。

```sh
npm create vite carousel -- --template react-ts
cd carousel
npm install
```

開発サーバは次のコマンドで立ち上げる。

```sh
npm run dev
```

このあと [[eslint|ESLint]]、[[prettier|Prettier]]、[[vitest|Vitest]]、Testing Library を設定する（このメモでは省略）。

### 実践例

この章では、カルーセルを題材に 3 つのコンポーネントを TDD で実装する。

- [[Test-Driven React, Second Edition 第3章 シンプルな React Component を TDD で実装する|シンプルな React Component を TDD で実装する]]
- [[Test-Driven React, Second Edition 第3章 入れ子になった React Component を TDD で実装する|入れ子になった React Component を TDD で実装する]]
- [[Test-Driven React, Second Edition 第3章 状態を持つ React Component を TDD で実装する|状態を持つ React Component を TDD で実装する]]

## キーワード

- [[test-driven-development|テスト駆動開発]]
- [[unit-test|単体テスト]]
- [[testing-library|Testing Library]]
- [[react|React]]
- [[jsx|JSX]]
- [[aria-role|ARIA ロール]]
- [[vitest|Vitest]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
