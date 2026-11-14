---
title: Twoslash
aliases: []
description: TypeScript のコンパイラにエラーや型の情報を出させる、コードサンプル用のマークアップ形式
tags: [word, typescript]
date: 2025-06-06
---

## TL;DR

[[typescript|TypeScript]] のコードサンプルのためのマークアップ形式。エラーメッセージや型の情報を TypeScript のコンパイラに出させて、ドキュメントのコードに表示する。

## なぜ必要か

コードサンプルに添えるエラーや型の情報を手で書くと、実際のコンパイラの出力とずれやすい。Twoslash はその作業をコンパイラに任せる。TypeScript の公式サイトでは、コードサンプルを表示する前の処理として使われている。コンパイラのバグ報告で例を書く標準的な方法でもある。

## 仕組み

コードに特別なコメントを書いて、サンプルの処理を指示する。`// @errors: 2322` は、エラー 2322 が起きることを宣言する。表示ではコードの下にコンパイラのエラーメッセージが出る。`// ---cut---` より前の行は、表示されない準備用のコードになる。

## 例

```ts
// @errors: 2322
let x: [string, number]
// ---cut---
x = [10, "hello"]
```

読み手には代入の行と、そのエラーだけが表示される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [twoslashes/twoslash](https://github.com/twoslashes/twoslash)
- [Twoslash](https://twoslash.netlify.app/guide/)
