---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › コンパイラーオプションやリンターを使ってコードに規約を適用する
description: コーディング規約をドキュメントに書くだけでなくコンパイラオプションやリンタのルールで強制し、本書の各項目に対応する設定を紹介する訳者オリジナルの項目
tags: [book-chapter, typescript]
date: 2025-04-12
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 84
---

## TL;DR

- コーディング規約はドキュメントに書くだけでなく、[[typescript|TypeScript]] のコンパイラオプションやリンタのルールで強制する。
- 既存のルールで表せない規約は、[[eslint|ESLint]] の `no-restricted-syntax` で特定の構文を禁止できる。
- この項目は日本語版の訳者によるオリジナルで、本書の各項目に対応する設定を紹介している。

## 内容

### 規約を設定で強制する

コーディング規約はドキュメントに書くだけで終わらせず、コンパイラオプションやリンタの設定に反映したほうがよい。一般に問題とされる書き方（[[type-assertion|型アサーション]]など）に例外的な使い道がある場合でも、頻度が高くなければ設定で禁止することを検討する。TypeScript やリンタのエラーは `@ts-ignore` や `@ts-expect-error` のコメントで無効にできるので、禁止された書き方をするにはコメントを書かざるを得なくなる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目43 可能なかぎり狭いスコープでany型を使う|項目43]]）。これにより、問題のあるコードがうっかり書かれることがなくなり、コードレビューでの見落としも防げる。ただし、やりすぎると `@ts-expect-error` のコメントだらけになって読みにくくなる。

どこまでエラーにするか迷ったときは、新規プロジェクトなら後から緩めるのは簡単なので、厳しめに設定する。既存のプロジェクトなら、その設定を入れる理由を説明できるかをまず考える。

### no-restricted-syntax で独自の規約を書く

