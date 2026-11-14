---
title: プロジェクト参照
aliases: [Project References]
description: 大きなプロジェクトを小さなプロジェクトに分けて管理する TypeScript の機能
tags: [word, typescript]
date: 2025-05-08
---

## TL;DR

大きなプロジェクトを、複数の小さなプロジェクトに分けて管理するための [[typescript|TypeScript]] の機能。変更があったプロジェクトだけを再ビルドするので、[[incremental-build|インクリメンタルビルド]]ができる。

## なぜ必要か

`tsconfig.json` が 1 つだけだと、本番コードからテストコードを import できてしまう。また、テストだけを変えても、本番コードの型チェックがやり直しになる。プロジェクト参照を使うと、ビルド時間を短くでき、コンポーネントどうしを論理的に分けられる。

## 仕組み

プロジェクトの部分ごとに `tsconfig.json` を作り、ルートに `tsconfig.json` と `tsconfig.base.json` を置く。

- `tsconfig.base.json`: サブプロジェクトが継承する共通の設定を書く。ここで、参照されるプロジェクトに必須の [`composite`](https://www.typescriptlang.org/tsconfig/#composite) と [`declaration`](https://www.typescriptlang.org/tsconfig/#declaration) を有効にする
- ルートの `tsconfig.json`: サブプロジェクトへの参照の一覧で、目次のようなものである
- 各サブプロジェクトの `tsconfig.json`: `extends` で `tsconfig.base.json` を継承する

参照したプロジェクトから import すると、そのプロジェクトのソースではなく、出力された型宣言ファイル（`.d.ts`）が読み込まれる。ビルドには `tsc --build`（`tsc -b`）を使う。このモードは参照されたプロジェクトをすべて見つけ、最新かどうかを調べ、古いものを正しい順にビルドする。`--build` を付けない `tsc` は、依存するプロジェクトを自動でビルドしない。

### incremental オプションとの違い

`incremental` とプロジェクト参照は組み合わせて使える。

|                | incremental                      | プロジェクト参照                       |
| -------------- | -------------------------------- | -------------------------------------- |
| スコープ       | 単一プロジェクト内のファイル     | 複数のプロジェクト間                   |
| 依存関係の管理 | ファイル間の依存関係のみ         | プロジェクト間の依存関係も管理する     |
| 必要な設定     | 特になし                         | `composite: true`、`declaration: true` |
| ユースケース   | 単一の大きなプロジェクトの高速化 | モノレポや分割されたプロジェクト構成   |

## 例

```txt
root
├── src // 本番コード
│   ├── fib.ts
│   └── tsconfig.json
├── test // テストコード
│   ├── fib.test.ts
│   └── tsconfig.json
├── tsconfig.base.json
└── tsconfig.json
```

```jsonc
// tsconfig.base.json
{
  "compilerOptions": {
    // ...
    "declaration": true, // 宣言ファイルを生成する
    "composite": true, // プロジェクト参照を有効にする
  },
}
```

```jsonc
// tsconfig.json
{
  "files": [],
  "references": [
    // サブプロジェクトへの参照のリスト
    { "path": "./src" },
    { "path": "./test" },
  ],
}
```

```jsonc
// src/tsconfig.json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "../dist/src",
    "rootDir": ".",
  },
}
```

```jsonc
// test/tsconfig.json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "../dist/test",
    "rootDir": ".",
  },
  "references": [
    { "path": "../src" }, // テストコードは本番コードに依存する
  ],
}
```

## 注意点

`noEmit` を設定している場合や、webpack や Vite などのバンドラを使っている場合は、型宣言ファイルが生成されないので、プロジェクト参照の恩恵を受けられない。

プロジェクト参照が役に立つのは、[[monorepo|モノレポ]]や、サードパーティではない自前のコードが多い場合である。プロジェクトを作りすぎると、かえって逆効果になることがある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[incremental-build|インクリメンタルビルド]]
- [[monorepo|モノレポ]]

## 出典

- [プロジェクト参照 - サバイバルTypeScript](https://typescriptbook.jp/reference/advanced-topics/project-references)
- [Project References - TypeScript](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目78 コンパイラーのパフォーマンスに注意を払う|Effective TypeScript 項目78 コンパイラーのパフォーマンスに注意を払う]]
