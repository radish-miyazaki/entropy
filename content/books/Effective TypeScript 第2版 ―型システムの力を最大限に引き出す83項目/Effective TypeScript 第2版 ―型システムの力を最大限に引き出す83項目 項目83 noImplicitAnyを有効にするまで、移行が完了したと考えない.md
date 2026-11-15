---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › noImplicitAnyを有効にするまで、移行が完了したと考えない
description: noImplicitAny を有効にするまでは TypeScript への移行が終わったと考えず、型カバレッジを見ながら少しずつエラーを直していく項目
tags: [book-chapter, typescript]
date: 2025-05-09
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 83
---

## TL;DR

- `noImplicitAny` を有効にするまでは、[[typescript|TypeScript]] への移行が完了したと考えない。
- 型カバレッジで進捗を見ながら、ローカルで少しずつエラーを直していく。

## 内容

型チェックが厳格でないと型宣言に含まれる間違いが隠れてしまうので、[`noImplicitAny`](https://www.typescriptlang.org/tsconfig/#noImplicitAny) を有効にするまでは、TypeScript への移行が完了したと考えてはいけない。

### 有効にするときのコツ

進捗は型カバレッジで把握する（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目49 型カバレッジを監視し、型安全性のリグレッションを防ぐ|項目49]]）。そのうえで、ローカルでだけ `noImplicitAny` を有効にし、エラーを少しずつ直していく。

変更のたびにテストを実行し、こまめにコミットする。ただし、エラーがゼロになるまで `tsconfig.json` の変更はコミットしない。[[project-references|プロジェクト参照]]を使っていれば、一部のプロジェクトだけに設定を入れることもできる。

`noImplicitAny` を有効にした後は、[`strict`](https://www.typescriptlang.org/tsconfig/#strict) のようなより厳格な設定を有効にしてもよい。ただし、チーム全員が TypeScript に慣れる時間をとる。

## キーワード

- [[typescript|TypeScript]]
- 型カバレッジ
- [[project-references|プロジェクト参照]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