規約に合うルールが見つからない場合は、ESLint の [`no-restricted-syntax`](https://eslint.org/docs/latest/rules/no-restricted-syntax) を使う。CSS セレクタに似た書き方で構文を指定し、その構文の利用を禁止できる。次の例は、`null` や `undefined` を含むユニオン型の型エイリアスを禁止する。

```js
// eslint.config.mjs
export default tseslint.config(
  // ...
  {
    // ...
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "TSTypeAliasDeclaration > " +
            ".typeAnnotation[type=TSUnionType] > " +
            ":matches(TSNullKeyword, TSUndefinedKeyword)",
          message: "null や undefined を含むユニオン型の型エイリアスを使ってはいけません",
        },
      ],
    },
  },
)
```

ルールを書くときは [typescript-eslint の Playground](https://typescript-eslint.io/play/) が便利である。[[abstract-syntax-tree|AST]] も表示できるので、禁止したいコードの AST ノードを確かめながら `selector` を書き、ルールが期待どおりに動くところまで確認できる。

### 本書の項目に対応する設定

ルール名は、特に断りがなければ [[typescript-eslint]] のものである。

- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目5 any型の使用を制限する|項目5]]: [`no-explicit-any`](https://typescript-eslint.io/rules/no-explicit-any/)、[`no-unsafe-assignment`](https://typescript-eslint.io/rules/no-unsafe-assignment/)、[`no-unsafe-return`](https://typescript-eslint.io/rules/no-unsafe-return/) で `any` の混入を防ぐ。項目43 の `any` の拡散も後の 2 つで防げる
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目9 型アノテーションを型アサーションより優先的に使用する|項目9]]: [`consistent-type-assertions`](https://typescript-eslint.io/rules/consistent-type-assertions/) の `assertionStyle` を `never` にして型アサーションを、[`no-non-null-assertion`](https://typescript-eslint.io/rules/no-non-null-assertion/) で非 null アサーションを禁止する
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目10 ラッパーオブジェクト型（String、Number、Boolean、Symbol、BigInt）を使用しない|項目10]]: [`no-wrapper-object-types`](https://typescript-eslint.io/rules/no-wrapper-object-types/)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目13 type（型エイリアス）とinterfaceの違いを知る|項目13]]: [`consistent-type-definitions`](https://typescript-eslint.io/rules/consistent-type-definitions/) で `interface` を優先させる
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目14 readonlyを使用して変更にまつわるエラーを避ける|項目14]]: [`prefer-readonly-parameter-types`](https://typescript-eslint.io/rules/prefer-readonly-parameter-types/)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目16 インデックスシグネチャよりも適切な代替手段を使う|項目16]]、[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目17 数値型のインデックスシグネチャを避ける|項目17]]: `no-restricted-syntax` で制約のないインデックスシグネチャや `Record<string, ...>`、`Record<number, ...>`、数値のキーを禁止する。[`consistent-indexed-object-style`](https://typescript-eslint.io/rules/consistent-indexed-object-style/) は書き方を統一するルールで、目的が違う
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目18 推論可能な型でコードを乱雑にしない|項目18]]: [`no-inferrable-types`](https://typescript-eslint.io/rules/no-inferrable-types/)。戻り値の[[type-annotation|型アノテーション]]は [`explicit-function-return-type`](https://typescript-eslint.io/rules/explicit-function-return-type/) か [`explicit-module-boundary-types`](https://typescript-eslint.io/rules/explicit-module-boundary-types/) で強制する
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目19 異なる型には異なる変数を使う|項目19]]: ESLint の [`no-shadow`](https://eslint.org/docs/latest/rules/no-shadow) で[[variable-shadowing|シャドーイング]]を禁止する
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目27 コールバックの代わりにasync関数を使用して型の流れを改善する|項目27]]: [`promise-function-async`](https://typescript-eslint.io/rules/promise-function-async/)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目31 型情報をドキュメントで繰り返さない|項目31]]: eslint-plugin-jsdoc の [`no-types`](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-types.md#readme)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目32 nullやundefinedを型エイリアスに含めない|項目32]]: 上の `no-restricted-syntax` の例。条件型の中の `undefined` は見逃すが、実用上は十分である
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目38 同じ型のパラメーターの繰り返しを避ける|項目38]]: [`max-params`](https://typescript-eslint.io/rules/max-params/)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目48 健全性の罠を回避する|項目48]]: [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess) と [`method-signature-style`](https://typescript-eslint.io/rules/method-signature-style/)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目51 不必要な型パラメーターを避ける|項目51]]: [`no-unnecessary-type-parameters`](https://typescript-eslint.io/rules/no-unnecessary-type-parameters/)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目52 オーバーロードシグネチャより条件型を優先的に使用する|項目52]]: [`unified-signatures`](https://typescript-eslint.io/rules/unified-signatures/)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目59 never型を使って網羅性チェックを行う|項目59]]: [`switch-exhaustiveness-check`](https://typescript-eslint.io/rules/switch-exhaustiveness-check/) と [`noImplicitReturns`](https://www.typescriptlang.org/tsconfig/#noImplicitReturns)。これで `never` が必要になるのは、値を返さず `switch` 以外の分岐を持つ関数だけになる
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目68 APIのコメントにTSDocを使う|項目68]]: eslint-plugin-jsdoc の [`require-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-jsdoc.md#readme) で [[tsdoc|TSDoc]] を強制する
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目72 TypeScriptの独自機能の使用を避け、ECMAScriptの機能を使う|項目72]]: `enum` は `no-restricted-syntax` で `TSEnumDeclaration` を禁止する。パラメータプロパティは [`parameter-properties`](https://typescript-eslint.io/rules/parameter-properties/)、`namespace` は [`no-namespace`](https://typescript-eslint.io/rules/no-namespace/)、トリプルスラッシュインポートは [`triple-slash-reference`](https://typescript-eslint.io/rules/triple-slash-reference/) で禁止する。TypeScript 5.8 で入った [`erasableSyntaxOnly`](https://www.typescriptlang.org/tsconfig/#erasableSyntaxOnly) でも `enum` や `namespace` を禁止できる。実験的デコレータは `experimentalDecorators` を有効にしなければよい

### 訳者による解説

本書の内容は主張が強い（opinionated）ので、`"strict": true` や typescript-eslint の [recommended](https://typescript-eslint.io/users/configs/#recommended) のような一般的な設定だけではカバーできない。また、ソフトウェア開発はチームで行うので、1 人が本書を読んで意識を高めても意味がない。そこで、本書の推奨をコンパイラオプションやリンタで強制する。見逃しがなくなり、後から加わるメンバーにも優しい。ただし、ルールが複雑になるとメンテナンスのコストも高くなる。

## キーワード

- [[typescript|TypeScript]]
- [[eslint|ESLint]]
- [[typescript-eslint]]
- [[abstract-syntax-tree|AST]]
- [[type-assertion|型アサーション]]
- [[type-annotation|型アノテーション]]
- [[variable-shadowing|シャドーイング]]
- [[tsdoc|TSDoc]]

## 自分の理解

[[Effective Rust]] にも似た項目があった（[[Effective Rust 項目29 Clippyに耳を傾けよう|項目29 Clippyに耳を傾けよう]]）。
