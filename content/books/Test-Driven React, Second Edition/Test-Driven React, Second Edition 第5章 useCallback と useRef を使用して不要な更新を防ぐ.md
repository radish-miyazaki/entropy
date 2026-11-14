---
title: Test-Driven React, Second Edition 第5章 useCallback と useRef を使用して不要な更新を防ぐ
aliases: [useCallback と useRef を使用して不要な更新を防ぐ]
description: 再描画のたびに自動送りのタイマーがリセットされる問題を、useCallback によるメモ化と useRef による最新値の保持で直す
tags: [book-chapter]
date: 2024-09-05
book: "[[Test-Driven React, Second Edition]]"
chapter: 5
---

## TL;DR

- 再描画のたびに `incrementSlideIndex` が作り直され、自動送りのタイマーがリセットされてしまう。
- useCallback で関数をメモ化し、依存関係は `slides.length` に絞り、コールバックは [[use-ref|useRef]] で保持して直す。

## 内容

### 機能拡張の実装の問題点

[[Test-Driven React, Second Edition 第5章 カスタムフックを使った機能拡張|カスタムフックを使った機能拡張]]の実装では、スライドが進んだこと以外が理由の再描画でも、`incrementSlideIndex` が新しく作られる。そのたびにタイマーがリセットされる。次のテストは失敗し、この問題を確かめられる。

```tsx
// Carousel.test.tsx
it("does not reset the auto-advance timer on re-render", () => {
  const autoAdvanceInterval = 5_000
  const { rerender } = render(
    <Carousel slides={slides} autoAdvanceInterval={autoAdvanceInterval} />,
  )
  const img = screen.getByRole("img")
  expect(img).toHaveAttribute("src", slides[0].imgUrl)

  act(() => {
    vi.advanceTimersByTime(autoAdvanceInterval - 1)
  })
  expect(img).toHaveAttribute("src", slides[0].imgUrl)

  rerender(<Carousel slides={slides} autoAdvanceInterval={autoAdvanceInterval} />)
  act(() => {
    vi.advanceTimersByTime(1)
  })
  expect(img).toHaveAttribute("src", slides[1].imgUrl)
})
```

問題は次の流れで起きる。

1. `Carousel` が再描画されると、`useSlideIndex` が呼ばれる。
2. 新しい `incrementSlideIndex` が作られ、`useTimeout` に渡される。新しいかどうかは `===` による[[shallow-comparison|浅い比較]]で判定される。
3. [[react|React]] は依存関係が変わったと判断し、`useEffect` のコールバックが返した関数を呼んで `clearTimeout` を実行する。
4. `setTimeout` が再び実行され、新しいタイマーが作られる。

### useCallback でメモ化する

useCallback は、[[use-effect|useEffect]] と同じく 2 つの引数を取る。1 つ目が関数、2 つ目が依存関係の配列である。関数を実行する代わりにその関数を返し、依存関係が変わらない限り同じ関数を返す。これで関数をメモ化できる。

```tsx
// useSlideIndex.tsx
const incrementSlideIndex = useCallback(() => {
  if (!slides) return

  setSlideIndexState(increment(slides.length))
  onSlideIndexChange?.(increment(slides.length)(slideIndex))
}, [slides, slideIndex, onSlideIndexChange])
```

### 依存関係に起因するバグ

この実装でも、親コンポーネントが `slides` や `onSlideIndexChange` を再描画の間でキャッシュしていなければ、同じ問題が起きる。次のテストは失敗する。

```tsx
// Carousel.test.tsx
it("does not reset the timer on irrelevant prop changes", () => {
  const autoAdvanceInterval = 5_000
  const CarouselParent = () => (
    <Carousel
      slides={[...slides]} // 新しい配列が生成される
      onSlideIndexChange={vi.fn()} // 新しい関数が生成される
      autoAdvanceInterval={autoAdvanceInterval}
    />
  )

  const { rerender } = render(<CarouselParent />)
  const img = screen.getByRole("img")
  expect(img).toHaveAttribute("src", slides[0].imgUrl)

  act(() => {
    vi.advanceTimersByTime(autoAdvanceInterval - 1)
  })
  expect(img).toHaveAttribute("src", slides[0].imgUrl)

  rerender(<CarouselParent />)
  act(() => {
    vi.advanceTimersByTime(1)
  })
  expect(img).toHaveAttribute("src", slides[1].imgUrl)
})
```

`CarouselParent` が描画されるたびに、`slides` は新しい配列、`onSlideIndexChange` は新しい関数として作られる。そのため、`useCallback` もそのたびに新しい関数を返す。

### 依存関係を見直す

ここで、依存関係を安易に配列から消してはいけない（[[react-hooks-exhaustive-deps|react-hooks/exhaustive-deps]]）。代わりに、それぞれの依存関係がどう使われているかを考える。

`slides` は、スライドのインデックスの境界を判定するためだけに使っている。必要なのは `slides.length` なので、依存関係を `slides?.length` にする。

```tsx
// useSlideIndex.tsx
const incrementSlideIndex = useCallback(() => {
  if (!slides?.length) return

  setSlideIndexState(increment(slides.length))
  onSlideIndexChange?.(increment(slides.length)(slideIndex))
}, [slides?.length, slideIndex, onSlideIndexChange])
```

`onSlideIndexChange` は、呼ぶときには最新のものを使いたいが、それが変わったことで副作用は起こしたくない。そこで [[use-ref|useRef]] で保持し、`incrementSlideIndex` の中ではそこから呼ぶ。`useRef` は常に同じオブジェクトを返すので、依存関係に入れる必要はない。

```tsx
// useSlideIndex.tsx
const onSlideIndexChangeRef = useRef(onSlideIndexChange)
onSlideIndexChangeRef.current = onSlideIndexChange

const incrementSlideIndex = useCallback(() => {
  if (!slides?.length) return

  setSlideIndexState(increment(slides.length))
  onSlideIndexChangeRef.current?.(increment(slides.length)(slideIndex))
}, [slides?.length, slideIndex])
```

## キーワード

- useCallback
- [[use-ref|useRef]]
- [[use-effect|useEffect]]
- [[shallow-comparison|浅い比較]]
- [[react-hooks-exhaustive-deps|react-hooks/exhaustive-deps]]
- [[react-hooks|React Hooks]]

## 自分の理解

最初は `React.memo` を使う方法も考えたが、これはうまくいかない。`React.memo` を使えば、親が同じ Props を渡す限り `Carousel` の再描画は防げる。しかし、`defaultImgHeight` や `DefaultImgComponent` など別の Props が変わると、やはり再描画されてタイマーがリセットされてしまう。
