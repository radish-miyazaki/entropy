---
title: <Link> コンポーネント
aliases: []
description: next/link が提供する、Soft navigation で画面遷移するためのコンポーネント
tags: [word, next.js]
date: 2024-08-19
---

## TL;DR

`next/link` が提供するコンポーネント。`<a>` と同じように `href` 属性に遷移先の URL を指定する。DOM 上では `<a>` 要素として展開されるが、クリックすると [[soft-navigation|Soft navigation]] が起きる。

## 仕組み

公式ドキュメントによると、`<Link>` は `<a>` 要素を拡張し、プリフェッチとクライアントサイドでのルート間の移動を提供する。Next.js でルート間を移動する主な方法である。

`<Link>` がビューポートに入ると、Next.js はリンク先のルートとそのデータを裏で読み込む（プリフェッチ）。プリフェッチは本番環境でだけ有効になる。`prefetch` の既定値（`"auto"` または `null`）では、静的なルートは全体を、動的なルートは最も近い [[loading-tsx|loading.js]] の境界までをプリフェッチする。`false` にするとプリフェッチしない。

ほかに、履歴を追加せずに置き換える `replace`、移動後のスクロールを制御する `scroll` などの props がある。`className` のような `<a>` の属性は、そのまま `<a>` 要素に渡される。

## 例

```tsx
import Link from "next/link"
import styles from "./styles.module.css"

export function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">トップ</Link>
        </li>
        <li>
          <Link href="/categories">カテゴリー一覧</Link>
        </li>
      </ul>
    </nav>
  )
}
```

[[dynamic-routes|Dynamic Routes]] へのリンクは次のように書ける。

```tsx
export default function Page() {
  return (
    <div>
      <h1>カテゴリー一覧画面</h1>
      <ul>
        <li>
          <Link href="/categories/flower">花</Link>
        </li>
        <li>
          <Link href="/categories/animal">動物</Link>
        </li>
        <li>
          <Link href="/categories/landscape">風景</Link>
        </li>
      </ul>
    </div>
  )
}
```

このとき、遷移先の Dynamic Routes は次のように定義されている。

```tsx
type Props = {
  // パスパラメータ
  params: { categoryName: string }
  // クエリパラメータ
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ params, searchParams }: Props) {
  const page = typeof searchParams.page === "string" ? searchParams.page : "1"

  return (
    <div>
      <h1>カテゴリー別一覧画面</h1>
      <h2>カテゴリー「{params.categoryName}」</h2>
      <p>ページ番号:「{page}」</p>
    </div>
  )
}
```

## 注意点

以前のバージョンでは、子要素として `<a>` を置く必要があったが、今は不要である。公式ドキュメントによると、v13.0.0 から不要になった。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[use-router|useRouter Hook]]: `<Link>` を使わずに画面遷移させる Hook
- [[soft-navigation|Soft navigation]]
- [[query-parameter|クエリパラメータ]]

## 出典

- [Components: Link - Next.js](https://nextjs.org/docs/app/api-reference/components/link)
