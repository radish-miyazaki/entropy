---
title: TSX
aliases: []
description: TypeScript と JSX を組み合わせたもので、JSX を含む TypeScript ファイルは .tsx 拡張子にする
tags: [word, typescript, react]
date: 2024-08-30
---

## TL;DR

[[typescript|TypeScript]] と [[jsx|JSX]] を組み合わせたもの。JSX を含む TypeScript のファイルは、拡張子を `.tsx` にする必要がある。

## 仕組み

`.tsx` は TypeScript 固有の拡張子で、そのファイルが JSX を含むことを TypeScript に伝える。

TypeScript のハンドブックによると、JSX を使うには、拡張子を `.tsx` にすることに加えて、`tsconfig.json` などで `jsx` オプションを有効にする必要がある。`jsx` オプションには `preserve`、`react`、`react-native`、`react-jsx`、`react-jsxdev` の 5 つのモードがあり、JSX の変換のしかたが変わる。たとえば `preserve` は JSX をそのまま出力して [[babel|Babel]] などの別のツールに変換を任せ、`react` は `React.createElement` の呼び出しに変換する。`react-jsx` は自動ランタイムの `_jsx` の呼び出しに変換する。

[[react|React]] の型定義は `@types/react` と `@types/react-dom` として提供されている。

```sh
npm install --save-dev @types/react @types/react-dom
```

## 例

TypeScript で React を書くときの主な違いは、コンポーネントの props に型を付けられることである。

```tsx
function MyButton({ title }: { title: string }) {
  return <button>{title}</button>
}
```

props が多いときは、`type` や `interface` で型を定義すると扱いやすい。

## 注意点

山かっこを使う[[type-assertion|型アサーション]]は JSX の構文とぶつかるので、`.tsx` ファイルでは使えない。代わりに `as` 演算子を使う。`as` は `.ts` でも `.tsx` でも使え、山かっこの書き方と同じように動く。

```ts
const foo = <Foo>bar // .tsx では使えない
const foo = bar as Foo
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[jsx|JSX]]
- [[typescript|TypeScript]]

## 出典

- [TypeScript の使用 – React](https://ja.react.dev/learn/typescript#typescript-with-react-components)
- [JSX - TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/jsx.html)
