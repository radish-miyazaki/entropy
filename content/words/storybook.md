---
title: Storybook
aliases: []
description: UI コンポーネントをアプリケーションから切り離して表示・確認できる UI コンポーネントエクスプローラ
tags: [word, フロントエンド, テスト]
date: 2024-08-23
---

## TL;DR

UI コンポーネントエクスプローラ。コンポーネントの状態ごとの見た目を Story として書き、一覧で確認できる。テストにも使える。

## なぜ必要か

テストの実行速度と本番環境の再現度では、jsdom と E2E テストの中間に位置する。テストには次の機能を使う。

- Play function: インタラクションテストを書く
- addon-a11y: アクセシビリティのテストをする
- Test Runner: Story を [[jest|Jest]] や Playwright で実行できるテストに変換する

## 仕組み

### Story

Storybook の中心となる概念で、簡単に言えばコンポーネントのサンプルである。

> A story captures the rendered state of a UI component. Developers write multiple stories per component that describe all the “interesting” states a component can support.

```tsx
import type { Meta, StoryObj } from "@storybook/react"
import Carousel from "../Carousel"
import slides from "../examples/slides"

const meta = {
  title: "Example/Carousel",
  component: Carousel,
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof Carousel>

export const Basic: Story = {
  args: {
    slides,
  },
}
```

### セットアップ

`npx storybook init` を実行すると、依存関係とスクリプトが `package.json` に追加され、`.storybook/`（設定）と `src/stories/`（Story）が作られる。`storybook` スクリプトはローカルの Storybook サーバを起動し、デフォルトで [[hmr|HMR]] に対応している。`build-storybook` スクリプトは、デプロイできる HTML、CSS、JavaScript を出力する。

### アドオン

アドオンでドキュメントを充実させられる。`@storybook/addon-essentials` は、よく使われるアドオンをまとめたものである。

- Actions: イベントハンドラが受け取った引数をログで確認できる。有効にするには、`@storybook/test` の `fn` を `Meta` の `args` に渡す
- Controls: [[react-devtools|React DevTools]] のプロパティ表示のように、各プロパティの値を表示し、その場で変えられる。コントロールの種類は、プロパティの型から推論される

## 注意点

Story には、Storybook 自身の状態（`args`）と、コンポーネントの内部状態の 2 つがある。Controls でプロパティを変えると `args` が更新され、コンポーネントの内部状態が上書きされる。このため、状態を変えるインタラクティブな操作が動かなくなる。

これを避けるには、`render` 関数でデフォルトのレンダリングを上書きし、`useArgs` で `args` も更新する。

```tsx
import { useArgs } from "@storybook/preview-api"

export const Basic: Story = {
  args: {
    slides,
  },
  render: function RenderCarousel(args) {
    const [, updateArgs] = useArgs()

    return (
      <Carousel
        {...args}
        onSlideIndexChange={(newSlideIndex) => {
          updateArgs({ slideIndex: newSlideIndex })
          args.onSlideIndexChange?.(newSlideIndex)
        }}
      />
    )
  },
}
```

## 自分の理解

Actions の挙動は v8 から少し変わったようだ。以前は `on` で始まる Props が自動で有効になっていた。

## 関連

- [[jest|Jest]]
- [[react-devtools|React DevTools]]
- [[visual-regression-test|Visual Regression Test]]

## 出典

- [Storybook](https://storybook.js.org/)
- [What's a story? | Storybook docs](https://storybook.js.org/docs/get-started/whats-a-story)
- [Essentials | Storybook docs](https://storybook.js.org/docs/essentials)
- [Custom render functions | Storybook docs](https://storybook.js.org/docs/api/csf#custom-render-functions)
- [Publish Storybook | Storybook docs（GitHub Pages）](https://storybook.js.org/docs/sharing/publish-storybook#github-pages)
- [Storybook MIGRATION.md（Implicit actions）](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#implicit-actions-can-not-be-used-during-rendering-for-example-in-the-play-function)
