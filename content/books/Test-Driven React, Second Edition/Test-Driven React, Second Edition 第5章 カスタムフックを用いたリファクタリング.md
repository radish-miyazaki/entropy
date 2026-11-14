---
title: Test-Driven React, Second Edition 第5章 カスタムフックを用いたリファクタリング
aliases: [カスタムフックを用いたリファクタリング]
description: Carousel のスライド状態とイベントハンドラをカスタムフック useSlideIndex に切り出し、Control Props Pattern で外から制御できるようにする
tags: [book-chapter]
date: 2024-09-05
book: "[[Test-Driven React, Second Edition]]"
chapter: 5
---

## TL;DR

- `Carousel` の `useState` とイベントハンドラのロジックを、カスタムフック `useSlideIndex` に切り出す。
- さらに [[control-props-pattern|Control Props Pattern]] を適用し、親から `slideIndex` を制御できるようにする。

## 内容

前の章までにテストを書いてあるので、自信を持って[[refactoring|リファクタリング]]できる。

### リファクタリング前

リファクタリング前の `Carousel` は次のとおりである（一部の型は省略）。

```tsx
// Carousel.tsx
const Carousel = ({ slides, defaultImgHeight, DefaultImgComponent }: CarouselProps) => {
  const [slideIndex, setSlideIndex] = useState(0)

  return (
    <div data-testid="carousel">
      <CarouselSlide
        imgHeight={defaultImgHeight}
        ImgComponent={DefaultImgComponent}
        {...slides?.[slideIndex]}
      />
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

### useState をカスタムフックに切り出す

まず、`useState` の部分をそのまま `useSlideIndex` に移す。

```tsx
// useSlideIndex.tsx
import { useState } from "react"

export const useSlideIndex = () => {
  const [slideIndex, setSlideIndex] = useState(0)

  return [slideIndex, setSlideIndex] as const
}
```

### イベントハンドラのロジックを移す

次に、`onClick` のロジックも `useSlideIndex` に移す。引数は配列であれば型を問わないので、`unknown[]` にしている。

```tsx
// useSlideIndex.tsx
export const useSlideIndex = (slides?: unknown[]) => {
  const [slideIndex, setSlideIndex] = useState(0)

  const decrementSlideIndex = () => {
    if (!slides) return
    setSlideIndex((i) => (i + slides.length - 1) % slides.length)
  }

  const incrementSlideIndex = () => {
    if (!slides) return
    setSlideIndex((i) => (i + 1) % slides.length)
  }

  return [slideIndex, decrementSlideIndex, incrementSlideIndex] as const
}
```

```tsx
// Carousel.tsx
const Carousel = ({ slides, defaultImgHeight, DefaultImgComponent }: CarouselProps) => {
  const [slideIndex, decrementSlideIndex, incrementSlideIndex] = useSlideIndex(slides)

  return (
    <div data-testid="carousel">
      <CarouselSlide
        imgHeight={defaultImgHeight}
        ImgComponent={DefaultImgComponent}
        {...slides?.[slideIndex]}
      />
      <CarouselButton data-testid="prev-button" onClick={decrementSlideIndex}>
        Prev
      </CarouselButton>
      <CarouselButton data-testid="next-button" onClick={incrementSlideIndex}>
        Next
      </CarouselButton>
    </div>
  )
}
```

### Control Props Pattern を適用する

今の `Carousel` は[[uncontrolled-component|Uncontrolled Component]] で、親から表示中のスライドを制御できず柔軟性が低い。そこで [[control-props-pattern|Control Props Pattern]] を適用し、[[controlled-component|Controlled Component]] としても使えるようにする。

- `slideIndex` の Props が渡されないときは、これまでどおり Prev や Next ボタンで内部状態の `slideIndex` を更新する。
- `slideIndex` の Props が渡されたときは、その値で内部状態を上書きする。あわせて `onSlideIndexChange` の Props を受け取り、親はこの関数の中で自分の `slideIndex` を更新する。

先にテストを足す。

```tsx
// Carousel.test.tsx
describe("with controlled slideIndex", () => {
  const onSlideIndexChange = vi.fn()
  const renderCarouselWithSlideIndex = () =>
    render(<Carousel slides={slides} slideIndex={1} onSlideIndexChange={onSlideIndexChange} />)

  beforeEach(() => {
    onSlideIndexChange.mockReset()
  })

  it("shows the slide corresponding to slideIndex", () => {
    renderCarouselWithSlideIndex()
    const img = screen.getByRole("img")
    expect(img).toHaveAttribute("src", slides[1].imgUrl)
  })

  it("calls onSlideIndexChange when Prev is clicked", async () => {
    renderCarouselWithSlideIndex()
    const img = screen.getByRole("img")
    const prevButton = screen.getByTestId("prev-button")
    const user = userEvent.setup()

    await user.click(prevButton)
    // no change because onSlideIndexChange is mocked
    expect(img).toHaveAttribute("src", slides[1].imgUrl)
    expect(onSlideIndexChange).toHaveBeenCalledWith(0)
  })

  it("calls onSlideIndexChange when Next is clicked", async () => {
    renderCarouselWithSlideIndex()
    const img = screen.getByRole("img")
    const nextButton = screen.getByTestId("next-button")
    const user = userEvent.setup()

    await user.click(nextButton)
    // no change because onSlideIndexChange is mocked
    expect(img).toHaveAttribute("src", slides[1].imgUrl)
    expect(onSlideIndexChange).toHaveBeenCalledWith(2)
  })
})
```

カスタムフックを直す。

```tsx
// useSlideIndex.tsx
const decrement = (length: number) => (i: number) => (i + length - 1) % length

const increment = (length: number) => (i: number) => (i + 1) % length

export const useSlideIndex = (
  slides?: unknown[],
  slideIndexProp?: number,
  onSlideIndexChange?: (newSlideIndex: number) => void,
) => {
  const [slideIndexState, setSlideIndexState] = useState(0)

  const slideIndex = slideIndexProp ?? slideIndexState

  const decrementSlideIndex = () => {
    if (!slides) return

    setSlideIndexState(decrement(slides.length))
    onSlideIndexChange?.(decrement(slides.length)(slideIndex))
  }

  const incrementSlideIndex = () => {
    if (!slides) return

    setSlideIndexState(increment(slides.length))
    onSlideIndexChange?.(increment(slides.length)(slideIndex))
  }

  return [slideIndex, decrementSlideIndex, incrementSlideIndex] as const
}
```

コンポーネントも、新しい Props を受け取ってフックに渡すように直す。

```tsx
// Carousel.tsx
export type CarouselProps = {
  slides?: Slide[]
  slideIndex?: number
  onSlideIndexChange?: (newSlideIndex: number) => void
  defaultImgHeight?: CarouselSlideProps["imgHeight"]
  DefaultImgComponent?: CarouselSlideProps["ImgComponent"]
}

const Carousel = ({
  slides,
  slideIndex: slideIndexProp,
  onSlideIndexChange,
  defaultImgHeight,
  DefaultImgComponent,
}: CarouselProps) => {
  const [slideIndex, decrementSlideIndex, incrementSlideIndex] = useSlideIndex(
    slides,
    slideIndexProp,
    onSlideIndexChange,
  )

  // ...
}
```

## キーワード

- [[react-hooks|React Hooks]]
- [[refactoring|リファクタリング]]
- [[control-props-pattern|Control Props Pattern]]
- [[uncontrolled-component|Uncontrolled Component]]
- [[controlled-component|Controlled Component]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
