---
title: Vitest
aliases: []
description: Vite を使うプロジェクトに最適化された、Jest と互換性のある高速なテストフレームワーク
tags: [word, テスト, typescript]
date: 2024-08-29
---

## TL;DR

[[vue|Vue]] や [[vite|Vite]] の作者 Evan You が開発した、高速な[[testing-framework|テスティングフレームワーク]]。Vite を使うプロジェクトに最適化されている。

## なぜ必要か

Vite を使うプロジェクトなら、アプリケーションと同じ設定のままテストを実行できる。[[jest|Jest]] との互換性を考えて設計されているので、Jest からの移行も簡単である。[[javascript|JavaScript]] でも [[typescript|TypeScript]] でも使える。

## 仕組み

### インストール

```sh
$ npm install --save-dev vitest
```

`package.json` の `scripts` に追加する。

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

デフォルトでは、`describe` や `expect` などの関数を `import` する必要がある。グローバルに使うには、`vite.config.ts` で `defineConfig` を `vitest/config` から `import` し、`test.globals` を `true` にする。

```ts
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
  },
})
```

さらに `tsconfig.json` の `compilerOptions.types` に `vitest/globals` を追加する。

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

### スナップショットテスト

[[snapshot-testing|スナップショットテスト]]には `toMatchSnapshot` を使う。

```tsx
it("matches snapshot", () => {
  render(<CarouselSlide />)
  expect(screen.getByRole("figure")).toMatchSnapshot()
})
```

テストを実行すると、`__snapshots__` ディレクトリにスナップショットのファイルを保存する。その後の実行で結果が変わるとテストが失敗し、差分が表示される。変更が意図したものであれば、`-u`（`--update`）を付けて再実行するか、テストの終了後に `u` を押すと、スナップショットを更新できる。

```sh
$ npm run test -- -u
```

### モック

[[jest|Jest]] と同じように、モックを作る関数がそろっている。

- `vi.fn`: 関数のスパイを作る。スパイは、呼び出されるたびに引数、戻り値、インスタンスを記録する。関数を渡せば振る舞いを決められ、渡さなければ呼び出されたときに `undefined` を返す
- `mockReset`: スパイを初期化する。`beforeEach` などで各テストの前に呼ぶのが望ましく、設定で自動化もできる
- `toHaveBeenCalledWith`: 関数が指定した引数で呼び出されたかを確かめる。スパイに対してだけ使える
- `vi.useFakeTimers`: `setTimeout` や `setInterval` などのタイマーをモックする
- `vi.advanceTimersByTime`: 時間の経過をミリ秒単位でシミュレートする

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[jest|Jest]]
- [[testing-library|Testing Library]]
- [[snapshot-testing|スナップショットテスト]]
- [[vitest-in-source-testing|Vitest で実装ファイルにテストコードを書く]]

## 出典

- [Vitest](https://vitest.dev/)
- [Features - Vitest](https://vitest.dev/guide/features.html)
- [Migrating from Jest - Vitest](https://vitest.dev/guide/migration.html#migrating-from-jest)
- [Getting Started - Vitest](https://vitest.dev/guide/)
- [globals - Vitest](https://vitest.dev/config/#globals)
- [Snapshot - Vitest](https://vitest.dev/guide/snapshot.html)
- [toMatchSnapshot - Vitest](https://vitest.dev/api/expect.html#tomatchsnapshot)
- [vi.fn - Vitest](https://vitest.dev/api/vi.html#vi-fn)
- [mockReset - Vitest](https://vitest.dev/api/mock.html#mockreset)
- [toHaveBeenCalledWith - Vitest](https://vitest.dev/api/expect.html#tohavebeencalledwith)
- [vi.useFakeTimers - Vitest](https://vitest.dev/api/vi.html#vi-usefaketimers)
- [vi.advanceTimersByTime - Vitest](https://vitest.dev/api/vi.html#vi-advancetimersbytime)
