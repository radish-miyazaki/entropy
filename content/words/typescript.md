---
title: TypeScript
aliases: []
description: JavaScript に型の構文を加えた静的型付けのプログラミング言語
tags: [word, プログラミング言語]
date: 2024-07-27
---

## TL;DR

[[javascript|JavaScript]] を拡張した[[static-typing|静的型付け]]のプログラミング言語。JavaScript のスーパーセットとして設計されており、JavaScript の構文に型注釈を加えて型チェックを行う。

## なぜ必要か

型によって、予測しやすく安全なコードを書けるようになる。オブジェクトや関数の形を型で表せるので、エディタで補完やエラーの表示を受けられる。[[type-inference|型推論]]があるので、すべてに型を書かなくてもよい。

## 仕組み

TypeScript のコードは、最終的に JavaScript に[[transpile|トランスパイル]]される。型注釈を取り除くと、そのまま JavaScript になる。生成された JavaScript は、ブラウザや [[nodejs|Node.js]]、[[deno|Deno]]、[[bun|Bun]] など、JavaScript が動く場所ならどこでも動く。

導入するには、npm でパッケージを入れる。

```sh
npm install --save-dev typescript
```

設定ファイル `tsconfig.json` は次のコマンドで生成できる。

```sh
npx tsc --init
```

## 自分の理解

[[object-oriented-programming|オブジェクト指向]]の言語だが、[[react|React]] の影響か、[[functional-programming|関数型プログラミング]]を意識して書くことが多くなっている印象がある。

## 関連

- [[javascript|JavaScript]]
- [[nodejs|Node.js]]
- [[react|React]]

## 出典

- [TypeScript](https://www.typescriptlang.org/)
- [How to set up TypeScript](https://www.typescriptlang.org/download/)
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig/)
