---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目79 モダンなJavaScriptを書く
description: TypeScript なら実行環境を問わずモダンな JavaScript の構文が使えるので、ES モジュールやクラス、async/await などの新しい言語機能を積極的に使う項目
tags: [book-chapter, typescript, javascript]
date: 2025-05-09
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 79
---

## TL;DR

- [[typescript|TypeScript]] を使えば、実行環境に関係なくモダンな [[javascript|JavaScript]] の構文を使える。
- その利点を活かし、TypeScript で使えるようになる新しい言語機能を積極的に使う。

## 内容

### モダンな JavaScript の例

**`import` / `export`**: ES2015 より前の JavaScript には、コードをモジュールに分ける標準の方法がなかった。そのため、複数の `<script>` タグ、手作業での連結、Makefile、[[nodejs|Node.js]] の `require`、AMD の `define` コールバックなど、さまざまな方法が使われていた。TypeScript にも独自のモジュールの書き方があった（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目72 TypeScriptの独自機能の使用を避け、ECMAScriptの機能を使う|項目72]]）。今は ES モジュールの `import` / `export` が一般的なので、それを使う。

**クラス**: JavaScript はプロトタイプベースの言語だが、ES2015 でクラス構文が追加された。プロトタイプを直接使っているコードは、クラスに書き換える。

**`const` / `let`**: `var` はスコープのルールが特殊なので使わない。

**`for-of` と `map`**: C スタイルの `for` ループは、ループの外では不要なインデックス変数を持ち込むので間違えやすく、`Iterable` 型もうまく使えない（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目17 数値型のインデックスシグネチャを避ける|項目17]]）。

**`async` / `await`**: コールバックや `Promise` を直接使わず、`async` / `await` を使う（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目27 コールバックの代わりにasync関数を使用して型の流れを改善する|項目27]]）。

**アロー関数**: 関数式より簡潔で、`this` の値を保持するので、関数式より優先して使う。

**デフォルト引数**: TypeScript では、デフォルト値から型が[[type-inference|推論]]される。

**オブジェクトリテラルの省略記法と[[destructuring|分割代入]]**: 変数の命名に一貫性が出る。配列から値を取り出すこともできる。

**`Map` / `Set`**: JavaScript のオブジェクトを連想配列として使うことで起きる多くの問題を避けられる。

**オプショナルチェーン演算子（`?.`）**: 便利だが、そもそも `null` を避けるほうがよい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目33 null値を型の外側に押しやる|項目33]]、[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目37 オプションプロパティは限定的に使用する|項目37]]）。

**Null 合体演算子（`??`）**: `||` は `0` や `''` のような falsy な値でもデフォルト値を返してしまい、バグにつながるので避ける。

**`use strict`**: TypeScript は Strict モードよりもさらに厳格であり、生成する JavaScript には `use strict` が含まれるので、TypeScript で `use strict` を書いても意味はない。

### 新しい機能を追いかける

新しい機能は [[tc39|TC39]] の[プロポーザルの一覧](https://github.com/tc39/proposals)で追いかけられる。TypeScript の開発チームは、標準化プロセスのステージ 3 に達した機能の実装にコミットしているので、新しい機能は比較的すぐに使えるようになる。追いかけておくと、TypeScript を書くのにも役立つ。

本書は、TypeScript に大きな影響を与えうるプロポーザルとして [Records & Tuples](https://github.com/tc39/proposal-record-tuple) を挙げている。ただし、このプロポーザルは [Composites](https://github.com/tc39/proposal-composites) に統合される形で取り下げられた。

## キーワード

- [[typescript|TypeScript]]
- [[javascript|JavaScript]]
- ES モジュール
- [[nodejs|Node.js]]
- [[type-inference|型推論]]
- [[destructuring|分割代入]]
- [[tc39|TC39]]

## 自分の理解

いま注目しているプロポーザルは、ステージ 2 の [Pipeline Operator](https://github.com/tc39/proposal-pipeline-operator) である。
