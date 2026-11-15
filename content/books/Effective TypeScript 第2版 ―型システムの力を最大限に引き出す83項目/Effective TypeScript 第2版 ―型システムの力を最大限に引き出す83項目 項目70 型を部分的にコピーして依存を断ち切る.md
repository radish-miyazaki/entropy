---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › 型を部分的にコピーして依存を断ち切る
description: npm パッケージを公開するときは、必要な部分だけを持つ型を自分で定義して、型の推移的依存関係を断ち切る項目
tags: [book-chapter, typescript]
date: 2025-06-06
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 70
---

## TL;DR

- [[npm|npm]] パッケージを公開するときは、型の[[transitive-dependency|推移的依存関係]]を避ける。
- [[structural-typing|構造的型付け]]を利用し、必要なメソッドとプロパティだけを持つ型を自分で定義すれば、本質的でない依存を取り除ける。

## 内容

### 型の推移的依存関係が引き起こす問題

npm パッケージを公開するときは、型の推移的依存関係を避ける。例として、CSV をパースするライブラリを考える。このライブラリは [[nodejs|Node.js]] でも扱えるようにしたい。[[typescript|TypeScript]] で書くので、`@types/node` を `devDependencies` に追加しておく（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目65 TypeScriptと@typesはdevDependenciesに追加する|項目65 TypeScriptと@typesはdevDependenciesに追加する]]）。公開するときは `--declaration` を付けて[[declaration-file|型宣言ファイル]]を作り、ライブラリにバンドルする。

```ts
import { Buffer } from "node:buffer"

// Node.js でも扱いやすいように Buffer を引数に受け取る
function parseCSV(contents: string | Buffer): { [column: string]: string }[] {
  if (typeof contents === "object") {
    return parseCSV(contents.toString("utf8"))
  }

  // ...
}
```

このライブラリは、[[javascript|JavaScript]] の利用者が使う分には問題ない。しかし、Web 開発をしている TypeScript の利用者が使うと、次のエラーが出る。

```
Cannot find module 'node:buffer' or its corresponding type declarations.
```

`@types/node` を `devDependencies` に入れているので、このエラーが出る。`dependencies` に移せばエラーは消えるが、別の問題が起きる。実行時には不要な 10 万行近いコードをインストールさせることになるうえ、そもそも Node.js を使う TypeScript の利用者以外には要らないので、避けたほうがよい。

### 必要な部分だけをコピーする

これを避けるには、構造的型付けを利用して本質的でない依存を取り除く。上の例では、必要なメソッドとプロパティだけを持つ型を自分で定義すればよい。

```ts
export interface StringEncodable {
  toString(encoding?: string): string
}

function parseCSV(contents: string | StringEncodable): { [column: string]: string }[] {
  // ...
}
```

コードが `Buffer` の他のメソッドも使うようになったら、自分で定義したインタフェースにもそのメソッドを足す必要がある（[[vendoring|ベンダリング]]）。

### 得られるもの

こうすると、JavaScript の利用者に `@types` への依存を、Web 開発者に Node.js への依存を強制せずに済む。コンパイラのパフォーマンスも良くなる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目78 コンパイラーのパフォーマンスに注意を払う|項目78 コンパイラーのパフォーマンスに注意を払う]]）。単体テストと本番環境の依存関係を切り離すのにも役立つ（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目4 構造的型付けに慣れる|項目4 構造的型付けに慣れる]]）。

## キーワード

- [[transitive-dependency|推移的依存関係]]
- [[structural-typing|構造的型付け]]
- [[vendoring|ベンダリング]]
- [[declaration-file|型宣言ファイル]]
- [[npm|npm]]
- [[nodejs|Node.js]]
- [[javascript|JavaScript]]
- [[typescript|TypeScript]]

## 自分の理解

`Cannot find module 'node:buffer' or its corresponding type declarations.` は、たまに見るエラーである。
