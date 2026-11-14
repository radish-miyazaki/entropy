---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目78 コンパイラーのパフォーマンスに注意を払う
description: TypeScript のビルドと言語サービスを速く保つために、ビルド時の型チェックの省略、不要なコードの削除、インクリメンタルビルド、型の見直しを行う項目
tags: [book-chapter, typescript]
date: 2025-05-08
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 78
---

## TL;DR

- [[typescript|TypeScript]] のパフォーマンスの問題には、ビルド（`tsc`）のものと言語サービス（`tsserver`）のものがある。
- ビルド時の型チェックを省く、不要なコードやパッケージを消す、[[incremental-build|インクリメンタルビルド]]と[[project-references|プロジェクト参照]]を使う、重い型を見直す、の 4 つで改善できる。

## 内容

### ビルド時に型チェックをしない

TypeScript は、[[bundler|バンドラ]]（ts-loader を使った [[webpack]] や [[vite|Vite]]）や ts-node など、他のツールを経由して実行されることが多い。このうち、Vite はデフォルトで[トランスパイルだけを行う](https://vite.dev/guide/features#transpile-only)が、webpack（ts-loader）や ts-node は型チェックも行う。これを無効にするにはオプションを指定する（[ts-node](https://typestrong.org/ts-node/docs/options/#transpileonly)、[ts-loader](https://github.com/TypeStrong/ts-loader?tab=readme-ov-file#transpileonly)）。

### デッドコードや不要なパッケージを削除する

[`noUnusedLocals`](https://www.typescriptlang.org/tsconfig/#noUnusedLocals) を有効にすると、使われていないコードや型を検出できる。ただし、`export` されているのに使われていないシンボルは検出できないので、[[knip|Knip]] のようなツールが必要になる。Knip は使っていないパッケージも検出できる。

プロジェクトに含まれるファイルの量を確かめるには、次のコマンドが使える。1 つ目はプロジェクトに含まれるすべてのソースを表示し、2 つ目はコンパイルされる各ファイルのバイト数を可視化する。

```sh
npx tsc --listFiles
npx tsc --noEmit --listFiles | xargs stat -f "%z %N" | npx webtreemap-cli
```

### インクリメンタルビルドとプロジェクト参照を使う

[`incremental`](https://www.typescriptlang.org/tsconfig/#incremental) を有効にすると、初回のビルドで作業の一部を `.tsbuildinfo` ファイルに書き出す。2 回目以降のビルドではこのファイルを読み込むので、速くビルドできる。プロジェクト参照と組み合わせると、さらに最適化できる。

### 型を見直す

型の書き方もコンパイラの速さに影響する。

- 大きな[[union-type|ユニオン型]]を避ける。たとえば次の `Year` は 1000 個のメンバーを持つ

  ```ts
  type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
  type Year = `2${Digit}${Digit}${Digit}`
  ```

- `type` のインターセクション（`&`）ではなく、`interface` の `extends` を使う（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目13 type（型エイリアス）とinterfaceの違いを知る|項目13]]）
- 戻り値に[[type-annotation|型アノテーション]]を付ける（推論できる型を書きすぎないことについては[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目18 推論可能な型でコードを乱雑にしない|項目18]]）
- 末尾再帰でない再帰的なジェネリック型を避ける（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目57 再帰的なジェネリック型は末尾再帰にする|項目57]]）

## キーワード

- [[typescript|TypeScript]]
- [[bundler|バンドラ]]
- [[webpack]]
- [[vite|Vite]]
- [[knip|Knip]]
- [[incremental-build|インクリメンタルビルド]]
- [[project-references|プロジェクト参照]]
- [[union-type|ユニオン型]]
- [[type-annotation|型アノテーション]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
