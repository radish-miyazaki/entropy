---
title: 型宣言ファイル
aliases: [.d.ts]
description: 型の情報だけを持ち、JavaScript を出力しない TypeScript のファイル（.d.ts）
tags: [word, typescript]
date: 2026-11-14
---

## TL;DR

型の情報だけを持つ [[typescript|TypeScript]] のファイルで、拡張子は `.d.ts` である。値や型が存在することを宣言するが、実装は持たない。JavaScript を出力せず、型チェックにだけ使われる。

## なぜ必要か

JavaScript で書かれたライブラリには型の情報がないので、そのままでは TypeScript から呼び出しを型チェックできない。型宣言ファイルがあれば、型のないコードにも正確な型と補完を付けられる。TypeScript で書いたライブラリを npm で公開するときも、利用者に型を渡すために型宣言ファイルを同梱する。

## 仕組み

TypeScript の公式ドキュメントでは、`.ts` は型と実行するコードを持つ実装ファイルで、`.d.ts` は型の情報だけを持つ宣言ファイルだと区別している。

TypeScript は、JavaScript の標準の API の型宣言を `lib.[something].d.ts` という名前で同梱している。ブラウザの `window` や `document` などの [[dom|DOM]] API の型もここに含まれる。標準以外のライブラリの型宣言は、ライブラリの npm パッケージに同梱されているか、[[definitely-typed|DefinitelyTyped]] から `@types` のパッケージとして入れる。TypeScript は `node_modules/@types` の下の型定義を自動で見つける。どちらもなければ、自分で型宣言ファイルを書く。

自分の TypeScript のコードからは、コンパイラオプションの `declaration` を有効にすると、各ファイルに対応する `.d.ts` が生成される。

## 例

`declaration: true` で次のコードをコンパイルする。

```ts
export let helloWorld = "hi"
```

すると、次の型宣言が出力される。

```ts
export declare let helloWorld: string
```

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目|Effective TypeScript]] の項目 58 では、PgTyped が SQL クエリを実際のデータベースと照合し、入出力の型を持つ型宣言ファイルを生成する例を挙げている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[definitely-typed|DefinitelyTyped]]
- [[declaration-merging|宣言のマージ]]

## 出典

- [TypeScript: Documentation - Type Declarations](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html)
- [TypeScript: TSConfig Reference - declaration](https://www.typescriptlang.org/tsconfig/#declaration)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目58 コード生成を複雑な型の代替手段として検討する|Effective TypeScript 第2版 項目58]]
