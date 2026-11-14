---
title: Testing Library
aliases: []
description: ユーザの使い方に近い形で UI コンポーネントをテストするためのライブラリ群
tags: [word, テスト, react]
date: 2024-08-29
---

## TL;DR

UI コンポーネントのテストを書くためのライブラリ群。[[react|React]]、[[vue|Vue]]、Svelte など、さまざまなフレームワーク向けのライブラリがある。

## 仕組み

### React と Vitest での導入

```sh
$ npm install --save-dev @testing-library/react happy-dom @testing-library/jest-dom
```

React のコードを動かすには [[dom|DOM]] API が必要だが、テストを実行する [[nodejs|Node.js]] には DOM API がない。happy-dom は DOM API をシミュレートするライブラリで、[[jsdom|jsdom]] より新しく、性能も高い。`@testing-library/jest-dom` を使うと、テストの中で DOM の状態についてアサーションを書ける。

[[vitest|Vitest]] の設定では、`test.environment` と `test.setupFiles` を指定する。

```ts
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["test-setup.ts"],
  },
})
```

各テストで `import` する手間を省くため、`setupFiles` のファイルで DOM のアサーション用のマッチャを読み込む。

```ts
import "@testing-library/jest-dom/vitest"
```

TypeScript のコンパイラにも認識させるため、`tsconfig.json` の `compilerOptions.types` と `include` も直す。

```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src", "./test-setup.ts"]
}
```

### 主な API

- `render`: React のコンポーネントを受け取り、DOM にレンダリングする。シミュレートした DOM は、テストごとに自動でリセットされる
- `screen.getByRole`: 指定した ARIA ロールを持つ DOM 要素を 1 つ探す。見つからないときや複数見つかったときはエラーを投げる
- `toBeInTheDocument`: jest-dom のアサーション。DOM 要素がドキュメントの中にあるかを確かめる
- `act`: コンポーネントの状態の変化を DOM に反映するよう React に指示する。後述の `user-event` を使えば自動で呼ばれるので要らない。タイマーを使うテストなどで使う（[[Test-Driven React, Second Edition 第5章 カスタムフックを使った機能拡張]]）

ユーザの操作をテストするには、`@testing-library/user-event` を追加する。使用例は [[Test-Driven React, Second Edition 第3章 状態を持つ React Component を TDD で実装する]] にある。

## 例

```tsx
const CarouselButton = () => <button />

export default CarouselButton
```

```tsx
import { render, screen } from "@testing-library/react"
import CarouselButton from "./CarouselButton"

describe("CarouselButton", () => {
  it("renders a <button>", () => {
    render(<CarouselButton />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })
})
```

## 注意点

[[eslint|ESLint]] では `eslint-plugin-testing-library` を使う。Flat Config には対応しているが、ESLint v9 には対応していない（2024 年 8 月時点）。

```sh
$ npm install --save-dev eslint-plugin-testing-library
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[vitest|Vitest]]
- [[jest|Jest]]
- [[snapshot-testing|スナップショットテスト]]

## 出典

- [Testing Library](https://testing-library.com/)
- [Setup - React Testing Library](https://testing-library.com/docs/react-testing-library/setup#using-without-jest)
- [happy-dom](https://github.com/capricorn86/happy-dom)
- [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)
- [jest-dom - With Vitest](https://github.com/testing-library/jest-dom?tab=readme-ov-file#with-vitest)
- [API - React Testing Library](https://testing-library.com/docs/react-testing-library/api#render)
- [ByRole - Testing Library](https://testing-library.com/docs/queries/byrole)
- [user-event](https://testing-library.com/docs/user-event/intro)
- [eslint-plugin-testing-library](https://testing-library.com/docs/ecosystem-eslint-plugin-testing-library/)
- [ESLint v9 対応の issue](https://github.com/testing-library/eslint-plugin-testing-library/issues/924#issuecomment-2284059071)
