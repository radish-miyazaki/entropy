---
title: 実践Next.js ——App Routerで進化するWebアプリ開発 第8章 Parallel RoutesとIntercepting Routesを用いたモーダル
description: 汎用的なモーダルコンポーネントを作り、Parallel Routes と Intercepting Routes を組み合わせて URL と連動するモーダルを実装する章
tags: [book-chapter, next.js, parallel-routes, intercepting-routes]
date: 2024-08-29
book: "[[実践Next.js ——App Routerで進化するWebアプリ開発]]"
chapter: 8
---

## TL;DR

- 開閉を制御する汎用的なモーダルコンポーネントを作る。
- [[parallel-routes|Parallel Routes]] と [[intercepting-routes|Intercepting Routes]] を組み合わせると、モーダルを開いたときに URL が変わり、元のページは裏に表示されたままになる。

## 内容

### 汎用的なモーダルコンポーネント

開閉を制御するコンポーネント `ModalContainer` を定義する。`children` はクリックするとモーダルを開く要素で、`content` は開いているときに表示する内容である。`content` はモーダルを閉じる関数を受け取る。

```tsx
type Props = {
  children: ReactNode // クリックされたときにモーダルを開く要素
  content: (closeModal: () => void) => ReactNode // 開いている状態のときに表示するコンテンツ
  defaultOpen?: boolean // デフォルトでモーダルが開いているか
  toggleClassName?: string
}

export function ModalContainer({ children, content, defaultOpen = false, toggleClassName }: Props) {
  const { openModal, closeModal, isOpen } = useModal(defaultOpen)

  return (
    <>
      <button onClick={openModal} className={clsx(styles.toggle, toggleClassName)}>
        {children}
      </button>

      {isOpen && content(closeModal)}
    </>
  )
}
```

呼び出す側は [[client-component|Client Component]] で、いいねの状態などを持ち、`content` に表示したいモーダルを渡す。

```tsx
"use client"

// ...

type Props = {
  photo: Photo
  children: ReactNode
}

export function PhotoViewModalContainer({ photo: { likedCount, ...photo }, children }: Props) {
  const [liked, setLiked] = useState(false)
  const [localLikedCount, setLocallikedCount] = useState(likedCount)

  const handleClickLike = (count: number) => {
    setLiked(true)
    setLocallikedCount(count)
  }

  return (
    <ModalContainer
      content={(closeModal) => (
        <PhotoViewModal
          {...photo}
          likedCount={localLikedCount}
          liked={liked}
          close={closeModal}
          onClickLike={handleClickLike}
        />
      )}
    >
      {children}
    </ModalContainer>
  )
}
```

### Parallel Routes と Intercepting Routes を用いた実装

2 つを組み合わせると、モーダルを開いたときに URL が更新され（Intercepting Routes）、元のページは裏側に表示されたままになる（Parallel Routes）。これで、モーダルを作るときによくある次の課題を解決できる。

- モーダルの URL を共有できる
- ページを再読み込みしても、モーダルを閉じずにコンテキストを保てる
- ブラウザで戻ったときは、前のルートに戻るのではなくモーダルを閉じる
- 進んだときは、モーダルをもう一度開く

ディレクトリ構成は次のとおりである。

```text
app/(site)
  layout.tsx                 // slot（@modal）を Props で受け取る
  @modal/                    // モーダルと元のページを重ねて表示（Parallel Routes）
    default.tsx
    (.)photos/[photoId]/view // ソフトナビゲーション時に表示（Intercepting Routes）
  photos/[photoId]/view      // ハードナビゲーション時に表示
```

レイアウトは、`@modal` のスロットを `modal` という Props で受け取り、`children` と並べて描画する。

```tsx
// app/(site)/layout.tsx
type Props = {
  children: React.ReactNode
  modal: React.ReactNode
}

export default async function SiteLayout({ children, modal }: Props) {
  return (
    <>
      {/* ... */}
      {children}
      {modal}
      {/* ... */}
    </>
  )
}
```

`default.tsx` は、一致する [[route-segment|Route Segment]] がないときにスロットに表示するフォールバックの UI である。モーダルを出さないときは `null` を返す。

```tsx
// app/(site)/@modal/default.tsx
export default function Page() {
  return null
}
```

公式ドキュメントにも、この組み合わせでモーダルを作る例がある（[Intercepting Routes: Modals](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes#modals)）。

## キーワード

- [[nextjs|Next.js]]
- [[parallel-routes|Parallel Routes]]
- [[intercepting-routes|Intercepting Routes]]
- [[route-segment|Route Segment]]
- [[client-component|Client Component]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
