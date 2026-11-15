---
title: Test-Driven React, Second Edition › 入れ子になった React Component を TDD で実装する
aliases: [入れ子になった React Component を TDD で実装する]
description: figure、img、figcaption、strong を組み合わせて描画する CarouselSlide を、5 段階に分けて TDD で作る
tags: [book-chapter, react, tdd]
date: 2024-08-30
book: "[[Test-Driven React, Second Edition]]"
chapter: 3
---

## TL;DR

- `<figure>`、`<img>`、`<figcaption>`、`<strong>` の複数の DOM 要素を描画する `CarouselSlide` を、[[test-driven-development|TDD]] で実装する。
- 暗黙の ARIA ロールがない `<figcaption>` は、テスト ID で取得する。

## 内容

[[Test-Driven React, Second Edition 第3章 Testing React with Testing Library|第3章]]の 2 つ目の実践例である。各段階で、先にテストを書き、それをパスする最低限の実装を書く。

### Step 1: 定義

コンポーネントが `<figure>` を描画することをテストする。

```tsx
// CarouselSlide.test.tsx
describe("CarouselSlide", () => {
  it("renders a <figure>", () => {
    render(<CarouselSlide />)
    expect(screen.getByRole("figure")).toBeInTheDocument()
  })
})
```

```tsx
// CarouselSlide.tsx
const CarouselSlide = () => <figure />

export default CarouselSlide
```

### Step 2: figure に img と figcaption を含める

`<figure>` の中に `<img>` と `<figcaption>` があることをテストする。

```tsx
// CarouselSlide.test.tsx
it("renders an <img> and a <figcaption>", () => {
  render(<CarouselSlide />)

  const figure = screen.getByRole("figure")
  const img = screen.getByRole("img")
  const figcaption = screen.getByTestId("caption")
  expect(figure).toContainElement(img)
  expect(figure).toContainElement(figcaption)
})
```

`<figcaption>` には[[aria-role|暗黙の ARIA ロール]]がない。そのため、[`getByTestId`](https://testing-library.com/docs/queries/bytestid) でテスト ID を使って取得している。実装では、`<figure>` の中に `<img>` と `data-testid="caption"` を付けた `<figcaption>` を置く。

### Step 3: 画像の URL を Props で受け取る

```tsx
// CarouselSlide.test.tsx
it("passes `imgUrl` through to the <img>", () => {
  const imgUrl = "https://example.com/image.png"
  render(<CarouselSlide imgUrl={imgUrl} />)
  expect(screen.getByRole("img")).toHaveAttribute("src", imgUrl)
})
```

```tsx
// CarouselSlide.tsx
const CarouselSlide = ({ imgUrl }: { imgUrl?: string }) => (
  <figure>
    <img src={imgUrl} />
    <figcaption data-testid="caption" />
  </figure>
)
```

### Step 4: キャプションの説明文と作者名を Props で受け取る

```tsx
// CarouselSlide.test.tsx
it("uses `description` and `attribution` as the caption", () => {
  const props = {
    description: "A jaw-droppingly spectacular image",
    attribution: "Trevor Burnham",
  }
  render(<CarouselSlide {...props} />)
  const figcaption = screen.getByTestId("caption")
  expect(figcaption).toHaveTextContent(`${props.description} ${props.attribution}`)
})
```

```tsx
// CarouselSlide.tsx
const CarouselSlide = ({
  imgUrl,
  description,
  attribution,
}: {
  imgUrl?: string
  description?: ReactNode
  attribution?: ReactNode
}) => (
  <figure>
    <img src={imgUrl} />
    <figcaption data-testid="caption">
      <strong>{description}</strong> {attribution}
    </figcaption>
  </figure>
)
```

### Step 5: figure 要素が扱うすべての Props を受け取る

```tsx
// CarouselSlide.test.tsx
it("passes other props through to the <figure>", () => {
  const className = "my-carousel-slide"
  const dataAction = "prev"

  render(<CarouselSlide className={className} data-action={dataAction} />)
  const figure = screen.getByRole("figure")
  expect(figure).toHaveClass(className)
  expect(figure).toHaveAttribute("data-action", dataAction)
})
```

残りの Props を `...rest` で受け取り、`<figure>` に渡す。

```tsx
// CarouselSlide.tsx
const CarouselSlide = ({
  imgUrl,
  description,
  attribution,
  ...rest
}: {
  imgUrl?: string
  description?: ReactNode
  attribution?: ReactNode
} & ComponentPropsWithRef<"figure">) => (
  <figure {...rest}>
    <img src={imgUrl} />
    <figcaption data-testid="caption">
      <strong>{description}</strong> {attribution}
    </figcaption>
  </figure>
)
```

## キーワード

- [[test-driven-development|テスト駆動開発]]
- [[react|React]]
- [[testing-library|Testing Library]]
- [[aria-role|ARIA ロール]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
