---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › ソースマップを使ってTypeScriptをデバッグする
description: TypeScript のデバッグにはソースマップを使い、ブラウザだけでなく Node.js も DevTools でデバッグできることを示す項目
tags: [book-chapter, typescript]
date: 2025-06-07
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 73
---

## TL;DR

- 多くのブラウザや IDE は[[source-map|ソースマップ]]をサポートしているので、[[typescript|TypeScript]] のデバッグにはこれを使う。
- ソースマップは公開しない。
- `declarationMap` を有効にすると、型宣言から元のソースへ移動できるようになる。

## 内容

### ソースマップを生成する

ソースマップのファイル（`.js.map`）を作るには、`tsconfig.json` に次の設定を追加する。

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

### ソースマップの注意点

TypeScript と[[bundler|バンドラ]]やミニファイアを併用している場合は、それらのツールの設定も必要になることがある。これらのツールは自分でソースマップを生成することがある。TypeScript を組み込みでサポートしていれば、元の TypeScript のソースに対応付けられるはずだが、そうでなければ設定を変える必要がある。

また、ソースマップには元のコードのコピーが含まれることがあり、公開するつもりのなかった内容まで公開してしまうので、ソースマップは公開しない。

### Node.js をデバッグする

TypeScript で書いた [[nodejs|Node.js]] のコードも、DevTools でデバッグできる。Chromium 系のブラウザでは、次の手順で行う。

1. `node --inspect-brk index.ts` を実行する。[`--inspect-brk`](https://nodejs.org/en/learn/getting-started/debugging#command-line-options) は、リモートデバッグプロトコル用の WebSocket のポートを開くだけでなく、コードの先頭で実行を一時停止する
2. `chrome://inspect` を開き、リモートターゲットが表示されていることを確認する
3. 「inspect」のリンクをクリックすると DevTools が立ち上がる

### 型宣言のソースマップ

[`declaration`](https://www.typescriptlang.org/tsconfig/#declaration) を有効にして `.d.ts` ファイルを生成するときは、[`declarationMap`](https://www.typescriptlang.org/tsconfig/#declarationMap) も有効にしておくと、型宣言を元のソースに対応付ける `.d.ts.map` ファイルも生成される。これは特に[[project-references|プロジェクト参照]]を使っている場合に、IDE の「定義へ移動」のような言語サービスの機能を改善するのに役立つ。

## キーワード

- [[typescript|TypeScript]]
- [[source-map|ソースマップ]]
- [[bundler|バンドラ]]
- [[nodejs|Node.js]]
- [[project-references|プロジェクト参照]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
