---
title: webpack
aliases: []
description: エントリポイントから依存グラフを作り、モジュールを 1 つ以上のバンドルにまとめる JavaScript の静的モジュールバンドラ
tags: [word, javascript]
date: 2026-11-14
---

## TL;DR

モダンな [[javascript|JavaScript]] アプリケーションのための静的モジュール[[bundler|バンドラ]]。エントリポイントから依存グラフを作り、必要な[[module|モジュール]]を 1 つ以上のバンドルにまとめる。

## 仕組み

公式ドキュメントでは、次の 5 つを中心となる概念としている。

- **entry**: 依存グラフを作り始めるモジュール。デフォルトは `./src/index.js` である。webpack は、エントリポイントが直接・間接に依存するモジュールとライブラリをたどる
- **output**: バンドルを出力する場所とファイル名。デフォルトは `./dist/main.js` である
- **loader**: JavaScript 以外のファイルを、アプリケーションで使えるモジュールに変換して依存グラフに加える
- **plugin**: バンドルの最適化、アセットの管理、環境変数の注入など、loader より広い処理を行う
- **mode**: `development`、`production`、`none` のどれかを指定し、環境に合った組み込みの最適化を有効にする。デフォルトは `production` である

## 例

loader は `module.rules` に、変換するファイルの条件（`test`）と使う loader（`use`）を書く。

```js
export default {
  entry: "./path/to/my/entry/file.js",
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader" }],
  },
}
```

## 注意点

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目76 ターゲットとする環境の正確なモデルを作る|Effective TypeScript の項目76]] によると、webpack で CSS や画像を `import` すると、そのままでは [[typescript|TypeScript]] がモジュールを認識できない。`declare module "*.jpg"` のような型宣言でモデリングする。

また、[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目78 コンパイラーのパフォーマンスに注意を払う|項目78]] によると、ts-loader を使う webpack は型チェックも行うので、ビルドが遅くなる。トランスパイルだけにするにはオプションを指定する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[bundler|バンドラ]]
- [[babel|Babel]]

## 出典

- [Concepts - webpack](https://webpack.js.org/concepts/)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目76 ターゲットとする環境の正確なモデルを作る|Effective TypeScript 第2版 項目76 ターゲットとする環境の正確なモデルを作る]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目78 コンパイラーのパフォーマンスに注意を払う|Effective TypeScript 第2版 項目78 コンパイラーのパフォーマンスに注意を払う]]
