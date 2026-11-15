---
title: Test-Driven React, Second Edition › シンプルな React Component を TDD で実装する
aliases: [シンプルな React Component を TDD で実装する]
description: button をラップするだけの CarouselButton を、テストと最低限の実装を交互に書きながら TDD で作る
tags: [book-chapter, react, tdd]
date: 2024-08-30
book: "[[Test-Driven React, Second Edition]]"
chapter: 3
---

## TL;DR

- `<button>` をラップするだけの `CarouselButton` コンポーネントを、[[test-driven-development|TDD]] で 3 段階に分けて実装する。
- 各段階で、先にテストを書き、それをパスする最低限の実装を書く。

## 内容

[[Test-Driven React, Second Edition 第3章 Testing React with Testing Library|第3章]]の 1 つ目の実践例である。本来はテストを書くたびに実行するが、ここでは省略している。

### Step 1: 定義

まず、コンポーネントが `<button>` を描画することをテストする。

```tsx
// CarouselButton.test.tsx
describe("CarouselButton", () => {
  it("renders a <button>", () => {
    render(<CarouselButton />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })
})
```

テストをパスする最低限の実装は次のとおりである。

```tsx
// CarouselButton.tsx
const CarouselButton = () => <button />

export default CarouselButton
```

### Step 2: 子要素を Props として受け取る

`children` が `<button>` に渡されることをテストする。

```tsx
// CarouselButton.test.tsx
it("passes `children` through to the <button>", () => {
  const text = "Button text"
  render(<CarouselButton>{text}</CarouselButton>)
  expect(screen.getByRole("button")).toHaveTextContent(text)
})
```

```tsx
// CarouselButton.tsx
const CarouselButton = ({ children }: { children?: React.ReactNode }) => <button>{children}</button>
```

### Step 3: button 要素が扱うすべての Props を受け取る

`className` や `data-action` などの Props が、そのまま `<button>` に渡されることをテストする。

```tsx
// CarouselButton.test.tsx
it("passes other props through to the <button>", () => {
  const className = "my-carousel-button"
  const dataAction = "prev"

  render(
    <CarouselButton className={className} data-action={dataAction}>
      Button text
    </CarouselButton>,
  )
  expect(screen.getByRole("button")).toHaveClass(className)
  expect(screen.getByRole("button")).toHaveAttribute("data-action", dataAction)
})
```

[[react|React]] の Props は基本的に camelCase で書くが、`data-` と `aria-` で始まるものは例外的に kebab-case で書く（[React の公式ドキュメント](https://react.dev/reference/react-dom/components/common#common-props)）。

実装では `ComponentPropsWithRef<"button">` を使い、受け取った Props をすべて `<button>` に渡す。

```tsx
// CarouselButton.tsx
import { ComponentPropsWithRef } from "react"

const CarouselButton = (props: ComponentPropsWithRef<"button">) => <button {...props} />
```

## キーワード

- [[test-driven-development|テスト駆動開発]]
- [[react|React]]
- [[testing-library|Testing Library]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
