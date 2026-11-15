---
title: Test-Driven React, Second Edition › 状態を持つ React Component を TDD で実装する
aliases: [状態を持つ React Component を TDD で実装する]
description: 表示中のスライドを状態として持つ Carousel を TDD で作り、内部状態に触れずに DOM の変化でテストする方法を示す
tags: [book-chapter, react, tdd]
date: 2024-08-30
book: "[[Test-Driven React, Second Edition]]"
chapter: 3
---

## TL;DR

- 「どのスライドを表示しているか」を状態として持つカルーセルコンポーネントを、[[test-driven-development|TDD]] で実装する。
- [[testing-library|Testing Library]] は内部状態に直接触れないので、ユーザの操作をシミュレートし、DOM の出力が期待どおりに変わるかを確かめる。

## 内容

[[Test-Driven React, Second Edition 第3章 Testing React with Testing Library|第3章]]の 3 つ目の実践例である。カルーセルは、どのスライドを表示しているかを状態として持つ必要がある。

### Step 1: 定義

```tsx
// Carousel.test.tsx
describe("Carousel", () => {
  it("renders a <div>", () => {
    render(<Carousel />)
    expect(screen.getByTestId("carousel")).toBeInTheDocument()
  })
})
```

```tsx
// Carousel.tsx
const Carousel = () => <div data-testid="carousel" />

export default Carousel
```

### Step 2: スライドのリストを受け取り、1 枚を表示する

コンポーネントを実装するときは、コアの機能から始めるとよい。まず、受け取ったスライドのうち最初の 1 枚を表示することをテストする。

```tsx
// Carousel.test.tsx
const slides = [
  {
    imgUrl: "https://example.com/slide1.png",
    description: "Slide 1",
    attribution: "Uno Pizzeria",
  },
  {
    imgUrl: "https://example.com/slide2.png",
    description: "Slide 2",
    attribution: "Dos Equis",
  },
  {
    imgUrl: "https://example.com/slide3.png",
    description: "Slide 3",
    attribution: "Three Amigos",
  },
]

it("renders the first slide by default", () => {
  render(<Carousel slides={slides} />)

  const img = screen.getByRole("img")
  expect(img).toHaveAttribute("src", slides[0].imgUrl)
})
```

`CarouselSlide` は[[Test-Driven React, Second Edition 第3章 入れ子になった React Component を TDD で実装する|入れ子になった React Component を TDD で実装する]]で作ったものを使う。

```tsx
// Carousel.tsx
type Slide = {
  imgUrl?: string
  description?: ReactNode
  attribution?: ReactNode
}

const Carousel = ({ slides }: { slides: Slide[] }) => {
  return (
    <div data-testid="carousel">
      <CarouselSlide {...slides?.[0]} />
    </div>
  )
}
```

### Step 3: Next ボタンでスライドを進める

ここから、状態とユーザ操作の部分を実装する。Enzyme と違い、Testing Library ではコンポーネントの内部状態に直接アクセスできない。コンポーネントの内部はブラックボックスとして扱われる。そのため、状態のテストは次の流れになる。

1. コンポーネントを描画する（`render`）。
2. ユーザの操作をシミュレートする。
3. コンポーネントの DOM 出力が期待どおりに変わるかを確かめる。

```tsx
// Carousel.test.tsx
it("renders the slide when the Next button is clicked", async () => {
  render(<Carousel slides={slides} />)

  const img = screen.getByRole("img")
  const nextButton = screen.getByTestId("next-button")
  const user = userEvent.setup()

  await user.click(nextButton)
  expect(img).toHaveAttribute("src", slides[1].imgUrl)

  await user.click(nextButton)
  expect(img).toHaveAttribute("src", slides[2].imgUrl)

  await user.click(nextButton)
  expect(img).toHaveAttribute("src", slides[0].imgUrl)
})
```

Testing Library でシミュレートしたユーザイベントは、すべて非同期関数である。`await` で待つと、イベントが完全に処理され、DOM が更新されてから次の行に進む。`await` の付け忘れは、typescript-eslint の [no-floating-promises](https://typescript-eslint.io/rules/no-floating-promises/) ルールで防げる。

```tsx
// Carousel.tsx
const Carousel = ({ slides }: { slides?: Slide[] }) => {
  const [slideIndex, setSlideIndex] = useState(0)

  return (
    <div data-testid="carousel">
      <CarouselSlide {...slides?.[slideIndex]} />
      <CarouselButton
        data-testid="next-button"
        onClick={() => {
          if (!slides) return

          setSlideIndex((i) => (i + 1) % slides.length)
        }}
      >
        Next
      </CarouselButton>
    </div>
  )
}
```

### Step 4: Prev ボタンでスライドを戻す

```tsx
// Carousel.test.tsx
it("reverses the slide when the Prev button is clicked", async () => {
  render(<Carousel slides={slides} />)

  const img = screen.getByRole("img")
  const prevButton = screen.getByTestId("prev-button")
  const user = userEvent.setup()

  await user.click(prevButton)
  expect(img).toHaveAttribute("src", slides[2].imgUrl)

  await user.click(prevButton)
  expect(img).toHaveAttribute("src", slides[1].imgUrl)

  await user.click(prevButton)
  expect(img).toHaveAttribute("src", slides[0].imgUrl)
})
```

```tsx
// Carousel.tsx
const Carousel = ({ slides }: { slides?: Slide[] }) => {
  const [slideIndex, setSlideIndex] = useState(0)

  return (
    <div data-testid="carousel">
      <CarouselSlide {...slides?.[slideIndex]} />
      <CarouselButton
        data-testid="prev-button"
        onClick={() => {
          if (!slides) return

          setSlideIndex((i) => (i + slides.length - 1) % slides.length)
        }}
      >
        Prev
      </CarouselButton>
      <CarouselButton
        data-testid="next-button"
        onClick={() => {
          if (!slides) return

          setSlideIndex((i) => (i + 1) % slides.length)
        }}
      >
        Next
      </CarouselButton>
    </div>
  )
}
```

## キーワード

- [[test-driven-development|テスト駆動開発]]
- [[react|React]]
- [[testing-library|Testing Library]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
