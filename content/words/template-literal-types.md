---
title: テンプレートリテラル型
aliases: [Template Literal Types]
description: JavaScript のテンプレートリテラルと同じ構文で、文字列リテラル型を組み立てる TypeScript の型
tags: [word, typescript]
date: 2026-11-14
---

## TL;DR

JavaScript のテンプレートリテラルと同じ構文を型の位置で使い、文字列リテラル型を組み立てる [[typescript|TypeScript]] の型。埋め込む型がユニオン型なら、すべての組み合わせの文字列リテラル型のユニオンになる。

## なぜ必要か

TypeScript Handbook によると、テンプレートリテラル型を使うと、オブジェクトのプロパティ名から `firstNameChanged` のようなイベント名を作り、それ以外の文字列を渡すとコンパイルエラーにできる。文字列どうしの関係を型で表せる。

## 仕組み

[[literal-type|リテラル型]]を埋め込むと、連結した新しい文字列リテラル型になる。埋め込む位置にユニオン型があれば、取りうるすべての文字列リテラル型のユニオンになり、複数のユニオンは掛け合わされる。[[generics|ジェネリクス]]と組み合わせると、渡された文字列のテンプレートに当てはまる部分から型引数を推論することもできる。

`Uppercase`、`Lowercase`、`Capitalize`、`Uncapitalize` という文字列操作の型がコンパイラに組み込まれており、組み合わせて使える。

## 例

```ts
type Lang = "en" | "ja"
type ID = "welcome" | "footer"
type MessageID = `${Lang}_${ID}`
// "en_welcome" | "en_footer" | "ja_welcome" | "ja_footer"
```

## 注意点

Handbook は大きなユニオンを作るときは事前に生成しておくことを勧めており、この方法は小さなケースに向いている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[typescript|TypeScript]]
- [[literal-type|リテラル型]]
- [[conditional-types|条件型]]
- [[mapped-type|マップ型]]
- [[tagged-template|タグ付きテンプレート]]

## 出典

- [Template Literal Types - TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
