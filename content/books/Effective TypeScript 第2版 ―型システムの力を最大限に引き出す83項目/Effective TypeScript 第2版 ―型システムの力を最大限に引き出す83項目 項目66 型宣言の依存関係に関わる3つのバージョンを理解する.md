---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目66 型宣言の依存関係に関わる3つのバージョンを理解する
description: ライブラリ、@types、TypeScript の 3 つのバージョンが食い違う原因と解決策、型宣言をバンドルするか DefinitelyTyped で公開するかの比較を説明する項目
tags: [book-chapter, typescript]
date: 2025-06-06
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 66
---

## TL;DR

- 型宣言の依存関係には、ライブラリ、`@types`、TypeScript の 3 つのバージョンが関わり、これらが食い違うと問題が起きる。
- 型宣言をライブラリにバンドルするとバージョンの食い違いはなくなるが、[[definitely-typed|DefinitelyTyped]] で公開する場合に比べて不利な点もある。

## 内容

### 3 つのバージョン

型宣言の依存関係には、次の 3 つのバージョンが関わる。

1. ライブラリのバージョン
2. `@types` のバージョン
3. [[typescript|TypeScript]] のバージョン

### 食い違いが起きる主な原因

1 つ目は、ライブラリを更新したときに `@types` の更新を忘れることである。ライブラリに対して `@types` が古くなる。`@types` のバージョンを上げれば解決する。`@types` に変更がまだ反映されていなければ、[[module-augmentation|モジュールオーグメンテーション]]で新しい関数やメソッドを足す。`@types` に修正を送るのもよい。

2 つ目は、後から `@types` を追加することである。`@types` に対してライブラリが古くなる。`@types` のバージョンを下げるか、ライブラリを上げれば解決する。

3 つ目は、`@types` がプロジェクトの TypeScript より新しいバージョンを要求することである。TypeScript を上げるか、`@types` を下げれば解決する。最終手段として、`declare module` で型を握りつぶす方法もある。[typesVersions](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#version-selection-with-typesversions) を使って TypeScript のバージョンごとに別の型宣言を提供するライブラリもあるが、まれである。DefinitelyTyped に登録されたパッケージの 1% 程度で、`@types/node` や `@types/react` などのメジャーなものに限られる。

4 つ目は、`@types` の依存パッケージが重複することである（[[transitive-dependency|推移的依存関係]]）。たとえば、プロジェクトが `@types/foo` と `@types/bar` に依存し、`@types/bar` も `@types/foo` に依存している場合である。

```mermaid
graph LR
  project["自身のプロジェクト"] --> foo["@types/foo"]
  project --> bar["@types/bar"]
  bar --> foo
```

`@types/bar` が依存する `@types/foo` のバージョンと、プロジェクトが使うバージョンに互換性がないと、[[npm|npm]] は両方のバージョンを入れ子のフォルダにインストールして解決しようとする。

```sh
node_modules/
  @types/
    foo/
      index.d.ts @1.2.3
    bar/
      index.d.ts
      node_modules/
        @types/
          foo/
            index.d.ts @2.3.4
```

すると、宣言が重複したり、宣言をマージできなかったりしてエラーになる。さまざまなトラブルの元になり（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目70 型を部分的にコピーして依存を断ち切る|項目70 型を部分的にコピーして依存を断ち切る]]）、コンパイラのパフォーマンスも悪くなる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目78 コンパイラーのパフォーマンスに注意を払う|項目78 コンパイラーのパフォーマンスに注意を払う]]）。`npm ls @types/foo` で重複の原因を突き止め、バージョンを更新して解決する。

### 型宣言をバンドルするか DefinitelyTyped で公開するか

自分の型宣言をバンドルするには、[package.json の `types` フィールドに .d.ts ファイルを指定する](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#including-declarations-in-your-npm-package)。

```json
{
  "types": "index.d.ts"
}
```

バンドルすると、バージョンの食い違いの問題がなくなる。特に、ライブラリ自体が TypeScript で書かれていて、型宣言を tsc で（[declaration オプション](https://www.typescriptlang.org/tsconfig/#declaration)を有効にして）生成する場合に役立つ。

一方で、DefinitelyTyped に比べて次の不利な点がある。

- バンドルした型に問題があっても、利用者が「実装にだけ依存する」選択を取れない
- 型の依存関係を宣言できない。`devDependencies` は利用者側に入らないので（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目65 TypeScriptと@typesはdevDependenciesに追加する|項目65 TypeScriptと@typesはdevDependenciesに追加する]]）、公開したライブラリの型が他のライブラリの型宣言に依存していると、利用者のコードで型エラーが起きる。DefinitelyTyped はこれを自動で扱う
- 複数のバージョンの型宣言を同時にメンテナンスしにくい。DefinitelyTyped にはそのための仕組みがある
- すべて自分でメンテナンスする必要がある。DefinitelyTyped のコミュニティには膨大な数のメンテナがいる

プロジェクトによっては、型宣言を別のパッケージとして公開するという中間の方法を採ることもある。

## キーワード

- [[definitely-typed|DefinitelyTyped]]
- [[transitive-dependency|推移的依存関係]]
- [[module-augmentation|モジュールオーグメンテーション]]
- [[declaration-file|型宣言ファイル]]
- [[npm|npm]]
- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
