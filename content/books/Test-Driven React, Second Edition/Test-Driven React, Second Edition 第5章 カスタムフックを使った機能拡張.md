---
title: Test-Driven React, Second Edition › カスタムフックを使った機能拡張
aliases: [カスタムフックを使った機能拡張]
description: Vitest のフェイクタイマーでテストを書き、カスタムフック useTimeout でカルーセルにスライドを自動で進める機能を足す
tags: [book-chapter]
date: 2024-09-05
book: "[[Test-Driven React, Second Edition]]"
chapter: 5
---

## TL;DR

- カルーセルに、数秒ごとに `slideIndex` を自動で進めるタイマー（自動送り機能）を足す。
- テストでは [[vitest|Vitest]] の `vi.useFakeTimers` でタイマーをモックし、実装ではカスタムフック `useTimeout` を作る。

## 内容

[[Test-Driven React, Second Edition 第5章 カスタムフックを用いたリファクタリング|カスタムフックを用いたリファクタリング]]で作ったカルーセルに、数秒ごとにスライドを自動で進める機能を足す。

### フェイクタイマーの準備

[[test-driven-development|TDD]] で進めるので、先にテストを書く。[[vitest|Vitest]] では、`vi.useFakeTimers` を呼ぶと `setTimeout` や `setInterval` などのタイマー関数が制御できる関数に置き換わり、タイマーをモックできる。ここではすべてのテストでモックしたタイマーを使いたいので、セットアップファイルで呼んでおく。

```ts
// test-setup.ts
vi.useFakeTimers()
```

ただし、2024 年 9 月時点では、これだけだと `userEvent` でユーザ操作をシミュレートしているテストがすべて失敗する。Vitest が、タイマーが置き換えられたことを認識できないのが原因である（[testing-library/react-testing-library#1197](https://github.com/testing-library/react-testing-library/issues/1197)）。回避策として、`vite.config.ts` に `shouldAdvanceTime` を設定する。

```ts
// vite.config.ts
export default defineConfig({
  // ...
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["test-setup.ts"],
    fakeTimers: { shouldAdvanceTime: true },
  },
})
```

### テスト

`vi.advanceTimersByTime` で時間を進め、スライドが切り替わることを確かめる。

```tsx
// Carousel.test.tsx
describe("with auto-advance", () => {
  it("advances the slide according to autoAdvanceInterval", () => {
    const autoAdvanceInterval = 5_000
    render(<Carousel slides={slides} autoAdvanceInterval={autoAdvanceInterval} />)
    const img = screen.getByRole("img")
    expect(img).toHaveAttribute("src", slides[0].imgUrl)

    act(() => {
      vi.advanceTimersByTime(autoAdvanceInterval)
    })
    expect(img).toHaveAttribute("src", slides[1].imgUrl)

    act(() => {
      vi.advanceTimersByTime(autoAdvanceInterval)
    })
    expect(img).toHaveAttribute("src", slides[2].imgUrl)
  })
})
```

### 実装

この実装には問題があり、[[Test-Driven React, Second Edition 第5章 useCallback と useRef を使用して不要な更新を防ぐ|useCallback と useRef を使用して不要な更新を防ぐ]]で直す。

まず、タイマーを作るカスタムフック `useTimeout` を書く。[[use-effect|useEffect]] のコールバックが返した関数は、再描画やアンマウントのときに呼ばれる。ここではそれを使ってタイマーを解除する。

```tsx
// useTimeout.tsx
import { useEffect } from "react"

export const useTimeout = (delay: number | undefined, callback: () => void) => {
  useEffect(() => {
    if (!delay) return

    const timeout = setTimeout(callback, delay)
    return () => clearTimeout(timeout)
  }, [delay, callback])
}
```

`useSlideIndex` から `useTimeout` を呼ぶ。スライドが変わるたびに `incrementSlideIndex` が作り直されるので、そのたびに新しいタイマーがセットされる。

```tsx
// useSlideIndex.tsx
export const useSlideIndex = (
  slides?: unknown[],
  slideIndexProp?: number,
  onSlideIndexChange?: (newSlideIndex: number) => void,
  autoAdvanceInterval?: number,
) => {
  // ...

  useTimeout(autoAdvanceInterval, incrementSlideIndex)

  return [slideIndex, decrementSlideIndex, incrementSlideIndex] as const
}
```

最後に、コンポーネントで `autoAdvanceInterval` を受け取ってフックに渡す。

```tsx
// Carousel.tsx
export type CarouselProps = {
  slides?: Slide[]
  slideIndex?: number
  onSlideIndexChange?: (newSlideIndex: number) => void
  autoAdvanceInterval?: number
  defaultImgHeight?: CarouselSlideProps["imgHeight"]
  DefaultImgComponent?: CarouselSlideProps["ImgComponent"]
}

const Carousel = ({
  slides,
  slideIndex: slideIndexProp,
  onSlideIndexChange,
  autoAdvanceInterval,
  defaultImgHeight,
  DefaultImgComponent,
}: CarouselProps) => {
  const [slideIndex, decrementSlideIndex, incrementSlideIndex] = useSlideIndex(
    slides,
    slideIndexProp,
    onSlideIndexChange,
    autoAdvanceInterval,
  )

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

## キーワード

- [[react-hooks|React Hooks]]
- [[use-effect|useEffect]]
- [[vitest|Vitest]]
- [[test-driven-development|テスト駆動開発]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
