---
title: Jest
aliases: []
description: Meta が開発した、Node.js 上で動く JavaScript のテスティングフレームワーク
tags: [word, テスト, javascript]
date: 2024-08-29
---

## TL;DR

Meta（旧 Facebook）が開発した、[[javascript|JavaScript]] の[[testing-framework|テスティングフレームワーク]]。[[nodejs|Node.js]] 上で動く。

## 仕組み

Node.js 上で動くので、フロントエンドのコードをテストするときは [[jsdom|jsdom]] を使う。jsdom を使うと、Node.js 上でブラウザの API のほとんどをシミュレートできる。

### インストール

JavaScript では次のようにインストールする。`--save-dev` は、開発専用の依存関係（`devDependencies`）として入れるためのフラグである。

```sh
$ npm install --save-dev jest
```

[[typescript|TypeScript]] では `@types/jest` と `ts-jest` も入れ、`jest.config.js` を作る。

```sh
$ npm install --save-dev jest @types/jest ts-jest
```

```js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
}
```

### 実行

`npx jest` で実行できるが、ふつうは `package.json` の `scripts` に追加して `npm test` で実行する。

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

`--watchAll` を付けると、ファイルが変わるたびにすべてのテストを再実行する。`--coverage` を付けると、[[code-coverage|コードカバレッジ]]を計算する。

## 例

```js
const greeting = (guest) => `Hello, ${guest}!`

describe("greeting", () => {
  it("says hello", () => {
    expect(greeting("Jest")).toBe("Hello, Jest!")
  })
})
```

- `describe`: テストスイートを宣言する。第 1 引数にテストスイートの名前、第 2 引数に 1 つ以上のテストを含む関数を渡す
- `it`: 個別のテストを宣言する。第 1 引数にテストの名前、第 2 引数にテストのコードを含む関数を渡す
- `expect`: アサーションを作る。テストする値を受け取り、マッチャをメソッドとして持つオブジェクトを返す
- `toBe`: `===` で厳密に等しいかを確かめるマッチャ
- `toEqual`: オブジェクトが深く等しいかを確かめるマッチャ

## 注意点

慣習として、テストスイートの名前には名詞、テストの名前には動詞を渡す。こうすると、テストが確かめる機能を説明する文（`greeting says hello`）ができあがる。

## 自分の理解

Spec 系のテストでも、だいたいこの書き方をする。

## 関連

- [[vitest|Vitest]]
- [[testing-library|Testing Library]]

## 出典

- [Jest](https://jestjs.io/ja/)
- [はじめましょう - TypeScript を使用する](https://jestjs.io/ja/docs/getting-started#typescript-を使用する)
- [Jest CLI オプション - --watchAll](https://jestjs.io/ja/docs/cli#--watchall)
- [Jest CLI オプション - --coverage](https://jestjs.io/ja/docs/cli#--coverageboolean)
- [グローバル - describe](https://jestjs.io/ja/docs/api#describename-fn)
- [グローバル - test](https://jestjs.io/ja/docs/api#testname-fn-timeout)
- [Expect - expect](https://jestjs.io/ja/docs/expect#expectvalue)
