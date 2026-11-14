---
title: next/font
aliases: []
description: Next.js でフォントを自動でセルフホスティングできるようにするモジュール
tags: [word, next.js]
date: 2024-09-19
---

## TL;DR

[[nextjs|Next.js]] で、どんなフォントでも自動でセルフホスティングできるようにするモジュール。[[google-fonts|Google Fonts]] のフォントも、アプリケーションと同じドメインから配信できる。

## なぜ必要か

フォントを自分でホスティングするには、フォントファイルと CSS ファイルを用意する必要がある。`next/font` を使うと、これを自動で行ってくれる。

## 仕組み

Google Fonts のフォントはデプロイに含まれ、デプロイ先と同じドメインから配信される。そのため、ブラウザから Google にリクエストが送られることはない。

Google Fonts は自動で[[font-subsetting|サブセット化]]されるので、どのサブセットをプリロードするかを `subsets` で指定する。サブセットの取得に失敗すると警告が出る。

## 例

[[root-layout|Root Layout]] で、使いたいフォントを `next/font/google` から読み込む。

```tsx
import { Roboto } from "next/font/google"

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
```

[[variable-fonts|可変フォント]]でない場合は `weight` が必須である。配列を渡すと、複数の `weight` や `style` を指定できる。

フォントを CSS 変数として使うときは、フォント関数の `variable` に変数名を指定し、`<インスタンス名>.variable` を親要素の `className` に付ける。

```tsx
const inter = Inter({ variable: "--font-inter" })

<main className={inter.variable}>
  <p className={styles.text}>Hello World!</p>
</main>
```

## 注意点

`localFont` や Google Fonts の関数は、呼び出すたびに別のインスタンスとしてホストされる。同じフォントを複数のファイルで使うときは、1 つのファイルでだけ関数を呼び出して `export` し、ほかのファイルからはそれを読み込む。

```ts
// styles/fonts.ts
import { Inter, Lora } from "next/font/google"
import localFont from "next/font/local"

const inter = Inter()
const lora = Lora()
const myFont = localFont({ src: "./my-font.woff2", display: "swap" })

export { inter, lora, myFont }
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[google-fonts|Google Fonts]]
- [[variable-fonts|可変フォント]]
- [[font-subsetting|サブセット化]]
- [[nextjs-image|next/image]]
- [[nextjs-script|next/script]]

## 出典

- [Font Optimization - Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Font Module - Next.js](https://nextjs.org/docs/app/api-reference/components/font)
